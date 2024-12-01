import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useParams } from "react-router-dom";
import { BlogSkeleton } from "./BlogSkeleton";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  authorId: string;
  author: {
    id: string;
    email: string;
    name: string;
  };
}

export default function Comments() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/comment/${id}`)
      .then((response) => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load comments. Please try again.");
        setLoading(false);
      });
  }, [id]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      {comments.slice(0, visibleCount).map((comment) => (
        <div key={comment.id} className="mb-4">
          <h2 className="text-gray-800">{comment.content}</h2>
          <div className="text-sm text-gray-500 mt-1">
            By <span className="font-medium">{comment.author.name}</span> on{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
      {visibleCount < comments.length && (
        <button
          onClick={handleShowMore}
          className="text-blue-500 hover:underline mt-4"
        >
          Show More
        </button>
      )}
      {comments.length === 0 && (
        <p className="text-gray-600">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}
