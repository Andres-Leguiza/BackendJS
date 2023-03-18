import TicketDTO from './ticketDTO.js';

export class TicketRepository {
    constructor(dao){
        this.dao = dao;
    }

    async createTicket(data){
        const ticket = await this.dao.createTicket(data);
        const ticketDTO = ticket ? new TicketDTO(ticket) : null;
        return ticketDTO;
    }
}