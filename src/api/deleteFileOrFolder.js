import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export default async function deleteFileOrFolder(s3, key = "", bucketName = "") {

    if (!s3) {
        throw new Error("S3 client is not initialized");
    }

    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key
    })

    await s3.send(command)
}