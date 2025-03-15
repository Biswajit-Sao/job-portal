import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs:[],
    allAdminJobs:[],
    singleJob:null,
    searchJobByText:"",
    allAppliedJobs:[],
    searchedQuery:""
  },
  reducers: {
    setAllJob:(state,action)=>{
        state.allJobs=action.payload
    },
    setSingleJob:(state,action)=>{
      state.singleJob=action.payload
    },
    setAllAdminJobs:(state,action)=>{
      state.allAdminJobs=action.payload
    },
    setSearchJobByText:(state,action)=>{
      state.searchJobByText=action.payload
    },
    setAllAppliedJobs:(state,action)=>{
      state.allAppliedJobs=action.payload
    },
    setSearchedQuery:(state,action)=>{
      state.searchedQuery=action.payload
    },
  },
});

export const { setAllJob,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;
