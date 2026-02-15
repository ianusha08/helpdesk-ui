const { v4: uuidv4 } = require('uuid');

const users = {
    allie: { name: "Allie Harmon", avatar: "", email: "allie@capacity.com", initials: "AH" },
    danny: { name: "Danny Amacher", avatar: "", email: "danny@capacity.com", initials: "DA" },
    allison: { name: "Allison Westervelt", avatar: "", email: "awestervelt@email.com", initials: "AW" },
    mike: { name: "Mike Johnson", avatar: "", email: "mike@capacity.com", initials: "MJ" },
    dk: { name: "David Kim", avatar: "", email: "dk@capacity.com", initials: "DK" },
};

let tickets = [
    {
        id: "APPS-216", internalId: "100669520", title: "Soluta quam velit",
        status: "To Do", priority: "High", assignee: users.allie, reporter: users.allie,
        project: "Applications", type: "Task", dueDate: null, createdAt: "2022-11-14T12:32:00Z",
        date: "Jun 2", watchers: [users.allie, users.danny, users.dk],
        linkedTickets: [], tags: ["Frontend", "Design"],
        messages: [{
            id: "m1", author: users.allie, to: "danny@capacity.com",
            body: "Ex beatae aliquid mollitia. Enim doloremque molestiae voluptatem recusandae.",
            attachments: [], timestamp: "Feb 9, 2022 10:31 AM", type: "public_reply"
        }],
    },
    {
        id: "OPS-102", internalId: "100669518", title: "Laudantium neque veritatis",
        status: "To Do", priority: "Medium", assignee: users.allie, reporter: users.allie,
        project: "Administrative", type: "Task", dueDate: null, createdAt: "2022-11-14T12:32:00Z",
        date: "Jun 2", watchers: [users.allie, users.danny, users.dk],
        linkedTickets: [
            { id: "CAP-123", title: "quo vitae omnis", status: "To Do" },
            { id: "CAP-124", title: "autem pariatur ipsa", status: "In Progress" },
            { id: "CAP-125", title: "reprehenderit earum nesciunt", status: "Done" },
        ],
        tags: ["Review"],
        messages: [
            {
                id: "m2", author: users.allie, to: "Danny Amacher <danny@capacity.com>",
                body: "Ex beatae aliquid mollitia. Enim doloremque molestiae voluptatem recusandae. Maxime beatae nostrum ut. Deserunt totam aut nihil quo beatae. Quas non delectus praesentium est illum vitae nemo iure.",
                attachments: [
                    { filename: "Screen_shot.png", uploadedAt: "16 Jun 2022, 1:30 PM" },
                    { filename: "Screen_shot.png", uploadedAt: "16 Jun 2022, 1:30 PM" },
                ],
                timestamp: "Feb 9, 2022 10:31 AM", type: "public_reply",
            },
            {
                id: "m3", author: users.allie, to: "Danny Amacher <danny@capacity.com>",
                body: "Dolorem similique et aliquid illum dolor. Vel quo magnam.",
                attachments: [], timestamp: "Feb 9, 2022 10:31 AM", type: "public_reply",
            },
        ],
    },
    {
        id: "APPS-217", internalId: "100669517", title: "Molestiae saepe illum",
        status: "To Do", priority: "Medium", assignee: users.allie, reporter: users.allie,
        project: "Applications", type: "Task", dueDate: null, createdAt: "2022-06-01T12:00:00Z",
        date: "Jun 1", watchers: [users.allie, users.danny],
        linkedTickets: [], tags: ["Frontend"],
        messages: [],
    },
    {
        id: "APPS-218", internalId: "100669516", title: "Dignissimos maiores porro",
        status: "To Do", priority: "Medium", assignee: users.allie, reporter: users.allie,
        project: "Applications", type: "Task", dueDate: null, createdAt: "2022-05-31T12:00:00Z",
        date: "May 31", watchers: [users.allie, users.danny],
        linkedTickets: [], tags: ["Design"],
        messages: [],
    },
    {
        id: "APPS-219", internalId: "100669515", title: "Nihil porro repudiandae",
        status: "To Do", priority: "Medium", assignee: users.allie, reporter: users.allie,
        project: "Applications", type: "Task", dueDate: null, createdAt: "2022-05-31T12:00:00Z",
        date: "May 31", watchers: [users.allie],
        linkedTickets: [], tags: ["Review"],
        messages: [],
    },
    {
        id: "APPS-220", internalId: "100669514", title: "Aspernatur cumque ipsum",
        status: "To Do", priority: "Medium", assignee: users.allie, reporter: users.allie,
        project: "Applications", type: "Task", dueDate: null, createdAt: "2022-05-30T12:00:00Z",
        date: "May 30", watchers: [users.allie, users.danny],
        linkedTickets: [], tags: ["Frontend", "Review"],
        messages: [],
    },
    {
        id: "APPS-221", internalId: "100669513", title: "Culpa quos aliquam",
        status: "To Do", priority: "Medium", assignee: users.allie, reporter: users.allie,
        project: "Applications", type: "Task", dueDate: null, createdAt: "2022-05-30T12:00:00Z",
        date: "May 30", watchers: [users.allie],
        linkedTickets: [], tags: [],
        messages: [],
    },
    {
        id: "APPS-222", internalId: "100669512", title: "Atque incidunt autem",
        status: "To Do", priority: "Medium", assignee: users.allie, reporter: users.allie,
        project: "Applications", type: "Task", dueDate: null, createdAt: "2022-05-30T12:00:00Z",
        date: "May 30", watchers: [users.allie],
        linkedTickets: [], tags: ["Design"],
        messages: [],
    },
    {
        id: "APPS-223", internalId: "100669511", title: "Ut sapiente sunt",
        status: "Done", priority: "Low", assignee: users.allie, reporter: users.allie,
        project: "Applications", type: "Task", dueDate: null, createdAt: "2022-05-29T12:00:00Z",
        date: "May 29", watchers: [users.allie],
        linkedTickets: [], tags: [],
        messages: [],
    },
];

module.exports = { tickets, users };
