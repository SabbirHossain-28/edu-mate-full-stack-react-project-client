import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../FirebaseConfig/firebase.config";
import useAxiosCommon from "../Hooks/useAxiosCommon";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();
  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photourl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photourl,
    });
  };

  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // setUser(currentUser);
      //       console.log(currentUser);
      //       setLoading(false);
      if (currentUser) {
        const userInfo = { email: currentUser?.email };
        axiosCommon.post("/jwt", userInfo).then((res) => {
          if (res?.data?.token) {
            localStorage.setItem("access-token", res?.data?.token);
            setUser(currentUser);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [axiosCommon]);

  const authInfo = {
    user,
    createUser,
    loginUser,
    updateUser,
    userLogOut,
    loading,
    googleLogin
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthContextProvider;
