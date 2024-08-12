import { useParams } from "react-router-dom";
import { DetailBlog } from "../components/DetailBlog";
import { useBlog } from "../hooks"


//atomFamilies/selectorFamilies
export const Blog = () =>{
  const {id} = useParams();
  const {loading,blog} = useBlog({
    id: id || ""
  });
  if(loading){
    return <div>
      Loading...
    </div>
  }
   return <div>
     <DetailBlog blog={blog}/>
   </div>
}