import React from "react";
import Header from "../components/Header";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

const SignIn = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[360px] text-center p-2 h-max px-4">
          <Header label={"SignIn"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox placeholder={"abhishek@gmail.com"} label={"Email"} />
          <InputBox placeholder={"123456"} label={"Password"} />
          <div className="pt-4">
            <Button label={"SignIn"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"SignUp"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
