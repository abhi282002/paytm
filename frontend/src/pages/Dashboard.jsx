import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import User from "../components/User";
import axios from "axios";
const Dashboard = () => {
  const [money, setMoney] = useState(0);
  useEffect(() => {
    const response = axios
      .get("http://localhost:8000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setMoney(response.data.balance);
      });
  }, []);
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={money} />
        <User />
      </div>
    </div>
  );
};

export default Dashboard;
