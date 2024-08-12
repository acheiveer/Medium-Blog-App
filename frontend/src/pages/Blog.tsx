import { useParams } from "react-router-dom";
import { DetailBlog } from "../components/DetailBlog";
import { useBlog } from "../hooks"
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";


//atomFamilies/selectorFamilies
export const Blog = () =>{
  const {id} = useParams();
  const {loading,blog} = useBlog({
    id: id || ""
  });
  if(loading){
    return <div>
      <Appbar/>
      <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <Spinner/>
      </div>
    </div>
    </div>
  }
   return <div>
     <DetailBlog blog={blog}/>
   </div>
}   