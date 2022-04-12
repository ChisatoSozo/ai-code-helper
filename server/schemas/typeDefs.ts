import {gql} from "apollo-server";

export const typeDefs = gql`
    type User{
        username: String, 
        email: String, 
        chat: [Chat]
    }

    type Auth{
        token: ID!
        user: User
    }

    type Chat{
        _id: ID 
        createdAt: String
        conversation: String
    }

    type Query{
        users: [User]
        user(username: String!): User
    }
    
    type Mutation{
        login(email: String!, password: String!): Auth
        signUp(username: String!, email: String!, password: String!): Auth
    }
`;