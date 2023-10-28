import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { AuthContext } from '../component/AuthProvider/AuthProvider';

const PrivateRouter = ({children}) => {
    const location=useLocation();
    const {user,loading}=useContext(AuthContext)

   
    if (loading) {
        return (<div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div> );
      }
    if(user){
        return children;
    }
    Swal.fire({
        icon: 'error',
        title: 'Login Required',
        text: 'You need to login first!',
        showConfirmButton: false,
        timer: 2000
      });
    return <Navigate state={{from:location}} to="/login" replace ></Navigate>;
};

export default PrivateRouter;