import React from 'react'
import { IoFilterOutline } from "react-icons/io5";
import { FiRotateCw } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FiArchive } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi2";
import { LoginSocialGoogle } from 'reactjs-social-login'
import { AxiosInstance } from '../utils';
import { useNavigate } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';

export default function Email() {
    const [getResult, setResult] = React.useState([]);
    const [Loading, setloader] = React.useState(false);
    const [authenticate, setauthenticate] = React.useState(false);
    const [renderData, setrenderData] = React.useState([]);
    const [clearserach, setclearserach] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState('');
    let APIData = getResult
    // const HtmlToReactParser = require('html-to-react').Parser;
    // let htmlToReactParser = new HtmlToReactParser();
    const navigate = useNavigate();

    const handleGoogleLoginSuccessfull = async ({ provider, data }) => {

        const access_token = data.access_token
        console.log('data', data)
        console.log('provider', provider)
        localStorage.setItem('access_token', access_token);
        if (data.access_token) {
           // setloader(true);
            setauthenticate(false)
            getData(data.access_token);
        }
    }

    const handleLoginWithError = async ({ error }) => {
        console.log(error?.message)
    }
    const access_token = localStorage.getItem("access_token")
    var data = JSON.stringify({ 'access_token': access_token })
    const fetchInfo = () => {

       
        const access_token = localStorage.getItem("access_token")
        getData(access_token);
    };
    async function getData(accessToken) {
        setloader(true);
        var data = JSON.stringify({ 'access_token': accessToken })
        try {
            const result = await AxiosInstance({
                url: '/mail/inbox',
                method: 'post',
                data: data
            });
            console.log(result.data.mailData, 'result');
            if (result) {
                setResult(result.data.mailData);
                setloader(false);
                setauthenticate(false)
            } else {
                console.log('Hi');
            }
        } catch (error) {
            console.error('Error:', error);
            setloader(false)
            setauthenticate(true)
            // Handle the error condition, such as showing an error message or taking appropriate action
        }
    }
    React.useEffect(() => {
        const access_token = localStorage.getItem("access_token")
        getData(access_token);
        if(access_token === ''){
            setloader(false)
        }

    }, []);
    React.useEffect(() => {
        setrenderData(getResult)
    }, [getResult])
    console.log(data, 'data')
    const loginGoogleProps = {
        "client_id": '731019835589-6ff8j6hb3k7paort3etsrjbfq1rmbb5m.apps.googleusercontent.com',
        "redirect_uri": 'https://main.d26n8wj3j35m97.amplifyapp.com/emails',
        "scope": "openid profile email",
        "discoveryDocs": "claims_supported",
        "access_type": "online",
        "onResolve": handleGoogleLoginSuccessfull,
        "onReject": handleLoginWithError,
    }
    const ViewRow = async (id) => {
        const ViewData = getResult.find(apidata => {
            return apidata.id === id
        })
        navigate("/email/single", { state: ViewData });
    }
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        setclearserach(true)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setrenderData(filteredData)
        }
        else {
            setrenderData(APIData)
        }
    }
    const ref = React.useRef(null);
    const ResetSearch = () => {
        setrenderData(getResult)
        ref.current.value = '';
        setclearserach(false)
    }
    const StatusClick = (searchValue) => {
        // APIData.availability
        const SearchValue = searchValue
        console.log(SearchValue)
        // const filteredData = getResult.filter(apidata => {
        //     return apidata.isUnread === true
        // })
        if (SearchValue === 'Read') {
            const filteredData = getResult.filter(apidata => {
                return apidata.isUnread === false
            })
            setrenderData(filteredData)
        }
        if (SearchValue === 'Unread') {
            const filteredData = getResult.filter(apidata => {
                return apidata.isUnread === true
            })
            setrenderData(filteredData)
        }
        if (SearchValue === 'All') {
            setrenderData(getResult)
        }
    }

    const [message, setmessage] = React.useState('');
    const EmailMessage = localStorage.getItem("emailMessage")

    React.useEffect(() => {
        setmessage(EmailMessage)
        setTimeout(() => {
            setmessage('')
            localStorage.removeItem("emailMessage");

        }, 3000);
    }, [])

    const Refresh = () => {
        fetchInfo();
    }
    return (
        <>
            <div className="min-[480px]:pt-10 sm:ml-48 min-[480px]:top-20 bg-gray-200 h-full min-[480px]:ml-40" >
                <div className="min-[480px]:grid grid-cols-6 ml-16">
                    <div className='min-[480px]:flex col-span-5 ...'>
                        <h2 className="dark:text-black text-3xl  mb-4 pl-6" >Email </h2>
                        <form className="flex items-center">
                            <label htmlFor="voice-search" className="sr-only">Search</label>
                            <div className="relative min-[480px]:ml-8  max-[480px]:ml-4">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-4 h-4 text-white dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" ref={ref} id="artworkSearch" className="bg-blue-500 border-2 border-blue-500 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-1.5  text-white placeholder-white dark:placeholder-white dark:text-white focus:ring-blue-500 focus:bg-blue-500 hover:bg-blue-500 dark:bg-blue-500 dark:text-white" placeholder="" onChange={(e) => searchItems(e.target.value)} />
                                {clearserach ? (<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={() => ResetSearch()}>
                                    <svg className="h-5 w-5  text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                                </button>) : ''}
                            </div>
                        </form>
                    </div>
                </div>
                <hr className=" min-[480px]:ml-24 h-px my-2  bg-gray-700 border border-gray-300 dark:bg-gray-700"></hr>
                <div className="filters mb-4 min-[480px]:ml-16">
                    <div className='flex '>
                        <span className="text-sm font-semibold mr-4 ml-6 flex items-center"><IoFilterOutline /> Filter:</span>
                        <select className="text-sm font-semibold bg-transparent mr-2 border-none max-[480px]:ml-4 focus:ring-0" onChange={(e) => StatusClick(e.target.value)}>
                            <option value='All'>All</option>
                            <option value='Read'>Read</option>
                            <option value='Unread'>Unread</option>
                        </select>

                        <span className="text-sm font-semibold mr-4 ml-4 flex items-center cursor-pointer" onClick={() => Refresh()}>< FiRotateCw size={18} /></span>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-0 min-h-screen'>
                    <div className='col-span-1 w-8 ml-5 mt-6'>
                        <a href='/email/send'><HiOutlinePencil size={26} className='ml-2 my-6' /></a>
                        <a href='/emails'><FiInbox size={26} className='ml-2 my-6' /></a>
                        <a href='/email/draft'><FiFileText size={26} className='ml-2 my-6' /></a>
                        <a href='/email/sent'><FiSend size={26} className='ml-2 my-6' /></a>
                        <a href='/email/trash'><FiArchive size={26} className='ml-2 my-6' /></a>
                    </div>
                    <div className="col-span-11 p-4 border-1 border-blue-400 border-dashed mr-6  dark:border-blue-700 h-full top-20 bg-white">

                        <div className="mt-8  mr-2 mb-8">
                            <div className="relative overflow-x-auto">
                                {message ? (<h3 className='text-center font-bold mb-4 '>{message}</h3>) : ''}
                                {authenticate ?
                                    <LoginSocialGoogle {...loginGoogleProps}>
                                        <span className="mr-2 mt-2 mb-10 text-center items-center w-full cursor-pointer">
                                            <p className="inline-block px-4 py-1.5 mb-4 text-white bg-blue-600 rounded-full  text-centerd" aria-current="page">Please Authenticate</p>
                                        </span>

                                    </LoginSocialGoogle>
                                    : ''
                                }
                                {Loading ? (<>
                                    <div className=" items-center h-64 w-full">
                                        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                ) : ''}
                                {renderData && renderData?.map((data1, index) => {
                                    return (
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                            <thead className="text-sm underline text-gray-900  dark:text-gray-400">
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                                    <td className="pl-0 pr-0 w-8 pb-2 "><input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md" name="medium" />
                                                    </td>
                                                    {data1.isUnread ? <td className='w-4'> <img className="h-2 rounded-full w-2 mt-1 ml-2" src="/dot.png" alt="Gmail" /></td> : <td className='w-4'></td>}
                                                    <td className="pr-6  flex pb-2 w-56">
                                                        <p className="ml-6 mt-4 cursor-pointer " onClick={() => ViewRow(data1.id)}>{data1.from.includes('<') ? data1.from.substring(0, data1.from.indexOf('<')).trim() : data1.from}</p>
                                                    </td>
                                                    <td className="px-6 pb-2 message">
                                                        <p className="ml-6 mt-4 text-sm font-bold cursor-pointer" onClick={() => ViewRow(data1.id)}>
                                                            {data1.subject}
                                                            <span className="font-normal text-gray-400">
                                                                {/* {htmlToReactParser.parse(data1.messageBody)} */}
                                                            </span>
                                                        </p>
                                                    </td>

                                                    <td className="px-4 pb-2 time" >
                                                        <span className='font-bold'>{data1.formattedTime}   {data1.formattedDate}</span>
                                                    </td>

                                                </tr>




                                            </tbody>
                                        </table>
                                    );
                                })

                                }

                                {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                    <thead className="text-sm underline text-gray-900  dark:text-gray-400">
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2" >
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>
                                        <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                            <td className="pl-0 pr-0 w-8 pb-2">
                                                <input type="checkbox" className="ml-6 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white font-bold  text-md focus:ring-0" name="medium" />
                                            </td>
                                            <td className="pr-6  flex pb-2">
                                                <p className="ml-6 mt-4 ">Thumbtack</p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <p className="ml-6 mt-4 text-sm font-bold">Did you hire a pro for your illustrating project? <span className='font-normal text-gray-400'>illustrating Whats's the status of...</span></p>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='flex items-center mt-3'><span className='mr-2 fill-blue-500'><FaLock className='fill-blue-500' /></span>PRIVATE</span>
                                            </td>
                                            <td className="px-6 pb-2">
                                                <span className='font-bold'>8:57PM</span>
                                            </td>

                                        </tr>



                                    </tbody>
                                </table> */}
                                {/* <hr className="min-[480px]:ml-8 h-px my-4 ml-16 bg-gray-700 border border-gray-300 dark:bg-gray-700"></hr>
                                <span className='flex justify-between'>
                                    <span className='flex items-center ml-8 '><span><FaAngleLeft /></span><span className='ml-2 font-bold'>Newer</span></span>
                                    <span className='ml-8 font-bold mr-2'>50-95 of 1,734</span>
                                    <span className='flex items-center'><span className='ml-8 font-bold mr-2'>Older</span><span><FaAngleRight /></span></span>
                                </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
