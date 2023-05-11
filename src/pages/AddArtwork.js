import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../utils'
import { useForm } from "react-hook-form";
import MyDropzone from '../components/DropZone.js'
import TagInput from '../components/TagInput';

export default function AddArtwork() {
    const [files, setFiles] = React.useState([]);
    const [tags, setTags] = React.useState([]);
  
    const [Loading, setloader] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
 
    const onSubmit = data => {
        data.tags = tags;
        data.image = files;
        data.userId = localStorage.getItem("userId")

        async function saveData() {

            const result = await AxiosInstance({
                'url': '/add-artwork',
                'method': 'post',
                'data': data
            })
            setDisabled(true);
            if (result.status === 200) {
                //console.log(result.status)
                
                setloader(true)
                setTimeout(() => {
                    navigate("/artwork");
                }, 3000);

            }
        }
        saveData()
    };

    const handleImages = {
        files,
        setFiles,
        tags,
        setTags
    }
    const handleTags = {
        tags,
        setTags,
    }
    
    const Cancel = () => {
        navigate("/artwork");
    }
    return (

        <>

            <div className="max-[612px]:pt-8 pt-20 sm:ml-48 min-[612px]:top-20 bg-gray-200 h-full " >
                {/* {success} */}

                <h2 className="dark:text-black text-3xl  mb-4 px-6" >Add Artwork</h2>
                <div className="p-4 border-1 border-blue-400 border-dashed mx-6 rounded-lg dark:border-blue-700 h-full top-20 bg-white">
                    <h2 className="text-sm font-bold text-black mb-4">Upload Image</h2>


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
                    <div className={Loading ? 'w-full relative opacity-20' : 'w-full relative'}>
                        <form onSubmit={handleSubmit(onSubmit)} id="artWorkForm">

                            <MyDropzone {...handleImages} multiple={true} />
                            <div className='min-[480px]:grid grid-cols-2 gap-12'>
                                <div className=" ">

                                    <div className="w-full mt-12 bg-white dark:bg-white dark:border-blue-600">

                                        <input  {...register("Title", { required: true })} type="text" className="flex font-bold items-center justify-between border-2 italic border-blue-200 text-lg rounded-b-none divide-blue-400 sm:divide-x dark:divide-blue-400 w-full text-black bg-white focus:outline-0  rounded-lg text-md px-4 py-2.5  dark:bg-blue-600" defaultValue="" placeholder='Add Title' />

                                        <div className="px-4 py-2 border-l-2 border-r-2 border-b-2 border-blue-200 bg-white rounded-b-lg dark:bg-gray-800">
                                            <textarea {...register("Description", { required: true })} id="editor" rows="4" className="border-none block italic w-full px-0 focus:outline-0 text-md text-gray-800 bg-white focus:ring-0 dark:text-white dark:placeholder-gray-700" placeholder="Add Description" ></textarea>

                                        </div>
                                        {errors.Title && <span className='text-red-500'>The Title field is required </span>}
                                        {errors.Description && <span className='text-red-500'> The Description field is required</span>}

                                    </div>

                                    <h2 className="mb-2 text-sm font-bold text-gray-700 dark:text-white pt-5 ml-5">Type</h2>

                                    <select defaultValue="" {...register("Type", {
                                        required: true
                                    })}
                                        className="w-full text-black  border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2.5  dark:bg-blue-600 customSelect" >
                                        <option className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"  >Painting</option>
                                    </select>
                                    {errors.Type && <span className='text-red-500'>This field is required</span>}
                                    <input {...register("acrylicAndOil", {
                                        required: true
                                    })}
                                        type="text" className="w-full text-black  border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2.5  dark:bg-blue-600" placeholder="Acrylic and Oil on Canvas" />
                                    {errors.acrylicAndOil && <span className='text-red-500'>This field is required</span>}

                                    <input {...register("natureExpression", {
                                        required: true
                                    })}
                                        type="text" className="w-full text-black  border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2.5  dark:bg-blue-600" placeholder="Nature, Expression" />
                                    {errors.natureExpression && <span className='text-red-500'>This filed is required</span>}

                                    <input type="text" {...register("Inventory", {
                                        required: true
                                    })} className="w-full text-black  border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2.5  dark:bg-blue-600" placeholder="Your Inventory " />
                                    {errors.Inventory && <span className='text-red-500'>This field is required</span>}

                                    <div className="min-[480px]:grid grid-cols-2 gap-12 mt-8">
                                        <div className="">
                                            <p className="text-sm font-bold text-gray-700 ml-5">Creation Date</p>
                                            <div className="inline-flex mr-4 mt-4 mb-4">
                                                <input type="number" min="1" max="12" className="bg-white font-bold border-l-2 border-t-2 border-b-2 hover:bg-white border-blue-200  text-black py-2 px-4  rounded-l-lg w-12" placeholder='M' {...register("creationMonth")} />

                                                <input type="number" className="bg-white font-bold border-2 hover:bg-white border-blue-200 text-black py-2 px-4 w-12" placeholder='D' {...register("creationDay")} />

                                                <input type="number" className="bg-white font-bold border-r-2 border-t-2 border-b-2 border-blue-200 hover:bg-white text-black  py-2 px-4  rounded-r-lg w-14" placeholder='YY' {...register("creationYear")} />

                                            </div>
                                            <p className="text-sm font-bold text-gray-700 ml-5">Signature</p>
                                            <input type="checkbox" {...register("signature")} className="ml-10 mr-10 text-blue-500 max-[768px]:ml-6 max-[768px]:mb-2 border-2 border-blue-500 mt-3 bg-white  focus:ring-0 font-bold  text-md   dark:bg-blue-600" />
                                        </div>
                                        <div className="">
                                            <p className="text-sm font-bold text-gray-700 ml-4 min-[480px]:mt-2">Visibility</p>

                                            <select defaultValue="" {...register("visiblity", { required: true })} className="w-full text-black  border-2 border-blue-200 mt-3 bg-white hover:bg-white  focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <option value="private">Private</option>
                                                <option value="public">Public</option>
                                            </select>

                                            {errors.Private && <span className='text-red-500'>This field is required</span>}
                                        </div>
                                    </div>


                                </div>
                                <div className="">

                                    <p className="text-sm font-bold text-gray-700 ml-5 mt-8">Dimensions</p>

                                    <div className="inline-flex mr-4">
                                        <input type="text" className="bg-white border-l-2 border-t-2 border-b-2 hover:bg-white border-blue-200  text-gray-800 font-bold py-2 px-4 rounded-l-lg w-14" placeholder='69' {...register("dimensionHeight")} />

                                        <input type="text" className="bg-white border-2 hover:bg-white border-blue-200 text-gray-800 font-bold py-2 px-4 w-14" placeholder='90' {...register("dimensionWidth")} />

                                        <input type="text" className="bg-white border-r-2 border-t-2 border-b-2 border-blue-200 hover:bg-white text-gray-800 font-bold py-2 px-4  rounded-r-lg w-14" placeholder='D' readonly />

                                    </div>

                                    <select defaultValue="" {...register("dimensionType")} className="text-black  border-2 border-blue-200 mt-3 bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <option >Inches</option>
                                        <option >Square</option>
                                        <option >Feets</option>
                                    </select>
                                    {errors.dimensionType && <span className='text-red-500'>This field is required</span>}
                                    <p className="text-sm font-bold text-blue-500 ml-2 mt-8 mb-6">+ Add Framed Size</p>
                                    <p className="text-sm font-bold text-gray-700 mt-6 ml-5">Status</p>
                                    <select defaultValue="" {...register("availability")} className=" text-black  border-2 border-blue-200 mt-3 bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md pl-2 py-2.5 pr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <option value="avail">Available</option>
                                        <option value="notavail">Not available</option>

                                    </select>

                                    <input type="number" {...register("salery")} className="max-[768px]:ml-0 max-[1024px]:ml-1 ml-6 mr-6 text-black  border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2.5  dark:bg-blue-600 w-36" placeholder="8,500.00" />
                                    <select defaultValue="" {...register("IncomeType", {
                                        required: true
                                    })} className=" text-black  border-2 border-blue-200 mt-3  pr-5 bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <option>USD</option>
                                        <option>CAD</option>
                                        <option>INR</option>
                                    </select>
                                    {errors.IncomeType && <span className='text-red-500'>This field is required</span>}


                                    <div className="mt-6 w-full mb-4 border-2 border-blue-200  rounded-xl bg-white dark:bg-white dark:border-blue-600">
                                        <TagInput {...handleTags} className="flex items-center justify-between border-b-2 border-t-none italic border-blue-200 text-lg rounded-b-none divide-blue-400 sm:divide-x dark:divide-blue-400 w-full text-black bg-white focus:outline-0  rounded-lg text-md px-4 py-2.5  dark:bg-blue-600 w-100 mt-2 inline-block px-4 py-2 text-white bg-blue-600" />

                                        <div className="px-4 py-2 bg-white rounded-xl dark:bg-gray-800">

                                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-14">


                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-gray-700 mt-6 ml-5 ">Editions</p>
                                    <input type="checkbox" {...register("editions")} className="max-[768px]:mb-6 min-[480px]:max-[992px]:mt-0  ml-10 mr-10 text-blue-500  border-2 border-blue-500 mt-3 bg-white focus:ring-0 focus:outline-none focus:ring-blue-500 font-bold text-md   dark:bg-blue-600" />
                                    <input {...register("editionFrom")} className=" text-black  border-2 border-blue-200 mt-3 bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold w-14 rounded-lg text-md py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-6 min-[480px]:mr-1 max-[992px]:mr-1 " type="text" placeholder="13"></input>
                                    /
                                    <input {...register("editionTo")} className=" text-black  border-2 border-blue-200 mt-3 bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold w-14 rounded-lg text-md py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-6 min-[480px]:ml-1 max-[992px]:ml-1" type="text" placeholder="50"></input>
                                </div>
                            </div>
                        </form>
                        <div className="row form-action-row">
                            <div className="col float-right ml-5"><button disabled={disabled} className='btn btn-success btn-form btn-form-submit' form="artWorkForm" onClick={() => {

                            }}>Submit</button></div>
                            <div className="col float-right "><button className='btn btn-success btn-form btn-form-cancel' onClick={Cancel}>Cancel</button></div>

                        </div>

                    </div>



                </div>
            </div>

        </>
    )
}
