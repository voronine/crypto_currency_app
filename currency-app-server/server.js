const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", 'https://www.gstatic.com'],
        styleSrc: ["'self'", 'https://www.gstatic.com', "'unsafe-inline'"],
        scriptSrc: ["'self'", 'https://www.gstatic.com', "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https://www.gstatic.com'],
        connectSrc: ["'self'", 'https://www.gstatic.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'], // Если нужны шрифты
        objectSrc: ["'none'"], // Запрещает загрузку плагинов
        upgradeInsecureRequests: [] // Автоматически переводит HTTP-запросы в HTTPS
    }
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;

const currencyRoutes = require('./routes/currency');
app.use('/api/currency', currencyRoutes);

const valueRoutes = require('./routes/value');
app.use('/api/value', valueRoutes);

// Статические файлы из папки 'build' клиентского приложения
app.use(express.static(path.join(__dirname, 'build')));

// Отправка 'index.html' для всех остальных маршрутов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
