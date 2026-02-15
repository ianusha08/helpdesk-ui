import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/helpdesk/Header";
import { LeftSidebar } from "@/components/helpdesk/LeftSidebar";
import { TicketViewsSidebar } from "@/components/helpdesk/TicketViewsSidebar";
import { TicketList } from "@/components/helpdesk/TicketList";
import { TicketDetail } from "@/components/helpdesk/TicketDetail";
import { TicketProperties } from "@/components/helpdesk/TicketProperties";
import { getTickets } from "@/lib/api";
import { Loader2 } from "lucide-react";

// Mock current user
const CURRENT_USER_NAME = "Allie Harmon";

const Index = () => {
  const [activeView, setActiveView] = useState("My Tickets");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const { data: tickets = [], isLoading, error } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  const filteredTickets = useMemo(() => {
    let result = tickets;

    // View Filter
    switch (activeView) {
      case "My Tickets":
        result = result.filter(t => t.assignee?.name === CURRENT_USER_NAME);
        break;
      case "High Priority":
        result = result.filter(t => t.priority === "High" || t.priority === "Urgent");
        break;
      case "Unassigned":
        // Assuming unassigned means assignee is null or has specific name/id
        // For mock data, let's assume specific logic or just check if name is "Unassigned"
        result = result.filter(t => !t.assignee || t.assignee.name === "Unassigned");
        break;
      case "Past Due":
        // Mock logic for Past Due: Urgent tickets not done
        result = result.filter(t => t.priority === "Urgent" && t.status !== "Done");
        break;
      case "Design Only":
        result = result.filter(t => (t.tags && t.tags.some(tag => tag.toLowerCase() === "design")) || t.title.toLowerCase().includes("design"));
        break;
      case "Needs Review":
        result = result.filter(t => (t.tags && t.tags.some(tag => tag.toLowerCase() === "review")) || (t.status === "In Progress" && t.title.toLowerCase().includes("review")));
        break;
      case "FE Tix":
        result = result.filter(t => (t.tags && t.tags.some(tag => tag.toLowerCase() === "frontend")) || t.title.toLowerCase().includes("fe") || t.title.toLowerCase().includes("frontend"));
        break;
      case "All Tickets":
      default:
        break;
    }

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.internalId.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tickets, activeView, searchQuery]);

  const selectedTicket = tickets.find((t) => t.internalId === selectedTicketId) || null;

  useEffect(() => {
    // If selected ticket is filtered out, deselect it or select first available
    if (filteredTickets.length > 0) {
      if (!selectedTicketId || !filteredTickets.find(t => t.internalId === selectedTicketId)) {
        setSelectedTicketId(filteredTickets[0].internalId);
      }
    } else {
      setSelectedTicketId(null);
    }
  }, [filteredTickets, selectedTicketId]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-destructive">
        Error loading tickets. Please try again later.
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftSidebar />
        <TicketViewsSidebar activeView={activeView} onViewChange={setActiveView} />
        <TicketList
          tickets={filteredTickets}
          selectedId={selectedTicketId}
          onSelect={setSelectedTicketId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="flex-1 flex min-w-0 bg-background">
          {selectedTicket ? (
            <>
              <TicketDetail ticket={selectedTicket} onClose={() => setSelectedTicketId(null)} />
              <TicketProperties ticket={selectedTicket} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a ticket to view details
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
