export default function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
    />
  );
}