import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const quizData = [
  {
    question: "What does e-waste stand for?",
    options: ["Electrical waste", "Electronic waste", "Environmental waste", "Energy waste"],
    correctIndex: 1,
    explanation: "E-waste stands for electronic waste, referring to discarded electrical and electronic equipment."
  },
  {
    question: "Which of the following is NOT one of the 5Rs of e-waste management?",
    options: ["Refuse", "Reduce", "Rebuild", "Recycle"],
    correctIndex: 2,
    explanation: "The 5Rs are Refuse, Reduce, Reuse, Repair, and Recycle. Rebuild is not part of the framework."
  },
  {
    question: "What hazardous material is commonly found in old CRT monitors?",
    options: ["Aluminum", "Lead", "Sodium", "Calcium"],
    correctIndex: 1,
    explanation: "CRT monitors contain significant amounts of lead in their glass, making proper disposal essential."
  },
  {
    question: "What does EPR stand for in e-waste management?",
    options: ["Electronic Product Recovery", "Extended Producer Responsibility", "Environmental Protection Regulation", "E-waste Processing Requirement"],
    correctIndex: 1,
    explanation: "Extended Producer Responsibility requires manufacturers to take responsibility for the entire lifecycle of their products, including disposal."
  },
  {
    question: "Which international treaty addresses the transboundary movement of hazardous waste?",
    options: ["Kyoto Protocol", "Paris Agreement", "Basel Convention", "Montreal Protocol"],
    correctIndex: 2,
    explanation: "The Basel Convention specifically addresses the control of transboundary movements of hazardous wastes, including e-waste."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === quizData[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const getScoreMessage = () => {
    if (score === 5) return "Perfect!";
    if (score === 4) return "Excellent!";
    if (score === 3) return "Good!";
    if (score === 2) return "Keep learning!";
    return "Time to study more!";
  };

  return (
    <section id="quiz" className="bg-bg section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-label text-primary mx-auto mb-6">
            <span className="ml-2">TEST YOUR KNOWLEDGE</span>
          </div>
          <h2 className="text-hero font-heading font-bold text-dark mt-6 mb-4">
            Interactive Quiz
          </h2>
          <p className="text-body-lg text-secondary">
            Test your understanding of e-waste management.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="card shadow-card p-8 md:p-12 min-h-[400px]">
            <AnimatePresence mode="wait">
              {showResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10"
                >
                  <h3 className="text-subtitle font-heading font-semibold text-dark mb-6">Your Score</h3>
                  <div className="text-hero text-primary font-heading font-bold mb-4">
                    {score}/{quizData.length}
                  </div>
                  <p className="text-body-lg text-secondary mb-8">{getScoreMessage()}</p>
                  <button onClick={resetQuiz} className="btn-primary">
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-small text-secondary font-medium uppercase tracking-wider">
                      Question {currentQuestion + 1} of {quizData.length}
                    </span>
                  </div>
                  
                  <div className="w-full bg-border h-2 rounded-full mb-8 overflow-hidden">
                    <div 
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
                    />
                  </div>

                  <h3 className="font-heading text-section font-semibold text-dark mb-8">
                    {quizData[currentQuestion].question}
                  </h3>

                  <div className="flex flex-col gap-4">
                    {quizData[currentQuestion].options.map((option, index) => {
                      let buttonClass = "quiz-option w-full text-left p-4 rounded-lg border transition-all duration-200 text-body flex justify-between items-center ";
                      
                      if (!isAnswered) {
                        buttonClass += "border-border hover:border-primary hover:bg-soft text-dark";
                      } else {
                        if (index === quizData[currentQuestion].correctIndex) {
                          buttonClass += "border-green-500 bg-green-50 text-green-900 font-medium";
                        } else if (index === selectedAnswer) {
                          buttonClass += "border-red-500 bg-red-50 text-red-900";
                        } else {
                          buttonClass += "border-border opacity-50 text-secondary";
                        }
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(index)}
                          disabled={isAnswered}
                          className={buttonClass}
                        >
                          <span>{option}</span>
                          {isAnswered && index === quizData[currentQuestion].correctIndex && (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          )}
                          {isAnswered && index === selectedAnswer && index !== quizData[currentQuestion].correctIndex && (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8"
                    >
                      <div className="p-4 bg-soft rounded-lg text-secondary text-body mb-6">
                        <strong className="text-dark font-medium">Explanation:</strong> {quizData[currentQuestion].explanation}
                      </div>
                      <button onClick={handleNext} className="btn-primary w-full md:w-auto">
                        {currentQuestion === quizData.length - 1 ? "See Results" : "Next Question"}
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
