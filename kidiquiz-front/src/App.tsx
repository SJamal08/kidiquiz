import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './logic/redux/reduxHooks';
import { questionAsyncActions, questionSelectors } from './logic/redux/reducers/QuestionReducer';
import AppRouter from './Router';
// import { questionActions } from './logic/redux/reducers/QuestionReducer';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadQuestions = dispatch(questionAsyncActions.getAllQuestions());
    console.log("try to get all questions");
  }, [dispatch])
  
  return (
    <div className="App">
       <AppRouter />
    </div>
  );
}

export default App;
