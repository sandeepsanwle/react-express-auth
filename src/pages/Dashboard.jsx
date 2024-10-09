import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if (!token) {
      navigate('/login');
    }
  },[token])

  return (
    <>
      <Navbar/>
      <h2>Dashboard</h2>
    </>
  );
};

export default Dashboard;
