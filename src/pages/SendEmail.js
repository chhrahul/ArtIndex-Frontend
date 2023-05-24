import React from 'react'
import { BsFilePlus } from "react-icons/bs";
import { BsFileEarmark } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FiArchive } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi2";
import { Editor } from "react-draft-wysiwyg";
import { AxiosInstance } from '../utils'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Dropdown } from 'flowbite-react';
import { IoMdArrowDropdown } from "react-icons/io";
export default function SendEmail() {
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [files, setFiles] = React.useState([]);
    const [AttachmentName, setAttachmentName] = React.useState('');
    const [Loading, setloader] = React.useState(false);
    const handleChange = (data) => {
        setEditorState(data);

    }
    var htmlData = React.useMemo(
        () => draftToHtml(convertToRaw(editorState.getCurrentContent())),
        [editorState]
    );
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userId = localStorage.getItem("userId")
    const onSubmit = data => {
        data.Attachment = files;
        data.AttachmentName = AttachmentName;
        data.message = htmlData
        data.userId = userId
        console.log(data)
        async function sendEmail(){
            setloader(true)
            const result = await AxiosInstance({
                'url': '/send-email',
                'method': 'post',
                'data': data
            })
            const { status, message } = result.data
            console.log(message)
            console.log(status)
            if (status) {
                console.log('200')
                setTimeout(() => {
                    navigate("/emails")
                    localStorage.setItem('emailMessage', "Email Send Successfully!!");
                }, 3000);
            } else {
                console.log('400')
                alert(message)
            }
        }
        sendEmail()
    };
    function handleChangeImage(e) {
        let response = ""
        let filesItem = e.target.files;
        setAttachmentName(filesItem[0].name)
        let fileReader = new FileReader();
        fileReader.readAsDataURL(filesItem[0]);
        fileReader.onload = (event) => {
            response = fileReader.result
            setFiles(response)
        }
    }
    return (
        <>
            <div className="min-[480px]:pt-10 sm:ml-48 min-[480px]:top-20 bg-gray-200 h-full min-[480px]:ml-40" >
                <div className="min-[480px]:grid grid-cols-6 min-[480px]:ml-16">
                    <div className='min-[480px]:flex col-span-5 ...'>
                        <h2 className="dark:text-black text-3xl mb-4 pl-6">Email</h2>
                    </div>
                </div>
                <hr className="min-[480px]:ml-24 h-px my-2  bg-gray-700 border border-gray-300 dark:bg-gray-700"></hr>
                <div className='min-[480px]:grid grid-cols-12 gap-0 mb-10'>
                    <div className='col-span-1 w-8 ml-5 mt-6 max-[480px]:flex'>
                        <a href='/email/send'><HiOutlinePencil size={26} className='ml-2 my-6' /></a>
                        <a href='/emails'><FiInbox size={26} className='ml-2 my-6' /></a>
                        <a href=''><FiFileText size={26} className='ml-2 my-6' /></a>
                        <a href='/email/sent'><FiSend size={26} className='ml-2 my-6' /></a>
                        <a href=''><FiArchive size={26} className='ml-2 my-6' /></a>
                    </div>
                    <div className="col-span-11 max-[480px]:col-span-10 mb-10 p-4 border-1 border-blue-400 border-dashed mr-6 dark:border-blue-700 h-full top-20 bg-white">
                        <div className="mt-8 mr-2 mb-8">
                            {Loading ? (<>
                                <div className="items-center">
                                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-3/4 left-1/2">
                                        <div role="status">
                                            <svg aria-hidden="true" class="opacity-1 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                            ) : ''}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {errors.toEmail && <span className='text-red-500'>The Email field is required </span>}
                                <div className={Loading ? 'ml-2 mt-4 opacity-20' : 'ml-2 mt-4'}>
                                    <div className="w-full mb-4 border-2 border-blue-300 rounded-lg bg-gray-50 dark:bg-blue-500 dark:border-gray-600">
                                        <div className="bg-white rounded-t-lg dark:bg-gray-800">
                                            <label htmlFor="comment" className="sr-only">Your comment</label>
                                            <input type="email" {...register("toEmail", { required: true })} className="w-full text-black bg-white border-b-2 border-l-0  border-r-0  border-t-0 border-blue-200 focus:outline-0  italic rounded-t-lg text-md px-4 py-2 " placeholder="To: " />
                                            <input type="text" {...register("subject")} className="w-full text-black bg-white border-t-0 border-b-2  border-l-0  border-r-0 border-blue-200  focus:outline-0  italic  text-md px-4 py-2" placeholder="Subject:" />
                                            <Editor
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="m "
                                                editorClassName="editorClassName"
                                                wrapperStyle={{ height: 300 }}
                                                toolbar={{
                                                    options: ['inline', 'list', 'textAlign', 'history'],
                                                    inline: { inDropdown: false },
                                                    list: { inDropdown: false },
                                                    textAlign: { inDropdown: false },
                                                    history: { inDropdown: false },
                                                }}
                                                name="message"
                                                editorState={editorState}
                                                onEditorStateChange={handleChange}
                                            />
                                        </div>
                                        <div className="min-[480px]:flex items-center justify-between px-3 border-t-2 border-blue-300 dark:border-blue-300">
                                            <div className="min-[480px]:flex pl-0 space-x-1 sm:pl-2">
                                                <span className="inline-flex justify-center items-center p-1 text-black rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <BsFileEarmark className='' size={20} color='black'/>
                                                    <select className="text-sm cursor-pointer focus:ring-0 font-bold text-black bg-transparent border-none" >
                                                        <option value='Template'>Template</option>
                                                        <option vaue='One'>One</option>
                                                        <option vaue='Two'>Two</option>
                                                    </select>
                                                </span>
                                                <span className="cursor-pointer inline-flex justify-center items-center p-1 text-black rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                   
                                                    <Dropdown
                                                        label={<><BsFilePlus size={20} color='black' /> <span className="mr-4 cursor-pointer text-sm focus:ring-0  font-bold text-black bg-transparent ml-2 border-none " value='Fields'>Fields</span><IoMdArrowDropdown/></>}
                                                        dismissOnClick={false}
                                                        style={{ backgroundColor: 'transparent', color: 'black', outline: 'none', border: 'none' }}
                                                    >
                                                        <Dropdown.Item>
                                                            <button type="button" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                FirstName
                                                            </button>
                                                        </Dropdown.Item>

                                                        <Dropdown.Item>
                                                            <button type="button" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                LastName
                                                            </button>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <button type="button" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                City
                                                            </button>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <button type="button" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                Company
                                                            </button>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <button type="button" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                Title
                                                            </button>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <button type="button" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                Email
                                                            </button>
                                                        </Dropdown.Item>
                                                    </Dropdown>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='ml-2 mt-6 flex items-center justify-between'>
                                    <label type="button" for="getFile" onclick="document.getElementById('getFile').click()" className="cursor-pointer  text-gray bg-transparent border-2 border-green-400 focus:outline-none focus:ring-4 focus:ring-green-400 font-medium rounded-full text-sm px-4 py-1 text-center mr-8 mb-2" >Attach</label>
                                    <input type="file" id="getFile" className='hidden' onChange={handleChangeImage} />
                                    <span className='min-[480px]:flex'>
                                        <button type="button" className="cursor-pointer text-white bg-slate-400 border-2 border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-400 font-medium rounded-full text-sm px-6 py-1 text-center mr-6 mb-2 dark:border-slate-400 dark:hover:bg-slate-400 dark:focus:ring-slate-400" >Discard</button>
                                        <button type="submit" onClick={() => { }} className="cursor-pointer text-white bg-green-400 border-2 border-green-400 focus:outline-none focus:ring-4 focus:ring-green-400 font-medium rounded-full text-sm px-6 py-1 text-center mr-2 mb-2 dark:bg-green-400 dark:hover:bg-green-400 dark:focus:ring-green-400" >Send</button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
