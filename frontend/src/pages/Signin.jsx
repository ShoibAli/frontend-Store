import { useState } from "react";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import SubHeading from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg p-2 px-4 text-center w-80 h-max">
          <Heading title={"Sign in"}></Heading>
          <SubHeading
            title={"Enter your credentials to access your account"}
          ></SubHeading>
          <InputBox
            labeltext={"Email"}
            placeholder={"shoibali644@gmail.com"}
            onChange={(e) => {
              Setusername(e.target.value);
            }}
          ></InputBox>
          <InputBox
            labeltext={"Password"}
            onChange={(e) => {
              Setpassword(e.target.value);
            }}
          ></InputBox>
          <Button
            onClick={async () => {
              console.log(username);
              console.log(password);
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              console.log(response.data);
              if (response.data.msg == "sign in completed") {
                navigate("/dashboard");
              }
            }}
            text={"Sign in"}
          ></Button>
          <Footer text={"Don't have an account?"} to={"/signup"}></Footer>
        </div>
      </div>
    </div>
  );
}

export default Signin;
