const express = require('express');
const cors = require ("cors");
const mongoose = require('mongoose');

const usersRouter = require('./routes/users')
const categoriesRouter = require('./routes/categories')
const articlesRouter = require('./routes/articles')


require('dotenv').config();

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ credentials: true, origin: [ process.env.CLIENT_URL] }));


app.get("/", (req, res) => {
    res.json({ message: "App is working" });
});


app.use("/users", usersRouter);
app.use("/categories", categoriesRouter)
app.use("/articles", articlesRouter)



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