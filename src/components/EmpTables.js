import React, { useState, useEffect } from "react";
import "./empTable.css";
import TableRow from "./TableRow";
const URL="https://ems-backend-duin.onrender.com/";


function EmpTables() {
  const [empData, setEmpData] = useState([]);

  const columns = [
    {
      title: "User Id",
      field: "empId",
    },
    {
      title: "Employee Name",
      field: "name",
    },
    {
      title: "Department",
      field: "department",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Added By",
      field: "createdBy",
    },
  ];

  useEffect(() => {
    const fetch_data = async () => {
      const data = await fetch(`${URL}get/emp`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      if (res.status === 201) {
        setEmpData(res.data);
      } else {
        console.log("Data is not fetched.");
      }
    };
    fetch_data();
  }, []);

  const handleView = ()=>{
    console.log("click")
  }

  console.log(empData);

  return (
    <div>
    {
        empData.length ? 
        <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        {empData.map((v) => {
            return (
                <TableRow data={v}/>
            )

        })}
      </table>
      :
      <div>
        <h1>There is no Data.</h1>
      </div>

    }
    </div>
  );
}

export default EmpTables;
