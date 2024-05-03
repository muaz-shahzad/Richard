import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './Investment1.css';
import 'chart.js/auto';
import { Chart, ArcElement } from 'chart.js';

const PieChart = ({ startingAmount, ttmYieldResult, fiveYearResult }) => {
    Chart.register(ArcElement);

    const data = {
        labels: ['Starting Amount', 'TTM Yield', '5 Year Investment'],
        datasets: [
            {
                data: [
                    parseFloat(startingAmount),
                    parseFloat(ttmYieldResult),
                    parseFloat(fiveYearResult),
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
        aspectRatio: 1,
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
                    TTM Yield Investment: ${parseFloat(ttmYieldResult).toFixed(2)}
                </li>
                <li style={{ textAlign: 'left' }}>
                    <span style={{ backgroundColor: '#54BA6C', display: 'inline-block', width: '10px', height: '10px', marginRight: '5px' }}></span>
                    5 Year Investment: ${parseFloat(fiveYearResult).toFixed(2)}
                </li>
            </ul>
        </div>
    );
};

const Investment2 = () => {
    const [startingAmount, setStartingAmount] = useState(0);
    const [investmentOption, setInvestmentOption] = useState('Shelton Nasdaq-100 Index Investor (NASDX)');
    const [ttmYield, setTtmYield] = useState(0);
    const [fiveYearReturn, setFiveYearReturn] = useState(0);
    const [ttmYieldResult, setTtmYieldResult] = useState(0);
    const [fiveYearResult, setFiveYearResult] = useState(0);

    useEffect(() => {
       
        switch (investmentOption) {
            case 'Shelton Nasdaq-100 Index Investor (NASDX)':
                setTtmYield(0.39);
                setFiveYearReturn(21.8);
                break;
            case 'Victory Nasdaq-100 Index Fund (USNQX)':
                setTtmYield(0.56);
                setFiveYearReturn(21);
                break;
            case 'VALIC Company Nasdaq-100 Index Fund (VCNIX)':
                setTtmYield(0.23);
                setFiveYearReturn(20.85);
                break;
            case 'Voya Russell Large Cap Growth Index Portfolio (IRLSX)':
                setTtmYield(0.21);
                setFiveYearReturn(19.32);
                break;
            case 'Fidelity Series Large Cap Growth Index Fund (FHOFX)':
                setTtmYield(0.83);
                setFiveYearReturn(18.63);
                break;
            default:
                setTtmYield(0);
                setFiveYearReturn(0);
        }

        
        const amount = parseFloat(startingAmount);
        const rateTtmYield = parseFloat(ttmYield) / 100;
        const yearsTtmYield = 1; 

        if (!isNaN(amount) && !isNaN(rateTtmYield) && !isNaN(yearsTtmYield)) {
            let result = amount * Math.pow(1 + rateTtmYield, yearsTtmYield);
            result = Math.round(result * 100) / 100; 
            setTtmYieldResult(result);
        }

      
        const rateFiveYear = parseFloat(fiveYearReturn) / 100;
        const yearsFiveYear = 5; 

        if (!isNaN(amount) && !isNaN(rateFiveYear) && !isNaN(yearsFiveYear)) {
            let result = amount * Math.pow(1 + rateFiveYear, yearsFiveYear);
            result = Math.round(result * 100) / 100; 
            setFiveYearResult(result);
        }
    }, [startingAmount, investmentOption]);

    return (
        <div className="container p-5 border rounded-3 mt-5" style={{ backgroundColor: 'lightgray' }}>
            <div className="row rows">
                <div className="col-lg-12">
                    <div className="row rows">
                        <div className="col-lg-5">
                            <div className="form-group">
                                <label htmlFor="investmentOption" className="form-label">
                                    Name Of Investment
                                </label>
                                <select
                                    className="form-control"
                                    id="investmentOption"
                                    value={investmentOption}
                                    onChange={(e) => setInvestmentOption(e.target.value)}
                                >
                                    <option value="Shelton Nasdaq-100 Index Investor (NASDX)">Shelton Nasdaq-100 Index Investor (NASDX)</option>
                                    <option value="Victory Nasdaq-100 Index Fund (USNQX)">Victory Nasdaq-100 Index Fund (USNQX)</option>
                                    <option value="VALIC Company Nasdaq-100 Index Fund (VCNIX)">VALIC Company Nasdaq-100 Index Fund (VCNIX)</option>
                                    <option value="Voya Russell Large Cap Growth Index Portfolio (IRLSX)">Voya Russell Large Cap Growth Index Portfolio (IRLSX)</option>
                                    <option value="Fidelity Series Large Cap Growth Index Fund (FHOFX)">Fidelity Series Large Cap Growth Index Fund (FHOFX)</option>
                                </select>
                            </div>
                        </div>
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
                        <div className="col-lg-2">
                            <div className="form-group">
                                <label className="form-label">TTM Yield</label>
                                <div className="input-group">
                                    <div className="form-control">{ttmYield}%</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2">
                            <div className="form-group">
                                <label className="form-label">5 Year Investment</label>
                                <div className="input-group">
                                    <div className="form-control">{fiveYearReturn}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5  text-center">
                <h3>This investment will be worth after 1 Year (TTM Yield): <span className="text-primary">${ttmYieldResult}</span></h3>
            </div>
            <div className="mt-5  text-center">
                <h3>This investment will be worth after 5 Year: <span className="text-primary">${fiveYearResult}</span></h3>
            </div>

            <div className="container col-lg-4 text-center ">
                <div className="mt-4 ">
                    <PieChart
                        startingAmount={startingAmount}
                        ttmYieldResult={ttmYieldResult}
                        fiveYearResult={fiveYearResult}
                    />
                </div>
            </div>
        </div>
    );
};

export default Investment2;
