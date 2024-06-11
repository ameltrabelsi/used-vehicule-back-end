const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const usersRouter = require('./routes/users')
const categorieRouter = require ('./routes/categorie')

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "App is working" });
});


app.use("/users", usersRouter);
app.use("/categorie",categorieRouter)
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB_CONNECTION)
        .then(() => {
            console.log('Successfully connected to MongoDB');
            app.listen(PORT, () => {
                console.log(`Server is listening on port ${PORT}`);
            });
        })
        .catch(error => {
            console.log(error);
        })