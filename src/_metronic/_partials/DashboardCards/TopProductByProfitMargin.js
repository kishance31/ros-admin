import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const TopProductByProfitMargin = ({ topProfitMarginProducts }) => {

    const data = {
        labels: topProfitMarginProducts.labels,
        datasets: [
            {
                label: 'Product Name',
                data: topProfitMarginProducts.data,
                backgroundColor: ["rgba(75, 192, 192, 1)"]
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Top 10 Product By Profit Margin'
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
            <HorizontalBar
                data={data}
                options={options}
            />
        </div>
    )
}

export default TopProductByProfitMargin;
