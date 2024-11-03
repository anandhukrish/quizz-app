import { QuestionTypes, useQuestions } from "./QuestionContext";

const Finished = () => {
  const { dispatch } = useQuestions();
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="border border-white/50 rounded-md py-2 px-3  inline-block hover:bg-white/50 hover:text-black transition-colors duration-500 "
        onClick={() => dispatch({ type: QuestionTypes.RESTART_QUIZZ })}
      >
        Restart
      </button>
    </div>
  );
};

export default Finished;
