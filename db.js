import { MongoClient } from 'mongodb';

const uri = 'YOUR_MONGODB_URI';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect();

export default client;
