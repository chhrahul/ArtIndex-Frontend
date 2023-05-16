import React from 'react'
import { IoFilterOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { AxiosInstance } from '../utils';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Contacts() {
    const [getResult, setResult] = React.useState([]);
    const [apidataresult, setapidataresult] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('');
    const [filteredResults, setFilteredResults] = React.useState([]);
    const [NameArrow, setNameArrow] = React.useState(true);
    const [companyArrow, setcompanyArrow] = React.useState(true);
    const [Titlearrow, setTitlearrow] = React.useState(true);
    const [clearserach, setclearserach] = React.useState(false);
    const [Loading, setloader] = React.useState(true);
    const APIData = getResult
    const navigate = useNavigate();
    const searchItems = (searchValue) => {
        setclearserach(true)
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }
    const NameClick = () => {
        const strAscendingName = [...APIData].sort((a, b) =>
            a.FirstName > b.FirstName ? 1 : -1,
        );
        setResult(strAscendingName)
        setNameArrow(false)
        if (NameArrow === false) {
            setNameArrow(true)
            const strDescendingName = [...APIData].sort((a, b) =>
                a.FirstName > b.FirstName ? -1 : 1,
            );
            setResult(strDescendingName)
        }
    }
    const CompanyClick = () => {

        const strAscendingcmpny = [...APIData].sort((a, b) =>
            a.Company > b.Company ? 1 : -1,
        );
        setResult(strAscendingcmpny)
        setcompanyArrow(false)
        if (companyArrow === false) {
            setcompanyArrow(true)
            const strDescendingName = [...APIData].sort((a, b) =>
                a.Company > b.Company ? -1 : 1,
            );
            setResult(strDescendingName)
        }
    }
    const TitleClick = () => {
        const strAscendingTitle = [...APIData].sort((a, b) =>
            a.Title > b.Title ? 1 : -1,
        );
        setResult(strAscendingTitle)
        setTitlearrow(false)

        if (Titlearrow === false) {
            setTitlearrow(true)
            const strDescendingName = [...APIData].sort((a, b) =>
                a.Title > b.Title ? -1 : 1,
            );
            setResult(strDescendingName)
        }
    }

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
        setapidataresult(getResult)
    }, []);

    const ref = React.useRef(null);
    const ResetSearch = () => {
        setFilteredResults(apidataresult)
        ref.current.value = '';
        setclearserach(false)
    }

    const EditRow = async (id) => {
        const EditData = getResult.find(apidata => {
            return apidata._id === id
        })
        navigate("/contact/edit", { state: EditData });
    }

    return (
        <>


            <div className="min-[480px]:pt-10 sm:ml-48 min-[480px]:top-10 bg-gray-200 h-full" >
                <div className="min-[480px]:grid grid-cols-6">
                    <div className='min-[480px]:flex col-span-5 ...'>
                        <h2 className="dark:text-black text-3xl  mb-4 px-6" >Contacts </h2>
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
                    <div className='col-span-1 ...'>
                        <div className="relative w-full mt-2  max-[480px]:ml-4">
                            <a href="/contact/create">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-blue-500 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                </div>
                                <input type="text" id="voice" className="cursor-pointer w-32 bg-transparent border-2 border-blue-500 text-black text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block  pl-8 p-1  placeholder-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="New Contact" readOnly />
                                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-24">
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="min-[480px]:ml-5 h-px my-2 bg-gray-700 border border-gray-300 dark:bg-gray-700"></hr>
                <div className="filters mb-4">
                    <div className='min-[480px]:flex '>
                        <input type="text" id="voice" className="ml-8 w-36 placeholder-gray-400 bg-transparent border-2 border-gray-300 text-gary text-sm rounded-full focus:ring-gary-400 focus:border-gray-400 block  pl-7 pr-7 p-1  placeholder-text-gray dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Group Email" readOnly />
                        <span className="text-sm font-semibold mr-4 ml-6 flex items-center mt-1"><IoFilterOutline className='mr-2' /> Filter:</span>       
                        <button className="text-sm font-semibold bg-transparent mr-6 border-none flex mt-2" onClick={() => NameClick()}> Name<span className='mt-1 ml-1'>{NameArrow ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}</span></button>
                        <button className="text-sm font-semibold bg-transparent mr-6 border-none flex mt-2" onClick={() => CompanyClick()}> Company<span className='mt-1 ml-1'>{companyArrow ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}</span></button>
                        <button className="text-sm font-semibold bg-transparent mr-6 border-none flex mt-2" onClick={() => TitleClick()}> Title<span className='mt-1 ml-1'>{Titlearrow ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}</span></button>
                    </div>
                </div>


                <div className="p-4 border-1 border-blue-400 border-dashed mx-6 rounded-lg dark:border-blue-700 h-full top-20 bg-white">
                    <div className="mt-8 ml-2 mr-2 mb-8">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                                <thead className="text-sm underline text-gray-900  dark:text-gray-400">
                                    <tr>
                                        <th></th>
                                        <th scope="col" className="px-2 py-3 ">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Phone Number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Company
                                        </th>
                                        <th scope="col" className="px-6 py-3">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        filteredResults.length > 0 ? (
                                            filteredResults && filteredResults.map((data, index) => {
                                                return (
                                                    <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                                        <td className="pl-0 pr-0 w-10 py-4"><input type="checkbox" className="focus:ring-0 ml-10 mr-10 outline-none text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 focus:bg-blue-500 focus:text-blue-500 bg-white text-md" name="medium" />
                                                        </td>
                                                        <td className="pr-6 py-4 flex">
                                                            <img className="h-12 rounded-full w-12" src={data.ProfileImage ? data.ProfileImage : '/profile.png'} alt="Girl in a jacket" />
                                                            <p className="ml-6 mt-4 text-base  font-bold text-black">{data.FirstName} {data.MiddleName} {data.LastName}</p>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.Email}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.PhoneNumber}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.Title}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.Company}
                                                        </td>
                                                        <td><span className='cursor-pointer' onClick={() => EditRow(data._id)}> <FiEdit2 /> </span></td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            getResult && getResult.map((data1, index) => {
                                                return (
                                                    <tr className="bg-white dark:bg-gray-800 text-gray-700">
                                                        <td className="pl-0 pr-0 w-10 py-4"><input type="checkbox" className="focus:ring-0 ml-10 mr-10 outline-none text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 focus:bg-blue-500 focus:text-blue-500 bg-white text-md" name="medium" />
                                                        </td>
                                                        <td className="pr-6 py-4 flex">

                                                        <img className="h-12 rounded-full w-12" src={data1.ProfileImage ? data1.ProfileImage : '/profile.png'} alt="Girl in a jacket" />
                                                            <p className="ml-6 mt-4 text-base  font-bold text-black">{data1.FirstName} {data1.MiddleName} {data1.LastName}</p>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data1.Email}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data1.PhoneNumber}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data1.Title}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data1.Company}
                                                        </td>
                                                        <td><span className='cursor-pointer' onClick={() => EditRow(data1._id)}> <FiEdit2 /> </span></td>
                                                    </tr>
                                                );
                                            })
                                        )
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>


        </>
    )
}
