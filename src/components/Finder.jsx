import { Download, Eye, FileText, Folder, LoaderCircle, Trash2 } from 'lucide-react'
import getFilePreview from '../api/getFilePreview'
import deleteFileOrFolder from '../api/deleteFileOrFolder'
import useCredentials from '../hooks/useCredentials'
import { useState } from 'react'

export default function Finder({ contents = [], setCurrentDirectory }) {

    const { s3, credentials } = useCredentials()
    const [isDeletingFileOrFolder, setIsDeletingFileOrFolder] = useState(false)
    const [deletingFileOrFolderKey, setDeletingFileOrFolderKey] = useState(null)

    async function handleFilePreview(key) {
        console.log("Previweing", credentials)
        const previewUrl = await getFilePreview(s3, key, false, credentials.name)
        window.open(previewUrl, '_blank')
    }

    async function handleDeleteFileOrFolder(key) {
        setIsDeletingFileOrFolder(true)
        setDeletingFileOrFolderKey(key)
        await deleteFileOrFolder(s3, key, credentials.name)
        setCurrentDirectory('')
        setDeletingFileOrFolderKey(null)
        setIsDeletingFileOrFolder(false)
        window.location.reload()
    }

    async function handleFileDownload(key) {
        const previewUrl = await getFilePreview(s3, key, true, credentials.name)
        window.open(previewUrl, 'download')
    }

    console.log(contents)

    return (
        <div className='divide-y divide-[#252525]'>
            {
                contents.length > 0 ? contents.map((content, index) => (
                    <div key={index} className='flex items-center justify-between px-4 py-3'>
                        <span className='flex items-center gap-3'>
                            {
                                content.type == "file" ?
                                    <FileText
                                        size={18}
                                        className='text-gray-500'
                                    /> :
                                    <Folder
                                        size={18}
                                        className='text-yellow-500'
                                    />
                            }

                            <p
                                className={`${content.type == "file" ? "text-gray-400" : "text-yellow-500 cursor-pointer"} text-xs font-mono`}
                                onClick={() => {
                                    if (content.type == 'folder') {
                                        setCurrentDirectory('/' + content.key)
                                    }
                                }}
                            >
                                {
                                    content.name
                                }
                            </p>
                        </span>

                        <div className='flex items-center gap-4'>
                            {
                                content.type != 'folder' &&
                                <Eye
                                    size={18}
                                    className='text-gray-500 cursor-pointer'
                                    onClick={() => handleFilePreview(content.key)}
                                />
                            }
                            {
                                (
                                    deletingFileOrFolderKey == content.key &&
                                    isDeletingFileOrFolder
                                ) ?
                                    <LoaderCircle
                                        size={18}
                                        className='text-yellow-300 cursor-pointer animate-spin'
                                    /> :
                                    <Trash2
                                        size={18}
                                        className='text-red-300 cursor-pointer'
                                        onClick={() => handleDeleteFileOrFolder(content.key)}
                                    />
                            }
                            {
                                content.type != 'folder' &&
                                <Download
                                    size={18}
                                    className='text-gray-500 cursor-pointer'
                                    onClick={() => handleFileDownload(content.key)}
                                />
                            }
                        </div>
                    </div>
                )) :
                    <div className="flex items-center justify-center py-10 text-sm text-gray-500 font-mono ">
                        No files or folders in this directory.
                    </div>
            }
        </div>
    )
}
