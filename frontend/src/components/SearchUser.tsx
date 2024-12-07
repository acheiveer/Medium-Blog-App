import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { Button } from "./Button";
import { useParams } from "react-router-dom";

export const Users = () =>{
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/search?filter=`+ filter)
        .then(response =>{
            setUsers(response.data.users);
        })
    },[filter])

    return(
        <div>   
            <div className=" p-4 ">
                <div className="mx-6 my-4">
                    <input 
                        onChange={(e) => setFilter(e.target.value)} 
                        type="text" 
                        placeholder="Search users..." 
                        className="w-full text-black px-4 py-2 border rounded-lg border-black-800 focus:outline-none focus:ring-4 focus:ring-cyan-300"
                    />
                </div>
                <div className="space-y-4">
                    {users.map(user => <User key={user.id} user={user} />)}
                </div>
            </div>
        </div>
    )
}

function User({user}){
    const [newRole, setNewRole] = useState("")
    const {id} = useParams();

    const addCollaborator = async ( userId, role) =>{
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/${id}/collaborators`,{
                userId,
                role
            },
        {
            headers:{
                Authorization: localStorage.getItem("Token")
            }    
        })
        
        if (response.data.collaborator) {
            alert(response.data.message || 'Collaborator added successfully');

            

          } else {
            alert(response.data.error || 'Failed to add collaborator');
          }
        } catch (error) {
            console.error('Error adding collaborator:', error);
        }

    }
    return(
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow rounded-lg">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-purple-200 flex items-center justify-center text-purple-600 text-xl font-bold mr-4">
                    {user.name[0]}
                </div>
                <div>
                    <div className="text-lg font-semibold text-gray-800">
                        {user.name}
                    </div>
                    <div className="text-gray-500">
                        {user.email}
                    </div>
                </div>
            </div>
            <div>
            <select
                onChange={(e) => setNewRole(e.target.value)}
                defaultValue=""
                className="hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-2 py-2 mx-2 transition duration-150 ease-in-out"
              >
                <option value="EDITOR">Editor</option>
                <option value="VIEWER">Viewer</option>
              </select>
              <button
                  onClick={() => addCollaborator(user.id, newRole)}
                  disabled={!newRole}
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150 ease-in-out"
                >
                  Add
                </button>

                
            </div>
            
        </div>
    )
}