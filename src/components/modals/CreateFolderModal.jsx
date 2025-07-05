import React, { useEffect, useState } from 'react'
import addFolder from '../../api/addFolder'
import useCredentials from '../../hooks/useCredentials'

export default function CreateFolderModal({ isOpen, handleClose, currentDirectory = "", setCurrentDirectory }) {

    const [folderName, setFolderName] = useState('')
    const { s3 } = useCredentials()

    async function handleCreateFolder(event) {
        event.preventDefault()
        let folderPath = currentDirectory.slice(1)

        await addFolder(s3, folderPath + folderName)
        setCurrentDirectory(folderPath + folderName + '/')
        handleClose()
    }

    function handleCancel() {
        setFolderName('')
        handleClose()
    }

    if (!isOpen) {
        return null
    }

    return (
        <div className='w-full h-full fixed top-0 left-0 bg-[#252525]/50 flex items-center justify-center px-2'>
            <div className='w-full max-w-lg bg-[#151515] border border-[#202020] p-5 rounded-xl'>
                <h1 className='font-semibold text-xl mb-6 bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent'>
                    Add Folder
                </h1>

                <form onSubmit={handleCreateFolder} className='space-y-3'>
                    <div className='flex flex-col items-start gap-1'>
                        <label htmlFor="name" className='text-sm text-gray-400'>
                            Name
                        </label>
                        <input
                            type="text"
                            name='name'
                            value={folderName}
                            onChange={(e) => {
                                setFolderName(e.target.value)
                                console.log((currentDirectory + e.target.value + '/'))
                            }}
                            className='outline-none bg-[#121212] border border-[#232323] px-4 py-2 w-full rounded-md text-sm'
                            placeholder='eg. my folder'
                            autoFocus
                            required
                        />
                    </div>

                    <div className='flex items-center flex-row-reverse gap-2'>
                        <button onClick={handleCancel} type='button' className='bg-[#121212] active:bg-[#202020] text-gray-200 font-semibold border border-[#232323] px-4 py-2 w-fit rounded-md text-xs cursor-pointer mt-4'>
                            Cancel
                        </button>

                        <button type='submit' className='bg-[#dedede] hover:bg-[#c1c1c1] text-[#101010] font-semibold border border-[#dedede] px-4 py-1.5 w-fit rounded-md text-xs cursor-pointer mt-4'>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
