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
import { EditorState, convertToRaw, convertFromHTML, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Dropdown } from 'flowbite-react';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { Button, Modal } from 'flowbite-react';
import { IoFilterOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { HiTrash } from "react-icons/hi";
import { LoginSocialGoogle } from 'reactjs-social-login'

export default function SendEmail() {
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [files, setFiles] = React.useState([]);
    const [AttachmentName, setAttachmentName] = React.useState('');
    const [Loading, setloader] = React.useState(false);
    const [getResult, setResult] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('');
    const [filteredResults, setFilteredResults] = React.useState([]);
    const [selectedEmails, setSelectedEmails] = React.useState([]);
    const [EmailIDs, setEmailIDs] = React.useState([]);
    const [EmailAddress, setEmailAddress] = React.useState([]);
    const [newHtml, setnewHtml] = React.useState('');
    const [NameArrow, setNameArrow] = React.useState(true);
    const [companyArrow, setcompanyArrow] = React.useState(true);
    const [Titlearrow, setTitlearrow] = React.useState(true);
    const [filteredResultsforModal, setfilteredResultsforModal] = React.useState([]);


    const location = useLocation();
    const [datafromContact, setdatafromContact] = React.useState(location.state);
    const data = location.state;
    console.log(data)

    const handleChange = (data) => {
        setEditorState(data);

        console.log(data)
    }

    var htmlData = React.useMemo(
        () => draftToHtml(convertToRaw(editorState.getCurrentContent())),
        [editorState]
    );
    //console.log(htmlData)

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userId = localStorage.getItem("userId")
    const onSubmit = data => {
        console.log(data)
        data.Attachment = files;
        data.AttachmentName = AttachmentName;
        data.message = htmlData
        data.userId = userId

        if (EmailAddress.length > 0) {

            data.toEmail = EmailAddress.join(',');
        }

        async function sendEmail() {
            setloader(true)
            const result = await AxiosInstance({
                'url': '/send-email',
                'method': 'post',
                'data': data
            })
            const { status, message } = result.data
            // console.log(message)
            // console.log(status)
            if (status) {
                console.log('200')
                setTimeout(() => {
                    navigate("/emails")
                    localStorage.setItem('emailMessage', "Email Send Successfully!!");
                }, 3000);
            } else {
                // console.log('400')
                alert(message)
            }

        }
        sendEmail()
    };

    // Contacts Start
    const fetchInfo = () => {
        const userId = localStorage.getItem("userId")
        var data = JSON.stringify({ 'id': userId })
        async function getData() {
            const result = await AxiosInstance(
                {
                    'url': '/get-contacts',
                    'method': 'post',
                    'data': data
                }
            )
            if (result) {
                setResult(result.data.data)
                setloader(false)
            }
        }
        getData()
    };

    React.useEffect(() => {
        fetchInfo();
    }, []);



    // const searchItems = (searchValue) => {
    //     setSearchInput(searchValue);
    //     if (searchInput !== '') {
    //         const filteredData = getResult.filter((item) => {
    //             return item.Email && Object.values(item.Email).some((email) => email.includes(searchInput));
    //         });
    //         setFilteredResults(filteredData);
    //     } else {
    //         setFilteredResults(getResult);
    //     }
    // };

    // const handleRowClick = (email) => {
    //     // Check if the email is already selected
    //     if (selectedEmails.includes(email)) {
    //         // Remove the email from the selectedEmails array
    //         setSelectedEmails(selectedEmails.filter((selectedEmail) => selectedEmail !== email));
    //     } else {
    //         // Add the email to the selectedEmails array
    //         setSelectedEmails([...selectedEmails, email]);
    //     }
    // };

    React.useEffect(() => {
        if (datafromContact) {
            setEmailIDs(getResult.filter(item => datafromContact.includes(item._id)))
            const filteredEmailIDs = getResult
                .filter(item => data.includes(item._id))
                .flatMap(item => item.Email);
            setEmailAddress(filteredEmailIDs);
            setfilteredResultsforModal(EmailIDs)
        }
        console.log(EmailIDs)
    }, [getResult])

    // Contacts End
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


    const [selectedValue, setSelectedValue] = React.useState("");
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue);
        if (htmlData) {
            console.log(htmlData, 'inside');
        }
        let wrappedHTML = '';

        if (event.target.value === 'FirstName') {
            wrappedHTML = htmlData + "<span class='text-bold' id='FirstName'>FIRST__NAME</span>";
            setnewHtml(wrappedHTML);
        }
        if (event.target.value === 'LastName') {
            wrappedHTML = htmlData + "<span class='text-bold' id='LastName'>LAST__NAME</span>";
            setnewHtml(wrappedHTML);
        }
        if (event.target.value === 'City') {
            wrappedHTML = htmlData + "<span class='text-bold' id='City'>__CITY</span>";
            setnewHtml(wrappedHTML);
        }
        if (event.target.value === 'Company') {
            wrappedHTML = htmlData + "<span class='text-bold' id='Company'>__COMPANY</span>";
            setnewHtml(wrappedHTML);
        }
        if (event.target.value === 'Title') {
            wrappedHTML = htmlData + "<span class='text-bold' id='Title'>JOB__TITLE</span>";
            setnewHtml(wrappedHTML);
        }

        console.log(selectedValue, 'sfsef');
        console.log(typeof (wrappedHTML))

        const appendedContent = convertFromHTML(wrappedHTML); // Use wrappedHTML instead of newHtml
        const newContentState = ContentState.createFromBlockArray(
            appendedContent.contentBlocks,
            appendedContent.entityMap
        );
        const newEditorState = EditorState.push(
            editorState,
            newContentState,
            'insert-fragment'
        );

        // Update the editor state with the appended HTML
        handleChange(newEditorState);
    };



    const handleDropdownChange = (event) => {
        setSelectedValue(event.target.value);

    };

    // Define the function to handle the button click
    const [showModal, setShowModal] = React.useState(false);
    const handleOnClick = () => {
        setShowModal(true)
    }
    const handleOnClose = () => {
        setShowModal(false)
    }


    const NameClick = () => {
        const strAscendingName = [...EmailIDs].sort((a, b) =>
            a.FirstName > b.FirstName ? 1 : -1,
        );
        setfilteredResultsforModal(strAscendingName)
        setNameArrow(false)
        if (NameArrow === false) {
            setNameArrow(true)
            const strDescendingName = [...EmailIDs].sort((a, b) =>
                a.FirstName > b.FirstName ? -1 : 1,
            );
            setfilteredResultsforModal(strDescendingName)
        }
    }
    const CompanyClick = () => {
        const strAscendingcmpny = [...EmailIDs].sort((a, b) =>
            a.Company > b.Company ? 1 : -1,
        );
        setfilteredResultsforModal(strAscendingcmpny)
        setcompanyArrow(false)
        if (companyArrow === false) {
            setcompanyArrow(true)
            const strDescendingName = [...EmailIDs].sort((a, b) =>
                a.Company > b.Company ? -1 : 1,
            );
            setfilteredResultsforModal(strDescendingName)
        }
    }
    const TitleClick = () => {
        const strAscendingTitle = [...EmailIDs].sort((a, b) =>
            a.Title > b.Title ? 1 : -1,
        );
        setfilteredResultsforModal(strAscendingTitle)
        setTitlearrow(false)

        if (Titlearrow === false) {
            setTitlearrow(true)
            const strDescendingName = [...EmailIDs].sort((a, b) =>
                a.Title > b.Title ? -1 : 1,
            );
            setfilteredResultsforModal(strDescendingName)
        }
    }
    const DeleteRow = async (id) => {
        setdatafromContact((prevData) => prevData.filter((itemId) => itemId !== id));
    };

    // Listen for changes in datafromContact and navigate once the state is updated
    React.useEffect(() => {
        if (datafromContact) {
            navigate("/email/send", { state: datafromContact });
            setEmailIDs(getResult.filter(item => datafromContact.includes(item._id)))
            const filteredEmailIDs = getResult
                .filter(item => datafromContact.includes(item._id))
                .flatMap(item => item.Email);
            setEmailAddress(filteredEmailIDs);
            setfilteredResultsforModal(getResult.filter(item => datafromContact.includes(item._id)))
        }


    }, [datafromContact, getResult]);


    // Access Token Start
    const handleGoogleLoginSuccessfull = async ({ provider, data }) => {

        const access_token = data.access_token
        
        localStorage.setItem('access_token', access_token);
        
    }

    async function getData(accessToken) {
        setloader(true);
        var data = JSON.stringify({ 'access_token': accessToken })
        try {
            const result = await AxiosInstance({
                url: '/mail/accessToken',
                method: 'post',
                data: data
            });
         
            if (result) {
               console.log(result)
            } else {
               
                // Show an alert message or take appropriate action to inform the user
            }
        } catch (error) {
            
            console.error('Error:', error);
           
            // Handle the error condition, such as showing an error message or taking appropriate action
        }
    }

    const handleLoginWithError = async ({ error }) => {
        console.log(error?.message)
    }
    const loginGoogleProps = {
        "client_id": '731019835589-6ff8j6hb3k7paort3etsrjbfq1rmbb5m.apps.googleusercontent.com',
        "redirect_uri": 'https://main.d26n8wj3j35m97.amplifyapp.com/emails',
        "scope": 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send',
        "discoveryDocs": "claims_supported",
        "access_type": "online",
        "onResolve": handleGoogleLoginSuccessfull,
        "onReject": handleLoginWithError,
    }
  
    // Access Token End
    const handleEmail = () => {
        // Navigate to the new page with the array values
        const access_token = localStorage.getItem("access_token")
        getData(access_token);
      
      };
    
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
                        <a href='/email/draft'><FiFileText size={26} className='ml-2 my-6' /></a>
                        <a href='/email/sent'><FiSend size={26} className='ml-2 my-6' /></a>
                        <a href='/email/trash'><FiArchive size={26} className='ml-2 my-6' /></a>
                    </div>
                    <div className="col-span-11 max-[480px]:col-span-10 mb-10 p-4 border-1 border-blue-400 border-dashed mr-6 dark:border-blue-700 h-full top-20 bg-white">
                        <div className="mt-8 mr-2 mb-8">
                            {Loading ? (<>
                                <div className="items-center">
                                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-3/4 left-1/2">
                                        <div role="status">
                                            <svg aria-hidden="true" className="opacity-1 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                            ) : ''}
                            <LoginSocialGoogle {...loginGoogleProps}>
                                <span className="mr-2 mt-2 mb-10 text-center items-center w-full cursor-pointer">
                                    <p className="inline-block px-4 py-1.5 mb-4 text-white bg-blue-600 rounded-full  text-centerd" aria-current="page">Please Authenticate</p>
                                </span>

                            </LoginSocialGoogle>
<button onClick={handleEmail}>Send Email</button>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {errors.toEmail && <span className='text-red-500'>The Email field is required </span>}
                                <div className={Loading ? 'ml-2 mt-4 opacity-20' : 'ml-2 mt-4'}>
                                    <div className="w-full mb-4 border-2 border-blue-300 rounded-lg bg-gray-50 dark:bg-blue-500 dark:border-gray-600">
                                        <div className="bg-white rounded-t-lg dark:bg-gray-800">
                                            <label htmlFor="comment" className="sr-only">Your comment</label>
                                            {/* <input type="email" {...register("toEmail", { required: true })} onChange={(e) => searchItems(e.target.value)} className="w-full text-black bg-white border-b-2 border-l-0  border-r-0  border-t-0 border-blue-200 focus:outline-0  italic rounded-t-lg text-md px-4 py-2 " placeholder="To: " /> */}
                                            {EmailIDs && EmailIDs.length > 0 ? (
                                                <>
                                                    <ul className="flex justify-between w-full text-black bg-white border-b-2 border-l-0 border-r-0 border-t-0 border-blue-200 focus:outline-0 italic rounded-t-lg text-md px-4 py-2">
                                                        <span className="flex">
                                                            <li className="font-bold mr-4 mt-2">To:</li>
                                                            {EmailIDs.slice(0, 4).map(item => (
                                                                <li key={item._id} className="mr-4 flex border border-blue-300 rounded-l-full rounded-r-full px-2 pt-1">
                                                                    <img className="h-7 rounded-full w-7" src={item.ProfileImage ? item.ProfileImage : '/GoogleUser.png'} alt="Profile" />
                                                                    <p className="inline-block px-2 py-1 text-base text-black font-bold" aria-current="page">
                                                                        {item.FirstName} {item.LastName}
                                                                    </p>
                                                                </li>
                                                            ))}
                                                        </span>
                                                        {EmailIDs.length > 4 && (
                                                            <span className="font-bold text-blue-500 text-sm mt-2 cursor-pointer" onClick={handleOnClick}>
                                                                Manage List
                                                            </span>
                                                        )}
                                                    </ul>
                                                </>
                                            ) : (
                                                <input type="email" {...register("toEmail")} className="w-full text-black bg-white border-b-2 border-l-0 border-r-0 border-t-0 border-blue-200 focus:outline-0 italic rounded-t-lg text-md px-4 py-2" placeholder="To:" />
                                            )}

                                            {/* {
                                                filteredResults.length > 0 ? (
                                                    filteredResults && filteredResults.map((data) => {
                                                        return (
                                                            <div className=''>
                                                                <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                                                    <td className="px-6 py-4 cursor-pointer" onClick={() => handleRowClick(data._id)}>
                                                                        {data.Email}
                                                                    </td>
                                                                </tr>
                                                            </div>
                                                        );
                                                    })
                                                ) : ''
                                            } */}
                                            <input type="text" {...register("subject")} className="w-full text-black bg-white border-t-0 border-b-2  border-l-0  border-r-0 border-blue-200  focus:outline-0  italic  text-md px-4 py-2" placeholder="Subject:" />

                                            <div className='editor'>
                                                <Editor
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
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


                                        </div>
                                        <div className="min-[480px]:flex items-center justify-between px-3 border-t-2 border-blue-300 dark:border-blue-300">
                                            <div className="min-[480px]:flex pl-0 space-x-1 sm:pl-2">
                                                <span className="inline-flex justify-center items-center p-1 text-black rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <BsFileEarmark className='' size={20} color='black' />
                                                    <select className="text-sm cursor-pointer focus:ring-0 font-bold text-black bg-transparent border-none" >
                                                        <option value='Template'>Template</option>
                                                        <option value='One'>One</option>
                                                        <option value='Two'>Two</option>
                                                    </select>
                                                </span>
                                                <span className="cursor-pointer inline-flex justify-center items-center p-1 text-black rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <BsFilePlus size={20} color='black' className='disabled:text-gray-400' />
                                                    <select disabled={EmailIDs.length === 0} className="text-sm cursor-pointer focus:ring-0 font-bold text-black disabled:text-gray-400 bg-transparent border-none"

                                                        onChange={handleSelectChange} >
                                                        <option className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">Fileds</option>
                                                        <option value='FirstName' className="cursor-pointer ml-4 mr-4 pt-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">FirstName</option>
                                                        <option value='LastName' className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">LastName</option>
                                                        <option value='City' className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">City</option>
                                                        <option value='Company' className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">Company</option>
                                                        <option value='Title' className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">Title</option>

                                                    </select>

                                                    {/* <Dropdown
                                                        label={<><BsFilePlus size={20} color='black' /> <span className="mr-4 cursor-pointer text-sm focus:ring-0  font-bold text-black bg-transparent ml-2 border-none " value='Fields'>Fields</span><IoMdArrowDropdown /></>}
                                                        dismissOnClick={false} onChange={(e) => StatusClick(e.target.value)}
                                                        style={{ backgroundColor: 'transparent', color: 'black', outline: 'none', border: 'none' }}
                                                    >
                                                        <Dropdown.Item>
                                                            <button type="button" value="FirstName" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                FirstName
                                                            </button>
                                                        </Dropdown.Item>

                                                        <Dropdown.Item>
                                                            <button type="button" value="FirstName" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                LastName
                                                            </button>
                                                        </Dropdown.Item>

                                                        <Dropdown.Item>
                                                            <button type="button" value="FirstName" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                City
                                                            </button>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <button type="button" value="FirstName" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                Company
                                                            </button>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <button type="button" value="FirstName" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                Title
                                                            </button>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <button type="button" value="FirstName" className="cursor-pointer ml-4 mr-4 text-sm focus:ring-0  font-bold text-black bg-transparent mr-6 border-none ">
                                                                Email
                                                            </button>
                                                        </Dropdown.Item>
                                                    </Dropdown> */}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='ml-2 mt-6 flex items-center justify-between'>
                                    <label type="button" htmlFor="getFile" className="cursor-pointer  text-gray bg-transparent border-2 border-green-400 focus:outline-none focus:ring-4 focus:ring-green-400 font-medium rounded-full text-sm px-4 py-1 text-center mr-8 mb-2" >Attach</label>
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



            <Modal
                show={showModal}
                size="4xl"
                onClose={handleOnClose}
            >

                <Modal.Body>
                    <div className="space-y-6">
                        {filteredResultsforModal && filteredResultsforModal.length > 0 ? (
                            <>
                                <div className="filters">

                                    <div className='min-[480px]:flex justify-between'>
                                        <span className='flex'>
                                            <span className="text-xs font-semibold mr-4 flex items-center">
                                                <IoFilterOutline className='mr-2' />  Filter:</span>
                                            <button className="text-xs  flex  font-semibold bg-transparent mr-4 border-none max-[480px]:ml-4 mt-1" onClick={() => NameClick()}>
                                                Name<span className='mt-1 ml-1'> {NameArrow ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}</span>
                                            </button>
                                            <button className="text-xs  flex  font-semibold bg-transparent mr-4 border-none max-[480px]:ml-4 mt-1" onClick={() => CompanyClick()}>
                                                Company <span className='mt-1 ml-1'>{companyArrow ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}</span>
                                            </button>
                                            <button className="text-xs  flex font-semibold bg-transparent mr-4 border-none max-[480px]:ml-4 mt-1" onClick={() => TitleClick()}>
                                                Title<span className='mt-1 ml-1'>{Titlearrow ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}</span>
                                            </button>
                                        </span>
                                        <span className='cursor-pointer'
                                            color="gray"
                                            onClick={handleOnClose}
                                        >
                                            X
                                        </span>

                                    </div>
                                </div>

                                <hr className="my-0 bg-gray-700 border border-gray-300 dark:bg-gray-700"></hr>
                                <div className="relative overflow-x-auto overflow-y-auto">
                                    {filteredResultsforModal.map(item => (


                                        <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">

                                            <tbody>
                                                <tr className="bg-white dark:bg-gray-800 text-gray-700">

                                                    <td className=" py-4 flex items-center  w-44">
                                                        <img className="h-10  rounded-full w-10" src={item.ProfileImage ? item.ProfileImage : '/profile.png'} alt="Girl in a jacket" />
                                                        <p className="ml-6 text-xs font-bold   text-black">{item.FirstName} {item.LastName}</p>
                                                    </td>
                                                    <td className="text-xs px-6 ">
                                                        {item.Email}
                                                    </td>
                                                    <td className="text-xs px-6 pr-4 w-40 w-48">
                                                        {item.PhoneNumber}
                                                    </td>
                                                    <td className="text-xs px-6 pr-4 w-20">
                                                        {item.Title}
                                                    </td>
                                                    <td className="text-xs px-6 pr-4 w-32">
                                                        {item.Company}
                                                    </td>
                                                    <td className=''><span className='cursor-pointer' onClick={() => DeleteRow(item._id)}><HiTrash /></span></td>

                                                </tr>




                                            </tbody>
                                        </table>



                                    ))}
                                </div >



                            </>) : ''
                        }
                    </div>

                </Modal.Body >

            </Modal >
        </>
    )
}
