import React from 'react';
import { Line } from 'react-chartjs-2';

const NewCustomersSignUp = ({ getCustomerSignupCount }) => {

    const data = {
        labels: getCustomerSignupCount.labels,
        datasets: [
            {
                label: 'Customers Sign Up',
                data: getCustomerSignupCount.data,
                backgroundColor: ["rgba(75, 192, 192, 1)"],
                // borderColor: ['rgba(255, 206, 86, 0.2)'],
                // backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                // pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
                // pointBorderColor: 'rgba(255, 206, 86, 0.2)'
            }
        ]
    }
    const options = {
        title: {
            display: true,
            text: 'New Customer SignUps '
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 16,
                        stepSize: 2
                    }
                }
            ]
        }
    }

    return (
        <div>
            <Line
                data={data}
                options={options}
            />
        </div>
    )
}

export default NewCustomersSignUp;
