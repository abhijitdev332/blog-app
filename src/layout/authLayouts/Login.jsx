import React, { useState } from "react";
import hand from "../../assets/icons/hand.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInt from "../../services/api/api";
import { useLoaderStore, useUserStore } from "../../services/store/store";
import { z } from "zod";
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setLoading, removeLoading } = useLoaderStore();
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const schema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(5, "minimum 3 char needed"),
  });

  const handleSignIn = async () => {
    for (let ele in inputState) {
      if (inputState[ele].trim() == "") {
        // show toast
        toast.error("Please enter all fleids");
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
          toast("sorry you are blocked by Admin");
          return;
        }
        toast.success("login successFull");
        setUser(res.data?.data);
        navigate("/admin");
      } else {
        toast.warning(res.data?.msg);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message);
      }
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

      <button
        className="bg-gray-900 py-2 px-3 rounded-md text-white my-3 lg:w-8/12 lg:mx-auto"
        onClick={handleSignIn}
      >
        Sign in
      </button>
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
