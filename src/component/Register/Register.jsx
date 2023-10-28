import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Result } from 'postcss';
import Swal from 'sweetalert2';
import { FaGoogle } from "react-icons/fa";
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserData } = useContext(AuthContext)
    const navigate=useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        const { email, password, image, address, name, universityName } = data;
        createUser(email, password)
            .then(result => {
                const createUser = result.user;
                console.log(createUser);
                updateUserData(name, image)
                .then(() => {
                    const userData={email,image, address, name, universityName}
                    fetch('https://job-placement-support-server.vercel.app/userData',{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.insertedId) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'user created successfully',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/')
                        }
                
                    })
                })

            })
            .catch(err => {
                console.log(err.message);
            })

    }
    return (
        <div>
            <div>
                <div className="hero min-h-screen ">
                    <div className="hero-content flex-col lg:flex-row">
                        <div className="card   w-[650px] shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="card-body  ">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Image URL</span>
                                        </label>
                                        <input type="text" {...register("image")} placeholder="Your name" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Address</span>
                                        </label>
                                        <input type="text" {...register("address")} placeholder="your address" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">University Name</span>
                                        </label>
                                        <input type="text" {...register("universityName")} placeholder="university name" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="text" {...register("email")} placeholder="your email" className="input input-bordered" />
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
                                        <button className="btn btn-primary">Register</button>

                                        <div className='mt-10 text-center'>
                                            <button onClick={handleGoogle} className="btn btn-circle btn-outline">
                                                <FaGoogle></FaGoogle>
                                            </button>
                                        </div>

                                        <p className='mt-10 text-center'>Already have an account?<Link to='/login' className='text-blue-600'>Login</Link></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;