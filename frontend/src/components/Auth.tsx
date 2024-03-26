import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LaballedInput";
import { useState } from "react";
import { SignupInput } from "@sanket00900/blogit";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      //TODO : alret user
      // alert("Req failed")
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center text-center">
      <div className="text-3xl font-bold">
        {type === "signin" ? "Login Account" : "Create an Account"}
      </div>
      <div className="text-slate-400 font-normal">
        {type === "signin"
          ? "Don't have and account ?"
          : "Already have an account ?"}
        <Link to={type === "signin" ? "/signup" : "/signin"}>
          <span className="underline">
            {type === "signin" ? "Sign Up" : "Sign In"}
          </span>
        </Link>
      </div>
      <div className="p-8">
        {type === "signup" ? (
          <LabelledInput
            label="Name"
            placeholder="Enter your name"
            onchange={(e) => {
              setPostInputs((postInputs) => ({
                ...postInputs,
                name: e.target.value,
              }));
            }}
          />
        ) : null}
        <LabelledInput
          label="Email"
          placeholder="Enter your email"
          onchange={(e) => {
            setPostInputs((postInputs) => ({
              ...postInputs,
              email: e.target.value,
            }));
          }}
        />
        <LabelledInput
          label="Password"
          type={"password"}
          placeholder="Enter your password"
          onchange={(e) => {
            setPostInputs((postInputs) => ({
              ...postInputs,
              password: e.target.value,
            }));
          }}
        />
        <Button onclick={sendRequest} type={type} />
      </div>
    </div>
  );
};

export default Auth;
