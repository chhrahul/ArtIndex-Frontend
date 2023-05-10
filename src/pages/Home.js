import React from 'react'
import { Modal } from 'flowbite-react';
import Login from '../components/Login';
import Register from '../components/Register';
export default function Home() {

    const [showModal, setShowModal] = React.useState(false);
    const [authType, setAuthType] = React.useState('');

    const handleLogin = () => {
        setShowModal(true)
        setAuthType('login')
    }

    const handleJoin = () => {
        setShowModal(true)
        setAuthType('join')
    }

    const handleOnClose = () => {
        setShowModal(false)
        setAuthType('')
    }

    const commonProps = {
        setAuthType,
        handleOnClose
    }

    const isLogin = () => {
        const userId = localStorage.getItem("userId")
        return userId ? true : false
    }


    return (
        <>
            <div className=''>
                <nav className="min-[320px]:invisible min-[620px]:visible bg-white px-2 sm:px-4 py-4 dark:bg-gray-900 fixed w-full z-20 top-0 left-0">
                    <div className=" flex flex-wrap items-center justify-between w-4/5 mg-auto">
                        <h2 className="text-2xl font-bold dark:text-black text-blue-600">Art Index</h2>
                        {isLogin() == true ? '' : (
                            <p className='flex'>
                                <p className='text-sm font-bold py-2 mr-10 cursor-pointer' onClick={handleLogin} >Log In</p>
                                <p className='text-sm font-bold py-2 px-8 bg-emerald-300 rounded-full cursor-pointer' onClick={handleJoin}>/Join</p>
                            </p>
                        )}

                    </div>
                </nav>
                <Modal show={showModal} size="3xl" onClose={handleOnClose} className=''>
                    <Modal.Body className='rounded-lg'>
                        <div className="space-y-6 my-8 rounded-lg">
                            <div className='w-4/5 mg-auto '>

                                <span className='top-4 right-4 absolute cursor-pointer' color="gray" onClick={handleOnClose}>X</span>
                                {
                                    authType == 'login' ? (<Login />) : (<Register {...commonProps} />)
                                }
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>

                <div className='w-full background-bnnr mt-20'>
                    <div className='w-4/5 grid grid-cols-2 gap-4 mg-auto'>
                        <div className='pb-20 col-span-1 mg-auto'>
                            <h1 className='font-bold text-white mt-20 text-6xl'>Managing Art,</h1>
                            <h1 className='font-bold text-white text-6xl'>Made Easy</h1>
                            <p className='text-white mt-10'>Simplifying the way we look at art, our CRM</p>
                            <p className='text-white '>platform serves all ranges of artists,galleries,</p>
                            <p className='text-white '>and collectors.</p>
                            {isLogin() == true ? '' : (
                                <p className='flex mt-10'>
                                    <p className='text-sm cursor-pointer text-black border-2 border-emerald-300 font-bold py-2 px-8 bg-emerald-300 rounded-full  mr-10' onClick={handleJoin}>/Join</p>
                                    <p className='text-sm cursor-pointer text-white font-bold py-2 px-8   border-2 border-emerald-300 rounded-full' onClick={handleLogin}>Log In</p>
                                </p>
                            )}
                        </div>
                        <div className='pb-20 pt-20 col-span-1 mg-auto'>
                            <img className='' src='/Banner.jpeg' alt=''></img>
                        </div>

                    </div>

                </div>
                <div className='w-full feature-background relative'>

                    <div className='flex w-4/5 mg-auto'>
                        <div className='absolute bottom-0 left-44'>
                            <img className='' src='/Feature1.jpeg' alt=''></img>
                        </div>
                        <div className='w-6/12 pt-20 pb-20 mg-auto'>

                            <div className='mb-20 text-center'>
                                <h1 className='font-bold text-gray-600 mt-20 text-4xl'>/ Features</h1>
                                <p className='text-gray-500 mt-4 text-lg font-medium'>Simplifying the way we look at art, our CRM platform serves </p>
                                <p className='text-gray-500 text-lg font-medium'>all ranges of artists,galleries,and collectors.</p>
                            </div>
                            <div className='mb-20 text-center'>
                                <h1 className='font-bold text-gray-600 mt-20 text-4xl'>/ Features</h1>
                                <p className='text-gray-500 mt-4 text-lg font-medium'>Simplifying the way we look at art, our CRM platform serves </p>
                                <p className='text-gray-500 text-lg font-medium'>all ranges of artists,galleries,and collectors.</p>
                            </div>
                            <div className='mb-20 text-center'>
                                <h1 className='font-bold text-gray-600 mt-20 text-4xl'>/ Features</h1>
                                <p className='text-gray-500 mt-4 text-lg font-medium'>Simplifying the way we look at art, our CRM platform serves </p>
                                <p className='text-gray-500 text-lg font-medium'>all ranges of artists,galleries,and collectors.</p>
                            </div>




                        </div>
                        <div className='absolute top-0 right-40'>
                            <img className='' src='/a_girl.png' alt=''></img>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='w-4/5 grid grid-cols-2 pb-20 pt-20 mg-auto'>
                        <div className=''>
                            <h1 className='font-bold text-gray-600  text-3xl ml-14 pb-10'>/ Your Personal Concierge</h1>
                            <div className='flex mg-auto'>
                                <div className='mt-6 ml-20'>
                                    <img className='h-28 w-32' src='/Inventery.jpeg' alt=''></img>
                                    <img className='h-28 w-32' src='/calender.jpeg' alt=''></img>
                                    <img className='h-28 w-32' src='/security.jpeg' alt=''></img>
                                </div>
                                <div className='mt-6'>
                                    <img className='h-28 w-32' src='/invoicing.jpeg' alt=''></img>
                                    <img className='h-28 w-32' src='/contact.jpeg' alt=''></img>
                                    <img className='h-28 w-32 ' src='/customization.jpeg' alt=''></img>
                                </div>
                                <div className='mt-6'>
                                    <img className='h-28 w-32' src='/reports.jpeg' alt=''></img>
                                    <img className='h-28 w-32' src='/locations.jpeg' alt=''></img>
                                    <img className='h-28 w-32' src='/communication.jpeg' alt=''></img>
                                </div>
                            </div>
                        </div>
                        <div className='mt-28 '>
                            <img className='h-72' src='/inverteryArt.jpeg' alt=''></img>
                        </div>

                    </div>
                </div>
                <div className='w-full background-bnnr'>
                    <div className='w-4/5 pb-20 pt-20 mg-auto'>
                        <p className='text-white font-bold text-lg'>Perfect For</p>
                        <p className='text-white font-bold text-3xl'>/ Artists</p>
                        <div className='ml-12 grid grid-cols-3 gap-4 py-10'>

                            <div className=''>
                                <div className='w-3/5'>
                                    <p className='text-gray-600 font-extrabold bg-emerald-300 text-center py-2'>/ Basic</p>
                                    <div className='bg-white text-center pb-10'>
                                        <h1 className='text-gray-600 text-3xl font-extrabold py-4'>$XX <span className='text-gray-600 font-normal'>/mo</span></h1>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>10 users included</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>2 GB of storage</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>Email support</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm pb-10'>Help Center Access</p>
                                        <p className='text-sm cursor-pointer text-gray-600 py-2 px-2 font-medium border-2 border-emerald-300 rounded-full ml-4 mr-4'>Sign Up For Free</p>
                                    </div>
                                </div>

                            </div>
                            <div className=''>
                                <div className='w-3/5'>
                                    <p className='text-gray-600 font-extrabold bg-emerald-300 text-center py-2'>/ Advanced</p>
                                    <div className='bg-white text-center pb-10'>
                                        <h1 className='text-gray-600 text-3xl font-extrabold py-4'>$XX <span className='text-gray-600 font-thin'>/mo</span></h1>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>10 users included</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>2 GB of storage</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>Email support</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm pb-10'>Help Center Access</p>
                                        <p className='text-sm cursor-pointer text-gray-600 py-2 px-2 border-2 border-emerald-300 font-medium rounded-full ml-4 mr-4'>Sign Up For Free</p>
                                    </div>
                                </div>

                            </div>
                            <div className=''>
                                <div className='w-3/5'>
                                    <p className='text-gray-600 font-extrabold bg-emerald-300 text-center py-2'>/ Expert</p>
                                    <div className='bg-white text-center pb-10'>
                                        <h1 className='text-gray-600 text-3xl font-extrabold py-4'>$XX <span className='text-gray-600 font-thin'>/mo</span></h1>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>10 users included</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>2 GB of storage</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm'>Email support</p>
                                        <p className='text-gray-600 font-medium text-center  text-sm pb-10'>Help Center Access</p>
                                        <p className='text-sm cursor-pointer font-medium text-gray-600 py-2 px-2 border-2 border-emerald-300 rounded-full ml-4 mr-4'>Sign Up For Free</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className='w-full footer-background'>
                    <div className='w-3/5 text-center mg-auto' >
                        <div className='py-20'>
                            <h1 className='font-bold text-white text-3xl pb-10'>Art Index</h1>
                            <p className='text-white pb-12'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                            <p className='flex text-center w-1/5 mg-auto'>
                                <a href='/' className='text-white pb-12'>Contact | </a>
                                <a href='/' className='text-white pb-12 ml-1'>  Privacy Policy</a>
                            </p>
                        </div>


                    </div>
                </div>







            </div>

        </>
    )
}
