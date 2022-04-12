const { AuthenticationError } = require('apollo-server-express');
const { User, Application, CoverLetter } = require('../models');
const { signToken } = require('../utils/auth');

export const resolvers={
    Query: {}
    Mutation: {}
}