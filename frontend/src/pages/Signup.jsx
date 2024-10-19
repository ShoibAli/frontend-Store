import { useState } from "react";
import Button from "../Components/Button";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstname, SetFirstName] = useState("");
  const [lastname, SetLastName] = useState("");
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading className="mb-2" title={"Sign up"} />
          <SubHeading title={"Enter your information to create an account"} />
          <InputBox
            labeltext={"First Name"}
            placeholder={"John"}
            onChange={(e) => {
              SetFirstName(e.target.value);
            }}
          />
          <InputBox
            labeltext={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => {
              SetLastName(e.target.value);
            }}
          />
          <InputBox
            labeltext={"Email"}
            placeholder={"shoibali644@gmail.com"}
            onChange={(e) => {
              SetUsername(e.target.value);
            }}
          />
          <InputBox
            labeltext={"Password"}
            placeholder={"123456"}
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  username,
                  firstname,
                  lastname,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            text={"Sign up"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
