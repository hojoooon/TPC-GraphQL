const mongoose = require('mongoose');
// const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const  {MongoClient}  = require('mongodb');
const collectionName = 'data'
const uri = `mongodb+srv://hojoon:hj0402@tpc-data.pog56.mongodb.net/TPCData?retryWrites=true&w=majority`


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getData() {
  await client.connect();
  console.log('MongoDB Connected');
  const db = client.db('TPCData');
  const collection = db.collection(collectionName);
  return await collection.find({}).toArray();
}

module.exports = getData();