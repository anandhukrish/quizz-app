import { useEffect, useState } from "react";
import "./App.css";
import { QuestionTypes, useQuestions } from "./QuestionContext";
import data from "./data/questions.json";
import QuestionTimer from "./QuestionTimer";
import { cn } from "./utils";
import Finished from "./Finished";
import ActionButtons from "./ActionButtons";

function App() {
  const { state, dispatch } = useQuestions();
  const { questions, score, totalScore, currentQuestionIndex, answer } = state;
  const currentQuestion = questions[currentQuestionIndex];

  const correctAnswer = currentQuestion?.answer === answer;

  useEffect(() => {
    dispatch({
      type: QuestionTypes.GET_QUESTIONS_SUCCESS,
      payload: data.questions,
    });
  }, [dispatch]);

  const handleScore = (selectedAnswer: number) => {
    dispatch({
      type: QuestionTypes.SET_SCORE,
      payload: selectedAnswer,
    });
  };

  return (
    <main className="bg-black/80 text-white min-h-screen py-5 mx-auto">
      <div className="container mx-auto">
        {state.status === "idle" && (
          <div className="flex items-center justify-center min-h-screen">
            <button
              className="border border-white/50 rounded-md py-2 px-3  inline-block hover:bg-white/50 hover:text-black transition-colors duration-500"
              onClick={() => dispatch({ type: QuestionTypes.START_QUIZZ })}
            >
              Start Quiz
            </button>
          </div>
        )}
        {state.status === "start" && (
          <div>
            <h1 className="text-3xl font-bold text-center">Quizz App</h1>
            <p className="text-center italic font-light mt-5">
              This is a simple quizz app built with React.js.
            </p>
            <div className="flex">
              <span className="border-2 border-white/50 rounded-md py-2 px-3 mt-5 ml-auto inline-block">
                current score: {score} / {totalScore}
              </span>
            </div>
            {currentQuestion && (
              <div className="mt-3">
                <h3 className="text-2xl">{currentQuestion.question} </h3>
                <ul className="flex flex-wrap">
                  {currentQuestion.options.map((option, i) => (
                    <li
                      className={cn(
                        "w-full rounded-full mt-5 border border-white/50 text-lg cursor-pointer p-2 pl-5 hover:bg-white/50 hover:text-black transition-colors duration-500 disabled:pointer-events-none",
                        answer === i && "translate-x-5",
                        correctAnswer &&
                          answer === i &&
                          "bg-white/50 text-black",
                        answer !== null && "pointer-events-none"
                      )}
                      key={`${option}-${i}`}
                      onClick={() => handleScore(i)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex pt-8">
              <QuestionTimer />
              <ActionButtons />
            </div>
          </div>
        )}
        {state.status === "finished" && <Finished />}
      </div>
    </main>
  );
}

export default App;
