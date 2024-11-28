import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { Button } from "./Button";

export const Appbar = () => {
    const navigate = useNavigate();

    const handleSignin = () =>{
        navigate('/signin');
    }
    const handlelogout = () =>{
        localStorage.clear();
        navigate('/blogs');
    }
    
    const isLoggedIn = Boolean(localStorage.getItem('Token'));
    console.log(isLoggedIn);

    const buttonLabel = isLoggedIn ? "Logout" : "Sign In";
    const buttonAction = isLoggedIn ? handlelogout : handleSignin;




    return (
        <div className="border-b border-gray-200 bg-slate-500 shadow-md flex items-center justify-between rounded-full px-6 py-4 mx-10 my-1">
            <Link to={'/blogs'} className="text-2xl font-semibold text-white hover:text-gray-600">
                Medium
            </Link>
            <div className="flex items-center space-x-4">
                {/* <Link to={'/signup'}>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
                    >
                        Sign Up
                    </button>
                </Link> */}
                <Button onClick={buttonAction} label={buttonLabel}/>


                <Link to={'/publish'}>
                    <button
                        type="button"
                        className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
                    >
                        Write Blog
                    </button>
                </Link>
                <Avatar name="Prabhkar" size={"big"} />
            </div>
        </div>
    );
};
