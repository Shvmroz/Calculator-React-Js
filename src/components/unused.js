

// const Calculator = () => {
//     const [value, setValue] = useState('');
//     const [firstNum, setFirstNum] = useState("");
//     const [secondNum, setSecondNum] = useState("");
//     const [operation, setOperation] = useState("");
//     const [history, setHistory] = useState([]);

//     // handle dark mode ==========
//     const [darkMode, setDarkMode] = useState(false);
//     const toggleDarkMode = () => {
//         setDarkMode(!darkMode);
//     };
//     // handle button clicks ===========
//     const handleDigitClick = (digit) => {
//         if (!operation) {
//             setFirstNum(prevNum => prevNum + digit);
//             setValue(prevValue => prevValue + digit);
//         } else {
//             setSecondNum(prevNum => prevNum + digit);
//             setValue(prevValue => prevValue + digit);
//         }
//     };

//     const handleOperationClick = (op) => {
//         if (!firstNum) return; // Ignore if no first number entered
//         if (secondNum) {
//             const result = evaluate();
//             setFirstNum(result.toString());
//             setSecondNum("");
//             setValue(result.toString());
//         }
//         setOperation(op);
//         setValue(prevValue => prevValue + op);
//     };
//     // handeling function for calculati0n ===========

//     const evaluate = () => {
//         const num1 = parseFloat(firstNum);
//         const num2 = parseFloat(secondNum);
//         switch (operation) {
//             case "+":
//                 return num1 + num2;
//             case "-":
//                 return num1 - num2;
//             case "*":
//                 return num1 * num2;
//             case "/":
//                 return num1 / num2;
//             default:
//                 return 0;
//         }
//     };
//     const handleCalculate = () => {
//         if (firstNum && operation && secondNum) {
//             const result = evaluate();
//             setFirstNum(result.toString());
//             setSecondNum("");
//             setOperation("");
//             setValue(result.toString());
//             setHistory(result)
//         }
//     };


//     // clear the history ===============
//     const handleClear = () => {
//         setFirstNum("");
//         setSecondNum("");
//         setValue("");
//         setOperation("");
//     };
//     const handleBackspace = () => {
//         setValue(value.slice(0, -1));
//     };
//     // Keypress event, handle ================
