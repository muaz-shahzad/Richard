import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseCalculator = () => {
    const [expenses, setExpenses] = useState({
        month1: '',
        month2: '',
        month3: ''
    });
    const [predictedExpense, setPredictedExpense] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [months, setmonths] = useState({
        month1: '',
        month2: '',
        month3: ''
    });


   
    useEffect(() => {
        const currentDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonthIndex = currentDate.getMonth();
        setCurrentMonth(monthNames[currentMonthIndex]);

        const lastThreeMonths = [
            monthNames[(currentMonthIndex + 9) % 12], 
            monthNames[(currentMonthIndex + 10) % 12],
            monthNames[(currentMonthIndex + 11) % 12] 
        ];
        setmonths(prevState => ({
            ...prevState,
            month1: lastThreeMonths[0],
            month2: lastThreeMonths[1],
            month3: lastThreeMonths[2]
        }));
    }, []);

    
    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setExpenses(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://localhost:8000/predict/', expenses);
            setPredictedExpense(response.data.predictedExpense);
        } catch (error) {
            console.error('Error:', error);
        }
    };

  

    return (
        <div className="container mb-5 mt-5">
            <h2>Expense Prediction for {currentMonth}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-4">
                    <label htmlFor="month1" className="form-label">{months.month1}</label>
                    <input type="number" className="form-control" id="month1" name="month1" value={expenses.month1} onChange={handleExpenseChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="month2" className="form-label">{months.month2}</label>
                    <input type="number" className="form-control" id="month2" name="month2" value={expenses.month2} onChange={handleExpenseChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="month3" className="form-label">{months.month3}</label>
                    <input type="number" className="form-control" id="month3" name="month3" value={expenses.month3} onChange={handleExpenseChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Predict Expense</button>
            </form>
            {predictedExpense && (
                <div className="mt-3">
                    Predicted expense for {currentMonth}: ${predictedExpense.toFixed(2)}
                </div>
            )}
        </div>
    );
};

export default ExpenseCalculator;
