import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { FiFileText } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FiArchive } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa";
import { Document, Page } from 'react-pdf';
import { IoMdDownload } from "react-icons/io";

export default function SingleEmail() {
    const [files, setfiles] = React.useState('');
    const location = useLocation();
    const data = location.state;
    const HtmlToReactParser = require('html-to-react').Parser;
    let htmlToReactParser = new HtmlToReactParser();

    const handleGoBack = () => {
        window.history.back();
    };

    // React.useEffect(() => {
    //     if (data.attachments) {
    //         data.attachments.forEach((attachment) => {
    //             const imageUrl = `data:${attachment.mimeType};base64,${attachment.data}`;
    //             console.log(imageUrl);
    //         });
    //     }
    // }, [data]);

    // React.useEffect(() => {
    //     if (data.attachments) {
    //         const attachmentIds = data.attachments.map(attachment => attachment.attachmentId);
    //         console.log(attachmentIds)
    //         setfiles(attachmentIds)
    //     }
    // }, [data]);
    console.log(data.attachments)

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
                        <a href='/email/draft'><FiFileText size={26} className='ml-2 my-6' /></a>
                        <a href='/email/sent'><FiSend size={26} className='ml-2 my-6' /></a>
                        <a href='/email/trash'><FiArchive size={26} className='ml-2 my-6' /></a>
                    </div>
                    <div className="col-span-11 p-4 border-1 border-blue-400 border-dashed mr-6  dark:border-blue-700 h-full top-20 bg-white">

                        <div className="mt-6 mr-2 mb-8">
                            <div className="">
                                <button onClick={handleGoBack}><FaArrowLeft /></button>
                                <p className='text-xl font-semibold ml-20 mb-4'>{data.subject}</p>
                                <span className='flex mt-4 mb-4'>
                                    <img className="h-10 rounded-full w-10 ml-4" src="/GoogleUser.png" alt="Gmail" />
                                    <span className='ml-2'>
                                        <p className='text-normal ml-4 font-semibold'>{data.from}</p>
                                        <p className='text-normal ml-4 mb-4 text-gray-400'>to {data.to}</p>
                                    </span>
                                </span>
                                <p className='text-normal ml-20'>{htmlToReactParser.parse(data.messageBody)}</p>
                                {/* {data.id}
                                    {data.attachments}
                                    {data.messageBody}
                                    {data.email} 
                                */}
                                {/* <h4>Attachments:</h4>
                                {data.attachments.map((attachment) => (
                                    <div key={attachment.attachmentId}>
                                        {attachment.mimeType.startsWith('image/') && (
                                            <div>
                                                <img src={attachment.attachmentUrl} alt={attachment.filename} />
                                                <a href={attachment.attachmentUrl} download>Download</a>
                                            </div>
                                        )}
                                        {attachment.mimeType === 'application/pdf' && (
                                            <div>
                                                <a href={attachment.attachmentUrl} target="_blank" rel="noopener noreferrer">
                                                    <img src="placeholder_image_url" alt="PDF Placeholder" onClick={() => window.open(attachment.attachmentUrl, '_blank')} />
                                                </a>
                                                <a href={attachment.attachmentUrl} download>Download</a>
                                            </div>
                                        )}
                                        {!attachment.mimeType.startsWith('image/') && attachment.mimeType !== 'application/pdf' && (
                                            <div>
                                                <span>{attachment.filename}</span>
                                                <a href={attachment.attachmentUrl} download>Download</a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <hr /> */}

                                <div className="ml-20 mt-8 mb-8 h-32 w-32">
                                {data.attachments.length > 0 ? <h4 className='mb-4'>Attachments:</h4> : '' }
                                    {data.attachments &&
                                        data.attachments.map((attachment) => (
                                            <div key={attachment.attachmentId}>

                                                {attachment.mimeType.startsWith('image/') && (
                                                    <div>
                                                        <img src={attachment.attachmentUrl} alt={attachment.filename} />
                                                        <a href={attachment.attachmentUrl} download={attachment.filename}>
                                                            <p className='flex justify-between'><IoMdDownload className='mt-2' /> <div className=''>{attachment.filename}</div></p>
                                                        </a>
                                                    </div>
                                                )}
                                                {attachment.mimeType === 'application/pdf' && (
                                                    <div className='h-32 w-32'>
                                                        <iframe src={attachment.attachmentUrl} title={attachment.filename} />
                                                        <a href={attachment.attachmentUrl} download={attachment.filename}>
                                                            <p className='flex justify-between'><IoMdDownload className='mt-2' /> <div className=''>{attachment.filename}</div></p>
                                                        </a>
                                                    </div>
                                                )}

                                                {attachment.mimeType && !attachment.mimeType.startsWith('image/') && attachment.mimeType !== 'application/pdf' && (
                                                    <div className=''>
                                                        <a href={attachment.attachmentUrl} download={attachment.filename}>
                                                            <p className='flex justify-between'><IoMdDownload className='mt-2' /> <div className=''>{attachment.filename}</div></p>
                                                        </a>
                                                    </div>
                                                )}

                                            </div>
                                        ))}
                                </div>
                                {/* <hr /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
