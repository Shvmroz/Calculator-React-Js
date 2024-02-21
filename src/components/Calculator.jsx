import React, { useState, useEffect } from 'react';
import HistoryIcon from '@mui/icons-material/History';
import { orange } from '@mui/material/colors';
import { Brightness4, Brightness7 } from '@mui/icons-material';

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
            // Replace the last operator with the new one
            setInput(input.slice(0, -1) + value);
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

    // handeling function for calculati0n =============================

    const handleCalculate = () => {
        try {
            const newResult = evaluateExpression(input);
            const roundedResult = Math.round(newResult * 100) / 100;
            const historyItem = `${input} = ${roundedResult}`;
            setResult(roundedResult.toString());
            setHistory([...history, historyItem]);
        } catch (error) {
            setResult('Error');
        }
    };
    // handling custom function which replace "eval" ===========================================
    const evaluateExpression = (expression) => {
        const tokens = expression.match(/\d+\.?\d*|[+\-*/]/g) || [];
        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const operand = parseFloat(tokens[i + 1]);
            if (isNaN(operand)) {
                throw new Error('Invalid expression');
            }
            switch (operator) {
                case '+':
                    result += operand;
                    break;
                case '-':
                    result -= operand;
                    break;
                case '*':
                    result *= operand;
                    break;
                case '/':
                    result /= operand;
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
        return result;
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

                {/* Table Buttons============== */}
                <div className="buttons">
                    <table>
                        <tr>
                            <td colSpan='2'><button className='clear expression-clr' onClick={handleClear}>C</button></td>
                            <td><button className="backspace expression-clr" onClick={handleBackspace} >DEL</button></td>
                            <td><button className='expression-clr' onClick={() => handleButtonClick('/')}>÷ /</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleButtonClick('7')}>7</button></td>
                            <td><button onClick={() => handleButtonClick('8')}>8</button></td>
                            <td><button onClick={() => handleButtonClick('9')}>9</button></td>
                            <td><button className='expression-clr' onClick={() => handleButtonClick('*')}>x</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleButtonClick('4')}>4</button></td>
                            <td><button onClick={() => handleButtonClick('5')}>5</button></td>
                            <td><button onClick={() => handleButtonClick('6')}>6</button></td>
                            <td><button className='expression-clr' onClick={() => handleButtonClick('-')}>-</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={() => handleButtonClick('1')}>1</button></td>
                            <td><button onClick={() => handleButtonClick('2')}>2</button></td>
                            <td><button onClick={() => handleButtonClick('3')}>3</button></td>
                            <td><button className='expression-clr' onClick={() => handleButtonClick('+')}>+</button></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button className='zero' onClick={() => handleButtonClick('0')}>0</button></td>
                            <td><button onClick={() => handleButtonClick('.')}>.</button></td>
                            <td><button style={{ backgroundColor: 'orange', color: 'black' }} onClick={handleCalculate}>=</button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Calculator;

