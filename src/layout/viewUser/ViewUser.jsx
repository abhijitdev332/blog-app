import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Header } from "../../includes/includes";
import { toDateString } from "../../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import cl from "classnames";
import { useLoaderStore, useUserStore } from "../../services/store/store";
import AxiosInt from "../../services/api/api";
import { DataLoader } from "../layouts";
import { z, ZodError } from "zod";
import { CustomButton } from "../../components/components";
const ViewUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data } = useFetchData(`/user/${userId}`);
  const { user } = useUserStore();
  const { setLoading, removeLoading } = useLoaderStore();
  const [userValue, setUserValue] = useState({
    id: "",
    username: "",
    email: "",
    roles: [],
    status: undefined,
    joinDate: "",
  });
  const [validUser, setValidUSer] = useState(
    user?._id == userId || user?.roles?.includes("admin")
  );
  const [loader, setLoader] = useState(false);
  const userSchema = z.object({
    username: z
      .string()
      .min(5, "Username should be 5 charcters long!!")
      .max(15, "Username can't greater than 15 charcters!!"),
    email: z.string().email("Please enter a valid email!!"),
  });
  const handleInputChange = (e) => {
    setButtonShow(true);
    setUserValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleUpdate = async () => {
    if (userValue?.email?.trim() == "" || userValue?.username.trim() == "") {
      toast.error("Please enter correct input!!");
      return;
    }
    try {
      setLoader(true);
      userSchema.parse({
        username: userValue.username,
        email: userValue.email,
      });
      let res = await AxiosInt.put(`/user/${userId}`, {
        username: userValue?.username,
        email: userValue?.email,
      });
      if (res.status == 200) {
        toast.success(res.data?.data?.msg);
        return navigate("/admin");
      }
    } catch (err) {
      if (err instanceof ZodError) {
        toast.info(err.errors[0].message);
      }
      toast.error(err?.response?.data?.msg);
    } finally {
      setLoader(false);
    }
  };
  const handleDelete = async () => {
    try {
      setLoader(true);
      let res = await AxiosInt.delete(`/user/${userValue?.id}`);
      if (res.status == 200) {
        toast.success(res.data?.data?.msg);
        return navigate("/admin");
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (!data) {
      setLoading();
    } else {
      setUserValue({
        id: data?._id,
        username: data?.username,
        email: data?.email,
        roles: data?.roles,
        status: data?.isActive ? "active" : "Unactive",
        joinDate: toDateString(data?.createdAt),
      });
      removeLoading();
    }
  }, [data]);

  return (
    <>
      <Header />
      <div className="viewUser">
        <div className="wrapper lg:container lg:mx-auto py-5 px-4">
          <div className="avatar flex justify-center">
            <div className="box text-indigo-500 bg-slate-400 rounded-full p-5 w-[5rem] h-[5rem] flex justify-center items-center">
              <span className="font-bold text-3xl">
                {userValue?.username?.charAt(0)}
              </span>
            </div>
          </div>
          <div className="my-5 flex items-center gap-5 flex-col ">
            <div className="box w-[30vw] p-4 border-2 rounded-md flex flex-col gap-4">
              <label htmlFor="username" className="flex flex-col gap-1 robo ">
                <span className="font-semibold text-lg">User Name:</span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  readOnly={validUser ? false : true}
                  value={userValue.username}
                  className="border-2 rounded-md border-slate-400 p-2"
                  onChange={handleInputChange}
                />
              </label>
              <label htmlFor="email" className="flex flex-col gap-1 robo ">
                <span className="font-semibold text-lg"> Email:</span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  readOnly={validUser ? false : true}
                  value={userValue.email}
                  className="border-2 rounded-md border-slate-400 p-2"
                  onChange={handleInputChange}
                />
              </label>
              {validUser && (
                <CustomButton
                  loader={loader}
                  func={handleUpdate}
                  classnames={cl("bg-green-400 p-1 rounded font-medium")}
                >
                  Update
                </CustomButton>
              )}
            </div>
            <div className="flex flex-col gap-3 w-[30vw] border-2 rounded-md border-slate-400 p-4">
              <div className="flex flex-col gap-2">
                <span className="font-semibold text-lg robo">Roles:</span>
                <div className="flex gap-2">
                  {userValue?.roles?.map((ele) => (
                    <div className="chip">
                      <div
                        className={`rounded-full px-2`}
                        style={{ background: "#3a459add" }}
                      >
                        <span className="text-sm font-medium leading-loose text-slate-50 capitalize">
                          <p className="robo">{ele}</p>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="flex flex-col gap-2 robo">
                <span className="font-semibold">Join Date:</span>
                <span>{userValue?.joinDate}</span>
              </p>
            </div>
            {validUser && (
              <CustomButton
                func={handleDelete}
                classnames={"bg-red-500 text-white p-2 rounded"}
              >
                Delete Account
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      <DataLoader />
      <ToastContainer />
    </>
  );
};

export default ViewUser;
