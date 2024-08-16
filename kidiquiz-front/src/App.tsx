import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './logic/redux/reduxHooks';
import { questionAsyncActions, questionSelectors } from './logic/redux/reducers/QuestionReducer';
import AppRouter from './Router';
import { quizAsyncActions } from './logic/redux/reducers/QuizReducer';
// import { questionActions } from './logic/redux/reducers/QuestionReducer';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadQuestions = dispatch(questionAsyncActions.getAllQuestions());
    const loadQuizList = dispatch(quizAsyncActions.getAllQuiz());
  }, [dispatch])
  
  return (
    <div className="App">
       <AppRouter />
    </div>
  );
}

export default App;
