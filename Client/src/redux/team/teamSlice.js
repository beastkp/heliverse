import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    createTeam: false
}

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setCreateTeam: (state, action) => {
            state.createTeam = !state.createTeam;
        },
    },
});


export const { setCreateTeam } = teamSlice.actions;

export default teamSlice.reducer;
