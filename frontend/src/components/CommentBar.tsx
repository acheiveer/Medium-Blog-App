import axios from "axios";
import { Button } from "./Button";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const CommentBar = () => {
    const {id} = useParams();
    const [content,setContent] = useState("");

    const addComment = async () =>{
        const token = localStorage.getItem("Token");
        console.log(token);

    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
        const response = await axios({
            // Endpoint to send files
            url: `${BACKEND_URL}/api/v1/blog/comment/${id}`,
            method: "POST",
            headers: {
                // Add any auth token here
                Authorization: localStorage.getItem("Token"),
            },

            // Attaching the form data
            data: JSON.stringify({ content: content }),
        })
        alert("Comment added!");
    } catch (error) {
        alert("Comment not added");
        console.error(error);
    }
           
    }

  return (
    <div>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setContent(e.target.value)}
        placeholder="Comments"
        className="text-black bg-gradient-to-r from-cyan-400 w-96 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
      />
      <Button label={"Add"} onClick={addComment} />
    </div>
  );
};
