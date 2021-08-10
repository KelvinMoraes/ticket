let Model = require($path.join(MODULES_PATH, '/Ticket/Models/Ticket'));

module.exports = {

    getTickets(req, res, next) {
        try {

            let model = new Model();

            return model.getTickets(req.params)
                .then((attributes) => {

                    return res.status(200).json(attributes);
                })
                .catch((e) => {
                    return res.status(400).json({message: e.message});
                });

        } catch (e) {

            $logger.error(e);
            return res.status(500).json(e);
        }
    }

};
