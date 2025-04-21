import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ProfileState, TemplateStateProps} from "../utils.ts";

const initialState: ProfileState = {
    resumeTemplates: [],
    coverLetterTemplates: [],
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addResumeTemplates(state, action: PayloadAction<TemplateStateProps[]>) {
            state.resumeTemplates = action.payload;
        },
        addCoverLetterTemplates(state, action: PayloadAction<TemplateStateProps[]>) {
            state.coverLetterTemplates = action.payload;
        }
    },
});

export const {addResumeTemplates, addCoverLetterTemplates} = profileSlice.actions;
export default profileSlice.reducer;