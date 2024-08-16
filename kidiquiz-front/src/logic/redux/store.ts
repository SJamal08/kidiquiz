import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import QuestionReducer from './reducers/QuestionReducer';
import QuizReducer from './reducers/QuizReducer';
import ContestReducer from './reducers/ContestReducer';
// import AuthReducer from './reducers/AuthReducer';

export const store = configureStore({
  reducer: {
    questionReducer: QuestionReducer,
    quizReducer: QuizReducer,
    contestReducer: ContestReducer,
    // authReducer: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;