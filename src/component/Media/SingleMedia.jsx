import React from 'react';
import { Link } from 'react-router-dom';

const SingleMedia = ({ postData, refetch }) => {
    const { text, imageUrl ,_id, userName,userImage} = postData;
    return (
        <div>
            <div className="card w-[600px] bg-base-100 shadow-xl mx-auto mt-4">
                <div className="card-body flex">
                    <div className='flex items-center gap-2'>
                        <img src={userImage} className='w-8 h-8 rounded-full' alt="" />
                    <h2 className="card-title">{userName}</h2></div>
                    <p>{text}</p>
                </div>
                <figure><img src={imageUrl} alt="post" className='object-cover' /></figure>
                <div className="divider"></div>


                <div className='flex justify-around mb-2'>
                    {/* <button className='btn btn-primary'>like</button>
            <button className='btn btn-primary'>Comment</button> */}
                    <Link to={`/details/${_id}`}> <button className='btn btn-link'> see details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default SingleMedia;