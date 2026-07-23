export default function Form ({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form
      {...props}
      className="flex flex-col gap-4"
    >
      {children}
    </form>
  );
}