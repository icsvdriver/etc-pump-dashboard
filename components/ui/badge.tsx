export function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode; variant?: string; className?: string }) {
  const color =
    variant === "success"
      ? "bg-green-100 text-green-800"
      : variant === "destructive"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";

  return <span className={`px-2 py-1 text-sm rounded ${color} ${className}`}>{children}</span>;
}