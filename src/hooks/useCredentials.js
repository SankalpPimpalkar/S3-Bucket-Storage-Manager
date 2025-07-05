import { S3Client } from "@aws-sdk/client-s3";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCredentials() {
    const navigate = useNavigate();
    const [s3, setS3] = useState(null);
    const [credentials, setCredentials] = useState({
        region: "",
        access_key: "",
        secret_key: ""
    });

    useEffect(() => {
        const stored = localStorage.getItem("credentials") || null;
        if (!stored) {
            navigate("/config");
            return;
        }

        try {
            const parsed = JSON.parse(stored);
            const { region, access_key, secret_key } = parsed;

            if (!region || !access_key || !secret_key) {
                navigate("/config");
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
            navigate("/config");
        }
    }, [navigate]);

    return { s3, credentials };
}
