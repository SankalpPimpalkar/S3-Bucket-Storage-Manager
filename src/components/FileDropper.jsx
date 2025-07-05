import { CloudUpload, FileText, X } from 'lucide-react'
import React, { useCallback, useState } from 'react'

export default function FileDropper() {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState([])

    const handleDragEnter = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const handleDragOver = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files)
        setFiles(prevFiles => [...prevFiles, ...droppedFiles])
    }, [])

    const handleFileInput = useCallback((e) => {
        const selectedFiles = Array.from(e.target.files)
        setFiles(prevFiles => [...prevFiles, ...selectedFiles])
    }, [])

    const removeFile = useCallback((index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
    }, [])

    return (
        <div
            className={`w-full p-6 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-[#555] bg-[#202020]' : 'border-[#252525] bg-[#101010]'
                }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <CloudUpload size={50} className='stroke-[1.5] text-gray-500' />

                <div className="text-center">
                    <p className="font-mono text-sm text-gray-400">
                        {isDragging ? 'Drop files here' : 'Drag & drop files here, or click to select'}
                    </p>
                    <p className="font-mono text-xs text-gray-600 mt-1">
                        Supports multiple files
                    </p>
                </div>

                <label className="bg-[#151515] hover:bg-[#202020] border border-[#252525] text-white font-medium text-xs px-4 py-2 rounded-md cursor-pointer">
                    <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileInput}
                    />
                    Select Files
                </label>
            </div>

            {files.length > 0 && (
                <div className="mt-6 space-y-2">
                    <h5 className="font-mono text-xs text-gray-500 mb-2">
                        Selected files ({files.length})
                    </h5>

                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-[#151515] border border-[#252525] rounded-md"
                            >
                                <div className="flex items-center space-x-2">
                                    <FileText size={18} className='text-gray-500' />
                                    <span className="font-mono text-xs text-gray-300 truncate max-w-xs">
                                        {file.name}
                                    </span>
                                </div>

                                <button
                                    onClick={() => removeFile(index)}
                                    className="text-gray-500 hover:text-gray-300"
                                >
                                    <X size={18} className='text-gray-500 cursor-pointer' />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}