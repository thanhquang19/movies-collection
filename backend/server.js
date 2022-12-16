const express = require('express');
const cors = require('cors');
const { MongoClient} = require('mongodb');

const server = express(); 
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 4001;


const uri = 'mongodb+srv://bobacorp:test123456@cluster0.laoajmy.mongodb.net/?retryWrites=true&w=majority';
const cluster = new MongoClient(uri);


const connectToDatabase = async () => {
    const database = 'movies';
    await cluster.connect();
    console.log(`server is sucessfully connected to database ${database}`);
    

}

server.get('/movies', async (req, res, next)=> {
    console.log(`${req.method} received to search movies`);
    connectToDatabase();
    console.log(req.query);
    const moviesCollection = cluster.db('movies').collection('movies');
    const movies = await moviesCollection.find(req.query).toArray();
    console.log(movies);
    res.send(movies);
})

server.post('/movies', async (req, res, next) => {
    console.log(`${req.method} to add new movie received`);
    console.log(req.body);
    connectToDatabase();
    const newMovie = req.body;
    const moviesCollection = cluster.db('movies').collection('movies');
    const addedId= await moviesCollection.insertOne(newMovie)
    .then(result => result.insertedId);
    console.log(addedId)
    const addedMovie = await moviesCollection.find({_id: addedId}).toArray();
    console.log(addedMovie);
    res.send(addedMovie);
})

server.listen(PORT, ()=> {
    console.log(`server is listening on PORT: ${PORT}`);
})