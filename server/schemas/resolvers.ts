import {
    login, 
    createUser,
    addToChatHistory,
    deleteChatHistory,  
    getUser, 
} from "../controllers";

export const resolvers = {
    Mutation: {
        login, 
        createUser, 
        addToChatHistory, 
        deleteChatHistory, 
    }, 
    Query: {
        getUser,
    }
};