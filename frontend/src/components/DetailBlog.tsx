import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import { CommentBar } from "./CommentBox"
import Comments from "./Comments"
import LikeDisLike from "./LikeDisLike"

export const DetailBlog = ({ blog }: { blog: Blog }) => {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-lg pt-12">
            <div className=" col-span-8">
              <div className="text-5xl font-extrabold">{blog.title}</div>
              <div className="text-slate-500 pt-2">posted on 24 september</div>
              <div className="pt-4">{blog.content}</div>
            </div>
            <div className=" col-span-4">
              <div className="text-slate-600 text-lg">Author</div>
              <div className="flex w-full">
                <div className="pr-4 flex flex-col justify-center">
                  <Avatar size="big" name={blog.author.name || "Anonymous"} />
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {blog.author.name || "Anonymous"}
                  </div>
                  <div className="pt-2 text-slate-500">
                    Random catch phrase about the author's ability to grab the
                    user's attentions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
            <svg
              className="w-4 h-4 text-gray-700 dark:text-gray-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
        </div>

        <div className=" flex space-x-10 justify-center my-4">
          <LikeDisLike/>
          <CommentBar />
        </div>
        <div className=" flex justify-center my-4">
          <Comments/>
          </div>
        
      </div>
    );
}