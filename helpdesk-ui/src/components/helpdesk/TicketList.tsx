import { Menu, ChevronDown, SlidersHorizontal, Search, Clock, AlertTriangle, Flame, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { AvatarGroup } from "./Avatar";
import type { Ticket } from "@/data/mockData";

interface Props {
  tickets: Ticket[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const priorityIcons: Record<string, React.ElementType> = {
  High: Flame,
  Urgent: AlertTriangle,
  Medium: CheckCircle2,
  Low: CheckCircle2,
};

export function TicketList({ tickets, selectedId, onSelect }: Props) {
  return (
    <div className="w-[380px] border-r border-border flex flex-col bg-card shrink-0">
      {/* Sub-header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Menu className="h-5 w-5 text-muted-foreground" />
          <button className="flex items-center gap-1 text-sm font-semibold text-foreground">
            My Tickets
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tickets"
            className="w-full bg-muted rounded-md pl-9 pr-3 py-2.5 text-sm placeholder:text-muted-foreground outline-none border border-border focus:border-brand focus:ring-2 focus:ring-brand/20 transition-colors"
          />
        </div>
      </div>

      {/* Ticket items */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {tickets.map((ticket) => {
          const isSelected = ticket.internalId === selectedId;
          const PriorityIcon = priorityIcons[ticket.priority] || CheckCircle2;
          return (
            <button
              key={ticket.internalId}
              onClick={() => onSelect(ticket.internalId)}
              className={cn(
                "w-full text-left px-4 py-3 border-b border-gray-100 transition-colors relative cursor-pointer",
                isSelected
                  ? "bg-brand-light border-l-4 border-l-brand"
                  : "hover:bg-gray-50 border-l-4 border-l-transparent"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0 flex-1">
                  <input
                    type="checkbox"
                    className="mt-1 shrink-0 h-4 w-4 rounded border-gray-200 text-brand focus:ring-brand"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm text-foreground truncate">{ticket.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{ticket.id}</span>
                      <StatusBadge status={ticket.status} />
                      <div className="flex items-center gap-1">
                        {ticket.priority === "High" && <Clock className="h-3.5 w-3.5 text-muted-foreground" />}
                        {ticket.priority === "High" && <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
                        {ticket.priority === "Urgent" && <Flame className="h-3.5 w-3.5 text-destructive" />}
                        <PriorityIcon className={cn("h-3.5 w-3.5", ticket.priority === "Medium" ? "text-success" : "text-muted-foreground")} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-xs text-muted-foreground">{ticket.date}</span>
                  <AvatarGroup users={ticket.watchers} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
