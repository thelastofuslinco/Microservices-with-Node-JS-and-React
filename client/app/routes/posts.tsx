import posts from "~/api/posts";
import PostCreate from "~/features/posts/PostCreate";
import PostList from "~/features/posts/PostList";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title) {
    return { error: "Title is required" };
  } else if (!content) {
    return { error: "Content is required" };
  }

  try {
    await posts.post("/posts", { title });
  } catch (error: Error | any) {
    console.log("Error creating post:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }

  return { title, content };
}

export default function Posts({ actionData }: { actionData: any }) {
  actionData && console.log("Action Data:", actionData);
  return (
    <div>
      <h1>Posts</h1>
      <PostCreate actionData={actionData} />
      <PostList />
    </div>
  );
}
