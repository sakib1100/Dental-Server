const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.Db_user}:${process.env.Db_pass}@cluster0.ppwrhof.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  

async function run(){

try{
await client.connect();
const bookingCollection = client.db('Dental-clinic').collection('bookings');
const servicesCollection = client.db('Dental-clinic').collection('services');


// insert data form booking modal

app.post('/booking', async (req,res) => {
const booking = req.body;
 result = await bookingCollection.insertOne(booking);
res.send(result);
})



app.get('/serviceGet', async(req,res) => {
  const getService = await servicesCollection.find({}).toArray();
  res.send(getService);
})





// view booking data 


app.get('/booking', async(req,res) => {
  const patients = req.query.patient;
  const querys = {patent:patients};
  const booking = await bookingCollection.find(querys).toArray();
  res.send(booking);
})





}

finally{

}

}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Dental app listening on port ${port}`)
});