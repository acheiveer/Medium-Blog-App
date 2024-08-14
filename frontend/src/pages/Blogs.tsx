import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"


export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            <Appbar/>
            <div className="flex justify-center">
            <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/> 
            <BlogSkeleton/> 
            <BlogSkeleton/> 
            <BlogSkeleton/> 
            </div>
        </div>
        </div>
    }
    return <div>
        <Appbar />
        <div className="bg-slate-100 flex justify-center">
            <div>
                {blogs.map(blog =>
                     <div key={blog.id} className="mb-2 mt-2">
                     <BlogCard
                         authorName={blog.author.name || "Anonymous"}
                         title={blog.title}
                         content={blog.content}
                         publishedDate={"1 Jan 2021"}
                         id={blog.id}
                     />
                 </div>
                )}


            </div>
        </div>
    </div>
}