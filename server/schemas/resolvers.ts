import {
    login, 
    signUp,
    addToChatHistory,
    deleteChatHistory,  
} from "../controllers";

export const resolvers = {
    Mutation: {
        login, 
        signUp, 
        addToChatHistory, 
        deleteChatHistory, 
    }
};