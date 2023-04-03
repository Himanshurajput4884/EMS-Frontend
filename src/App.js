import Header from "./components/Header";
import Login from "./components/Login";
import Error from "./components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Update from "./components/Update";
const URL="https://employee-management-backend-tau.vercel.app/";


function App() {
  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);
  const { allEmpData, setAllEmpData } = useContext(LoginContext);

  const history = useNavigate();

  useEffect(()=>{
    const fetch_employee = async ()=>{
        const data = await fetch(`${URL}get/emp`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const res = await data.json();
          if (res.status === 201) {
            setAllEmpData(res.data);
            console.log("Data is fetched");
          } else {
            console.log("Data is not fetched.");
          }
    }
    fetch_employee();
},[allEmpData, setAllEmpData]);
  // console.log(allEmpData);
  

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch(`${URL}validuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status == 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data);
      // history("/");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <div className="cont">
      {data ? (
        <div className="cont">
          <Header />
          <Sidebar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add/employee" element={<AddEmployee />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Sidebar>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default App;
