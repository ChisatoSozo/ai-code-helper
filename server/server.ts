import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {db} from './config';
import {ApolloServer} from 'apollo-server-express';
import {typeDefs,resolvers} from './schemas';
import {authMiddleware} from './middleware'
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async()=>{
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context:authMiddleware
    })

    await server.start();

    server.applyMiddleware({app});

    console.log(`Use GrapghQL at http://localhost:${PORT}${server.graphqlPath}`)

}

startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}


db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});