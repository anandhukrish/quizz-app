import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export type Question = {
  id: number;
  question: string;
  answer: number;
  options: string[];
  score: number;
};

type QuestionInitialState = {
  score: number;
  questions: Question[];
  currentQuestionIndex: number;
  status: "idle" | "start" | "finished";
  totalScore: number;
  totalTime: number;
  answer: number | null;
};

type QuestionContextType = {
  state: QuestionInitialState;
  dispatch: Dispatch<QuestionActions>;
};

const QuestionContext = createContext<QuestionContextType | null>(null);

const initialState: QuestionInitialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  totalScore: 0,
  totalTime: 0,
  status: "idle",
  answer: null,
};

export enum QuestionTypes {
  GET_QUESTIONS_SUCCESS = "GET_QUESTIONS/SUCCESS",
  START_QUIZZ = "START_QUIZZ",
  GET_QUESTIONS_FAILURE = "GET_QUESTIONS_FAILURE",
  SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION",
  SET_CURRENT_QUESTION_INDEX = "SET_CURRENT_QUESTION_INDEX",
  SET_SCORE = "SET_SCORE",
  SET_TICK = "SET_TICK",
  SET_FINISHED = "SET_FINISHED",
  RESTART_QUIZZ = "RESTART_QUIZZ",
}

export type QuestionActions =
  | {
      type: QuestionTypes.GET_QUESTIONS_SUCCESS;
      payload: Question[];
    }
  | {
      type: QuestionTypes.START_QUIZZ;
    }
  | { type: QuestionTypes.GET_QUESTIONS_FAILURE; payload: string }
  | { type: QuestionTypes.SET_CURRENT_QUESTION; payload: Question }
  | {
      type: QuestionTypes.SET_SCORE;
      payload: number;
    }
  | {
      type: QuestionTypes.SET_CURRENT_QUESTION_INDEX;
    }
  | { type: QuestionTypes.SET_TICK }
  | { type: QuestionTypes.SET_FINISHED }
  | { type: QuestionTypes.RESTART_QUIZZ };

const questionReducer = (
  state: QuestionInitialState,
  action: QuestionActions
): QuestionInitialState => {
  switch (action.type) {
    case QuestionTypes.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.payload,
        totalScore: state.questions.reduce(
          (total, question) => total + question.score,
          0
        ),
      };
    case QuestionTypes.START_QUIZZ:
      return {
        ...state,
        status: "start",
        totalTime: state.questions.length * 30,
      };

    case QuestionTypes.SET_CURRENT_QUESTION_INDEX:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    case QuestionTypes.SET_SCORE: {
      const question = state.questions[state.currentQuestionIndex];

      return {
        ...state,
        score:
          question.answer === action.payload
            ? state.score + question.score
            : state.score,
        answer: action.payload,
      };
    }
    case QuestionTypes.SET_TICK:
      return {
        ...state,
        totalTime: state.totalTime - 1,
        status: state.totalTime === 0 ? "finished" : "start",
      };
    case QuestionTypes.RESTART_QUIZZ:
      return {
        ...initialState,
        totalTime: state.questions.length * 30,
        questions: state.questions,
      };
    case QuestionTypes.SET_FINISHED:
      return { ...state, status: "finished", answer: null };
    default:
      throw new Error();
  }
};

export const QuestionProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(questionReducer, initialState);
  return (
    <QuestionContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => {
  const questionContext = useContext(QuestionContext);
  if (!questionContext) {
    throw new Error("useQuestions must be used within a QuestionProvider");
  }
  return questionContext;
};
