import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import nunjucks from 'nunjucks';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { config } from 'dotenv';
import { sequelize } from './src/models/sequelize.js';
config()
import router from './src/routes/router.js';
import { isAuthenticated } from './src/middlewares/auth.js';


const app = express();
const PORT = process.env.PORT || 5000;


// static folder
app.use(express.static(__dirname + 'public'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


//cookie & session
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}))

// view engine
nunjucks.configure(__dirname + 'src/views', {
    autoescape: true,
    express: app
})

app.use(router);

app.use('/', isAuthenticated, (req, res) => {
    res.render('account.html', {
        otp: req.session.otp
    })
})

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connection has been established');
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    })
    .catch(err => console.log("Unable to connect to database", err));


