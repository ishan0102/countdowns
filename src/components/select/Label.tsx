export default function Label({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col items-start gap-1 text-neutral-300 text-xs font-apple2mono mt-2">
      {text}
      {children}
    </label>
  );
}
