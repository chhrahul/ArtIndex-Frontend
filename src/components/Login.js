import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { AxiosInstance } from '../utils';
import { yupResolver } from "@hookform/resolvers/yup"
import { Base64 } from "js-base64";
import { useNavigate } from "react-router-dom";
export default function Login(props) {

    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const { setAuthType, handleOnClose } = props
    const navigate = useNavigate();
    const onSubmit = data1 => {
        async function Login() {
            data1.password = Base64.encode(data1.password)
            const result = await AxiosInstance(

                {
                    'url': '/login-user',
                    'method': 'post',
                    'data': data1
                }
            )
            const { data, status } = result.data
            if (status) {
                
                //console.log(data)
               
            } else {
                const userData = result.data;
                const LoginData = userData.data;
                //console.log(LoginData[0]._id)
               if(userData.message == 'Login successfull'){
                //setIsSubmitted(true)
                localStorage.setItem('userId', LoginData[0]._id);
                localStorage.setItem('userEmail', JSON.stringify(LoginData[0].email));
                localStorage.setItem('userName', JSON.stringify(LoginData[0].name));
                navigate("/artwork");
               }
                //alert(userData.message)
            }

        }
        Login()
    };

    let yupRules = {
        name: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required'),
    };

    const schemaValidation = Yup.object().shape(yupRules)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schemaValidation)
    });


    return (
        <>          
             
                    <h1 className='text-center font-bold text-gray-700 text-xl'>Welcome to ArtIndex !</h1>
                    <p className='text-center text-gray-700 font-medium'>Please enter your username and passwordword to login</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type='text'
                            className='mt-5 rounded-md text-gray-700 italic border-2 border-blue-700 w-full py-2'
                            placeholder='Username'
                            {...register("name")}
                        />
                        <p className='text-red-500 text-xs ml-2'>
                            {errors.name && errors.name.message}
                        </p>
                        <input type='password'
                            className='mt-10 rounded-md text-gray-700 italic border-2 border-blue-700 w-full py-2'
                            placeholder='Password'
                            {...register("password")}
                        />
                        <p className='text-red-500 text-xs ml-2'>
                            {errors.password && errors.password.message}
                        </p>
                        <span className='flex justify-between items-center w-4/5 mg-auto'>
                            <p className='underline text-blue-700 text-sm mt-10'>Forget passwordword?</p>
                            <p className='flex mt-10'>
                                <button className='text-sm cursor-pointer text-black font-bold py-2 px-8 rounded-full' >Signup</button>
                                <button type='submit' className='text-sm cursor-pointer text-black border-2 border-emerald-300 font-bold py-2 px-8 bg-emerald-300 rounded-full  mr-10'>/Login</button>
                            </p>
                        </span>
                    </form>
    
             

                </>
            )
            }
