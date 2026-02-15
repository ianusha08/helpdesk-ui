import {
  MessageSquare, MapPin, Ticket, BookOpen, BarChart3,
  Layers, Database, Clock, Settings, Building2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: MessageSquare, label: "Inbox", path: "/inbox" },
  { icon: MapPin, label: "Location", path: "/location" },
  { icon: Ticket, label: "Tickets", path: "/tickets" },
  { icon: BookOpen, label: "Knowledge", path: "/knowledge" },
  { icon: Layers, label: "Layers", path: "/layers" },
  { icon: Building2, label: "Building", path: "/building" },
  { icon: Database, label: "Database", path: "/database" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
];

export function LeftSidebar() {
  return (
    <aside className="w-[60px] bg-navy-dark flex flex-col items-center py-4 shrink-0">
      <div className="flex flex-col items-center gap-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => cn(
              "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
              isActive
                ? "bg-navy-light text-primary-foreground"
                : "text-primary-foreground/60 hover:bg-navy-light hover:text-primary-foreground"
            )}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
          </NavLink>
        ))}
      </div>
      <NavLink
        to="/settings"
        className={({ isActive }) => cn(
          "w-10 h-10 flex items-center justify-center rounded-lg transition-colors",
          isActive
            ? "bg-navy-light text-primary-foreground"
            : "text-primary-foreground/60 hover:bg-navy-light hover:text-primary-foreground"
        )}
        title="Settings"
      >
        <Settings className="h-6 w-6" />
      </NavLink>
    </aside>
  );
}
