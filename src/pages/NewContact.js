import * as React from 'react'
import { IoMdMail } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { IoIosHome } from "react-icons/io";
import { IoIosLink } from "react-icons/io";
import { Modal } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import TagInput from '../components/TagInput';
import { AxiosInstance } from '../utils';

export default function NewContact() {
    const [showModal, setShowModal] = React.useState(false);
    const [Loading, setloader] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [files, setfiles] = React.useState();
    const [tags, setTags] = React.useState([]);
    const [tagLabel, setTagLabel] = React.useState([]);

    const handleOnClick = () => {
        setShowModal(true)
    }
    const handleOnClose = () => {
        setShowModal(false)
    }
    const handleTags = {
        tags,
        setTags,
        tagLabel,
        setTagLabel
    }
    function handleChange(e) {
        let response = ""
        let filesItem = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(filesItem[0]);
        fileReader.onload = (event) => {
            response = fileReader.result
            setfiles(response)
        }
    }
    function handleTagChange(e) {
        setTagLabel(e.target.value);
        setShowModal(false)
    }
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "emails"
    });
    const { fields: fieldsForPhone, append: appendForPhone, remove: removeForPhone } = useFieldArray({
        control,
        name: "phoneNumber"
    });
    const { fields: fieldsForWebsite, append: appendForWebsite, remove: removeForWebsite } = useFieldArray({
        control,
        name: "websites"
    });
    const { fields: fieldsForAddress, append: appendForAddress, remove: removeForAddress } = useFieldArray({
        control,
        name: "addresses"
    });
    const navigate = useNavigate();
    const onSubmit = data => {
        setloader(true)
        data.Tags = tags;
        data.ProfileImage = files;
        data.userId = localStorage.getItem("userId")
        async function getData() {
            const result = await AxiosInstance(
                {
                    'url': '/add-contacts',
                    'method': 'post',
                    'data': data
                }
            )
            setDisabled(true);
            if (result.status === 200) {
                setTimeout(() => {
                    navigate("/contact");
                    localStorage.setItem('contactMessage', "New Contact added successfully !!");
                }, 3000);
            }
        }
        getData()
    };
    const handleImages = {
        files,
        setfiles,
        tags,
        setTags
    }
    return (
        <>
            <div className="min-[480px]:pt-10 sm:ml-48 min-[480px]:top-10 bg-gray-200 h-full" >
                <div className="min-[480px]:grid grid-cols-6">
                    <div className='min-[480px]:flex col-span-5 ...'>
                        <h2 className="dark:text-black text-3xl  mb-4 px-6" >New Contact</h2>
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
                    </div>
                </div>
                <div className="p-4 border-1 border-blue-400 border-dashed mx-6 rounded-lg dark:border-blue-700 h-full top-20 bg-white">
                    <div className={Loading ? 'mt-16 ml-16 mr-16 mb-16 opacity-20' : 'mt-16 ml-16 mr-16 mb-16'}>
                        <div className="">
                            <div className="inline-flex">
                                <form onSubmit={handleSubmit(onSubmit)} className=' inline-flex'>
                                    <div className="w-28">
                                        <img className="w-28 h-28 rounded-full" {...handleImages} src={files ? files : '/profile.png'} alt="Profile" />
                                        <input type="file" onChange={handleChange} className="w-28 mt-4" />
                                    </div>
                                    <div className=''>
                                        <div className="ml-12  inline-flex  mt-4 mb-4 w-full">
                                            <input type="text" className="bg-white leading-5 border-l-2 border-t-2 border-b-2 hover:bg-white border-blue-200  text-gray-600 py-2.5 px-8  pr-16 rounded-l-lg" placeholder='First Name' name="username"
                                                id="validationCustom01" {...register("FirstName", { required: true })} />
                                            <input type="text"  {...register("MiddleName")} className="bg-white leading-5 border-2 hover:bg-white border-blue-200 text-gray-600 py-2.5 px-7 " placeholder='Middle Name' />
                                            <input type="text" {...register("LastName", { required: true })} className="bg-white leading-5 border-r-2 border-t-2 border-b-2 border-blue-200 hover:bg-white text-gray-600  py-2.5 px-8  pr-16 rounded-r-lg" placeholder='Last Name' />
                                        </div>
                                        {errors.FirstName && <span className='text-red-500 ml-12'>First Name is required</span>}
                                        {errors.LastName && <span className='text-red-500 ml-12'>Last Name is required</span>}
                                        <div className="min-[480px]:grid grid-cols-6 gap-10 mt-4">
                                            <div className='col-span-3'>
                                                <input type="text" {...register("Title", { required: true })} className="hauser ml-12 bg-white leading-5 border-2  hover:bg-white border-blue-200  text-gray-600 py-2.5 px-4  rounded-lg" placeholder='Curator' />
                                                {errors.Title && <span className='text-red-500 ml-12'>Curator is required</span>}
                                                <div className='flex mt-4 justify-between items-center'>
                                                    <span className='mt-6 mr-4'><IoMdMail size={30} color='gray' /></span>
                                                    <div>
                                                        <select defaultValue="" {...register("emailType")} className="mt-4 text-black  border-2 border-blue-200  bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                            <option >Personal</option>
                                                            <option >Work</option>
                                                        </select>
                                                    </div>
                                                    <input type="text" {...register("Email", {
                                                        required: {
                                                            value: true,
                                                            message: "Email is required"
                                                        },
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "invalid email address"
                                                        }
                                                    })} className="text-black  border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500  rounded-lg text-md px-4 dark:bg-blue-600 w-60 ml-2" placeholder="E-mail" />
                                                </div>
                                                {errors.Email && <span className='text-red-500 ml-12'>{errors.Email?.message}</span>}
                                                <ul>
                                                    {fields.map((item, index) => (
                                                        <li key={item.id}>
                                                            <div className='flex mt-4 justify-between items-center'>
                                                                <span className='mt-6 mr-4'><IoMdMail size={30} color='gray' /></span>
                                                                <Controller
                                                                    render={({ field }) => <select  {...field} className="mt-4 text-black  border-2 border-blue-200  bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" control={control}>
                                                                        <option value="work">Work</option>
                                                                        <option value="personal">Personal</option>
                                                                    </select>}
                                                                    name={`emails.${index}.typeof`}
                                                                    control={control}
                                                                />
                                                                <Controller
                                                                    render={({ field }) => <input className="text-black  h-11 border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 rounded-lg text-md px-4 dark:bg-blue-600 w-60 ml-2" {...field} placeholder='E-mail' />}
                                                                    name={`emails.${index}.email`}
                                                                    control={control}
                                                                />
                                                                <button type="button" onClick={() => remove(index)}><CiCircleRemove size={20} color='DodgerBlue' /></button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button className="text-sm font-bold text-blue-500 ml-16 mt-4 mb-2" type="button"
                                                    onClick={() => append({ email: "", typeof: "" })}>+ Add Email</button>
                                                <div className='flex mt-2 justify-between items-center'>
                                                    <span className='mt-6 mr-4'><IoIosCall size={30} color='gray' /></span>
                                                    <select defaultValue="" {...register("phoneType")} className="mt-4 text-black  border-2 border-blue-200  bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        <option >Work</option>
                                                        <option >Personal</option>
                                                    </select>
                                                    <input type="number"  {...register("PhoneNumber", { required: true, maxLength: 10 })} className="text-black  border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500  rounded-lg text-md px-4 dark:bg-blue-600 w-60  ml-2" placeholder="Phone Number" />
                                                </div>
                                                {errors.PhoneNumber && <span className='text-red-500 ml-12'> {errors.PhoneNumber?.type === 'required' ? 'Phone Number is required' : 'Phone number must not be more than 10 digits'}</span>}
                                                <ul>
                                                    {fieldsForPhone?.map((item, index) => (
                                                        <li key={item.id}>
                                                            <div className='flex mt-4 justify-between items-center'>
                                                                <span className='mt-6 mr-4'><IoIosCall size={30} color='gray' /></span>
                                                                <Controller
                                                                    render={({ field }) => <select {...field} className="mt-4 text-black  border-2 border-blue-200  bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                        <option value="Work">Work</option>
                                                                        <option value="Personal">Personal</option>
                                                                    </select>}
                                                                    name={`phoneNumber.${index}.typeof`}
                                                                    control={control}
                                                                />
                                                                <Controller
                                                                    render={({ field }) => <input className="text-black  h-11 border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 rounded-lg text-md px-4 dark:bg-blue-600 w-60 ml-2" {...field} placeholder='Phone Number' />}
                                                                    name={`phoneNumber.${index}.phone`}
                                                                    control={control}
                                                                />
                                                                <button type="button" onClick={() => removeForPhone(index)}><CiCircleRemove size={20} color='DodgerBlue' /></button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button className="text-sm font-bold text-blue-500 ml-16 mt-4 mb-2" type="button"
                                                    onClick={() => appendForPhone({ phone: "", typeof: "" })}>+ Add Phone Number</button>
                                                <div className='flex mt-2 justify-between items-center'>
                                                    <span className='mt-6 mr-4'><IoIosLink size={30} color='gray' /></span>
                                                    <select defaultValue="" {...register("webType")} className="mt-4 text-black  border-2 border-blue-200  bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        <option >Work</option>
                                                        <option >Personal</option>
                                                    </select>
                                                    <input type="text" {...register("Website", { required: true })} className="w-64 text-black  border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500  rounded-lg text-md px-4 dark:bg-blue-600 ml-2" placeholder="Website" />                                                </div>
                                                {errors.Website && <span className='text-red-500 ml-12'>Website is required</span>}
                                                <ul>
                                                    {fieldsForWebsite?.map((item, index) => (
                                                        <li key={item.id}>
                                                            <div className='flex mt-4 justify-between items-center'>
                                                                <span className='mt-6 mr-4'><IoIosLink size={30} color='gray' /></span>
                                                                <Controller
                                                                    render={({ field }) => <select {...field} className="mt-4 text-black  border-2 border-blue-200 bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                        <option value="work">Work</option>
                                                                        <option value="personal">Personal</option>
                                                                    </select>}
                                                                    name={`websites.${index}.typeoOF`}
                                                                    control={control}
                                                                />
                                                                <Controller
                                                                    render={({ field }) => <input className="text-black  h-11 border-2 border-blue-200 mt-3 bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 rounded-lg text-md px-4 dark:bg-blue-600 w-60 ml-2" {...field} placeholder='Website' />}
                                                                    name={`websites.${index}.website`}
                                                                    control={control}
                                                                />
                                                                <button type="button" onClick={() => removeForWebsite(index)}><CiCircleRemove size={20} color='DodgerBlue' /></button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button className="text-sm font-bold text-blue-500 ml-16 mt-4 mb-2" type="button"
                                                    onClick={() => appendForWebsite({ website: "", typeoOF: "" })}>+ Add Website</button>
                                                <div className="ml-12 min-[480px]:grid grid-cols-2 gap-2 mt-8">
                                                    <div className="">
                                                        <p className="text-sm font-bold text-gray-700 ml-5">Birthday</p>
                                                        <div className="inline-flex mr-4 mt-4 mb-4">
                                                            <input type="text" className="bg-white border-l-2 border-t-2 border-b-2 hover:bg-white border-blue-200  text-gray-500 py-2 px-4  rounded-l-lg w-14" {...register("BirthDateMonth")} placeholder='M'  min="1" max="12"/>
                                                            <input type="text" className="bg-white border-2 hover:bg-white border-blue-200 text-gray-500 py-2 px-4 w-14" {...register("BirthDateDay")} placeholder='D' />
                                                            <input type="text" className="bg-white border-r-2 border-t-2 border-b-2 border-blue-200 hover:bg-white text-gray-500  py-2 px-4  rounded-r-lg w-14" {...register("BirthDateYear")} placeholder='YY' />
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <p className="text-sm font-bold text-gray-700 ml-5">Death Date</p>
                                                        <div className="inline-flex mr-4 mt-4 mb-4">
                                                            <input type="text" className="bg-white border-l-2 border-t-2 border-b-2 hover:bg-white border-blue-200  text-gray-500 py-2 px-4  rounded-l-lg w-14" {...register("DeathDateMonth")} placeholder='M'  min="1" max="12"/>
                                                            <input type="text" className="bg-white border-2 hover:bg-white border-blue-200 text-gray-500 py-2 px-4 w-14" {...register("DeathDateDay")} placeholder='D' />
                                                            <input type="text" className="bg-white border-r-2 border-t-2 border-b-2 border-blue-200 hover:bg-white text-gray-500  py-2 px-4  rounded-r-lg w-14" {...register("DeathDateYear")} placeholder='YY' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-span-3'>
                                                <input type="text"  {...register("Company", { required: true })} className="hauser ml-12 bg-white leading-5 border-2  hover:bg-white border-blue-200  text-gray-600 py-2.5 px-4  rounded-lg" placeholder='Hauser & Wirth' />
                                                {errors.Company && <span className='text-red-500 ml-12'>Hauser is required</span>}
                                                <div className='flex mt-2'>
                                                    <span className='mt-6 mr-4'><IoIosHome size={30} color='gray' /></span>
                                                    <select defaultValue="" {...register("addressType")} className="h-12 mt-4 text-black  border-2 border-blue-200  bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2  text-center inline-flex dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" control={control}>
                                                        <option value="work">Work</option>
                                                        <option value="personal">Personal</option>
                                                    </select>
                                                    <div className="ml-2 mt-4">
                                                        <input type="text"  {...register("StreetAddress1", { required: true })} className="w-full text-black bg-white border-b-2 border-l-2  border-r-2  border-t-2 border-blue-200 focus:outline-0  italic rounded-t-lg text-md px-4 py-2 " placeholder="Street address line 1" />
                                                        <input type="text"  {...register("StreetAddress2")} className="w-full text-black bg-white border-t-0 border-b-2  border-l-2  border-r-2 border-blue-200  focus:outline-0  italic  text-md px-4 py-2" placeholder="Street address line 2" />
                                                        <input type="text"  {...register("City")} className="w-full text-black bg-white border-t-0 border-b-2  border-l-2  border-r-2 border-blue-200 focus:outline-0  italic  text-md px-4 py-2" placeholder="New York" />
                                                        <input type="text"  {...register("State")} className="bg-white border-l-2 border-t-0 border-b-2 hover:bg-white border-blue-200 italic text-gray-500 py-2 px-4 border-t-none rounded-b-lg  rounded-r-none w-1/2" placeholder="NY" />
                                                        <input type="text"  {...register("Zip", { required: true })} className="bg-white border-r-2 border-t-0 border-b-2 hover:bg-white border-blue-200 italic text-gray-500 py-2 px-4 border-t-none rounded-b-lg  rounded-l-none w-1/2" placeholder="10011" />
                                                    </div>
                                                </div>
                                                {errors.StreetAddress1 && <span className='text-red-500 ml-12'>Street Address is required</span>}
                                                {errors.Zip && <span className='text-red-500 ml-12'>Zip is required</span>}
                                                <ul>
                                                    {fieldsForAddress.map((item, index) => (
                                                        <li key={item.id}>
                                                            <div className='flex mt-4 '>
                                                                <span className='mt-6 mr-4'><IoIosHome size={30} color='gray' /></span>                                           
                                                                <Controller
                                                                    render={({ field }) => <select className="h-12 mt-4 text-black  border-2 border-blue-200  bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-blue-500 font-bold rounded-lg text-md px-4 py-2  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  {...field} > <option value="work">Work</option>
                                                                        <option value="personal">Personal</option></select>}
                                                                    name={`addresses.${index}.addrestype`}
                                                                    control={control}
                                                                />
                                                                <div className="ml-2 mt-4">
                                                                    <Controller
                                                                        render={({ field }) => <input className="w-full text-black bg-white border-b-2 border-l-2  border-r-2  border-t-2 border-blue-200 focus:outline-0  italic rounded-t-lg text-md px-4 py-2 " placeholder="Street address line 1"  {...field} />}
                                                                        name={`addresses.${index}.streetaddress1`}
                                                                        control={control}
                                                                    />
                                                                    <Controller
                                                                        render={({ field }) => <input className="w-full text-black bg-white border-t-0 border-b-2  border-l-2  border-r-2 border-blue-200  focus:outline-0  italic  text-md px-4 py-2" placeholder="Street address line 2"   {...field} />}
                                                                        name={`addresses.${index}.streetaddress2`}
                                                                        control={control}
                                                                    />
                                                                    <Controller
                                                                        render={({ field }) => <input className="w-full text-black bg-white border-t-0 border-b-2  border-l-2  border-r-2 border-blue-200 focus:outline-0  italic  text-md px-4 py-2" placeholder="New York"  {...field} />}
                                                                        name={`addresses.${index}.city`}
                                                                        control={control}
                                                                    />
                                                                    <Controller
                                                                        render={({ field }) => <input className="bg-white border-l-2 border-t-0 border-b-2 hover:bg-white border-blue-200 italic text-gray-500 py-2 px-4 border-t-none rounded-b-lg border-r-2 rounded-r-none w-1/2" placeholder="NY"  {...field} />}
                                                                        name={`addresses.${index}.state`}
                                                                        control={control}
                                                                    />
                                                                    <Controller
                                                                        render={({ field }) => <input className="bg-white border-r-2 border-t-0 border-b-2 hover:bg-white border-blue-200 italic text-gray-500 py-2 px-4 border-t-none rounded-b-lg rounded-l-none w-1/2" placeholder="10011"  {...field} />}
                                                                        name={`addresses.${index}.zip`}
                                                                        control={control}
                                                                    />
                                                                </div>
                                                                <button type="button" onClick={() => removeForAddress(index)}><CiCircleRemove size={20} color='DodgerBlue' /></button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button className="text-sm font-bold text-blue-500 ml-16 mt-4 mb-2" type="button"
                                                    onClick={() => appendForAddress({ address: "", addrestype: "" })}>+ Add Address</button>
                                                <div className="min-[480px]:ml-12 mt-6 hauser  mb-4 border-2 border-blue-200  rounded-xl bg-white dark:bg-white dark:border-blue-600">
                                                    <span className="">
                                                        <TagInput {...handleTags} className="" labelField={tagLabel} />
                                                    </span>
                                                    <Modal show={showModal} size="sm" onClose={handleOnClose}>
                                                        <Modal.Body>
                                                            <div className="space-y-6 w-34">
                                                                <div className='ml-2 mr-2 bg-white'>
                                                                    <span className='flex'>
                                                                        <input type="radio" value="important" onChange={handleTagChange} name="tagLabel" className="text-white border-red-400 bg-red-400 checked:bg-red-400 hover:bg-red-500 focus:ring-0 focus:ring-offset-2 focus:border-red-400 focus:bg-red-400   font-medium rounded-full text-sm px-4 py-4 text-center mr-1 mb-1 "></input>
                                                                        <p className='font-bold text-sm mt-1 ml-3' >Important</p>
                                                                    </span>
                                                                    <span className='flex '>
                                                                        <input type="radio" value="personal" onChange={handleTagChange} name="tagLabel" className="text-white border-amber-500 bg-amber-500 hover:bg-amber-500 checked:bg-amber-500 dark:bg-amber-500 focus:ring-offset-2 focus:ring-0 focus:border-amber-500  font-medium rounded-full text-sm px-4 py-4 text-center mr-1 mb-1 "></input>
                                                                        <p className='font-bold text-sm mt-1 ml-3' >Personal</p>
                                                                    </span>
                                                                    <span className='flex '>
                                                                        <input type="radio" value="goals2020" onChange={handleTagChange} name="tagLabel" className="text-white border-yellow-300 bg-yellow-300 checked:bg-yellow-300 hover:bg-yellow-300 focus:ring-0 focus:ring-offset-0 focus:ring-none font-medium rounded-full text-sm px-4 py-4 text-center mr-1 mb-1 "></input>
                                                                        <p className='font-bold text-sm mt-1 ml-3' >2020 Goals</p>
                                                                    </span>
                                                                    <span className='flex '>
                                                                        <input type="radio" value="unlabled" onChange={handleTagChange} name="tagLabel" className="text-white border-emerald-400 bg-emerald-400 checked:bg-emerald-400 hover:bg-emerald-400 focus:ring-0 focus:ring-offset-0 focus:ring-none font-medium rounded-full text-sm px-4 py-4 text-center mr-1 mb-1 "></input>
                                                                        <p className='font-thin  italic text-sm mt-1 ml-3' >Unlabeled</p>
                                                                    </span>
                                                                    <span className='flex '>
                                                                        <input type="radio" value="unlabled" onChange={handleTagChange} name="tagLabel" className="text-white border-blue-600 bg-blue-600 checked:bg-blue-600 hover:bg-blue-600 focus:ring-0 focus:ring-offset-0 focus:ring-none font-medium rounded-full text-sm px-4 py-4 text-center mr-1 mb-1"></input>
                                                                        <p className='font-thin  italic text-sm mt-1 ml-3' >Unlabeled</p>
                                                                    </span>
                                                                    <span className='flex '>
                                                                        <input type="radio" value="unlabled" onChange={handleTagChange} name="tagLabel" className="text-white border-fuchsia-400 bg-fuchsia-400 checked:bg-fuchsia-400 hover:bg-fuchsia-400 focus:ring-0 focus:ring-offset-0 focus:ring-none font-medium rounded-full text-sm px-4 py-4 text-center mr-1 mb-1"></input>
                                                                        <p className='font-thin  italic text-sm mt-1 ml-3' >Unlabeled</p>
                                                                    </span>
                                                                    <span className='flex '>
                                                                        <input type="radio" value="unlabled" onChange={handleTagChange} name="tagLabel" className="text-white border-stone-400 bg-stone-400 checked:bg-stone-400 hover:bg-stone-400 focus:ring-0 focus:ring-offset-0 focus:ring-none  font-medium rounded-full text-sm px-4 py-4 text-center mr-1 mb-1 "></input>
                                                                        <p className='font-thin  italic text-sm mt-1 ml-3' >Unlabeled</p>
                                                                    </span>
                                                                    <span className='flex cursor-pointer ' onClick={handleOnClose}>
                                                                        <p className='font-bold text-blue-500 italic text-sm mt-1 ml-3' >Manage Labels</p>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Modal.Body>
                                                    </Modal>
                                                    <div className="px-4 py-2 bg-white rounded-xl dark:bg-gray-800">
                                                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-14">
                                                        </ul>
                                                    </div>
                                                </div>
                                                <button type="submit" disabled={disabled} className="ml-12 flex items-center gap-1 p-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-800">
                                                    Add contact
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </>
    )
}
