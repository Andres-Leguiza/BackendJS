export default class TicketDTO {
    constructor(ticket){
        this.id = ticket._id || ticket.id;
        this.code = ticket.code;
        this.purchase_date = ticket.purchase_date;
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
    }
}