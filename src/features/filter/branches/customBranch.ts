import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Branch } from "../../../types/Branch";

interface BranchState {
  allBranches: Branch[];
  mainBranches: Branch[];
  subBranches: Branch[];
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  allBranches: [],
  mainBranches: [],
  subBranches: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {

setBranches: (state, action: PayloadAction<Branch[]>) => {
  console.log("Payload:", action.payload);

  state.allBranches = action.payload;

  state.mainBranches = action.payload.filter(
    branch => branch.type?.trim().toUpperCase() === "MAIN"
  );

  state.subBranches = action.payload.filter(
    branch => branch.type?.trim().toUpperCase() === "SUB"
  );

  console.log("Main:", state.mainBranches);
  console.log("Sub:", state.subBranches);
},
    addNewBranch: (state, action: PayloadAction<Branch>) => {
      state.allBranches.push(action.payload);
      
      if (action.payload.type === "MAIN") {
        state.mainBranches.push(action.payload);
      } else if (action.payload.type === "SUB") {
        state.subBranches.push(action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setBranches, addNewBranch, setLoading, setError } = branchSlice.actions;
export default branchSlice.reducer;