import { TicketModel } from '../../models/ticket.model.js';

export async function createTicket(data){
    const ticket = TicketModel.create(data);
    return ticket;
}