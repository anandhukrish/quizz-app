import { QuestionTypes, useQuestions } from "./QuestionContext";

const ActionButtons = () => {
  const { state, dispatch } = useQuestions();
  const { answer, currentQuestionIndex, questions } = state;

  const incrementQuestionIndex = () => {
    dispatch({ type: QuestionTypes.SET_CURRENT_QUESTION_INDEX });
  };
  if (answer === null) return;
  return (
    <>
      {currentQuestionIndex < questions.length - 1 && (
        <button
          className="border border-white/50 rounded-md py-2 px-3 ml-auto inline-block hover:bg-white/50 hover:text-black transition-colors duration-500 disabled:bg-white/30  disabled:pointer-events-none"
          onClick={incrementQuestionIndex}
        >
          Next
        </button>
      )}
      {currentQuestionIndex === questions.length - 1 && (
        <button
          className="border border-white/50 rounded-md py-2 px-3 ml-auto inline-block hover:bg-white/50 hover:text-black transition-colors duration-500 disabled:bg-white/30  disabled:pointer-events-none"
          onClick={() => dispatch({ type: QuestionTypes.SET_FINISHED })}
        >
          Finsih
        </button>
      )}
    </>
  );
};

export default ActionButtons;
