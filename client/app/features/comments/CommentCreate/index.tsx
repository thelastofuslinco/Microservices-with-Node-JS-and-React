import { Form } from "react-router";
import comments from "~/api/comments";
import Button from "~/components/Button";
import Input from "~/components/Input";

interface Props {
  post_id: string;
  callback: (id: string) => void;
}

export default function CommentCreate({ post_id, callback }: Props) {
  return (
    <>
      <Form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget; // Save a reference to the form
          const formData = new FormData(form);
          const content = formData.get("content") as string;

          if (!content) {
            alert("Content is required");
            return;
          }

          try {
            await comments.post(`/posts/${post_id}/comments`, { content });
            callback(post_id);

            // Clear the input fields after a successful post
            form.reset();
          } catch (error: Error | any) {
            const message =
              error.response?.data?.error ||
              error.message ||
              "An unknown error occurred";

            alert(message);
          }
        }}
      >
        <Input type="text" name="content" placeholder="Enter comment content" />

        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}
