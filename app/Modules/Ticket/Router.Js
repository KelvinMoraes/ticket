let TicketController = require('./Controllers/TicketController.js');

/**
 * @author Raviel Chausse Silveira
 */
module.exports = (app) => {

    const PREFIXE = '/boleto';

    app.get(`${PREFIXE}/:linhaDigitavel`, TicketController.getTickets);

};
