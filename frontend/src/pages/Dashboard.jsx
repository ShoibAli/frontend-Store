import { useEffect, useState } from "react";
import Balance from "../Components/Balance";
import TopBar from "../Components/TopBar";
import Users from "../Components/Users";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function func() {
      const response = await axios.get(
        "https://backend-store-zeta.vercel.app/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      setBalance(response.data.balance);
    }
    func();
  }, [balance]);
  return (
    <div className="m-4">
      <TopBar text={"Payments App"} line={"Hello User"}></TopBar>
      <Balance balance={balance}></Balance>
      <Users></Users>
    </div>
  );
}

export default Dashboard;
