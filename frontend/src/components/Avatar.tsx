export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "medium";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-lime-800 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-8 h-8"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-lg"
        } font-light text-slate-200 nline-flex items-center justify-center`}
      >
        {name[0]}
      </span>
    </div>
  );
}
