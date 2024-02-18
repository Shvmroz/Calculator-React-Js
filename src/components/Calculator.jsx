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
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleButtonClick = (value) => {
        if (result && !isNaN(value)) {
            setInput(result + value);
            setResult('');
        } else if (result && isNaN(value) && value !== '.') {
            setInput(result + value);
            setResult('');
        } else if (value === '%') {
            try {
                const percentage = parseFloat(input) / 100;
                setInput(percentage.toString());
            } catch (error) {
                setInput('Error');
            }
        } else {
            setInput(input + value);
        }
    };

    const handleCalculate = () => {
        try {
            const expression = input.replace(/[^-()\d/*+.]/g, '');
            const newResult = math.evaluate(expression);
            const historyItem = `${input} = ${newResult}`;
            setResult(newResult.toString());
            setHistory([...history, historyItem]);
        } catch (error) {
            setResult('Error');
        }
    };

    const handleClear = () => {
        setInput('');
        setResult('');
        setHistory([]);
    };

    const handleBackspace = () => {
        setInput(input.slice(0, -1));
    };

    const handleKeyboardInput = (event) => {
        const keyValue = event.key;

        if (/[0-9.+\-*/%]/.test(keyValue)) {
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
                <div className='row'>
                    <div className='col-6'>
                        <span><HistoryIcon fontSize="small" sx={{ color: orange[500] }} /></span>
                    </div>
                    <div className="col-6">
                        <span onClick={toggleDarkMode}>
                            {darkMode ? <Brightness7 fontSize="small"/> : <Brightness4 fontSize="small" sx={{ color: orange[500] }} />}
                        </span>
                    </div>
                </div>
             
                <div className="history">
                    {history.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
                <div className="row">
                    <input className="input" type="text" value={result || input} readOnly />
                </div>
                <hr />
                <div className="buttons">
                    <div className="row">
                        <button onClick={handleClear} style={{ backgroundColor: 'orange' }}>C</button>
                        <button onClick={handleBackspace} className="backspace">DEL</button>
                        <button onClick={() => handleButtonClick('%')}>%</button>
                        <button onClick={() => handleButtonClick('/')}>÷ /</button>
                    </div>
                    <div className="row">
                        <button onClick={() => handleButtonClick('7')}>7</button>
                        <button onClick={() => handleButtonClick('8')}>8</button>
                        <button onClick={() => handleButtonClick('9')}>9</button>
                        <button onClick={() => handleButtonClick('*')}>x</button>
                    </div>
                    <div className="row">
                        <button onClick={() => handleButtonClick('4')}>4</button>
                        <button onClick={() => handleButtonClick('5')}>5</button>
                        <button onClick={() => handleButtonClick('6')}>6</button>
                        <button onClick={() => handleButtonClick('-')}>-</button>
                    </div>
                    <div className="row">
                        <button onClick={() => handleButtonClick('1')}>1</button>
                        <button onClick={() => handleButtonClick('2')}>2</button>
                        <button onClick={() => handleButtonClick('3')}>3</button>
                        <button onClick={() => handleButtonClick('+')}>+</button>
                    </div>
                    <div className="row">
                        <button onClick={() => handleButtonClick('0')}>0</button>
                        <button onClick={() => handleButtonClick('.')}>.</button>
                        <button style={{ width: '113px', backgroundColor: 'orange' }} onClick={handleCalculate}>=</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;

