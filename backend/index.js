const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017');
let db;

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await db.collection('users').findOne({ username, password });
	user ? res.json({ success: true, user }) : res.status(401).json({ error: 'Invalid credentials' });
});



client.connect().then(async () => {
	db = client.db('Tuesday');
	const col = db.collection('users');

	app.listen(3001, () => console.log('API on :3001'));
});
