import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosInstance } from '../utils';
import { Base64 } from "js-base64";
export default function Register(props) {

    const { setAuthType, handleOnClose } = props

    let yupRules = {
        name: Yup.string().required('This field is required'),
        email: Yup.string().email('Please enter a valid email address').required('This field is required'),
        password: Yup.string().required('This field is required').matches(

            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        ConfirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('This field is required')
    };

    const schemaValidation = Yup.object().shape(yupRules)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schemaValidation)
    });


    const onSubmit = dataSubmit => {

        dataSubmit.password = Base64.encode(dataSubmit.password)
        async function getData() {

            const result = await AxiosInstance(
                {
                    'url': '/add-user',
                    'method': 'post',
                    'data': dataSubmit
                }
            )
            const { data, status } = result.data
            if (status) {
                setAuthType('')
                alert('User added succesfully')
                setTimeout(() => {
                    handleOnClose()
                }, 3000);
            } else {
                setAuthType('')
                handleOnClose()
                // console.log(status)
                const userData = result.data;
                // console.log(userData.message)
                alert(userData.message)

            }
        }
        getData()
    };
    return (

        <>
            <h1 className='font-bold text-gray-700 text-xl'>Access our extensive collection of art by signing up!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type='text'
                    className='mt-5 rounded-md text-gray-700 italic border-2 border-blue-700 w-full py-2'
                    placeholder=' Email'
                    {...register("email")}
                />
                <p className='text-red-500 text-xs ml-2'>
                    {errors.email && errors.email.message}
                </p>
                <input
                    type='text'
                    className='mt-5 rounded-md text-gray-700 italic border-2 border-blue-700 w-full py-2'
                    placeholder='Username'
                    {...register("name")}
                />
                <p className='text-red-500 text-xs ml-2'>
                    {errors.name && errors.name.message}
                </p>
                <input
                    type='password'
                    className='mt-5 rounded-md text-gray-700 italic border-2 border-blue-700 w-full py-2'
                    placeholder='Password'
                    {...register("password")}
                />
                <p className='text-red-500 text-xs ml-2'>
                    {errors.password && errors.password.message}
                </p>

                <input
                    type='password'
                    className='mt-5 rounded-md text-gray-700 italic border-2 border-blue-700 w-full py-2'
                    placeholder='Re-Enter Password'
                    {...register("ConfirmPassword")}
                />
                <p className='text-red-500 text-xs ml-2'>
                    {errors.ConfirmPassword && errors.ConfirmPassword.message}
                </p>
                <span className='flex justify-between items-center w-4/5 mg-auto'>

                    <span className='flex mt-10'>
                        <button className='text-sm cursor-pointer text-black font-bold py-2 px-8 rounded-full' >Login</button>
                        <button type="submit" className="text-sm cursor-pointer text-black border-2 border-emerald-300 font-bold py-2 px-8 bg-emerald-300 rounded-full  mr-10">
                            Signup
                        </button>
                    </span>
                </span>
            </form>
        </>
    )
}
