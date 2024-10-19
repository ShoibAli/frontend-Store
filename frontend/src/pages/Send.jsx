import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../Components/Heading";
import { useState } from "react";
import axios from "axios";

function Send() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, Setamount] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading title={"Send Money"}></Heading>
          <div className="flex items-center mt-10">
            <div className="rounded-full h-12 w-12 bg-green-500 flex  justify-center">
              <div className="flex flex-col justify-center h-full text-xl text-white">
                {name[0].toUpperCase()}
              </div>
            </div>
            <div className="pl-4 text-2xl font-semibold">{name}</div>
          </div>
          <label className=" text-sm font-medium flex" htmlFor="amount">
            Amount (in Rs)
          </label>
          <input
            type="number"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm m-2"
            id="amount"
            placeholder="Enter amount"
            onChange={(e) => {
              Setamount(e.target.value);
            }}
          />
          <button
            onClick={() => {
              axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: id,
                  amount,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              navigate("/dashboard");
            }}
            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500"
          >
            Initiate Transition
          </button>
        </div>
      </div>
    </div>
  );
}

export default Send;
