import { Form } from "react-router";
import Button from "~/components/Button";
import Input from "~/components/Input";

export default function PostCreate({ actionData }: { actionData: any }) {
  return (
    <>
      <Form method="post">
        <Input type="text" name="title" placeholder="Enter post title" />
        <Input type="text" name="content" placeholder="Enter post content" />

        <Button type="submit">Submit</Button>
      </Form>

      {actionData?.title && <p>Post created: {actionData.title}</p>}
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
    </>
  );
}
