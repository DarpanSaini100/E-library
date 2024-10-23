if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error(error));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
