import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="min-h-screen bg-gray-100">
            <Appbar />
            <div className="flex justify-center w-full pt-12">
                <div className="max-w-screen-lg w-full bg-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-800">Write a New Blog</h1>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="block p-3 w-full text-lg text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-4"
                        placeholder="Title"
                    />
                    <TextEditor onChange={(e) => setContent(e.target.value)} />
                    <button
                        onClick={async () => {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/blog`,
                                {
                                    title,
                                    content
                                },
                                {
                                    headers: {
                                        Authorization: localStorage.getItem("Token")
                                    }
                                }
                            );
                            navigate(`/blog/${response.data.id}`);
                        }}
                        type="submit"
                        className="inline-flex items-center px-6 py-3 text-lg font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
                    >
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="w-full mb-6">
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
                <div className="px-4 py-2 border-b">
                    <label className="sr-only">Content</label>
                    <textarea
                        onChange={onChange}
                        id="editor"
                        rows={10}
                        className="block w-full px-4 py-2 text-lg text-gray-800 bg-gray-100 border-0 focus:outline-none"
                        placeholder="Write your article here..."
                        required
                    />
                </div>
            </div>
        </div>
    );
}
