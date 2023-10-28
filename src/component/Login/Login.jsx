import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { FaGoogle } from "react-icons/fa";
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate=useNavigate()
    const {user,loginUser,loginWithGoogle}=useContext(AuthContext)
    const onSubmit = (data) => {
        console.log(data);
        const { email, password } = data;
        loginUser(email, password)
            .then((result) => {
                const theUser = result.user;
                console.log(theUser);
                navigate('/')
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const handleGoogle=() => {
        loginWithGoogle()
        .then(result => {
            const googleLogin = result.user;
            console.log(googleLogin);
            navigate('/');
        })
        .catch(err => {
           console.log(err.message);
        });
    }
    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="card   w-[650px] shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body  ">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" {...register("email")} placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password")} placeholder="password" className="input input-bordered" />
                                    {/* <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label> */}
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>

                                    <div className='mt-10 text-center'>
                                            <button onClick={handleGoogle} className="btn btn-circle btn-outline">
                                                <FaGoogle></FaGoogle>
                                            </button>
                                        </div>

                                    <p className='mt-10 text-center'>Don't have an account?<Link to='/register' className='text-blue-600'>Register</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;