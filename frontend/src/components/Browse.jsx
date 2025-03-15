import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import './Browse.css'; // Import the CSS file
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import useGetAlljobs from '../hooks/useGetAlljobs';


const Browse = () => {

  useGetAlljobs()
  const {allJobs} = useSelector(store => store.jobs) || {};
  const dispatch=useDispatch()
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""))
    }
  })
  return (
    <div className="browse-container">
      <Navbar />
      <div className="job-list">
        <h1>Search Results ({allJobs.length})</h1>
        <div className="jobs-grid">
          {allJobs.map((job) => (
            <Job key={job?._id} job={job}/>

          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Browse;