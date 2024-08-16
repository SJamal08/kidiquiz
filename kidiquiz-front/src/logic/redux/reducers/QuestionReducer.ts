import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Question, QuestionPayload } from "../../model/question";
import { QuestionController } from "../../controller/QuestionController";
import { InMemoryQuestionRepo } from "../../repository/question/InMemoryQuestionRepo";

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

const deleteQuestion = createAsyncThunk('question/deleteQuestion',
    async (id: number) => {
        console.log("try delete a question");
        const result = await questionController.delete(id);
        console.log("result of deletion in asyncThunk", result);
        return result;
    }
)

const updateQuestion = createAsyncThunk('question/updateQuestion',
    async ({id, questionPayload}: {id:number, questionPayload: QuestionPayload} ): Promise<Question | undefined> => {
        console.log("try updating a question");
        const result = await questionController.update(id, questionPayload);
        console.log("result of updating in asyncThunk", result);
        return result;
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
            .addCase(deleteQuestion.pending, state => {
                console.log("delete question in pending");
            })
            .addCase(deleteQuestion.fulfilled, state => {
                console.log("deleting question successfully");
                // state.questions = action.payload;
            })
            .addCase(updateQuestion.pending, state => {
                console.log("updating question in pending");
            })
            .addCase(updateQuestion.fulfilled, state => {
                console.log("updating question successfully");
                // state.questions = action.payload;
            })
        }
    })
    
    export const questionActions = QuestionSlice.actions
    
    export const questionAsyncActions = {
        getAllQuestions,
        deleteQuestion,
        updateQuestion
    }

const selectAllQuestions = (state: RootState) => state.questionReducer.questions 

// selectors are made to access easily to state value in the app whatever the component
export const questionSelectors = {
    selectAllQuestions,
}

export default QuestionSlice.reducer