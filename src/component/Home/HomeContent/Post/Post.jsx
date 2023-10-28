import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
const Post = () => {
    const{user}=useContext(AuthContext)
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=88fe3e7af3f5674077d978212da06873`
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const formData = new FormData();
        if (data.image && data.image[0]) {
            formData.append('image', data.image[0]);
            fetch(img_hosting_url, {
                method: 'POST',
                body: formData
            
            })
                .then(res => res.json())
                .then(imageResponse => {
                    if (imageResponse.success) {
                        const imageUrl = imageResponse.data.display_url;
                        const text = data.postText;
                        const userName=user?.displayName;
                        const userEmail=user?.email;
                        const userImage=user?.photoURL;
                       
                        const postingData = { text,imageUrl,userName,userEmail ,userImage};
                        console.log(postingData);
                          fetch('https://job-placement-support-server.vercel.app/dataOfPost', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(postingData)
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            if (data.insertedId) {
                             alert('data added successfully')
                            }
                        })
                        .catch(err=>{
                            console.log(err.message);
                        })
                    }
                });
        }
    }
    return (
        <div className='md:mx-[500px] lg:mx-[500px] my-9 mt-10'>
            <div className='md:w-auto w-[340px]'>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body bg-blue-400 rounded-xl">
                    <h2 className='text-[24px] font-semibold text-white '>Personal Information</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Write your post</span>
                        </label>
                        <textarea type="text" placeholder="your post"  {...register("postText")} className="textarea  bg-white" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white">Your Image</span>
                        </label>
                        <input type="file" placeholder="imageUrl"  {...register("image")} className="py-2 rounded p-2 bg-white" />
                    </div>
                    <div className="form-control text-center mt-6">
                        <button className="btn bg-blue-700 px-[61px] py-[16px] text-white  rounded-xl">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Post;