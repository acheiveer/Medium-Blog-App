
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({ authorName, title, content, publishedDate }: BlogCardProps) => {
    return <div className="p-4 border-b border-slate-200 pb-4">
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
}

function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">
    </div>
}

export function Avatar({ name }: { name: string }) {
    return <div>
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
            <span className="text-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    </div>

}