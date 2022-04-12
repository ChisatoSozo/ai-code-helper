const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    //User resolver
    async user(parent, { username }, context) => {
    return User.findOne({username}).populate('conversation');
    },

    
}
