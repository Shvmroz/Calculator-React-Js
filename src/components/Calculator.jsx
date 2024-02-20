import React, { useState, useEffect } from 'react';
import { create, all } from 'mathjs';
import HistoryIcon from '@mui/icons-material/History';
import { orange } from '@mui/material/colors';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const math = create(all);
const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    // handle dark mode =================================
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    // handle button clicks =================================================================
    const handleButtonClick = (value) => {
        // Check if the last input was an operator
        const lastInputWasOperator = /[+\-*/]$/.test(input);
        if (lastInputWasOperator && /[+\-*/]/.test(value)) {
            // If the last input was an operator and the new input is also an operator, Return nothing
            return;
        }
        if (result && !isNaN(value)) {
            setInput(result + value);
            setResult('');
        } else if (result && isNaN(value) && value !== '.') {
            setInput(result + value);
            setResult('');
        } else {
            setInput(input + value);
        }
    };
 
    // handeling function for calculating =============================
    const handleCalculate = () => {
        try {
            const expression = input.replace(/[^-()\d/*+.]/g, '');
            let newResult = math.evaluate(expression);
            // Round the result to two decimal places after the decimal point
            newResult = Math.round(newResult * 100) / 100;
            const historyItem = `${input} = ${newResult}`;
            setResult(newResult.toString());
            setHistory([...history, historyItem]);
        } catch (error) {
            setResult('Error');
        }
    };
    // clear the history ================================================
    const handleClear = () => {
        setInput('');
        setResult('');
        setHistory([]);
    };
    const handleBackspace = () => {
        setInput(input.slice(0, -1));
    };
    // Keypress event, handle ==========================================
    const handleKeyboardInput = (event) => {
        const keyValue = event.key;
        if (/[0-9.+\-*/]/.test(keyValue)) {
            handleButtonClick(keyValue);
        } else if (keyValue === 'Enter' || keyValue === '=') {
            handleCalculate();
        } else if (keyValue === 'Backspace') {
            handleBackspace();
        } else if (keyValue === 'Escape' || keyValue === 'c') {
            handleClear();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboardInput);
        return () => {
            document.removeEventListener('keydown', handleKeyboardInput);
        };
    });

    return (
        <div className={`calculator ${darkMode ? 'dark-mode' : ''}`}>
            <div className='container-fluid'>
                <div className='header'>
                    <span>
                        <HistoryIcon fontSize="small" sx={{ color: orange[500] }} />
                    </span>
                    {/* Dark Mode Toogle ============== */}
                    <span onClick={toggleDarkMode}>
                        {darkMode ?
                            <Brightness7 fontSize="small" />
                            :
                            <Brightness4 fontSize="small" sx={{ color: orange[500] }} />}
                    </span>
                </div>
                {/* History div ============== */}
                <div className="history">
                    {history.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
                {/* Input ============== */}
                <div className="container-fluid">
                    <input className="input" type="text" value={result || input} readOnly />
                </div>
                <hr />
                {/* Table Buttons============== */}
                <div className="buttons">
                    <table>
                        <tr>
                            <td colSpan='2'><button className='o-clr' style={{width: '112px'}} onClick={handleClear}>C</button></td>
                            <td><button className="backspace o-clr" onClick={handleBackspace} >DEL</button></td>
                            <td><button className='o-clr' onClick={() => handleButtonClick('/')}>÷ /</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleButtonClick('7')}>7</button></td>
                            <td><button onClick={() => handleButtonClick('8')}>8</button></td>
                            <td><button onClick={() => handleButtonClick('9')}>9</button></td>
                            <td><button className='o-clr' onClick={() => handleButtonClick('*')}>x</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleButtonClick('4')}>4</button></td>
                            <td><button onClick={() => handleButtonClick('5')}>5</button></td>
                            <td><button onClick={() => handleButtonClick('6')}>6</button></td>
                            <td><button className='o-clr' onClick={() => handleButtonClick('-')}>-</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleButtonClick('1')}>1</button></td>
                            <td><button onClick={() => handleButtonClick('2')}>2</button></td>
                            <td><button onClick={() => handleButtonClick('3')}>3</button></td>
                            <td><button className='o-clr' onClick={() => handleButtonClick('+')}>+</button></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button style={{width: '112px' }} onClick={() => handleButtonClick('0')}>0</button></td>
                            <td><button onClick={() => handleButtonClick('.')}>.</button></td>
                            <td><button style={{backgroundColor: 'orange'}} onClick={handleCalculate}>=</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Calculator;

