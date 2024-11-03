import { useEffect } from "react";
import { QuestionTypes, useQuestions } from "./QuestionContext";

const QuestionTimer = () => {
  const { state, dispatch } = useQuestions();
  const { totalTime } = state;

  const miniutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: QuestionTypes.SET_TICK });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div>
      {miniutes < 10 ? `0${miniutes}` : miniutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default QuestionTimer;
