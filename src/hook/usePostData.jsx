import React from 'react';

import {useQuery} from 'react-query'
  

const usePostData = () => {
    const {refetch, data: allPost = [] } = useQuery({
        queryKey: ['dataOfPost'],
queryFn: async () => {
    const response = await fetch('https://job-placement-support-server.vercel.app/dataOfPost')
    return response.json();
},
})
    return [allPost,refetch]
};

export default usePostData;