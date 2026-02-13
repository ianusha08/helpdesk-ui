import {
  MessageSquare, MapPin, Ticket, BookOpen, BarChart3,
  Layers, Database, Clock, Settings, Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: MessageSquare, label: "Inbox" },
  { icon: MapPin, label: "Location" },
  { icon: Ticket, label: "Tickets", active: true },
  { icon: BookOpen, label: "Knowledge" },
  { icon: Layers, label: "Layers" },
  { icon: Building2, label: "Building" },
  { icon: Database, label: "Database" },
  { icon: Clock, label: "History" },
  { icon: BarChart3, label: "Analytics" },
];

export function LeftSidebar() {
  return (
    <aside className="w-[60px] bg-navy-dark flex flex-col items-center py-4 shrink-0">
      <div className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
              item.active
                ? "bg-navy-light text-primary-foreground"
                : "text-primary-foreground/60 hover:bg-navy-light hover:text-primary-foreground"
            )}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
          </button>
        ))}
      </div>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg text-primary-foreground/60 hover:bg-navy-light hover:text-primary-foreground transition-colors"
        title="Settings"
      >
        <Settings className="h-6 w-6" />
      </button>
    </aside>
  );
}
