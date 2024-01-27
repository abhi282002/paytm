import React, { useState } from "react";
import { SubHeading } from "../components/SubHeading";
import Header from "../components/Header";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { Navigate, resolvePath, useNavigate } from "react-router-dom";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center  items-center">
        <div className="rounded-lg bg-white w-[360px] text-center p-2 h-max px-4">
          <Header label={"SignUp"} />
          <SubHeading label={"Enter Your information to create account"} />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder={"Abhishek"}
            label={"Firstname"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder={"Sharma"}
            label={"Lastname"}
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder={"abhishek@gmail.com"}
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder={"123456"}
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:8000/api/v1/user/signup",
                  {
                    username: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
