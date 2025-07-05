import { S3Client } from "@aws-sdk/client-s3";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCredentials() {
    const navigate = useNavigate();

    const stored = localStorage.getItem("credentials");
    const parsed = stored ? JSON.parse(stored) : null;

    const [credentials] = useState(parsed);
    const [s3] = useState(() =>
        parsed ? new S3Client({
            region: parsed.region,
            credentials: {
                accessKeyId: parsed.access_key,
                secretAccessKey: parsed.secret_key
            }
        }) : null
    );

    useEffect(() => {
        if (!parsed) {
            navigate("/config");
        }
    }, [navigate, parsed]);

    return { s3, credentials };
}
