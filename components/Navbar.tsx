import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import React, { Fragment, useContext, useState } from "react";
import GoogleButton from "./GoogleButton";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";

const provider = new GoogleAuthProvider();

export default function Navbar() {
  const { user, userLoading } = useContext(AuthContext);
  const router = useRouter();

  const signout = async () => {
    try {
      await signOut(auth);
      console.log("signed out");
      router.push("/");
    } catch (error) {
      console.log("error signing out...");
      console.log(error);
    }
  };

  const signinWithGoogle = async () => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          console.log(result);

          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 flex items-center justify-between shadow-md">
      <h1 className="font-bold italic">
        <Link href={"/"}>Logo</Link>
      </h1>
      <ul className="flex gap-4">
        {!user && <GoogleButton onClick={signinWithGoogle} />}
        {user && (
          <li className="cursor-pointer" onClick={signout}>
            Sign Out
          </li>
        )}
      </ul>
    </div>
  );
}
