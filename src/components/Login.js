import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { AxiosInstance } from '../utils';
import { yupResolver } from "@hookform/resolvers/yup"
import { Base64 } from "js-base64";
import { useNavigate } from "react-router-dom";
//import { LoginSocialGoogle } from 'reactjs-social-login'


export default function Login(props) {
    const [inccorectLogin, setinccorectLogin] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    // const handleGoogleLoginSuccessfull = async ({ provider, data }) => {
    //     console.log('data', data)
    //     console.log('provider', provider)
    // }

    // const handleLoginWithError = async ({ error }) => {
    //     console.log(error?.message)
    // }

    // const loginGoogleProps = {
    //     "client_id": '731019835589-6ff8j6hb3k7paort3etsrjbfq1rmbb5m.apps.googleusercontent.com',
    //     "redirect_uri": 'https://main.d26n8wj3j35m97.amplifyapp.com/emails',
    //     "scope": "openid profile email",
    //     "discoveryDocs": "claims_supported",
    //     "access_type": "online",
    //     "onResolve": handleGoogleLoginSuccessfull,
    //     "onReject": handleLoginWithError,
    // }


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
            const { status } = result.data
            if (status) {
                //const userData = result.data;
            } else {
                const userData = result.data;
                const LoginData = userData.data;
                if (userData.message === 'Login successfull') {
                    localStorage.setItem('userId', LoginData[0]._id);
                    localStorage.setItem('userEmail', JSON.stringify(LoginData[0].email));
                    localStorage.setItem('userName', JSON.stringify(LoginData[0].name));
                    navigate("/artwork");
                } else if (userData.message === 'IncorrectPassword') {
                    setinccorectLogin("Please enter the correct user name and password")
                }
                else if (userData.message === 'Error in user login.') {
                    setinccorectLogin("Please enter the correct user name and password")
                }
                console.log(userData.message)
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
            <p className='text-center text-gray-700 font-medium mb-4'>Please enter your username and password to login</p>
            {inccorectLogin ? (<><span className='text-red-600 text-sm mt-10'>Please enter the correct username and password</span></>) : ''}
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
                <span className='flex justify-between items-center w-full mg-auto'>
                    <p></p>
                    <p className='flex mt-10'>
                        <button className='text-sm cursor-pointer text-black font-bold py-2 px-8 rounded-full' disabled={true} >Signup</button>
                        <button type='submit' className='text-sm cursor-pointer text-black border-2 border-emerald-300 font-bold py-2 px-8 bg-emerald-300 rounded-full'>/Login</button>
                    </p>
                </span>
                {error && <p>Error: {error.error}</p>}
                {/* <button onClick={handleLogin}>Login with Google</button> */}
                {/* <LoginSocialGoogle {...loginGoogleProps}>
                <span className='flex justify-between items-center w-full mg-auto'>cLICK HERE</span>
                </LoginSocialGoogle> */}
            </form>
        </>
    )
}