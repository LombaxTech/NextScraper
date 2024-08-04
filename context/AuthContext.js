import { app, db } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect, createContext } from "react";

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      setUserLoading(true);

      if (authUser) {
        console.log("auth user found inside onauthchanged");

        const userRef = doc(db, "users", authUser.uid);

        try {
          onSnapshot(userRef, (userSnapshot) => {
            console.log("usersnpashop  found");
            console.log(userSnapshot.exists());
            console.log(userSnapshot.data());

            if (userSnapshot.exists()) {
              setUser({ ...authUser, ...userSnapshot.data() });
            } else {
              setUser({ ...authUser, setup: false });
            }

            setUserLoading(false);
          });
        } catch (error) {
          console.log("no user found in onauthchange");
          setUser(null);
          setUserLoading(false);
        }

        // console.log("here is auth user");
        // console.log(authUser);

        // setUser(authUser);
        // setUserLoading(false);
      } else {
        setUser(null);
        setUserLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
