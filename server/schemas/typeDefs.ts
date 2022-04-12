import {gql} from "apollo-server";

export const typeDefs = gql`
    type User{
        username:String, 
        email:String, 
        
    }

    type Auth{
        token: ID!
        user: User
    }

    type Query{
        users: [User]
        user(username: String!): User
        me: User
    }
    
    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;