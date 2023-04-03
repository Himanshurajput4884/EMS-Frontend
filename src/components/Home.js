import React, { useState, useEffect, useContext } from "react";
import { Box, styled } from "@mui/material";
import EmpTables from "./EmpTables";
import { NavLink } from "react-router-dom";
import "./homeImage.css";
import Image from "../image/employee.png";
import { width } from "@mui/system";
import { LoginContext } from "./ContextProvider/Context";
const URL="https://ems-backend-duin.onrender.com/";



function Home() {
  const { logindata, setLoginData } = useContext(LoginContext);
  const { allEmpData, setAllEmpData } = useContext(LoginContext);
  const {  empStatus, setEmpStatus } = useContext(LoginContext);
  const { empAge, setEmpAge } = useContext(LoginContext);
  
  useEffect(()=>{
      const storeData = () =>{
          let status = [0,0,0,0];
          let age = [0,0,0,0,0];
          allEmpData.map((v)=>{
              status[0]++;
              if(v.status==="Remote Location"){status[1]++;}
              else if(v.status==="Contract Employee"){status[2]++;}
              else if(v.status==="Full-time"){status[3]++;}
              if(v.age>=15&&v.age<=20){age[0]++}
              else if(v.age>=21&&v.age<=30){age[1]++}
              else if(v.age>=31&&v.age<=40){age[2]++}
              else if(v.age>=41&&v.age<=50){age[3]++}
              else if(v.age>=51&&v.age<=60){age[4]++}
          })
          console.log(age);
          setEmpStatus(status);
          setEmpAge(age);
          console.log(empAge);
          console.log(empStatus);
        }
        storeData();
  },[allEmpData, setAllEmpData])


  return (
    <Box>
      <Box className="image"> <img src={Image} style={{height:"300px", width:"100%", margin:"40px 0", border:"2px solid grey", "border-radius":"20px"}}/></Box>
      <Box>
        <EmpTables/>        
      </Box>
    </Box>
  );
}

export default Home;
