const path = require('path');
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
// handlebars
const exphbs = require('express-handlebars');
// passport
const passport = require('passport');
// passport config
require('./config/passport')(passport)
// Express session
const session = require('express-session')
const MongoStore = require('connect-mongo');


// Connect to Mongo Database
connectToDb()



// if in the develpment enviorment have the application use  morgan 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars ((get from npmjs, just type express-handlebars ) )
app.engine('.hbs', exphbs.engine(
    {
        defaultLayout: 'main',
        extname: '.hbs'
    }
));
app.set('view engine', '.hbs');


// Session- Middleware/ must be above passport middleware (get from npmjs, just type express-handlebars)
app.use(session(
    {
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
    }
))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())


// Routes
app.use('/', require('./routes/index'))
app.use('/dashboard', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Starts Server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} node on port ${PORT}`)
});