import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
    return (
        <div className="border-b border-gray-200 bg-slate-200 shadow-md flex items-center justify-between px-6 py-4">
            <Link to={'/blogs'} className="text-2xl font-semibold text-gray-800 hover:text-gray-600">
                Medium
            </Link>
            <div className="flex items-center space-x-4">
                <Link to={'/signup'}>
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
                    >
                        Sign Up
                    </button>
                </Link>


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
