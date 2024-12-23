import React, { useState } from "react";
import hand from "../../assets/icons/hand.png";
import { Link, useNavigate } from "react-router-dom";
import AxiosInt from "../../services/api/api";
import { z } from "zod";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const schema = z.object({
    name: z
      .string()
      .min(5, "Minimum 5 char needed")
      .max(10, "Maximum 10 char allowed"),
    email: z.string().email("Enter Valid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
  });
  const handleSignUp = async () => {
    // check if input field is not empty
    for (let ele in inputState) {
      if (inputState[ele].trim() == "") {
        toast.error(`Please enter ${ele} field`);
        return;
      }
    }
    try {
      schema.parse(inputState);
      let res = await AxiosInt.post("user/create", {
        username: inputState.name,
        email: inputState.email,
        password: inputState.password,
      });
      if (res.status == 201) {
        toast.success(res.data?.msg);
        toast("Please login!!");
        return navigate("/auth");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
      }
      toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <div
      className="flex flex-col py-7 px-5 max-w-prose"
      onKeyDown={(e) => e.key == "Enter" && handleSignUp()}
    >
      <h2 className="flex items-center justify-center text-black font-bold font-serif ">
        <span>Welcome</span>
        <span>
          <img src={hand} alt="handwave" className="w-[20px] h-[20px]" />
        </span>
      </h2>
      <p className="font-semibold font-serif text-center md:px-3">
        Today is a new day. It's your day.You shape it.
      </p>
      <p className="font-semibold font-serif text-center md:px-3 py-2 sm:py-4">
        Sign up to find latest blog every minute.
      </p>
      <div className="flex wrapper flex-col gap-3 mx-auto w-full ">
        <label
          htmlFor=""
          className="flex flex-col justify-start font-serif lg:w-8/12 lg:mx-auto"
        >
          Name:
          <input
            type="text"
            name="name"
            value={inputState.name}
            onChange={(e) =>
              setInputState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Name"
            className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
          />
        </label>
        <label
          htmlFor=""
          className="flex flex-col justify-start font-serif lg:w-8/12 lg:mx-auto"
        >
          Email:
          <input
            type="text"
            name="email"
            value={inputState.email}
            onChange={(e) =>
              setInputState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Email"
            className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
          />
        </label>
        <label
          htmlFor=""
          className="flex flex-col justify-start font-serif lg:w-8/12 lg:mx-auto"
        >
          Password:
          <input
            type="text"
            name="password"
            value={inputState.password}
            onChange={(e) =>
              setInputState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Password"
            className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
          />
        </label>

        <button
          className="bg-gray-900 py-2 px-3 rounded-md text-white my-3 lg:w-8/12 lg:mx-auto"
          onClick={handleSignUp}
        >
          Sign up
        </button>
      </div>
      <p className="font-sans text-center font-semibold">
        Have an account?
        <Link to={"/auth"} className="text-blue-600">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
