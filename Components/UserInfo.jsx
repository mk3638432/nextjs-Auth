"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const UserInfo = () => {
  const { data: session } = useSession();
  const handleLogout = () => {
    console.log(234567876);
    signOut();
    redirect("/");
  };
  return (
    <div className="grid place-items-center h-screen ">
      <div className="shadow-lg p-8 bg-zinc-300 flex flex-col gap-2 my-6  ">
        <div>
          Name : <span className="font-bold"> {session?.user?.name} </span>
        </div>
        <div>
          Email : <span className="font-bold"> {session?.user?.email} </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3  "
        >
          {" "}
          LogOut
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
