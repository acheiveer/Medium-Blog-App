import axios from "axios";
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }}
                type="text" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="title" />
                <TextEditor onChange={(e)=>{
                     setContent(e.target.value)
                }} />
                <button onClick={async ()=>{
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content
                    },{
                        headers:{
                            Authorization: localStorage.getItem("Token")
                        }
                    })
                    navigate(`/blog/${response.data.id}`); 
                }}
                type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}

function TextEditor({onChange}: {onChange: (e: Event)=> void}){
return (
    <form>
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between py-2 border-b ">
                    <div className="px-4 py-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className=" focus:outline-none block w-full px-0 text-sm text-gray-800 bg-gray-200 border-0"
                          placeholder="Write an article..." required ></textarea>
                    </div>      
            </div>    
        </div>
    </form>
);
}