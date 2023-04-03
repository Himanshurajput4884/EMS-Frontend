import {
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "./ContextProvider/Context";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
const URL="https://employee-management-backend-tau.vercel.app/";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

  const { allEmpData, setAllEmpData } = useContext(LoginContext);
  const { empStatus, setEmpStatus } = useContext(LoginContext);
  const { empAge, setEmpAge } = useContext(LoginContext);
  console.log(empStatus);
  console.log(empAge);

  const Chartdata = {
    labels: ['15-20', '20-30', '30-40', '40-50', '50-60'],
    datasets: [
      {
        label: '# of Employee',
        data: empAge,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(34, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(34 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }


  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}><h3>Dashboard</h3></Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Remote Location"}
            value={empStatus[1]}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Full Time"}
            value={empStatus[3]}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Contract Employee"}
            value={empStatus[2]}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "green",
                  backgroundColor: "pink",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Total Employee"}
            value={empStatus[0]}
          />
        </Space>
      </Space>
      <Space style={{"width":"80%", "margin":"20px 4px 4px 4px", "border":"2px solid #d9b4b4", "padding":"4px 4px", "border-radius":"30px", "display":"flex", "justify-content":"space-evenly"}}>
        <div><h3>Age Group Chart</h3></div>
        <div>
          <Doughnut data={Chartdata}/>
        </div>
      </Space>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}




export default Dashboard;
