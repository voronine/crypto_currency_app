const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https://www.gstatic.com'],
    },
  }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

const currencyRoutes = require('./routes/currency');
app.use('/api/currency', currencyRoutes);

const valueRoutes = require('./routes/value');
app.use('/api/value', valueRoutes);
