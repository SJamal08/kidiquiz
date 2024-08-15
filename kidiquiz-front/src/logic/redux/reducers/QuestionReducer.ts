import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Question } from "../../model/question";
import { QuestionController } from "../../controller/QuestionController";
import { InMemoryQuestionRepo } from "../../../repository/question/InMemoryQuestionRepo";

const questionController: QuestionController = new QuestionController(new InMemoryQuestionRepo());

interface QuestionReducerState {
    questions: Question [],

}

const initialState: QuestionReducerState = {
    questions: [],
    
}

const getAllQuestions = createAsyncThunk('question/getAllQuestions',
     async () => {
        return await questionController.getAll();
     }
    )
    
    
    export const QuestionSlice = createSlice({
        name: 'Question',
        initialState,
        reducers: {  
            setQuestionsList: (state , action: PayloadAction<Question[]>) => {
                state.questions = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder
            .addCase(getAllQuestions.pending, state => {
                console.log("get all questions in pending");
            })
            .addCase(getAllQuestions.fulfilled, (state, action) => {
                console.log("getting all questions successfully");
                state.questions = action.payload;
            })
        }
    })
    
    export const questionActions = QuestionSlice.actions
    
    export const questionAsyncActions = {
        getAllQuestions,
    }

const selectAllQuestions = (state: RootState) => state.questionReducer.questions 

// selectors are made to access easily to state value in the app whatever the component
export const questionSelectors = {
    selectAllQuestions,
}

export default QuestionSlice.reducer