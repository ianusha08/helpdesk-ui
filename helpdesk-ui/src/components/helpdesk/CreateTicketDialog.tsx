import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "@/lib/api";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function CreateTicketDialog({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [type, setType] = useState("Task");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => createTicket({
            title,
            priority: priority as any,
            type,
            messages: description ? [{
                id: "desc",
                author: { name: "Current User", initials: "CU", avatar: "" },
                to: "Support",
                body: description,
                timestamp: new Date().toLocaleString(),
                type: "public_reply",
                attachments: []
            }] : []
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Ticket created");
            setOpen(false);
            resetForm();
        },
        onError: () => {
            toast.error("Failed to create ticket");
        },
    });

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPriority("Medium");
        setType("Task");
    };

    const handleSubmit = () => {
        if (!title.trim()) return;
        mutation.mutate();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <button className="w-full flex items-center justify-center gap-2 bg-brand text-primary-foreground py-2.5 rounded-md font-medium hover:bg-brand-hover transition-colors shadow-sm mb-6">
                        <Plus className="h-5 w-5" />
                        <span>New Ticket</span>
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Ticket</DialogTitle>
                    <DialogDescription>
                        Add a new ticket to the helpdesk. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                            placeholder="Brief summary of the issue"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Type
                        </Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Task">Task</SelectItem>
                                <SelectItem value="Bug">Bug</SelectItem>
                                <SelectItem value="Question">Question</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                            Priority
                        </Label>
                        <Select value={priority} onValueChange={setPriority}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Urgent">Urgent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="description" className="text-right mt-2">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                            placeholder="Detailed description..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={mutation.isPending || !title.trim()}>
                        {mutation.isPending ? "Creating..." : "Create Ticket"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
