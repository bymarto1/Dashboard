const express = require('express');
const app = express();

// Extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Utils
const logger = require('./utils/logger');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('./db/connect');
const listEndpoints = require('express-list-endpoints');

const authRouter = require('./routes/auth.js');
const dashboardRouter = require('./routes/dashboard.js');
//const openseaRouter = require('./routes/opensea');
//const adminRouter = require('./routes/admin');

const {
    authenticateUser,
    authenticateAdmin,
} = require('./middlewares/authentication');

const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
require('./db/connect');

require('./db/connect');
require('dotenv').config();

// Middlewares
app.use(express.json({ limit: '200MB' }));
app.use(express.urlencoded({ extended: true }));
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/dashboard', authenticateUser, dashboardRouter);
//app.use('/api/opensea', authenticateUser, openseaRouter);
//app.use('/api/admin', authenticateAdmin, adminRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const httpsPort = process.env.HTTPS_PORT || 13001;
const httpPort = process.env.PORT || 13000;
const host = '0.0.0.0';
 
const start = async () => {
    try {

        http.createServer(app).listen(httpPort, host, async () => {
            const hash = bcrypt.hashSync(process.env.ADMIN_PW, 10);
            const [admin, created] = await db.users.findOrCreate({
                where: { id: process.env.ADMIN_ID },
                defaults: {
                    id: process.env.ADMIN_ID,
                    username: 'admin',
                    hashedPassword: hash,
                    role: 'ADMIN',
                },
            });
            logger.log(`HTTP server is listening on port ${httpPort}...`, 1);
        });
        // https
        //     .createServer(
        //         {
        //             key: fs.readFileSync('my_cert.key'),
        //             cert: fs.readFileSync('my_cert.crt'),
        //         },
        //         app
        //     )
        //     .listen(httpsPort, function () {
        //         logger.log(`HTTPS server listening on ${httpsPort}`, 1);
        //     });
    } catch (error) {
        logger.log(error.message, 0);
    }
};
console.log(listEndpoints(app));

start();




  