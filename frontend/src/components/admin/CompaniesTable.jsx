import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./Companies.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const navigate = useNavigate();

  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="companies-table">
      <h3 className="table-title">
        A list of your recently registered companies
      </h3>
      <table>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCompany.length <= 0 ? (
            <> No Companies </>
          ) : (
            <>
              {filterCompany?.map((company) => {
                return (
                  <tr key={company._id}>
                    <td>
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt="Company Logo"
                          className="company-logo"
                        />
                      ) : (
                        <span>No Logo</span>
                      )}
                    </td>
                    <td>{company.name}</td>
                    <td>{company.createdAt.split("T")[0]}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
