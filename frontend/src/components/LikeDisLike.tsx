import axios from 'axios';
import  { useState, useEffect } from 'react'
import { BACKEND_URL } from '../config';
import { useParams } from 'react-router-dom';

export default function LikeDisLike() {
    const {id} = useParams();
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);

    useEffect(() => {
        // Fetch the number of likes on component mount
        axios
          .get(`${BACKEND_URL}/api/v1/blog/like/${id}`)
          .then((response) => {
            setLikes(response.data.likes);
          })
          .catch((error) => {
            console.error("Error fetching likes:", error);
          });

      }, [id]);
    
    const handleClick = () => {
        const token = localStorage.getItem("Token");
        if(!token){
            alert("please login to like posts");
        }

      if(!liked){
        const response = axios.post(`${BACKEND_URL}/api/v1/blog/like/${id}`,
            {},
            { 
                headers:{
                    Authorization: localStorage.getItem("Token")
                }
            }
          ).then(()=>{
            alert("Post Liked");
            setLikes((prev)=> prev + 1);
            setLiked(true);
          })
          .catch(error=>{
            console.error("Error liking the post:", error);
            alert("Unable to like the post.");
          })
      }
    };
    
      return (
        <div className="flex items-center space-x-2">
      <button
        onClick={handleClick}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
          liked
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        {liked ? "Unlike" : "Like"}
      </button>
      <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
    </div>
      )
}
