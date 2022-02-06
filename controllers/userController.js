const db = require ('./../models');

// create main model
const User = db.users;
const Event = db.events;

const { validationResult } = require('express-validator');

/***
 * main workflow
 */

// Create User method
const createUser = async (req, res) => {
    try {

        // get all errors...
        const errors = validationResult(req);

        if(errors.errors.length > 0) {
            return res.status(422).send(errors);
        }
        
        // format data...
        const data = {
            email: req.body.email,
        };

        // check if user exists
        const checkEmail = await User.findOne({ where: { email: req.body.email}});

        if(checkEmail) {
            return res.status(422).send('Email already exists!');
        }
        
        // create user...
        const user = await User.create(data);

        // check if user exists
        if(user) {
            const response = {
                id: user.uuid,
                email: user.email,
                consents: [],
            };
            return res.status(201).send(response);
        }
        return res.status(422).send('An error occurred while creating user!');
    } catch (error) {
        return res.status(422).send('An error occurred while creating user!');
    }
};

// get user method
const getUser = async (req, res) => {
    try {
        const userID = req.params.id;
        const user = await User.findOne({ where: { uuid: userID, deleted: null}});

        // check if user exists
        if(!user) {
            return res.status(400).send('User does not exist');
        }

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

        // format response...
        const data = {
            id: user.uuid,
            email: user.email,
            consents: consents
        };

        // response...
        return res.status(200).send(data);   
    } catch (error) {
        // bad request...
        return res.status(400).send('An error occurred while getting user!');
    }
};

const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id; 

        // update delete
        const data = {
            deleted: new Date(),
        };

        await User.update(data, {
            where: {
                uuid: userID
            },
            force: true
        });

        return res.status(200).send('User data deleted successfully!');   
    } catch (error) {
        return res.status(400).send('Failed to delete user!');
    }
};

module.exports = {
    createUser,
    getUser,
    deleteUser
};