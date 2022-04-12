import {gql} from "apollo-server";

export const typeDefs = gql`
    type User{
        id: Int!
        username: String!, 
        email: String!, 
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
        user(username: String!): User
    }
    
    type Mutation{
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        updateUser(id: Int!, Username: String): Boolean
        deleteChatHistory(id: Int!): Boolean
    }
`;