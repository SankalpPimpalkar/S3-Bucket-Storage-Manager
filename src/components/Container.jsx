import { useEffect, useState, useCallback } from 'react'
import FileDropper from './FileDropper'
import Finder from './Finder'
import listFiles from '../api/listFiles'
import CreateFolderModal from './modals/CreateFolderModal'
import useCredentials from '../hooks/useCredentials'

export default function Container() {

    const [files, setFiles] = useState([])
    const [folderName, setFolderName] = useState('')
    const [currentDirectory, setCurrentDirectory] = useState("/")
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false)
    const { s3, credentials } = useCredentials()
    const [uploading, setUploading] = useState(false)

    const handleSetCurrentDirectory = useCallback(
        (location) => {
            localStorage.setItem('currentDirectory', location)
            setCurrentDirectory(location)
        }, [])

    function handleBack() {
        const parts = currentDirectory.split("/").filter(Boolean);
        parts.pop();
        handleSetCurrentDirectory("/" + parts.join("/"));
    }

    useEffect(() => {
        const onPopState = () => {
            handleBack();
        };
        window.addEventListener("popstate", onPopState);

        return () => {
            window.removeEventListener("popstate", onPopState);
        };
    }, [currentDirectory])

    useEffect(() => {

        if (!credentials) return

        const location = localStorage.getItem('currentDirectory') || '/'
        setCurrentDirectory(location)

        if (!isCreateFolderModalOpen) {
            (async () => {
                const contents = await listFiles(s3, location, credentials.name)
                setFiles(contents)
            })()
        }
    }, [currentDirectory, s3, credentials, uploading, isCreateFolderModalOpen])

    return (
        <div className='w-full px-4 py-4 pb-20'>
            <div className='w-full max-w-6xl mx-auto border border-[#252525] bg-[#151515] rounded-xl divide-y divide-[#252525]'>
                <div className='w-full p-4 flex items-center justify-between'>
                    <h4 className='font-mono text-sm text-gray-400 select-none'>
                        {currentDirectory == "" ? "/" : currentDirectory}
                    </h4>

                    <div className='flex items-center gap-2'>
                        {
                            currentDirectory != "/" &&
                            <button onClick={handleBack} className='bg-[#101010] active:bg-[#151515] border border-[#202020] text-white font-medium text-xs px-4 py-1.5 rounded-md cursor-pointer'>
                                Back
                            </button>
                        }

                        <button onClick={() => setIsCreateFolderModalOpen(true)} className='bg-[#dedede] active:bg-[#c1c1c1] text-[#101010] font-medium border border-[#bebebe] text-xs px-4 py-2 rounded-md cursor-pointer'>
                            Add Folder
                        </button>
                    </div>
                </div>

                <div className='p-4 bg-[#101010]'>
                    <FileDropper
                        currentDirectory={currentDirectory}
                        uploading={uploading}
                        setUploading={setUploading}
                    />
                </div>

                {/* <div></div> */}

                <div className='bg-[#101010] rounded-b-xl'>
                    <Finder
                        contents={files}
                        currentDirectory={currentDirectory}
                        setCurrentDirectory={handleSetCurrentDirectory}
                    />
                </div>
            </div>

            {/* Modals */}
            <CreateFolderModal
                folderName={folderName}
                setFolderName={setFolderName}
                isOpen={isCreateFolderModalOpen}
                handleClose={() => {
                    setIsCreateFolderModalOpen(false)
                    setFolderName('')
                }}
                currentDirectory={currentDirectory}
                setCurrentDirectory={handleSetCurrentDirectory}
            />
        </div>
    )
}
