import { Mail, Eye, MoreHorizontal, X, ChevronDown } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { UserAvatar, AvatarGroup } from "./Avatar";
import { ReplyComposer } from "./ReplyComposer";
import type { Ticket } from "@/data/mockData";

interface Props {
  ticket: Ticket;
  onClose: () => void;
}

export function TicketDetail({ ticket, onClose }: Props) {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-card">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-foreground leading-7">{ticket.title}</h1>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span>⚙ {ticket.id} ({ticket.internalId})</span>
              <span>|</span>
              <span>Created 11/14/22 12:32 PST</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Mail className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span className="text-xs">2</span>
            </div>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
            <AvatarGroup users={ticket.watchers} />
            <button className="inline-flex items-center gap-1 bg-brand text-primary-foreground text-sm font-medium px-3 py-1.5 rounded-md hover:bg-brand-hover transition-colors">
              {ticket.status}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-thin">
        <ReplyComposer />

        {/* Messages */}
        {ticket.messages.map((msg, idx) => (
          <div key={msg.id} className="animate-fade-in">
            <div className="flex gap-3">
              <UserAvatar initials={msg.author.initials} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="font-semibold text-sm text-foreground">{msg.author.name}</span>
                    <p className="text-xs text-muted-foreground">To {msg.to}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{msg.body}</p>
                {msg.attachments.length > 0 && (
                  <div className="flex gap-3 mt-3">
                    {msg.attachments.map((att, i) => (
                      <div key={i} className="border border-border rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
                        <div className="font-medium text-foreground">{att.filename}</div>
                        <div>{att.uploadedAt}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {idx !== ticket.messages.length - 1 && <hr className="my-4 border-border" />}
          </div>
        ))}
      </div>
    </div>
  );
}
