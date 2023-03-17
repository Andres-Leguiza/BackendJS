import { TicketModel } from '../../models/ticket.model.js';

export async function createTicket(data){
    try {
        const ticket = TicketModel.create(data);
        return ticket;
    } catch (error) {
        throw new Error(error.message);
    }
}