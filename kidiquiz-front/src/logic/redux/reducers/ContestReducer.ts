import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContestController } from "../../controller/ContestController";
import { Contest, ContestPayload } from "../../model/Contest";
import { InMemoryContestRepo } from "../../repository/contest/InMemoryContestRepo";
import { RootState } from "../store";

const contestController: ContestController = new ContestController(new InMemoryContestRepo);

interface ContestReducerState {
    contests: Contest [],
    currentContest: Contest | null
}

const initialState: ContestReducerState = {
    contests: [],
    currentContest: null 
}

const createContest = createAsyncThunk('contest/createContest',
    async (contestPayload: ContestPayload) => {
       return await contestController.create(contestPayload);
    }
   );

   const getAllContests = createAsyncThunk('contest/getAllContests',
    async () => {
       return await contestController.getAll();
    }
   );

   const updateContest = createAsyncThunk('contest/updateContest',
    async ({id, ContestPayload}: {id:number, ContestPayload: ContestPayload} ): Promise<Contest | undefined> => {
        console.log("try updating a Contest");
        const result = await contestController.update(id, ContestPayload);
        console.log("result of updating in asyncThunk", result);
        return result;
    }
)

   export const ContestSlice = createSlice({
    name: 'contest',
    initialState,
    reducers: {  
        setContest: (state , action: PayloadAction<Contest[]>) => {
            state.contests = action.payload;
        },
        setCurrentContest: (state, action: PayloadAction<Contest | null>) => {
            state.currentContest = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createContest.pending, state => {
            console.log("creating contest in pending");
        })
        .addCase(createContest.fulfilled, (state, action) => {
            console.log("creating contest successfully");
        })
        .addCase(getAllContests.pending, state => {
            console.log("getting all contests in pending");
        })
        .addCase(getAllContests.fulfilled, (state, action) => {
            state.contests = action.payload;
            console.log(state.contests);
            console.log("getting all contests successfully");
        })
        .addCase(updateContest.pending, state => {
            console.log("updating contest in pending");
        })
        .addCase(updateContest.fulfilled, state => {
            console.log("updating contest successfully");
        })
    }
})

export const contestActions = ContestSlice.actions;

export const contestAsyncActions = {
    createContest,
    getAllContests,
    updateContest
}

const selectAllcontest = (state: RootState) => state.contestReducer.contests 
const selectCurrentcontest = (state: RootState) => state.contestReducer.currentContest 

// selectors are made to access easily to state value in the app whatever the component
export const contestSelectors = {
    selectAllcontest,
    selectCurrentcontest
}

export default ContestSlice.reducer