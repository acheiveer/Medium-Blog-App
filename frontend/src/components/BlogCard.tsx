import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:string
}

export const BlogCard = ({ id,authorName, title, content, publishedDate }: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
     <div className="p-4 border-b bg-white border-slate-400 pb-4 mx-8 my-4 max-w-screen-md cursor-pointer rounded-lg border   ">
        <div className="flex">
            <div ><Avatar name={authorName} /></div>
            <div className="font-light pl-2 text-sm flex justify-center flex-col">{authorName}</div>
            <div className=" pl-2 flex justify-center flex-col" ><Circle/></div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">{publishedDate}</div>
        </div>
        <div className="font-semibold text-xl pt-2">
            {title}
        </div>
        <div className="font-thin text-md">
            {content}
        </div>
        <div className="text-sm font-thin text-slate-500 pt-2">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>

    </div>
    </Link>
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">
    </div>
}

export function Avatar({ name, size="small" }: { name: string, size?: "small" | "big" }) {
    return <div>
        <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6":"w-8 h-8"} overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}>
            <span className={`${size==="small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>{name[0]}</span>
        </div>
    </div>

}