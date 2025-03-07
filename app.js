// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

const { isAuthenticated } = require("./middleware/jwt.middleware");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes, isAuthenticated);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes, isAuthenticated);

// const beatRoute = require("./routes/beat.routes");
// app.use('/', beatRoute);

// const profileRoute = require("./routes/profile.routes");
// app.use('/', profileRoute);

// const contactRoute = require('./routes/contact.routes');
// app.use('/', contactRoute);

// const musicRoute = require('./routes/music.routes');
// app.use('/', musicRoute);

// const purchaseRoute = require('./routes/purchase.routes');
// app.use('/', purchaseRoute);


const Appointments = require('./routes/appointments.routes');
app.use('/appointments', Appointments);

const Services = require('./routes/services.routes');
app.use('/services', Services);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
