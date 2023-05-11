import * as React from 'react'

import { Modal, Button } from 'flowbite-react';
import { FaThList } from "react-icons/fa";
import { FaThLarge } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5";
import { MdViewAgenda } from "react-icons/md";
import GallerySlider from '../components/GallerySlider';
import { FiEdit2 } from "react-icons/fi";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from '../utils'


export default function Artwork() {

    const [showModal, setShowModal] = React.useState(false);
    const [showModal1, setShowModal1] = React.useState(false);

    const [getResult, setResult] = React.useState([]);
    const [DeleteID, setDeleteID] = React.useState();
    const [renderData, setrenderData] = React.useState([]);
    const [modaldata, setmodaldata] = React.useState();
    const [searchInput, setSearchInput] = React.useState('');
    const [showTitleArrow, setTitleArrow] = React.useState(true);
    const [showPriceArrow, setPriceArrow] = React.useState(true);
    const [Loading, setloader] = React.useState(true);
    const [clearserach, setclearserach] = React.useState(false);
    let APIData = getResult

    const navigate = useNavigate();
    const handleOnClick = (row) => {

        setmodaldata(row)

        setShowModal(true)
    }


    const showDeleteConfirm = (id) => {
        setDeleteID(id)
        setShowModal1(true)

    }
    const CloseDeleteAlert = () => {
        setDeleteID(' ')
        setShowModal1(false)

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
        // APIData.availability
        const SearchValue = searchValue
        const filteredData = getResult.filter(apidata => {
            return apidata.availability === SearchValue
        })
        if (filteredData.length > 0) {
            setrenderData(filteredData)

        }
        if (SearchValue === 'status') {
            setrenderData(getResult)
        }
    }

    const handleOnClose = () => {
        setShowModal(false)
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


    const fetchInfo = () => {
        // return axios.get('http://127.0.0.1:3000/api/v1/get-artwork').then((res) => {
        //     setResult(res.data.data)
        //     setloader(false)
        // }
        // );
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
    }, [])

    React.useEffect(() => {

        setrenderData(getResult)
    }, [getResult])


    const deleteRow = async () => {

        var data = JSON.stringify({ 'id': DeleteID })
        const result = await AxiosInstance({
            'url': '/delete-row',
            'method': 'post',
            'data': data
        })
        const { status } = result.data
        if (status) {
            setShowModal1(false)
            fetchInfo();
        } else {

            setShowModal1(false)
            fetchInfo();
        }
    }
    const EditRow = async (id) => {

        const EditData = getResult.find(apidata => {
            return apidata._id === id
        })
        navigate("/artwork/edit", { state: EditData });
        //console.log(EditData)

    }

    return (

        <>
            <div className="pt-10 sm:ml-48 top-20 bg-gray-200 h-full" >
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
                                <input type="text" ref={ref} id="artworkSearch" className="bg-blue-500 border-2 border-blue-500 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-1.5  text-white placeholder-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:bg-blue-500 hover:bg-blue-500 dark:bg-blue-500 dark:text-white" placeholder="" onChange={(e) => searchItems(e.target.value)} />
                                {clearserach ? (<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={() => ResetSearch()}>
                                    <svg className="h-5 w-5  text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                                </button>) : ''}

                            </div>

                        </form>
                    </div>
                    <div className='col-span-1 ...'>
                        <div className="relative w-full mt-4">
                            <a href="/artwork/create">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-blue-500 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                </div>
                                <input type="text" id="voice-search" className="cursor-pointer w-32 bg-transparent border-2 border-blue-500 text-black text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-1  placeholder-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="New Piece" readOnly />
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
                        {/* <button className="text-sm font-semibold bg-transparent mr-6 border-none flex mt-2 text-center" onClick={() => LocationClick()}> Location <span className='mt-1 ml-1'><IoMdArrowDropdown/></span></button> */}
                        <select className="text-sm font-semibold bg-transparent mr-6 border-none cursor-pointer focus:ring-0" onChange={(e) => StatusClick(e.target.value)} >
                            <option value='status'>Status</option>
                            <option value='avail'>Available</option>
                            <option value='notavail'>Not Available</option>
                        </select>

                        {/* <select className="text-sm font-semibold bg-transparent mr-6 border-none" >
                            <option on>Date</option>                            
                        </select> */}


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
                                <div className="grid grid-cols-6 gap-6 relative cursor-pointer" >
                                    <div className="col-span-1 ..." onClick={() => handleOnClick(data)}>
                                        <div className="mt-5 mb-5 ml-4">
                                            <img className="h-40 rounded-lg w-64" src={data.image[0] ? data.image[0] : '/rose.jpg'} alt="Girl in a jacket" />

                                        </div>
                                    </div>
                                    <div className="col-span-2 ...">
                                        <div className="mt-5 mb-5">
                                            <h2 className="text-2xl font-extrabold dark:text-white">{data.Title}</h2>
                                            <p className="my-2 text-md text-gray-700 mb-16">{data.Description}</p>
                                            <a href="/" className="underline my-2 text-md text-gray-700">{data.acrylicAndOil}</a> | <a href="/" className="underline my-2 text-md text-gray-700">{data.availability === 'avail' ? 'Availabile' : ''}{data.availability === 'notavail' ? 'Not Availabile' : ' '}</a> | <a href="/" className="underline my-2 text-md text-gray-700">${data.salery}</a>
                                        </div>
                                    </div>
                                    <div className="col-span-1 ... flex types">
                                        <div className="heading">
                                            <p className="mt-12 text-md font-extrabold   text-black">Type</p>
                                            <p className="mt-2 text-md font-extrabold text-black">Size({data.dimensionType})</p>
                                            <p className="mt-2 text-md font-extrabold text-black">Subject</p>
                                            <p className="mt-2 text-md font-extrabold text-black">Location</p>
                                        </div>
                                        <div className="data">
                                            <p className="mt-14 text-sm  text-black ml-3">{data.Type}</p>
                                            <p className="mt-3 text-sm  text-black ml-3">{data.dimensionHeight}h x {data.dimensionWidth}w</p>
                                            <p className="mt-2 text-sm  text-black ml-3">{data.natureExpression}</p>
                                            <p className="mt-2 text-sm  text-black ml-3">{data.Inventory}</p>

                                        </div>
                                    </div>

                                    <div className="ml-16  col-span-2 ... flex">
                                        <ul className="mt-10 mr-5 flex absolute bottom-0  flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-14">
                                            {data.tags && data.tags.map((tag, index) => {
                                                return (
                                                    <li className="mr-2 mt-2">
                                                        <a href="/" className="inline-block px-4 py-1.5 text-white bg-blue-600 rounded-full  " aria-current="page">{tag.text}</a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        <div className="mt-5 absolute right-0 top-0">

                                            <button className="cursor-pointer" onClick={() => EditRow(data._id)}>
                                                <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button className="cursor-pointer" onClick={() => showDeleteConfirm(data._id)}>
                                                <svg className="mt-4 h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </>
                        );
                    })

                    }


                    <Modal show={showModal1} size="xl" onClose={CloseDeleteAlert}>
                        <Modal.Header>
                            Delete Confirmation
                        </Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <h2>Are you sure you wants to delete ?</h2>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button
                                color="gray"
                                onClick={CloseDeleteAlert}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="red"
                                onClick={deleteRow}
                            >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>



                    {modaldata ? (
                        <>
                            <Modal show={showModal} size="4xl" onClose={handleOnClose}>
                                <Modal.Body>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-4 ">
                                            <div className="col-span-2 ...">
                                                <div className="mt-7 mb-5 ml-2">
                                                    <GallerySlider image={modaldata.image} />
                                                </div>
                                            </div>
                                            <div className="col-span-2 ...">
                                                <div className="mt-5 mb-5 ml-8">
                                                    <span className='flex'><p className='text-lg font-extrabold ml-2'>{modaldata.Title}</p>
                                                        <span className='top-5 right-12 absolute cursor-pointer' onClick={() => EditRow(modaldata._id)}> <FiEdit2 /></span>
                                                        <span className='top-4 right-4 absolute cursor-pointer' color="gray" onClick={handleOnClose}>X</span>
                                                    </span>
                                                    <p className='text-sm ml-2'>{modaldata.Description}</p>
                                                    <div className="mt-6 mb-4">
                                                        <a href="/" className="underline text-sm ml-2 mt-8">{modaldata.acrylicAndOil}</a> | <a href="/" className="underline mt-8 text-sm">{modaldata.availability}</a> | <a href="/" className="underline mt-8 text-sm ">${modaldata.salery}</a>
                                                    </div>
                                                    <div className="ml-2 flex">
                                                        <div className="heading">
                                                            <p className="mt-2 text-sm font-extrabold text-black">Type</p>
                                                            <p className="mt-2 text-sm font-extrabold text-black">Size(inches)</p>
                                                            <p className="mt-2 text-sm font-extrabold text-black">Subject</p>
                                                            <p className="mt-2 text-sm font-extrabold text-black">Location</p>
                                                        </div>
                                                        <div className="data">
                                                            <p className="mt-2 text-sm  ml-3">{modaldata.Type}</p>
                                                            <p className="mt-2 text-sm  ml-3">{modaldata.dimensionWidth}w x {modaldata.dimensionHeight}h</p>
                                                            <p className="mt-2 text-sm  ml-3">{modaldata.natureExpression}</p>
                                                            <p className="text-sm bg-transparent border-none" >{modaldata.Inventory}</p>
                                                        </div>
                                                    </div>
                                                    <ul className="mt-4 ml-2 flex flex-wrap text-sm text-center text-gray-500 dark:text-gray-400 mb-14">
                                                        {modaldata.tags && modaldata.tags.map((tag, index) => {
                                                            return (
                                                                <li className="mr-2 mt-2">
                                                                    <a href="/" className="inline-block px-4 py-1.5 text-white bg-blue-600 rounded-full  " aria-current="page">{tag.text}</a>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </>) :
                        ''}



                </div>
            </div>

        </>
    )
}
