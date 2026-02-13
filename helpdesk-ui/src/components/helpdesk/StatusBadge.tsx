import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "To Do": "bg-brand-light text-brand",
  "In Progress": "bg-[hsl(36_100%_93%)] text-[hsl(36_100%_35%)]",
  "Done": "bg-[hsl(142_71%_93%)] text-[hsl(142_71%_30%)]",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap",
      statusStyles[status] || "bg-muted text-muted-foreground",
      className
    )}>
      {status}
    </span>
  );
}
