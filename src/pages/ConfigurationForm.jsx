import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCredentials from '../hooks/useCredentials'
import { S3Client } from '@aws-sdk/client-s3'
import listFiles from '../api/listFiles'
import { toast } from 'react-toastify'

export default function ConfigurationForm() {

    const [formData, setFormData] = useState({
        name: '',
        secret_key: '',
        access_key: '',
        region: ''
    })
    const { credentials } = useCredentials()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        if (
            !formData.name ||
            !formData.access_key ||
            !formData.secret_key ||
            !formData.region
        ) {
            alert("All fields are required")
            return
        }
        try {
            const tempClient = new S3Client({
                region: formData.region,
                credentials: {
                    accessKeyId: formData.access_key,
                    secretAccessKey: formData.secret_key
                }
            })
            
            await listFiles(tempClient, '', formData.name)
            localStorage.setItem("credentials", JSON.stringify(formData))
            toast.success("Authorization successfull")
            setFormData({
                name: '',
                secret_key: '',
                access_key: '',
                region: ''
            })
            return navigate('/')

        } catch (error) {
            console.log(error)
            toast.error("Please enter valid credentials")
            setFormData({
                name: '',
                secret_key: '',
                access_key: '',
                region: ''
            })
            return
        }
    }

    useEffect(() => {
        if (credentials) {
            navigate('/')
        }
    }, [navigate, credentials])

    return (
        <div className='w-full min-h-dvh bg-[#101010] text-gray-300 flex items-center justify-center'>
            <div className='w-full max-w-xl bg-[#151515] border border-[#202020] p-5 rounded-xl'>
                <h1 className='font-semibold text-xl mb-6 bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent'>
                    Enter your S3 Configurations
                </h1>

                <form onSubmit={handleSubmit} className='space-y-3'>
                    <div className='flex flex-col items-start gap-1'>
                        <label htmlFor="name" className='text-sm text-gray-400'>
                            Name
                        </label>
                        <input
                            type="text"
                            name='name'
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className='outline-none bg-[#121212] border border-[#232323] px-4 py-2 w-full rounded-md text-sm'
                            placeholder='eg. enderchest'
                            autoFocus
                        />
                    </div>
                    <div className='flex flex-col items-start gap-1'>
                        <label htmlFor="name" className='text-sm text-gray-400'>
                            Access Key
                        </label>
                        <input
                            type="password"
                            name='access_key'
                            onChange={(e) => setFormData({ ...formData, access_key: e.target.value })}
                            className='outline-none bg-[#121212] border border-[#232323] px-4 py-2 w-full rounded-md text-sm'
                            placeholder='••••••••••••'
                        />
                    </div>
                    <div className='flex flex-col items-start gap-1'>
                        <label htmlFor="name" className='text-sm text-gray-400'>
                            Secret Key
                        </label>
                        <input
                            type="password"
                            name='secret_key'
                            onChange={(e) => setFormData({ ...formData, secret_key: e.target.value })}
                            className='outline-none bg-[#121212] border border-[#232323] px-4 py-2 w-full rounded-md text-sm'
                            placeholder='••••••••••••'
                        />
                    </div>
                    <div className='flex flex-col items-start gap-1'>
                        <label htmlFor="region" className='text-sm text-gray-400'>
                            Region
                        </label>
                        <input
                            type="text"
                            name='region'
                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                            className='outline-none bg-[#121212] border border-[#232323] px-4 py-2 w-full rounded-md text-sm'
                            placeholder='eg. eu-north-1'
                        />
                    </div>

                    <button type='submit' className='bg-[#dedede] hover:bg-[#c1c1c1] text-[#101010] font-semibold border border-[#dedede] px-4 py-2 w-full rounded-md text-sm cursor-pointer mt-4'>
                        Connect
                    </button>
                </form>
            </div>
        </div>
    )
}
