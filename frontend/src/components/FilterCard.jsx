import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import "./FilterCard.css"; // Import the CSS file

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Kolkata", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-25k", "50k-100k", "100k-200k", "200k-300k"],
  },
];

const FilterCard = () => {
  const [selectedValues, setSelectedValues] = useState({});
  const dispatch = useDispatch();

  const handleChange = (filterType, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValues));
  }, [selectedValues, dispatch]);

  return (
    <div className="filter-card-unicorn">
      <h1 className="filter-title-unicorn">Filter Jobs</h1>
      <hr className="divider-unicorn" />
      <div className="filter-sections-unicorn">
        {filterData.map((data, index) => (
          <div key={index} className="filter-section-unicorn">
            <h2 className="filter-type-unicorn">{data.filterType}</h2>
            <div className="filter-options-unicorn">
              {data.array.map((item, idx) => (
                <div key={idx} className="filter-option-unicorn">
                  <input
                    type="radio"
                    id={`${data.filterType}-${idx}`}
                    name={data.filterType}
                    value={item}
                    checked={selectedValues[data.filterType] === item}
                    onChange={() => handleChange(data.filterType, item)}
                  />
                  <label htmlFor={`${data.filterType}-${idx}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;