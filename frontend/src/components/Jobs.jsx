import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import "./Jobs.css";
import { useSelector } from "react-redux";
import useGetAlljobs from "../hooks/useGetAlljobs";

const Jobs = () => {
  useGetAlljobs();
  const { allJobs = [], searchedQuery = {} } = useSelector((store) => store.jobs) || {}; 


  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery && Object.keys(searchedQuery).length > 0) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          (searchedQuery.Industry &&
            job.title.toLowerCase().includes(searchedQuery.Industry.toLowerCase())) ||
          (searchedQuery.Location &&
            job.location.toLowerCase().includes(searchedQuery.Location.toLowerCase())) ||
          (searchedQuery.Salary &&
            job.salary.toString().toLowerCase().includes(searchedQuery.Salary.toLowerCase()))
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="jobs-layout">
        {/* Animated Filter Section */}
        <motion.div
          className="filter-section"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <FilterCard />
        </motion.div>

        <div className="jobs-section">
          {filterJobs.length === 0 ? (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              No jobs found
            </motion.span>
          ) : (
            <motion.div
              className="jobs-list"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
              }}
            >
              {filterJobs.map((job) => (
                <motion.div
                  key={job?._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Jobs;
