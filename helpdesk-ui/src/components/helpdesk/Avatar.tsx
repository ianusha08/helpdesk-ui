import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: string;
}

const colors = [
  "bg-brand text-primary-foreground",
  "bg-warning text-primary-foreground",
  "bg-success text-primary-foreground",
  "bg-destructive text-primary-foreground",
  "bg-navy text-primary-foreground",
];

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const sizeMap = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-9 w-9 text-sm",
};

export function UserAvatar({ initials, size = "md", className }: AvatarProps) {
  const colorClass = colors[hashStr(initials) % colors.length];
  return (
    <div className={cn(
      "rounded-full flex items-center justify-center font-semibold shrink-0",
      sizeMap[size],
      colorClass,
      className
    )}>
      {initials}
    </div>
  );
}

export function AvatarGroup({ users }: { users: { initials: string }[] }) {
  return (
    <div className="flex -space-x-2">
      {users.slice(0, 3).map((u, i) => (
        <UserAvatar key={i} initials={u.initials} size="sm" className="ring-2 ring-card" />
      ))}
    </div>
  );
}
