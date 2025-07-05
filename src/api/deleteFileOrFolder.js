import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export default async function deleteFileOrFolder(s3, key = "") {

    const command = new DeleteObjectCommand({
        Bucket: 'enderchestbucket',
        Key: key
    })

    await s3.send(command)
}