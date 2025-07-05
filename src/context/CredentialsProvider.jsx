import { S3Client } from "@aws-sdk/client-s3";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const credentialsContext = createContext({
    s3: null,
    credentials: null
});

export default function CredentialsProvider({ children }) {
    const [s3, setS3] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const stored = localStorage.getItem("credentials");
        if (!stored) {
            console.error("No credentials found in localStorage");
            navigate('/config')
            return;
        }

        try {
            const parsed = JSON.parse(stored);
            const { region, access_key, secret_key, name } = parsed;

            if (!region || !access_key || !secret_key || !name) {
                console.error("Incomplete credentials found in localStorage");
                navigate('/config')
                return;
            }

            setCredentials(parsed);

            const client = new S3Client({
                region,
                credentials: {
                    accessKeyId: access_key,
                    secretAccessKey: secret_key
                }
            });

            setS3(client);
        } catch (err) {
            console.error("Invalid credentials in localStorage", err);
            navigate('/config')
        }
    }, []);

    const values = { s3, credentials };

    return (
        <credentialsContext.Provider value={values}>
            {children}
        </credentialsContext.Provider>
    );
}
