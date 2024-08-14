import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
    return (
        <div className="border-b border-gray-200 bg-slate-200 shadow-md flex items-center justify-between px-6 py-4">
            <Link to={'/blogs'} className="text-2xl font-semibold text-gray-800 hover:text-gray-600">
                Medium
            </Link>
            <div className="flex items-center space-x-4">
                <Link to={'/publish'}>
                    <button
                        type="button"
                        className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
                    >
                        New
                    </button>
                </Link>
                <Avatar name="Prabhkar" size={"big"} />
            </div>
        </div>
    );
};
