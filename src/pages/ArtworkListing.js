import React from 'react'
import { FaThList } from "react-icons/fa";
import { FaThLarge } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { MdViewAgenda } from "react-icons/md";
import { AiOutlineEllipsis } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { AxiosInstance } from '../utils'
export default function ArtworkListing() {
    const [getResult, setResult] = React.useState([]);
    const [searchInput, setSearchInput] = React.useState('');
    const [renderData, setrenderData] = React.useState([]);
    const [filteredResults, setFilteredResults] = React.useState([]);
    const [showTitleArrow, setTitleArrow] = React.useState(true);
    const [showPriceArrow, setPriceArrow] = React.useState(true);
    const [Loading, setloader] = React.useState(true);
    const [clearserach, setclearserach] = React.useState(false);
    const APIData = getResult
    // const fetchInfo = () => {
    //     return axios.get('http://127.0.0.1:3000/api/v1/get-artwork').then((res) => {
    //         setResult(res.data.data)
    //         setloader(false)
    //     }
    //     );
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

                setResult(result.data.data)
                setloader(false)
            }

        }
        getData()

    };

    React.useEffect(() => {
        fetchInfo();
    }, []);
    const searchItems = (searchValue) => {
        setclearserach(true)
        setSearchInput(searchValue)
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


    const TitleClick = () => {

        const strAscendingTittle = [...APIData].sort((a, b) =>
            a.Title > b.Title ? 1 : -1,
        );

        setrenderData(strAscendingTittle)
        setTitleArrow(false)

        if (showTitleArrow === false) {

            setTitleArrow(true)

            const strDescendingTitle = [...APIData].sort((a, b) =>
                a.Title > b.Title ? -1 : 1,
            );
            setrenderData(strDescendingTitle)

        }

    }
    const PriceClick = () => {
        const PriceAscending = [...APIData].sort((a, b) => a.salery - b.salery);
        setrenderData(PriceAscending)
        setPriceArrow(false)

        if (showPriceArrow === false) {

            setPriceArrow(true)

            const strDescendingPrice = [...APIData].sort((a, b) => b.salery - a.salery);

            setrenderData(strDescendingPrice)

        }


    }
    const StatusClick = (searchValue) => {

        const SearchValue = searchValue
        const filteredData = getResult.filter(apidata => {
            return apidata.availability === SearchValue
        })

        setrenderData(filteredData)

        if (SearchValue === 'status') {
            setrenderData(getResult)
        }
    }

    const ref = React.useRef(null);
    const ResetSearch = () => {
        setrenderData(getResult)
        ref.current.value = '';
        setclearserach(false)

    }
    React.useEffect(() => {

        setrenderData(getResult)
    }, [getResult])



    return (
        <>
            <div className="min-[480px]:pt-10 sm:ml-48 min-[480px]:top-20 bg-gray-200 h-full" >
                <div className="grid grid-cols-6">
                    <div className='flex col-span-5 ...'>
                        <h2 className="dark:text-black text-4xl  mt-2 px-6 " >Pieces</h2>
                        <a href="/artwork" className='mt-7 mr-3'><MdViewAgenda size={19} /></a>
                        <a href="/artwork/grid" className='mt-7 mr-3'><FaThLarge /></a>
                        <a href="/artwork/listing" className='mt-7 mr-3'><FaThList /></a>
                        <form className="flex items-center">
                            <label htmlFor="voice-search" className="sr-only">Search</label>
                            <div className="relative w-full ml-8 mt-4">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-4 h-4 text-white dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" ref={ref} id="artworkSearch" className=" bg-blue-500 border border-gray-300 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-1.5  placeholder-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Yellow Bat" onChange={(e) => searchItems(e.target.value)} />
                                {clearserach ? (<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={() => ResetSearch()}>
                                    <svg className="h-5 w-5  text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                                </button>) : ''}
                            </div>

                        </form>
                    </div>
                    <div className='col-span-1 ...'>
                        <div className="relative w-full mt-4">

                            <a href="/artwork/create" className='cursor-pointer'>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-blue-500 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                </div>
                                <input type="text" id="voice-search" className="w-32 cursor-pointer bg-transparent border-2 border-blue-500 text-black text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-1  placeholder-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="New Piece" readOnly />

                            </a>
                        </div>
                    </div>


                </div>
                <hr className="ml-5 h-px my-3 bg-gray-700 border border-gray-300 dark:bg-gray-700"></hr>
                <div className="filters mb-3">

                    <div className='flex'>
                        <span className="text-sm font-semibold mr-6 ml-6 flex items-center"><IoFilterOutline /> Filter:</span>
                        <button className="text-sm font-semibold bg-transparent mr-6 border-none flex mt-2" onClick={() => TitleClick()}> Title<span className='mt-1 ml-1'>{showTitleArrow ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}</span></button>
                        <button className="text-sm font-semibold bg-transparent mr-3 border-none flex mt-2 text-center" onClick={() => PriceClick()}> Price <span className='mt-1 ml-1'>{showPriceArrow ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}</span></button>

                        <select className="text-sm font-semibold bg-transparent mr-6 border-none focus:ring-0 cursor-pointer" onChange={(e) => StatusClick(e.target.value)} >
                            <option value='status' className="cursor-pointer">Status</option>
                            <option value='avail' className="cursor-pointer">Available</option>
                            <option value='notavail' className="cursor-pointer">Not Available</option>
                        </select>
                    </div>
                </div>

                <div className="p-4 border-1 border-blue-400 border-dashed mx-6 rounded-lg dark:border-blue-700 h-full top-20 bg-white">
                    {Loading ? (<>
                        <div className="relative items-center h-64 w-full">

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

                    {renderData && renderData.map((data, index) => {
                        return (
                            <>
                                <div className="min-[480px]:grid grid-cols-6 gap-6">
                                    <div className="col-span-2 ...">
                                        <div className="mt-5 mb-5 ml-4 flex">
                                            <img className="h-16 rounded-lg w-16" src={data.image[0] ? data.image[0] : '/rose.jpg'} alt="Girl in a jacket" />
                                            <p className="ml-8 mt-4 text-md font-extrabold   text-black">{data.Title}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 ...">
                                        <div className="mt-8 mb-5">
                                            <a href="/" className=" underline my-2 text-md text-gray-700">{data.acrylicAndOil}</a>

                                        </div>
                                    </div>
                                    <div className="col-span-1 ... flex">
                                        <div className="heading mt-8 ml-16">
                                            <a href="/" className=" underline my-2 text-md text-gray-700">{data.availability == 'avail' ? 'Availabile' : ''}{data.availability == 'notavail' ? 'Not Availabile' : ' '}</a>
                                        </div>

                                    </div>
                                    <div className="col-span-1 ... flex">

                                        <div className="heading mt-8 ml-10">
                                            <a href="/" className=" underline my-2 text-md text-gray-700"> ${data.salery}</a>
                                        </div>

                                    </div>
                                    <div className="col-span-1 ... flex">
                                        <div className="heading mt-7 ml-10">
                                            <span className='cursor-pointer'><AiOutlineEllipsis size={32} /></span>
                                        </div>

                                    </div>
                                </div>

                            </>
                        );
                    })

                    }




                </div>
            </div>
        </>


    )
}
