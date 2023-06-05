import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { IoFilterOutline } from "react-icons/io5";
import { FiRotateCw } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FiArchive } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi2";
export default function SingleEmail() {
    const [files, setfiles] = React.useState('');
    const location = useLocation();
    const data = location.state;
    const HtmlToReactParser = require('html-to-react').Parser;
    let htmlToReactParser = new HtmlToReactParser();
    console.log(data.attachments.attachmentId)
    React.useEffect(() => {
        if (data.attachments) {
            data.attachments.forEach((attachment) => {
                const imageUrl = `data:${attachment.mimeType};base64,${attachment.data}`;
                console.log(imageUrl);
            });
        }
    }, [data]);


    return (



        <>
            <div className="min-[480px]:pt-10 sm:ml-48 min-[480px]:top-20 bg-gray-200 h-full min-[480px]:ml-40" >
                <div className="min-[480px]:grid grid-cols-6 ml-16">
                    <div className='min-[480px]:flex col-span-5 ...'>
                        <h2 className="dark:text-black text-3xl  mb-4 pl-7" >Email </h2>
                        
                    </div>
                </div>
                <hr className=" min-[480px]:ml-24 h-px my-2  bg-gray-700 border border-gray-300 dark:bg-gray-700"></hr>
               
                <div className='grid grid-cols-12 gap-0 min-h-screen'>
                    <div className='col-span-1 w-8 ml-5 mt-6'>

                        <a href='/email/send'><HiOutlinePencil size={26} className='ml-2 my-6' /></a>
                        <a href='/emails'><FiInbox size={26} className='ml-2 my-6' /></a>
                        <a href=''><FiFileText size={26} className='ml-2 my-6' /></a>
                        <a href='/email/sent'><FiSend size={26} className='ml-2 my-6' /></a>
                        <a href='/email/trash'><FiArchive size={26} className='ml-2 my-6' /></a>
                    </div>
                    <div className="col-span-11 p-4 border-1 border-blue-400 border-dashed mr-6  dark:border-blue-700 h-full top-20 bg-white">

                        <div className="mt-6 mr-2 mb-8">
                            <div className="relative overflow-x-auto">


                                <p className='text-xl font-semibold ml-20 mb-4'>{data.subject}</p>
                                <span className='flex'>
                                    <img className="h-10 rounded-full w-10 ml-4" src="/GoogleUser.png" alt="Gmail" />
                                    <span className='ml-2'>
                                        <p className='text-normal ml-4 font-semibold'>{data.from}</p>
                                        <p className='text-normal ml-4 mb-4 text-gray-400'>to {data.to}</p>
                                    </span>
                                </span>
                              
                                
                                <p className='text-normal ml-4'>{htmlToReactParser.parse(data.messageBody)}</p>
                                {/* {data.id}
                            {data.attachments}
                            {data.messageBody}
                            {data.email} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
