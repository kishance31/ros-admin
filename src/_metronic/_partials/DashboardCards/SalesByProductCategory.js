import React from 'react';
import { Pie, defaults } from 'react-chartjs-2';

defaults.global.legend.position = 'bottom';

const SalesByProductCategory = ({ salesByProductCategory }) => {

    const data = {
        labels: salesByProductCategory.labels,
        datasets: [
            {
                label: 'Sales 2020 (M)',
                data: salesByProductCategory.data,
                backgroundColor: ["rgba(75, 192, 192, 1)"],
            }
        ]
    }
    const options = {
        title: {
            display: true,
            text: 'Sales by Product Category'
        },
        legend: {
            labels: {
                fontColor: 'black',
                fontSize: 15
            }
        }
    }

    return (
        <div>
            <Pie
                data={data}
                options={options}
            />
        </div>
    )
}

export default SalesByProductCategory;
