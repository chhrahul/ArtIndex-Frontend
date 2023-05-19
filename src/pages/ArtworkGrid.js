import React from 'react'

import { FaThList } from "react-icons/fa";
import { FaThLarge } from "react-icons/fa";
import { BiNote } from "react-icons/bi";
import { BiPlusCircle } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { BiWallet } from "react-icons/bi";
import { MdViewAgenda } from "react-icons/md";
import { AxiosInstance } from '../utils'
export default function ArtworkGrid() {

    const [getResult, setResult] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('');
    const [filteredResults, setFilteredResults] = React.useState([]);
    const [Loading, setloader] = React.useState(true);
    const APIData = getResult.data
    
    // const fetchInfo = () => {
    //     return axios.get('http://127.0.0.1:3000/api/v1/get-artwork').then((res) => setResult(res.data));
    // };
    const fetchInfo = () => {
        const userId = localStorage.getItem("userId")
        var data = JSON.stringify({ 'id': userId })
        async function getData() {
            const result = await AxiosInstance(
                {
                    'url': '/get-artwork',
                    'method': 'post',
                    'data': data
                }
            )
            if (result) {
                setResult(result.data)
                setloader(false)
            }
        }
        getData()
    };
    React.useEffect(() => {
        fetchInfo();
    }, []);
    const searchItems = (searchValue) => {
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
    return (
        <>
            <div className="min-[480px]:pt-10 sm:ml-48 min-[480px]:top-20 bg-gray-200 h-full" >
                <div className="min-[480px]:grid grid-cols-6">
                    <div className='min-[480px]:flex col-span-5 ...'>
                        <span className='flex'>
                            <h2 className="dark:text-black text-4xl  mt-2 px-6" >Pieces</h2>
                            <a href="/artwork" className='mt-7 mr-3'><MdViewAgenda size={19} /></a>
                            <a href="/artwork/grid" className='mt-7 mr-3'><FaThLarge /></a>
                            <a href="/artwork/listing" className='mt-7 mr-3'><FaThList /></a>
                        </span>
                        <form className="flex items-center">
                            <label htmlFor="voice-search" className="sr-only">Search</label>
                            <div className="relative w-full ml-8 mt-4">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-4 h-4 text-white dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="voice-search" className=" bg-blue-500 border border-gray-300 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-1.5  placeholder-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Yellow Bat" onChange={(e) => searchItems(e.target.value)} />
                                <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <svg className="h-5 w-5  text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
                <hr className="ml-5 h-px my-4 bg-gray-700 border border-gray-300 dark:bg-gray-700"></hr>
                <div className="filters mb-4">

                    <div className='min-[480px]:flex'>

                        <span className='flex'>
                            <a href='/' className='flex'>
                                <span className="mr-2 ml-6 flex items-center"><BiNote /></span>
                                <p className='text-sm font-semibold mr-6'>New Report</p>
                            </a>
                            <a href='/artwork/create' className="flex">
                                <span className=" mr-2 ml-6 flex items-center"><BiPlusCircle /></span>
                                <p className='text-sm font-semibold mr-6'>New Piece</p>
                            </a>
                        </span>
                        <span className='flex max-[480px]:mt-4'>
                            <a href='/' className='flex'>
                                <span className=" mr-2 ml-6 flex items-center"><BiEdit /></span>
                                <p className='text-sm font-semibold mr-6'>Bulk Action</p>
                            </a>
                            <a href='/' className='flex'>
                                <span className=" mr-2 ml-6 flex items-center"><BiWallet /></span>
                                <p className='text-sm font-semibold mr-6'>Collections</p>
                            </a>
                        </span>

                    </div>
                </div>
                <div className="p-4 min-h-screen border-1 border-blue-400 border-dashed mx-6 rounded-lg dark:border-blue-700 h-full top-20 bg-white">
                    <div className="min-[480px]:grid grid-cols-4 gap-6">
                        {/* {getResult.data && getResult.data.map((data, index) => {
                                return (
                                

                                <div className="max-[1024px]:col-span-2 col-span-1 ...">
                                    <div className="mt-5 mb-5 ml-2 mr-2">
                                        <img className="h-40 rounded-lg w-full" src={data.image[0] ? data.image[0] : '/rose.jpg'} alt="Girl in a jacket" />
                                        <p className='text-md font-extrabold mt-2 ml-2'>{data.Title}</p>

                                    </div>
                                </div>
                                );
                            })} */}
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
                        ) : filteredResults && APIData && filteredResults.length === 0 && APIData.length === 0 ? (
                            <p className="text-md text-center font-bold mt-20">No records exist!!</p>
                        ) : null}

                        {
                            filteredResults.length > 0 ? (
                                filteredResults && filteredResults.map((data1, index) => {
                                    return (
                                        <>
                                            <div className="max-[1024px]:col-span-2 col-span-1 ...">
                                                <div className="mt-5 mb-5 ml-2 mr-2">
                                                    <img className="h-40 rounded-lg w-full" src={data1.image[0] ? data1.image[0] : '/rose.jpg'} alt="Girl in a jacket" />
                                                    <p className='text-md font-extrabold mt-2 ml-2'>{data1.Title}</p>

                                                </div>
                                            </div>

                                        </>
                                    );
                                })
                            ) : (
                                getResult.data && getResult.data.map((data, index) => {
                                    return (
                                        <>
                                            <div className="max-[1024px]:col-span-2 col-span-1 ...">
                                                <div className="mt-5 mb-5 ml-2 mr-2">
                                                    <img className="h-40 rounded-lg w-full" src={data.image[0] ? data.image[0] : '/rose.jpg'} alt="Girl in a jacket" />
                                                    <p className='text-md font-extrabold mt-2 ml-2'>{data.Title}</p>

                                                </div>
                                            </div>

                                        </>
                                    );
                                })
                            )
                        }
                     
                    </div>







                    {/* <div className="min-[480px]:grid grid-cols-4 gap-6">

                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                    
                    </div>
                    <div className="min-[480px]:grid grid-cols-4 gap-6">

                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                    
                    </div>
                    <div className="min-[480px]:grid grid-cols-4 gap-6">

                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className="max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                        <div className=" max-[1024px]:col-span-2 col-span-1 ...">
                            <div className="mt-5 mb-5 ml-2 mr-2">
                                <img className="h-40 rounded-lg w-full" src="/rose.jpg" alt="Girl in a jacket" />
                                <p className='text-md font-extrabold mt-2 ml-2'>Bat on Hearts</p>

                            </div>
                        </div>
                    
                    </div> */}

                </div>
            </div>


        </>
    )
}
