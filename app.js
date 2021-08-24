const express = require('express');
const Mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

Mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("mongodb connected successfully"))
.catch(err => console.log(err.message))


const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// api docs
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if(err) {
            res.status(400).json({
                error: err
            })
        }
        const docs = JSON.parse(data)
        res.json(docs)
    })
})

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error: 'Unauthorized!'});
    }
})

app.listen(port, () => { console.log(`Server listens on port ${port}`)})