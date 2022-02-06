const db = require ('./../models');

// create main model
const Event = db.events;
const User = db.users;

// validator...
const { validationResult } = require('express-validator');

const createEvents = async (req, res) => {
    try {

        // get all errors...
        const errors = validationResult(req);
        if(errors.errors.length > 0) {
            return res.status(422).send(errors);
        }

        const userID = req.params.id; // id of user...

        // check if user exists
        const user = await User.findOne({where: {uuid: userID, deleted: null}});

        if(!user) {
            return res.status(400).send('User does not exist');
        }

        // format data...
        const data = {
            consent: req.body.consent,
            enabled: req.body.enabled,
            user: userID
        };

        // create event...
        const event = await Event.create(data);

        // check if successful
        if(event) {

            // get all consents...
            const consents = await Event.findAll(
                {
                    attributes: ['id', 'enabled', ['consent', 'id']],
                    where: {
                        user: userID
                    },
                    order: [
                        ['id', 'DESC'],
                    ],
                }
            );

            // response...
            const response = {
                user: {
                    id: userID,
                },
                consents: consents
            };
            return res.status(201).send(response);
        }

        return res.status(400).send('An error occurred while creating consent!');
    } catch (error) {
        return res.status(400).send('An error occurred while creating consent!');
    }
};

module.exports = {
    createEvents,
};