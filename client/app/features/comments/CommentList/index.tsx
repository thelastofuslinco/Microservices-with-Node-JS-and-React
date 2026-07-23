import { useEffect, useState } from "react";
import api from "~/api/comments";

interface Props {
  post_id: string;
}

export default function CommentList({ post_id }: Props) {
  const [comments, setComments] = useState<any>({});
  const keys = Object.keys(comments || []);
  const commentsArray = keys.map((key) => comments[key]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await api.get(`/posts/${post_id}/comments`);
        const commentsData = res.data;
        // Update the comments state with the fetched data
        setComments(commentsData);
      } catch (error: Error | any) {
        const message =
          error.response?.data?.error ||
          error.message ||
          "An unknown error occurred";

        alert(message);
      }
    }

    fetchComments();
  }, [post_id]);

  return (
    <div className="flex flex-col gap-4">
      <h1>Comment List</h1>
      {commentsArray?.map((comment) => (
        <div className="bg-gray-100 p-4 rounded" key={comment.id}>
          <p className="text-gray-600">Content: {comment.content}</p>
        </div>
      ))}
    </div>
  );
}
