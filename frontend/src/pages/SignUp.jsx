import React from "react";
import { SubHeading } from "../components/SubHeading";
import Header from "../components/Header";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
const SignUp = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center  items-center">
        <div className="rounded-lg bg-white w-[360px] text-center p-2 h-max px-4">
          <Header label={"SignUp"} />
          <SubHeading label={"Enter Your information to create account"} />
          <InputBox placeholder={"Abhishek"} label={"Firstname"} />
          <InputBox placeholder={"Sharma"} label={"Lastname"} />
          <InputBox placeholder={"Email"} label={"Email"} />
          <InputBox placeholder={"123456"} label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign up"} />
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
