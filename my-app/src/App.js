import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

const QuizApp = () => {
  const [quizData, setQuizData] = useState([
   
        {
          question: 'What does CPU stand for?',
          options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Processor Unit', 'Central Process Unit'],
          correctAnswer: 'Central Processing Unit',
        },
        {
          question: 'What is the primary function of RAM in a computer?',
          options: ['Long-term storage', 'Short-term storage', 'Processing calculations', 'Managing peripherals'],
          correctAnswer: 'Short-term storage',
        },
        {
          question: 'Which programming language is often used for building web pages?',
          options: ['Java', 'Python', 'HTML', 'C++'],
          correctAnswer: 'HTML',
        },
        {
          question: 'What does URL stand for?',
          options: ['Uniform Resource Locator', 'Universal Record Locator', 'Uniform Retrieval Locator', 'Universal Resource Link'],
          correctAnswer: 'Uniform Resource Locator',
        },
        {
          question: 'What is the purpose of an operating system in a computer?',
          options: ['Run applications', 'Manage hardware resources', 'Connect to the internet', 'Display graphics'],
          correctAnswer: 'Manage hardware resources',
        },
        {
          question: 'What is the function of a firewall in computer security?',
          options: ['Monitor network traffic', 'Store passwords', 'Clean viruses from files', 'Enhance computer speed'],
          correctAnswer: 'Monitor network traffic',
        },
        {
          question: 'Which type of storage is non-volatile and retains data even when the power is turned off?',
          options: ['RAM', 'Hard Disk Drive (HDD)', 'Solid State Drive (SSD)', 'Flash Drive'],
          correctAnswer: 'Flash Drive',
        },
        {
          question: 'What is the purpose of the Ctrl + Z keyboard shortcut?',
          options: ['Copy', 'Paste', 'Undo', 'Redo'],
          correctAnswer: 'Undo',
        },
        {
          question: 'Which protocol is commonly used for sending emails over the internet?',
          options: ['HTTP', 'FTP', 'SMTP', 'DHCP'],
          correctAnswer: 'SMTP',
        },
        {
          question: 'What is the role of a browser\'s cache?',
          options: ['Store bookmarks', 'Accelerate webpage loading', 'Manage passwords', 'Control pop-up windows'],
          correctAnswer: 'Accelerate webpage loading',
        },
        
      ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(quizData.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    //  user answers from local storage if available
    const savedUserAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    if (savedUserAnswers) {
      setUserAnswers(savedUserAnswers);
    }
  }, []);

  const handleAnswerSelect = (selectedOption) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedOption;
    setUserAnswers(newAnswers);

    // Automatically move to the next question after selecting an option
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers(new Array(quizData.length).fill(null));
    setShowResults(false);
  };

  useEffect(() => {
    // Save user answers to local storage
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  if (showResults) {
    // Display results screen
    const correctAnswers = userAnswers.filter((answer, index) => answer === quizData[index].correctAnswer).length;
    return (
      <div className="centered-container results-background">
        <h2>Quiz Results</h2>
        <h3>Congrats! you Have completed your test</h3>
        <p>You Score is {correctAnswers*5} out of {quizData.length*5} </p>   
        <button onClick={handleRestartQuiz}>Restart Quiz</button>     
      </div>
    );
  }

  // Display quiz question
  const currentQuestionData = quizData[currentQuestion];
  return (
    <div className="centered-container quiz-background">
      <h2>------------- Welcome to the Quiz App ----------------</h2>
      <h3>Question {currentQuestion + 1}:</h3> 

      <div>
             
        <h4>{currentQuestionData.question}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(5 marks)</h4>
      </div>
      <div>
        {currentQuestionData.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerSelect(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizApp;

