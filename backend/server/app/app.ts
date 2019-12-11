import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import schema from '../schema/schema';
import mongoose, { Schema } from 'mongoose';
require('dotenv').config()

//.ts file is compiled to .js file located in build folder 
// this is included in scripts

//In a production ready code, the URI would be fetched from a .env file
mongoose.connect('mongodb+srv://admin:this4now@empdb-qd8za.mongodb.net/empdb?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


//setting up an express application
const app: express.Application = express();


//allow cross-origin requests
//app.use(cors);


app.use(bodyParser.json());
const port = 4000; //should come from environments file
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

//option of playground and UI available with graphiql set to true
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.get('/', (req, res) => {
    res.send("Programming challenge for Structural. Navigate to /graphql for playground.");
});

// check if mongoose connection has been established, and then start listening on the port
mongoose.connection.once('open', () => {
    try {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Listening for requests on port ${port}`)
        });
    } catch (error) {
        console.error('Could not connect to Database!');
    }
});



