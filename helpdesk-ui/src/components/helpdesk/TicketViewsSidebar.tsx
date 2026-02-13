import { ChevronDown, MessageCircle, LayoutGrid, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { ticketViews, customViews } from "@/data/mockData";

interface Props {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function TicketViewsSidebar({ activeView, onViewChange }: Props) {
  return (
    <aside className="w-[270px] bg-gray-50 border-r border-border flex flex-col shrink-0">
      <div className="px-4 py-3">
        <button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <ChevronDown className="h-3.5 w-3.5" />
          Ticket Views
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {ticketViews.map((view) => (
          <button
            key={view.name}
            onClick={() => onViewChange(view.name)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors",
              activeView === view.name
                ? "bg-brand text-primary-foreground"
                : "text-foreground hover:bg-gray-100"
            )}
          >
            <span className="font-medium">{view.name}</span>
            <span className={cn(
              "text-xs font-medium ml-auto",
              activeView === view.name ? "text-primary-foreground" : "text-muted-foreground"
            )}>
              {view.count.toLocaleString()}
            </span>
          </button>
        ))}

        <div className="pt-2">
          {customViews.map((view) => (
            <button
              key={view.name}
              onClick={() => onViewChange(view.name)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors group",
                activeView === view.name
                  ? "bg-brand text-primary-foreground"
                  : "text-foreground hover:bg-gray-100"
              )}
            >
              <span>{view.name}</span>
              <MoreVertical className="h-4 w-4 opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity" />
            </button>
          ))}
        </div>
      </nav>

      <div className="border-t border-border px-4 py-3 space-y-1">
        <button className="flex items-center gap-2 text-sm text-foreground hover:text-brand transition-colors w-full px-1 py-1.5">
          <MessageCircle className="h-4 w-4" />
          <span className="font-medium uppercase tracking-wide text-xs">Live Chats</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-foreground hover:text-brand transition-colors w-full px-1 py-1.5">
          <LayoutGrid className="h-4 w-4" />
          <span className="font-medium uppercase tracking-wide text-xs">Boards</span>
        </button>
      </div>
    </aside>
  );
}
