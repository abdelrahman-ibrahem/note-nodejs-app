const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const noteRoute = require('./routes/note');
const userRoute = require('./routes/user');
const viewRoute = require('./routes/view');
// handel view engine
app.set('view engine' , 'pug');
// handel views and public folders
app.set('views', path.join(__dirname , 'views'));
app.use(express.static(path.join(__dirname , 'public')));


// handel middelware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan('dev'));


// handel db connection
mongoose.connect('mongodb://localhost/note-node-app').then(()=>{
    console.log('db is Connect');
}).catch(err=>{
    console.log(`Error: ${err.message}`);
});

// hande; routes
app.use('/' ,viewRoute);
// api routes 
app.use('/api/v1/notes' ,noteRoute );
app.use('/api/v1/users' ,userRoute);

app.listen(3000 , ()=>{
    console.log('Server is Running');
})