export function Progress({ value = 0, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`w-full h-4 bg-gray-200 rounded ${className}`}>
      <div className="h-full bg-green-500 rounded" style={{ width: `${value}%` }}></div>
    </div>
  );
}