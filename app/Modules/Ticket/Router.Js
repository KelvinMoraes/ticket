let TicketController = require('./Controllers/TicketController.js');

module.exports = (app) => {

    const PREFIXE = '/boleto';

    app.get(`${PREFIXE}/:linhaDigitavel`, TicketController.getTickets);

};
