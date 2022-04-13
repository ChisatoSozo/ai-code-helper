import {
    login, 
    createUser,
    addToChatHistory,
    deleteChatHistory,  
} from "../controllers";

export const resolvers = {
    Mutation: {
        login, 
        createUser, 
        addToChatHistory, 
        deleteChatHistory, 
    }
};