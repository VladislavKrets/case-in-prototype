import {Line} from 'react-chartjs-2';
import React, {useEffect, useState} from "react";
import {Chart} from "chart.js";

function Graph(props) {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const [data, setData] = useState({
        labels: [...Array(30).keys()].map(x => x + 0.2),
        datasets: [
            {
                label: 'Датчик',
                data: [2],
                borderColor: `rgb(${red}, ${green}, ${blue})`,
                backgroundColor: `rgba(${red}, 
                ${green}, ${blue}, 0.5)`,
                pointRadius: 0
            }
        ],
    });
    const [options, setOptions] = useState({
        responsive: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: props.title || 'Chart.js Line Chart',
            },
        },
        animation: {
            duration: 0
        },
        scales: {
            yAxis: {
                min: -0.2,
                max: 4.2,
            },
            xAxis: {
                max: 30.2,
                min: -0.2
            }
        },
    });

    let chartReference = null;
    useEffect(()=>{
        let myInterval = setInterval(() => {
            const newData = {...data};
            const newOptions = {...options};
            let random = Math.random() > 0.5 ? 1 : -1;
            let number = newData.datasets[0].data[newData.datasets[0].data.length - 1] + random;
            if (number < 0 || number > 4) number = 1;
            newData.datasets[0].data.push(number);
            if (newData.datasets[0].data.length >= newData.labels.length) {
                newData.datasets[0].data = newData.datasets[0].data.slice(1);
                newData.labels = newData.labels.slice(1);
                newData.labels.push(newData.labels[newData.labels.length - 1] + 1);
                newOptions.scales.xAxis.min += 1;
                newOptions.scales.xAxis.max += 1;
            }
            setOptions(newOptions);
            setData(newData);
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    }, [data, options]);
    console.log(data.datasets[0].data)
    return (
        data ? <div>
            <Line ref={ref => chartReference = ref} options={options} data={data} height={300} width={400} redraw={true}/>
            <div>

            </div>
        </div> : <></>
    );
}

export default Graph