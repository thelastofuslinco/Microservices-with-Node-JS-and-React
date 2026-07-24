import { useEffect, useState } from "react";

interface Props {
  comments: any[];
}

export default function CommentList({ comments }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1>Comment List</h1>
      {comments?.map((comment) => {
        let content;

        switch (comment.status) {
          case "approved":
            content = comment.content;
            break;
          case "rejected":
            content = "This comment has been rejected.";
            break;
          default:
            content = "This comment is awaiting moderation.";
        }

        return (
          <div className="bg-gray-100 p-4 rounded" key={comment.id}>
            <p className="text-gray-600">Content: {content}</p>
          </div>
        );
      })}
    </div>
  );
}
