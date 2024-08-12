import { useBlog } from "../hooks"


//atomFamilies/selectorFamilies
export const Blog = () =>{
  const {loading,blog} = useBlog();
  if(loading){
    return <div>
      Loading...
    </div>
  }
   return <div>
     blog
   </div>
}