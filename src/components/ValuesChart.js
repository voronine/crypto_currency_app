// src/components/ValuesChart.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    Legend
);

const ValuesChart = () => {
    const values = useSelector((state) => state.value.values);

    const data = {
        labels: values.map((value) => value.time),
        datasets: [
            {
                label: 'Amount in USDT',
                data: values.map((value) => value.amount),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'PP',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount in USDT',
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
    };

    return (
        <div>
            <h2>Values Chart</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default ValuesChart;
