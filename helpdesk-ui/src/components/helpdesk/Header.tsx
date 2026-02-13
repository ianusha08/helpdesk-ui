import { Search, ChevronDown, HelpCircle, Gift } from "lucide-react";
import { UserAvatar } from "./Avatar";

export function Header() {
  return (
    <header className="h-[60px] bg-navy flex items-center px-6 gap-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-primary-foreground font-bold text-lg">
          C
        </div>
        <span className="text-primary-foreground font-semibold text-lg">Helpdesk</span>
      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
          <input
            type="text"
            placeholder="Search Capacity..."
            className="w-full bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 rounded-md pl-10 pr-4 py-2 text-sm border border-primary-foreground/20 outline-none focus:bg-primary-foreground/15 focus:border-primary-foreground/40 transition-colors"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand-hover text-primary-foreground font-medium px-4 py-2 rounded-md text-sm transition-colors">
          Create
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all">
          <HelpCircle className="h-5 w-5" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all">
          <Gift className="h-5 w-5" />
        </button>
        <UserAvatar initials="AH" size="lg" className="ring-2 ring-primary-foreground/20" />
      </div>
    </header>
  );
}
