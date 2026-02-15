import axios from 'axios';
import { Ticket } from '../data/mockData';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


export const getTickets = async (): Promise<Ticket[]> => {
    const response = await api.get('/');
    return response.data;
};

export const getTicketById = async (id: string): Promise<Ticket> => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createTicket = async (ticketData: Partial<Ticket>): Promise<Ticket> => {
    const response = await api.post('/', ticketData);
    return response.data;
};

export const updateTicket = async (id: string, updates: Partial<Ticket>): Promise<Ticket> => {
    const response = await api.put(`/${id}`, updates);
    return response.data;
};

export const deleteTicket = async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
};

export const addMessage = async (id: string, messageData: any) => {
    const response = await api.post(`/${id}/messages`, messageData);
    return response.data;
}

export default api;
