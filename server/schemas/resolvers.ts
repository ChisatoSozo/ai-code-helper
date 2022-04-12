import {
    login, 
    signUp,
    addToChatHistory,
    deleteChatHistory,  
} from "../controllers/index";

export const resolvers = {
    Mutation: {
        login, 
        signUp, 
        addToChatHistory, 
        deleteChatHistory, 
    }
};