import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/AuthProvider';
const Update = () => {
    const userDataPrevious = useLoaderData();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { updateUserData } = useContext(AuthContext)
    const onSubmit = (data) => {

        const { email, image, address, name, universityName } = data;

        updateUserData(name, image)
            .then(() => {
                const userData = { email, image, address, name, universityName }
                const id = userDataPrevious._id;

                fetch(`https://job-placement-support-server.vercel.app/userData/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'data updated successfully',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/about')
                        }


                    })

            })
            .catch(err => {
                console.log(err.message);
            })

    }
    return (
        <div>
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
                                            <input type="text" defaultValue={userDataPrevious?.image} {...register("image")} placeholder="Your name" className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Name</span>
                                            </label>
                                            <input type="text" defaultValue={userDataPrevious?.name} {...register("name")} placeholder="Your name" className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Address</span>
                                            </label>
                                            <input type="text" defaultValue={userDataPrevious?.address} {...register("address")} placeholder="your address" className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">University Name</span>
                                            </label>
                                            <input type="text" defaultValue={userDataPrevious?.universityName} {...register("universityName")} placeholder="university name" className="input input-bordered" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input type="text" defaultValue={userDataPrevious?.email} {...register("email")} placeholder="your email" className="input input-bordered" />
                                        </div>

                                        <div className="form-control mt-6">
                                            <button className="btn btn-primary">update</button>

                                            <div className='mt-10 text-center'>

                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;