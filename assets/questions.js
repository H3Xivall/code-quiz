const questions = [
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        answers: [
            { text: "var myVar;", correct: true },
            { text: "variable myVar;", correct: false },
            { text: "assign myVar", correct: false },
            { text: "declare myVar", correct: false },
        ]
    },
    {
        question: "Which of the following is used to comment a single line in JavaScript?",
        answers: [
            { text: "/* comment */", correct: false },
            { text: "// comment", correct: true },
            { text: "<!-- comment -->", correct: false },
            { text: "-- comment --", correct: false },
        ]
    },
    {
        question: 'What will the following code output? console.log(5 + "5");',
        answers: [
            { text: "10", correct: false },
            { text: "55", correct: true },
            { text: "5 + 5", correct: false },
            { text: '5"5"', correct: false },
        ]
    },
    {
        question: "What is the purpose of the 'typeof' operator?",
        answers: [
            { text: "It checks if the variable is defined", correct: false },
            { text: "It returns the data type of a variable", correct: true },
            { text: "It converts a variable to a string", correct: false },
            { text: "It checks if a variable is null", correct: false },
        ]
    },
    {
        question: "How do you properly link an external JavaScript file to and HTML document?",
        answers: [
            { text: '<script src="script.js"></script>', correct: true },
            { text: '<link href="script.js" rel="javascript">', correct: false },
            { text: '<javascript src="script.js"></javascript>', correct: false },
            { text: '<js href="script.js"></js>', correct: false },
        ]
    },
    {
        question: "Which of the following is a correct way to write a function in JavaScript?",
        answers: [
            { text: 'function = myFunction() {}', correct: false },
            { text: 'create myFunction() {}', correct: false },
            { text: 'function myFunction() {}', correct: true },
            { text: 'myFunction() = function {}', correct: false },
        ]
    },
    {
        question: 'What will the following code output? console.log(2 == "2")',
        answers: [
            { text: 'true', correct: true },
            { text: 'false', correct: false },
            { text: 'undefined', correct: false },
            { text: '"2"', correct: false },
        ]
    },
    {
        question: "What is the purpose of the `===` operator in JavaScript?",
        answers: [
            { text: 'It checks if two values are equal in value and type', correct: true },
            { text: 'It assigns a value to a variable', correct: false },
            { text: 'It checks if two values are equal in value', correct: false },
            { text: 'It checks if two values are not equal in value or type', correct: false },
        ]
    },
    {
        question: "Which of the following is used to loop through an array in JavaScript?",
        answers: [
            { text: 'for (i = 0; i < array.length; i++)', correct: true },
            { text: 'foreach (i in array)', correct: false },
            { text: 'while (i < array.length) { i++ }', correct: false },
            { text: 'loop (i = 0; i < array.length; i++)', correct: false },
        ]
    },
    {
        question: "What does the `console.log()` function do in JavaScript?",
        answers: [
            { text: 'It prints a message to the console', correct: true },
            { text: 'It creates a log file on the server', correct: false },
            { text: 'It displays a popup message to the user', correct: false },
            { text: 'It logs the user out of the application', correct: false },
        ]
    }    
];

// Export Questions Array
export default questions;