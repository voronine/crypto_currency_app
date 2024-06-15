// src/components/ValuesChart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const ValuesChart = () => {
    const values = useSelector((state) => state.value.values);

    // Сортируем значения по дате
    const sortedValues = values.slice().sort((a, b) => new Date(a.time) - new Date(b.time));

    // Формируем данные и цвета для столбиков
    const data = {
        labels: sortedValues.map((value) => {
            const date = new Date(value.time);
            const formattedTime = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)} ${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`;
            return formattedTime;
        }),
        datasets: [
            {
                label: 'Amount in USDT',
                data: sortedValues.map((value) => value.amount),
                backgroundColor: sortedValues.map((value, index) => {
                    if (index === 0) return 'green'; // Первый столбик зелёный
                    if (index === 1) return 'red'; // Второй столбик красный
                    return value.amount > sortedValues[index - 1].amount ? 'red' : 'green';
                }),
                borderColor: 'rgba(75, 192, 192, 0.2)',
                categoryPercentage: 1.0, // Полная ширина категории
                barPercentage: 1.0, // Полная ширина столбика
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: false, // Убираем подпись "Дата"
                },
                grid: {
                    offset: false, // Убираем смещение сетки
                    display: false, // Убираем сетку
                },
                ticks: {
                    autoSkip: false, // Показываем все метки
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount in USDT',
                },
                beginAtZero: true, // Начинаем ось Y с нуля
                grid: {
                    display: true, // Включаем сетку
                    drawBorder: false,
                    color: (context) => context.tick.value % 1000 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    borderDash: (context) => context.tick.value % 1000 === 0 ? [5, 5] : [],
                },
                ticks: {
                    callback: (value) => value % 1000 === 0 ? `${value}` : null,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Values Chart',
            },
        },
        maintainAspectRatio: false, // Отмена сохранения соотношения сторон для настройки ширины
    };

    return (
        <div style={{ width: '600px', height: '400px' }}>
            <h2>Values Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ValuesChart;
