// Expxress
const express = require('express');
// DOTENV
const dotenv = require('dotenv');
// loads config
dotenv.config({ path: './config/config.env' });
//Application 
const app = express();
// PORT
const PORT = process.env.PORT || 8000;
// Database
const connectToDb = require('./config/db');
// morgan
const morgan = require('morgan');
const exphbs = require('express-handlebars');


// if in the develpment enviorment have the application use  morgan 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// handlebars
app.engine('.hbs', exphbs.engine(
    {
        defaultLayout: 'main',
        extname: '.hbs'
    }
));
app.set('view engine', '.hbs');


// Routes

app.use('/', require('./routes/index'))
app.use('/dashboard', require('./routes/index'))







// Connect to Mongo Database
connectToDb()


// Starts Server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} node on port ${PORT}`)
});