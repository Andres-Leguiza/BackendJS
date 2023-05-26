import moment from 'moment';
export default class TicketDTO {

    constructor(ticket){
        this.id = ticket._id || ticket.id;
        this.code = ticket.code;
        this.purchase_date = moment(ticket.purchase_date).format('MM/DD/YYYY');
        this.amount = ticket.amount;
        this.purchaser = ticket.purchaser;
    }
}