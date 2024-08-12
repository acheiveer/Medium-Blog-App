import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"


export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            Loading...
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog =>
                    <BlogCard
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"1 jan 2021"}
                        id={blog.id}
                    />
                )}


            </div>
        </div>
    </div>
}