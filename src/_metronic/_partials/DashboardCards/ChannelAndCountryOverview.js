import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChannelAndCountryOverview = () => {

    const data = {
        labels: [
            'USA',
            'Canada',
            'UK',
            'Australia',
            'Europe'
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
            text: 'Channel And Country Overview'
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 10,
                        stepSize: 1
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

export default ChannelAndCountryOverview;
