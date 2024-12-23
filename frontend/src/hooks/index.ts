import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
    "content": String,
    "title": String, 
    "id": string,
    "author": {
        "name": string
    }
}

export const useBlog = ({id}: {id: string}) =>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{ 
            headers:{
                Authorization: localStorage.getItem("Token")
            }
        })
        .then(response=>{
            setBlog(response.data.blog);
            setLoading(false);
        })
    },[id])

    return {
        loading,
        blog
    }
}


export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: localStorage.getItem("Token")
            }
        })
        .then(response=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
        .catch((error)=>{
            if(error.response?.status===403){
                navigate("/signin")
            }
        })
    },[])

    return {
        loading,
        blogs
    }
}

export const useFetchCollaborators = ({id}: {id: string}) =>{
    const [collaborator, setCollaborator] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

   useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}/collaborators`,
        {
            headers:{
                Authorization: localStorage.getItem("Token")
            }
        }).then(response =>{
            console.log(response.data.collaboratorlist);
            setCollaborator(response.data.collaboratorlist);
            setLoading(false);
        })

   },[id])

   return{
    collaborator,
    loading
   }
}