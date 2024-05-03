import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './Investment1.css';
import 'chart.js/auto';
import { Chart, ArcElement } from 'chart.js';


const PieChart = ({ startingAmount, investmentResult, rateOfReturn }) => {

    Chart.register(ArcElement)


    const data = {
        labels: ['Starting Amount', 'Total Interest Earned', 'Rate of Return'],
        datasets: [
            {
                data: [
                    parseFloat(startingAmount),
                    parseFloat(investmentResult - startingAmount),
                    parseFloat(rateOfReturn),
                ],
                backgroundColor: ['#F9B719', '#20A7E2', '#54BA6C'],
                hoverBackgroundColor: ['#F9B719', '#20A7E2', '#54BA6C'],
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false,
            },
        },
        layout: {
            padding: {
                left: 40,
                right: 40,
                top: 40,
                bottom: 5,
            },
        },
        aspectRatio: 1, // Aspect ratio 1:1 for a square chart
    };

    return (
        <div>
            <div className="text-center">
                <Pie data={data} options={options} />
            </div>
            <ul className="list-unstyled text-center  mt-3">
                <li style={{ textAlign: 'left' }}>
                    <span style={{ backgroundColor: '#F9B719', display: 'inline-block', width: '10px', height: '10px', marginRight: '5px' }}></span>
                    Starting Amount: ${parseFloat(startingAmount).toLocaleString()}
                </li>
                <li style={{ textAlign: 'left' }}>
                    <span style={{ backgroundColor: '#20A7E2', display: 'inline-block', width: '10px', height: '10px', marginRight: '5px' }}></span>
                    Total Interest Earned: ${parseFloat(investmentResult - startingAmount).toLocaleString()}
                </li>
                <li style={{ textAlign: 'left' }}>
                    <span style={{ backgroundColor: '#54BA6C', display: 'inline-block', width: '10px', height: '10px', marginRight: '5px' }}></span>
                    Rate of Return: {parseFloat(rateOfReturn).toFixed(2)}%
                </li>
            </ul>
        </div>
    );
};



const Investment1 = () => {


    const [startingAmount, setStartingAmount] = useState(0);
    const [frequency, setFrequency] = useState('Annually');
    const [rateOfReturn, setRateOfReturn] = useState(0);
    const [yearsToGrow, setYearsToGrow] = useState(0);
    const [investmentResult, setInvestmentResult] = useState(0);

    useEffect(() => {
        const amount = parseFloat(startingAmount);
        const rate = parseFloat(rateOfReturn) / 100;
        const years = parseInt(yearsToGrow);

        if (!isNaN(amount) && !isNaN(rate) && !isNaN(years)) {
            let result = amount * Math.pow(1 + rate, years);
            result = Math.round(result * 100) / 100; // Round to 2 decimal places
            setInvestmentResult(result);
        }
    }, [startingAmount, frequency, rateOfReturn, yearsToGrow]);

    return (
        <div className="container p-5 border rounded-3 mt-5" style={{ backgroundColor: 'lightgray' }}>
            <div className="row rows">
                <div className="col-lg-12">
                    <div className="row rows">
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="startingAmount" className="form-label">
                                    Starting Amount
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="startingAmount"
                                        value={startingAmount}
                                        onChange={(e) => setStartingAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="frequency" className="form-label">
                                    Frequency
                                </label>
                                <div className="form-control">
                                    Annually
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="rateOfReturn" className="form-label">
                                    Rate of Return (%)
                                </label>
                                <div className="input-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="rateOfReturn"
                                        value={rateOfReturn}
                                        onChange={(e) => setRateOfReturn(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <label htmlFor="yearsToGrow" className="form-label">
                                    Years to Grow
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="yearsToGrow"
                                    value={yearsToGrow}
                                    onChange={(e) => setYearsToGrow(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-5  text-center">
                <h3>This investment will be worth: <span className="text-primary">${investmentResult}</span></h3>
            </div>

            <div className="container col-lg-4 text-center ">
                <div className="mt-4 ">
                    <PieChart
                        startingAmount={startingAmount}
                        investmentResult={investmentResult}
                        rateOfReturn={rateOfReturn}
                    />
                </div>
            </div>
        </div>
    );
}

export default Investment1