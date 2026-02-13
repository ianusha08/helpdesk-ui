import { useState } from "react";
import { Header } from "@/components/helpdesk/Header";
import { LeftSidebar } from "@/components/helpdesk/LeftSidebar";
import { TicketViewsSidebar } from "@/components/helpdesk/TicketViewsSidebar";
import { TicketList } from "@/components/helpdesk/TicketList";
import { TicketDetail } from "@/components/helpdesk/TicketDetail";
import { TicketProperties } from "@/components/helpdesk/TicketProperties";
import { tickets } from "@/data/mockData";

const Index = () => {
  const [activeView, setActiveView] = useState("My Tickets");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[1]?.internalId || null);

  const selectedTicket = tickets.find((t) => t.internalId === selectedTicketId) || null;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0">
        <LeftSidebar />
        <TicketViewsSidebar activeView={activeView} onViewChange={setActiveView} />
        <TicketList tickets={tickets} selectedId={selectedTicketId} onSelect={setSelectedTicketId} />
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
      </div>
    </div>
  );
};

export default Index;
