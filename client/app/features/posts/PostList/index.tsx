import CommentCreate from "~/features/comments/CommentCreate";
import CommentList from "~/features/comments/CommentList";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface DynamicDictionary {
  [key: string]: Post;
}

interface Props {
  posts: DynamicDictionary;
}

export default function PostList({ posts }: Props) {
  const keys = Object.keys(posts || []);
  const postsArray = keys.map((key) => posts[key]);

  return (
    <div className="flex flex-col gap-4">
      <h1>Post List</h1>
      {postsArray?.map((post) => (
        <div className="bg-gray-100 p-4 rounded" key={post.id}>
          <h2 className="text-gray-800 text-lg font-bold">
            Title: {post.title}
          </h2>

          <p className="text-gray-600">Content: {post.content}</p>

          <CommentCreate
            post_id={post.id}
            callback={(post_id) => {
              console.log(`Comment created for post_id: ${post_id}`);
            }}
          />
          <CommentList post_id={post.id} />
        </div>
      ))}
    </div>
  );
}
