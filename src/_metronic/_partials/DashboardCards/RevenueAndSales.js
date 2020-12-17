import React from 'react';
import { Bar } from 'react-chartjs-2';

const RevenueAndSales = () => {

    const data = {
        labels: [
            'Jan    ',
            'Feb',
            'Mar',
            'April',
            'May',
        ],
        datasets: [
            {
                label: '',
                data: [3, 2, 2, 1, 5],
                // borderColor: [
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(75, 192, 192, 1)',
                // ],
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                // borderWidth: 5
            },
            {
                label: '',
                data: [1, 3, 2, 2, 3],
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Revenue And Sales'
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 10,
                        stepSize: 2
                    }
                }
            ]
        }
    }

    return (
        <div>
            <Bar
                data={data}
                options={options}
            />
        </div>
    )
}

export default RevenueAndSales;
