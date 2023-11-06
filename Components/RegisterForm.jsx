"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All field are necessary");
      return;
    }

    try {
      const responce = await fetch("api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await responce.json();
      if (user) {
        setError("User already Exist");
        return;
      }
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        router.push("/login");
        const form = e.target;
        form.reset();
        setName("");
        setEmail("");
        setPassword("");
      } else {
        console.log("User Registration Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid place-items-center h-screen ">
      <div className="shadow-lg p-4 rounded-lg border-t-4 border-green-400  ">
        <h1 className="text-xl font-bold my-4 ">Register</h1>
        <form className="flex flex-col gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            name="fullName"
            type="text"
            placeholder="Full Name"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            {" "}
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right " href={"/login"}>
            Already have an account?{" "}
            <span className="hover:underline"> Login </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
