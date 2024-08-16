import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizController } from "../../controller/QuizController";
import { Quiz, QuizPayload } from "../../model/Quiz";
import { InMemoryQuizRepo } from "../../repository/quiz/InMemoryQuizRepo";
import { RootState } from "../store";

const quizController: QuizController = new QuizController(new InMemoryQuizRepo());

interface QuizReducerState {
    quizList: Quiz [],
    currentQuiz: Quiz | null
}

const initialState: QuizReducerState = {
    quizList: [],
    currentQuiz: null 
}

const createQuiz = createAsyncThunk('quiz/createQuiz',
    async (quizPayload: QuizPayload) => {
       return await quizController.create(quizPayload);
    }
   );

   const getAllQuiz = createAsyncThunk('quiz/getAllQuiz',
    async () => {
       return await quizController.getAll();
    }
   );

   export const QuizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {  
        setQuizList: (state , action: PayloadAction<Quiz[]>) => {
            state.quizList = action.payload;
        },
        setCurrentQuiz: (state, action: PayloadAction<Quiz | null>) => {
            state.currentQuiz = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createQuiz.pending, state => {
            console.log("creating quiz in pending");
        })
        .addCase(createQuiz.fulfilled, (state, action) => {
            console.log("creating quiz successfully");
            // state.quizList = action.payload;
        })
        .addCase(getAllQuiz.pending, state => {
            console.log("get all quiz in pending");
        })
        .addCase(getAllQuiz.fulfilled, (state, action) => {
            console.log("getting all quiz successfully");
            state.quizList = action.payload;
        })
    }
})

export const quizActions = QuizSlice.actions;

export const quizAsyncActions = {
    getAllQuiz,
    createQuiz
}

const selectAllQuiz = (state: RootState) => state.quizReducer.quizList 

// selectors are made to access easily to state value in the app whatever the component
export const quizSelectors = {
    selectAllQuiz,
}

export default QuizSlice.reducer
