import { PutObjectCommand } from "@aws-sdk/client-s3";

export default async function addFolder(s3, folderPath = "") {
    if (!folderPath.endsWith("/")) {
        folderPath += "/";
    }

    const command = new PutObjectCommand({
        Bucket: 'enderchestbucket',
        Key: folderPath,
        Body: "",
    });

    await s3.send(command)
}