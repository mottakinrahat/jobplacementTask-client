import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const DetailsPost = () => {
    const [clicked,setClicked] = useState(false)
    const postsData = useLoaderData();
    const { imageUrl, text, userImage, userName } = postsData;
    const toggleLike = () => {
        setClicked(!clicked);
    };
    return (
        <div>
            <div className="card w-[620px] bg-base-100 py-20 my-20 mx-auto shadow-xl">
                <figure><img src={imageUrl} alt="Shoes" /></figure>
                <div className="card-body">
                    <div className='flex gap-2 items-center'>
                        <img src={userImage} className='w-8 h-8 rounded-full' alt="" />
                        <h2 className="card-title">{userName}</h2>
                    </div>
                    <p>{text}</p>
                    <div className="card-actions justify-center mt-4">
                        <button onClick={toggleLike} className={`badge badge-outline ${clicked &&'bg-blue-400 text-white'}`}>{clicked?'unlike':'like'}</button>
                        <button className="badge badge-outline">Comment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPost;