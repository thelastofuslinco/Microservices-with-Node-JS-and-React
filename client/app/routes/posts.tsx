import PostCreate from "~/features/posts/PostCreate";
import PostList from "~/features/posts/PostList";
import type { Route } from "./+types/posts";
import { posts, query } from "~/api";

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
    await posts.post("/posts", { title, content });

    return { title, content };
  } catch (error: Error | any) {
    const message =
      error.response?.data?.error ||
      error.message ||
      "An unknown error occurred";

    return {
      error: message,
    };
  }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await query.get("/posts");
  return res.data;
}

export default function Posts({
  actionData,
  loaderData,
}: {
  actionData: any;
  loaderData: any;
}) {
  actionData && console.log("Action Data:", actionData);
  const postsData = loaderData || [];

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
      <h1>Posts</h1>
      <PostCreate actionData={actionData} />
      <PostList posts={postsData} />
    </div>
  );
}
