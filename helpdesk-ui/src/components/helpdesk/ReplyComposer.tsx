import { Bold, Italic, Underline, Image, Paperclip, Link2, Quote, Code, ArrowRight, Send, Loader2 } from "lucide-react";
import { UserAvatar } from "./Avatar";
import { X } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMessage } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  ticketId: string;
}

export function ReplyComposer({ ticketId }: Props) {
  const [activeTab, setActiveTab] = useState<"public" | "private">("public");
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => addMessage(ticketId, {
      body: message,
      author: { name: "Current User", initials: "CU", avatar: "" }, // In a real app, get from auth context
      type: clientTypeMap[activeTab],
      to: "Support Team",
      attachments: []
    }),
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Message sent");
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const clientTypeMap = {
    public: "public_reply",
    private: "private_comment"
  };

  const handleSubmit = () => {
    if (!message.trim()) return;
    mutation.mutate();
  };

  return (
    <div className="border border-border rounded-lg bg-card">
      {/* Tabs */}
      <div className="flex border-b border-border px-6">
        <button
          onClick={() => setActiveTab("public")}
          className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === "public"
              ? "text-brand border-b-2 border-brand"
              : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-gray-200"
            }`}
        >
          Public Reply
        </button>
        <button
          onClick={() => setActiveTab("private")}
          className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === "private"
              ? "text-brand border-b-2 border-brand"
              : "text-muted-foreground hover:text-foreground border-b-2 border-transparent hover:border-gray-200"
            }`}
        >
          Private Comment
        </button>
      </div>

      {activeTab === "public" && (
        <div className="px-4 py-2 border-b border-border flex items-center gap-2">
          <span className="text-sm text-muted-foreground shrink-0">To:</span>
          <div className="inline-flex items-center gap-1.5 bg-muted rounded-full pl-1 pr-3 py-1 text-sm">
            <UserAvatar initials="CU" size="sm" />
            <span className="text-xs">Customer User &lt;user@example.com&gt;</span>
            <button className="hover:bg-gray-200 rounded-full p-0.5 transition-colors">
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
          <span className="ml-auto text-sm text-brand cursor-pointer hover:underline font-medium">Cc</span>
        </div>
      )}

      {/* Text area */}
      <div className="px-4 py-3 min-h-[120px]">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={activeTab === "public" ? "Add a reply..." : "Add a comment..."}
          className="w-full resize-none text-sm placeholder:text-muted-foreground outline-none bg-transparent min-h-[80px] leading-relaxed"
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
        <div className="flex items-center gap-1">
          {[Bold, Italic, Underline, Image, Paperclip, Link2, Code, ArrowRight, Quote].map((Icon, i) => (
            <button key={i} className="w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
            Add to KB
            <input type="checkbox" className="rounded border-gray-200 h-3.5 w-3.5" />
          </label> */}
          <button
            onClick={handleSubmit}
            disabled={mutation.isPending || !message.trim()}
            className="p-2 bg-brand text-primary-foreground rounded-md hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
