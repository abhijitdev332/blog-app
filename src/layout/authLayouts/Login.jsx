import React, { useState } from "react";
import hand from "../../assets/icons/hand.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInt from "../../services/api/api";
import { useLoaderStore, useUserStore } from "../../services/store/store";
import { z } from "zod";
import { CustomButton } from "../../components/components";
const Login = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setLoading, removeLoading } = useLoaderStore();
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const schema = z.object({
    email: z.string().email("Please enter valid Email!!"),
    password: z
      .string()
      .min(6, "Password should be 6 charcters long!!")
      .max(10, "Password should not greater that 10 charcters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
  });
  // handle signin
  const handleSignIn = async () => {
    // check if input is not empty
    for (let ele in inputState) {
      if (inputState[ele].trim() == "") {
        // show toast
        toast.info(`Please enter ${ele} field`);
        return;
      }
    }
    // validate data
    try {
      setLoading();
      schema.parse(inputState);
      let body = JSON.stringify(inputState);
      //  send request o backend
      let res = await AxiosInt.post("/auth/login", body);
      if (res.status == 200) {
        if (res.data?.data?.isActive == false) {
          toast.info("Sorry your account blocked by the Admin!!");
          return;
        }
        toast.success(res.data?.msg);
        setUser(res.data?.data);
        if (state == "/") {
          return navigate("/", { replace: true });
        } else {
          return navigate(state, { replace: true });
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message);
      }
      toast.error(err?.response?.data?.msg);
    } finally {
      removeLoading();
    }
  };
  return (
    <div
      className="flex flex-col p-2  max-w-prose"
      onKeyDown={(e) => {
        e.key == "Enter" && handleSignIn();
      }}
    >
      <h2 className="flex items-center justify-center gap-2 text-black font-bold font-serif ">
        <span>Welcome Back</span>
        <span>
          <img src={hand} alt="handwave" className="w-[20px] h-[20px]" />
        </span>
      </h2>
      <p className="font-semibold font-serif text-center md:px-3">
        Today is a new day. It's your day.You shape it.
      </p>
      <p className="font-semibold font-serif text-center py-3 md:px-3">
        Sign in to start managing your blogs.
      </p>

      <label
        htmlFor=""
        className="flex flex-col justify-start font-serif py-2 lg:w-8/12 lg:mx-auto"
      >
        Email:
        <input
          type="text"
          value={inputState.email}
          onChange={(e) =>
            setInputState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="email"
          placeholder="Email"
          className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
        />
      </label>
      <label
        htmlFor=""
        className="flex flex-col justify-start font-serif py-2 lg:w-8/12 lg:mx-auto"
      >
        Password:
        <input
          type="text"
          value={inputState.password}
          onChange={(e) =>
            setInputState((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          name="password"
          placeholder="Password"
          className="bg-slate-200 p-2 outline-none border-2 border-gray-400 rounded-md"
        />
      </label>

      <CustomButton
        func={handleSignIn}
        classnames={
          "bg-gray-900 py-2 px-3 rounded-md text-white my-3 lg:w-8/12 lg:mx-auto"
        }
      >
        Sign in
      </CustomButton>
      <p className="font-sans text-center font-semibold">
        Don't have an account?
        <Link to={"/auth/register"} className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
