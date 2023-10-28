import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const NavItems = <>
        <ul className="flex justify-around items-center gap-8">
            <Link> <li>Home</li></Link>
            <Link to='/media'><li>Media</li></Link>
            <Link><li>Message</li></Link>
            <Link to='/about'><li>About</li></Link>
        </ul>
    </>

    const handleLogOut = () => {
        logOut()
            .then(result => {
                const user = result.user;
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    return (
        <div className="navbar bg-base-100 drop-shadow-md px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box  w-52">
                        {NavItems}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl uppercase text-blue-500 font-bold">SocialPulse</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {NavItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? <button onClick={handleLogOut} className="btn btn-xs bg-blue-500 text-white">Logout</button> : <Link to='/login'><button className="btn btn-xs bg-blue-500 text-white">Login</button></Link>}
            </div>
        </div>
    );
};

export default Navbar;