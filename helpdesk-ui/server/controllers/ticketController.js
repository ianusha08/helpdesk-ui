const { tickets, users } = require('../data/store');
const { v4: uuidv4 } = require('uuid');

const getTickets = (req, res) => {
    res.json(tickets);
};

const getTicketById = (req, res) => {
    const ticket = tickets.find(t => t.id === req.params.id);
    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
};

const createTicket = (req, res) => {
    const newTicket = {
        id: `APPS-${Math.floor(Math.random() * 1000)}`, // Simple ID generation
        internalId: uuidv4(),
        createdAt: new Date().toISOString(),
        messages: [],
        linkedTickets: [],
        tags: [],
        watchers: [],
        project: "Applications",
        type: "Task",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        assignee: users.allie, // Default default
        reporter: users.allie,
        ...req.body
    };
    tickets.unshift(newTicket);
    res.status(201).json(newTicket);
};

const updateTicket = (req, res) => {
    const index = tickets.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        tickets[index] = { ...tickets[index], ...req.body };
        res.json(tickets[index]);
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
};

const deleteTicket = (req, res) => {
    const index = tickets.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        tickets.splice(index, 1);
        res.json({ message: 'Ticket deleted' });
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
};

// Message handling
const addMessage = (req, res) => {
    const ticketId = req.params.id;
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
        const newMessage = {
            id: uuidv4(),
            timestamp: new Date().toLocaleString(),
            ...req.body
        };
        ticket.messages.push(newMessage);
        res.status(201).json(newMessage);
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
};

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    addMessage
};
