import { ChevronDown, ChevronRight, Calendar, X, MinusCircle, CheckCircle2, Flame, AlertTriangle } from "lucide-react";
import { UserAvatar } from "./Avatar";
import { StatusBadge } from "./StatusBadge";
import type { Ticket } from "@/data/mockData";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  ticket: Ticket;
}

function PropertyRow({ label, children, trailing }: { label: string; children: React.ReactNode; trailing?: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
        {trailing}
      </div>
      {children}
    </div>
  );
}

function SelectField({ value, icon }: { value: string; icon?: React.ReactNode }) {
  return (
    <div
      onClick={() => toast.info("This property is read-only in this demo")}
      className="flex items-center justify-between w-full px-3 py-2 bg-card border border-border rounded-md text-sm cursor-pointer hover:bg-muted transition-colors focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{value}</span>
      </div>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function CollapsibleSection({ title, count, children, defaultOpen = false }: { title: string; count?: number; children?: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border pt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-1 hover:bg-muted -mx-1 px-1 rounded-md transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-foreground">{title}</span>
          {count !== undefined && (
            <span className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-[10px] font-medium">{count}</span>
          )}
        </div>
        {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && children && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

const priorities = [
  { value: "Low", icon: CheckCircle2, color: "text-muted-foreground" },
  { value: "Medium", icon: CheckCircle2, color: "text-success" },
  { value: "High", icon: Flame, color: "text-warning" },
  { value: "Urgent", icon: AlertTriangle, color: "text-destructive" },
];

export function TicketProperties({ ticket }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updates: Partial<Ticket>) => updateTicket(ticket.id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket updated");
    },
    onError: () => {
      toast.error("Failed to update ticket");
    },
  });

  const handlePriorityChange = (value: string) => {
    mutation.mutate({ priority: value as any });
  };

  return (
    <aside className="w-80 border-l border-border bg-gray-50 p-6 overflow-y-auto scrollbar-thin shrink-0 space-y-6">
      <PropertyRow label="Priority">
        <Select value={ticket.priority || "Medium"} onValueChange={handlePriorityChange}>
          <SelectTrigger className="w-full bg-card border-border">
            <div className="flex items-center gap-2">
              {priorities.find((p) => p.value === ticket.priority)?.icon && (
                <span className={priorities.find((p) => p.value === ticket.priority)?.color}>
                  {(() => {
                    const Icon = priorities.find((p) => p.value === ticket.priority)?.icon;
                    return Icon ? <Icon className="h-5 w-5" /> : null;
                  })()}
                </span>
              )}
              <SelectValue placeholder="Select priority" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {priorities.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                <div className="flex items-center gap-2">
                  <p.icon className={`h-4 w-4 ${p.color}`} />
                  {p.value}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PropertyRow>

      <PropertyRow
        label="Assigned To"
        trailing={
          <button
            onClick={() => toast.info("Auto-assign feature coming soon")}
            className="text-sm text-brand cursor-pointer hover:underline font-medium"
          >
            Assign to me
          </button>
        }
      >
        <SelectField value={ticket.assignee.name} icon={<UserAvatar initials={ticket.assignee.initials} size="sm" />} />
      </PropertyRow>

      <PropertyRow label="Project">
        <SelectField value={ticket.project} />
      </PropertyRow>

      <PropertyRow label="Ticket Type">
        <SelectField value={ticket.type} icon={<CheckCircle2 className="h-5 w-5 text-brand" />} />
      </PropertyRow>

      <PropertyRow label="Due Date">
        <SelectField value="mm/dd/yyyy" icon={<Calendar className="h-5 w-5 text-muted-foreground" />} />
      </PropertyRow>

      <PropertyRow label="Reporter">
        <SelectField value={ticket.reporter.name} icon={<UserAvatar initials={ticket.reporter.initials} size="sm" />} />
      </PropertyRow>

      <PropertyRow label="Tags">
        <button
          onClick={() => toast.info("Tag management coming soon")}
          className="flex items-center gap-1 text-sm text-brand hover:underline font-medium transition-colors"
        >
          Add Tag +
        </button>
      </PropertyRow>

      <CollapsibleSection title="Tasks" />
      <CollapsibleSection title="Collected Fields" />
      <CollapsibleSection title="Linked Tickets" count={ticket.linkedTickets.length} defaultOpen={ticket.linkedTickets.length > 0}>
        {ticket.linkedTickets.map((lt) => (
          <div key={lt.id} className="flex items-center gap-2 p-3 bg-card border border-border rounded-md text-sm hover:border-gray-200 transition-colors">
            <CheckCircle2 className="h-5 w-5 text-warning shrink-0" />
            <span className="flex-1 font-medium text-foreground">{lt.id}</span>
            <StatusBadge status={lt.status} />
            <UserAvatar initials="AH" size="sm" />
            <X className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-destructive transition-colors" />
          </div>
        ))}
      </CollapsibleSection>
      <CollapsibleSection title="History" />
    </aside>
  );
}
