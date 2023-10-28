import React from 'react';
import usePostData from '../../hook/usePostData';
import SingleMedia from './SingleMedia';

const Media = () => {
    const[allPost,refetch]=usePostData();
    return (
        <div className='py-20'>
           {
            allPost.map(postData=><SingleMedia key={postData._id} postData={postData} refetch={refetch}></SingleMedia>)
           }
        </div>
    );
};

export default Media;