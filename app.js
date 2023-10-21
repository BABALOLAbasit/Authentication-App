const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');




const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Connect to the MongoDB database using Mongoose
const mongoURI ='mongodb+srv://Babalolabasit:interMILLAN007@cluster0.z1iuy59.mongodb.net/note-auth';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 .then((result) => app.listen(3000))
 .catch((err) => console.log(err));

 

//routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/tomatoes', requireAuth, (req, res) => res.render('tomatoes'));
app.use(authRoutes);
