import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./mix.css";
const URL="https://ems-backend-duin.onrender.com/";


const Update = () => {
    const { id } = useParams();
    console.log(id);
  const navigate = useNavigate();
  const [formData, setData] = useState({
    name: "",
    locality: "",
    age: "",
    department: "",
    status: "",
    city: "",
    createdAt: Math.floor(Date.now() / 1000),
  });

  const setVal = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };
  let token = localStorage.getItem("usersdatatoken");
  
  useEffect(()=>{
    const fetchData=async ()=>{
        const data = await fetch(`${URL}get/${id}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            query: true,
        });

        const res = await data.json();
        if(res.status === 201){
            setData({
                name: res.result.name,
                locality: res.result.locality,
                age: res.result.age,
                department: res.result.department,
                status: res.result.status,
                city: res.result.city,
            })
        }
        else{
            console.log(res.error);
        }
        }
        fetchData();
    }, []);




  const handleUpdateEmp = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.age ||
      !formData.locality ||
      !formData.department ||
      !formData.status ||
      !formData.city
    ) {
        toast.error("Fill all the spaces", {
            position:"top-center",
        });
    } else {

    //   console.log(formData);
      const formdata = {
        name: formData.name,
        age: formData.age,
        locality: formData.locality,
        department: formData.department,
        status: formData.status,
        city: formData.city,
        createdAt: formData.createdAt,
      };
      console.log(formdata);

      const data = await fetch(`${URL}update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
          Accept: "application/json"
        },
        body: JSON.stringify(formdata),
      });

      const res = await data.json();
      if (res.status === 201) {
        console.log(res.empId);
        toast.success("Employee Update", {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    }
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Hello, Update Employee Here</h1>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="name">
              <h5>Name</h5>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setVal(e)}
              name="name"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="form_input">
            <label htmlFor="age">
              <h5>Age</h5>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={(e) => setVal(e)}
              min="10"
              max="80"
              step="1"
            />
          </div>
          <div className="form_input">
            <label htmlFor="department">
              <h5>Department</h5>
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={(e) => setVal(e)}
              placeholder="Enter your department"
            />
          </div>
          <div className="form_input">
            <label htmlFor="status" style={{ width: "100%" }}>
              <h5>Status</h5>
            </label>
            <label
              htmlFor="status"
              className="status1"
              style={{ width: "40%", color: "#767272" }}
            >
              Remote Location
            </label>
            <input
              type="radio"
              className="status1"
              style={{ width: "60%" }}
              name="status"
              value="Remote Location"
              onChange={(e) => setVal(e)}
            />
            <label
              htmlFor="status"
              className="status1"
              style={{ width: "40%", color: "#767272" }}
            >
              Contract Employee
            </label>
            <input
              type="radio"
              className="status1"
              style={{ width: "60%" }}
              name="status"
              value="Contract Employee"
              onChange={(e) => setVal(e)}
            />
            <label
              htmlFor="status"
              className="status1"
              style={{ width: "40%", color: "#767272" }}
            >
              Full-Time
            </label>
            <input
              type="radio"
              className="status1"
              style={{ width: "60%" }}
              name="status"
              value="Full-time"
              onChange={(e) => setVal(e)}
            />
          </div>
          <div className="form_input">
            <label htmlFor="address" style={{ width: "100%" }}>
              <h5>Address</h5>
            </label>
            <label htmlFor="address" style={{ color: "#767272" }}>
              Locality
            </label>
            <input
              type="text"
              id="locality"
              name="locality"
              value={formData.locality}
              onChange={(e) => setVal(e)}
              placeholder="Enter your locality"
            />
            <label htmlFor="city" style={{ color: "#767272" }}>
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={(e) => setVal(e)}
              placeholder="Enter your city"
            />
          </div>
          <button className="btn" onClick={(e)=> handleUpdateEmp(e)}>
            Update
          </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Update;
