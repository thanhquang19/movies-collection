const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId} = require('mongodb');

const server = express(); 
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 4001;


const uri = 'mongodb+srv://bobacorp:test123456@cluster0.laoajmy.mongodb.net/?retryWrites=true&w=majority';
const cluster = new MongoClient(uri);


// create an app.use middleware to run this code i.o putting codes in each route
const connectToDatabase = async () => {
    const database = 'movies';
    await cluster.connect();
    console.log(`server is sucessfully connected to database ${database}`);
    

}

server.use((req, res, next) => {
    connectToDatabase()
    next();
})



server.get('/movies', async (req, res, next)=> {
    console.log(`${req.method} received to search movies`);
    // connectToDatabase();
    const searchTarget = {};

    if(req.query.hasOwnProperty('title')) {
        searchTarget.title = {$regex: new RegExp(req.query.title, 'i')}
    } //case insensitiven)
    
    if(req.query.hasOwnProperty('director')) {
        searchTarget.director =  {$all: req.query.director.split(', ')} ;
    }
    
    if(req.query.hasOwnProperty('cast')) {
        searchTarget.cast =  {$all: req.query.cast.split(', ')} ;
    }

    if(req.query.hasOwnProperty('year')) {
        searchTarget.year =  req.query.year ;
    }

    
    if(req.query.hasOwnProperty('rating')) {
        searchTarget.rating = {$gte: req.query.rating};
    }

    console.log(searchTarget);

    const moviesCollection = cluster.db('movies').collection('movies');
    try {
        const movies = await moviesCollection.find(searchTarget).toArray();
        res.send(movies);
    } catch (err) {
        console.log(err);
    } finally {
        cluster.close()
    }
    
})

server.post('/movies', async (req, res, next) => {
    console.log(`${req.method} to add new movie received`);
    console.log(req.body);
    const newMovie = req.body;
    const moviesCollection = cluster.db('movies').collection('movies');
    try {
        const addedId= await moviesCollection.insertOne(newMovie)
        .then(result => result.insertedId);
        const addedMovie = await moviesCollection.find({_id: addedId}).toArray();
        console.log(addedMovie);
        res.send(addedMovie);
    } catch(err) {
        console.log(err)
    } finally {
        cluster.close();
    }
})

server.put('/movies/:_id', async (req, res, next) => {
    console.log(`${req.method} to update a movie received`);
    console.log(req.params._id);
    console.log(req.body);
   
    const moviesCollection = cluster.db('movies').collection('movies');
    const _id = new ObjectId(req.params._id);
    try {
        // re-code this one to findAndUpdate with return the updated document, not original
        await moviesCollection.updateOne({_id: _id}, {$set:req.body})
        const movieWithUpdateInfo = await moviesCollection.findOne({_id:_id});
        console.log(movieWithUpdateInfo);
        res.send(movieWithUpdateInfo);
    } catch(err) {
        res.status(404).send();
    } finally {
        cluster.close()
    }
   

})
server.listen(PORT, ()=> {
    console.log(`server is listening on PORT: ${PORT}`);
})