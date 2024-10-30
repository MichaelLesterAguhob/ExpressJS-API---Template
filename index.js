
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb+srv://admin:admin1234@aguhobdb.e7hub.mongodb.net/inventory-management-app?retryWrites=true&w=majority&appName=aguhobDB');

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');

app.use('/users', userRoutes)
// app.use('/items', itemRoutes)

if(require.main === module) {
	app.listen(4000, () => console.log(`API is now online on port: 4000`));
};

module.exports = {app, mongoose};