const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
let db;

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username, password });
  user ? res.json({ success: true, user }) : res.status(401).json({ error: 'Invalid credentials' });
});

const users = [
  { username: "pablo", password: "password123", boardUrl: "https://view.monday.com/2005977860-aeaa3bbab705b013ab620f0f20ad927f?r=euc1", boardLabel: "Pilotage - Pablo" },
  { username: "redouane", password: "password123", boardUrl: "https://view.monday.com/2005977860-361177a26e8cc6c8e6ffb5929a062aae?r=euc1", boardLabel: "Pilotage - Redouane" },
  { username: "adam", password: "password123", boardUrl: "https://view.monday.com/2005977860-a343355404ff50476549f6a13e99892e?r=euc1", boardLabel: "Pilotage - Adam" },
  { username: "hachem", password: "password123", boardUrl: "https://view.monday.com/2005977860-04e9ffdc4b3efda44c770a48ecf52e52?r=euc1", boardLabel: "Pilotage - Hachem" },
  { username: "jalal", password: "password123", boardUrl: "https://view.monday.com/2005977860-1351be764db46e3c1dfcc5be9843a46e?r=euc1", boardLabel: "Pilotage - Jalal" },
];

client.connect().then(async () => {
  db = client.db('Tuesday');
  const col = db.collection('users');
  for (const u of users) {
    await col.updateOne({ username: u.username }, { $set: u }, { upsert: true });
  }
  console.log('Users seeded');
  app.listen(3001, () => console.log('API on :3001'));
});
