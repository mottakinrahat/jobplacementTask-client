import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const About = () => {
    const { user } = useContext(AuthContext)
    const [loggedData, setLoggedData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/userData?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setLoggedData(data))
    }, [user?.email])

    return (
        <div>
            {
                loggedData.map(logData => (
                    <div key={logData?._id}>
                        <div className="card w-[480px] mx-auto my-20 bg-base-100 shadow-xl">
                            <Link to={`/update/${logData?._id}`} className='ml-80 btn btn-xs btn-primary w-20'>edit</Link>

                            <figure className="px-10 pt-10">

                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary mb-2 ring-offset-base-100 ring-offset-2">
                                        <img src={logData?.image} />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{logData?.name}</h2>
                                <p>{logData?.email}</p>
                                <p>{logData?.universityName}</p>
                                <p>{logData?.address}</p>

                            </div>
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default About;