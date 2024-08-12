import { Avatar } from "./BlogCard"


export const Appbar = () =>{
    return <div className="border-b justify-between flex px-10 py-4">
        <div className="flex flex-col justify-center">
            medium
        </div>
        <div>
            <Avatar name="Prabhkar" size={"big"}/>
        </div>

    </div>
}