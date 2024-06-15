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
    const sortedValues = values.slice().sort((a, b) => new Date(a.time) - new Date(b.time));
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
                    if (index === 0) return 'green';
                    if (index === 1) return 'red';
                    return value.amount > sortedValues[index - 1].amount ? 'green' : 'red';
                }),
                borderColor: 'rgba(75, 192, 192, 0.2)',
                categoryPercentage: 1.0,
                barPercentage: 1.0,
                borderRadius: 10,
                
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: false,
                },
                grid: {
                    offset: false,
                    display: false,
                },
                ticks: {
                    autoSkip: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount in USDT',
                },
                beginAtZero: true,
                grid: {
                    display: true,
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
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '90%', height: '300px' }}>
            <h2>Values Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ValuesChart;
