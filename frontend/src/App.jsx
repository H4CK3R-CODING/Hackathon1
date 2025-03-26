import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import DoctorRegister from "./pages/Register/DoctorRegister";
import PatientRegister from "./pages/Register/PatientRegister";
import LoginDoctor from "./pages/Login/LoginDoctor";
import LoginPatient from "./pages/Login/LoginPatient";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import SearchDoctors from "./pages/SearchDoctors/SearchDoctors";
import BookDoctor from "./pages/BookDoctor/BookDoctor";
import { useRecoilState } from "recoil";
import { use, useEffect } from "react";
import { isLoginIn, userRecoil } from "./Recoils/Atoms";
import axios from "axios";
// import isLoggedIn1 from "./Recoil/Recoil";

function App() {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoginIn);
  const [user, setUser] = useRecoilState(userRecoil);

  const checkLoggedIn = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/api/v1/user/isLoggedIn`,
        {
          token: localStorage.getItem("token"),
        },
        { withCredentials: true },
        config
      );
      if (data.msg == "userDoctor getted") {
        setIsLoggedIn(true);
        setUser("Doctor");
      } else if (data.msg == "userPatient getted") {
        setIsLoggedIn(true);
        setUser("Patient");
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    checkLoggedIn();
  }, [isLoggedIn, user]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Navbar />
      {user}
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/signin" element={<SignIn />}></Route> */}
        <Route path="/registerDoctor" element={<DoctorRegister />}></Route>
        <Route path="/registerPatient" element={<PatientRegister />}></Route>
        <Route path="/loginDoctor" element={<LoginDoctor />}></Route>
        <Route path="/loginPatient" element={<LoginPatient />}></Route>
        <Route path="/searchDoctors" element={<SearchDoctors />}></Route>
        <Route path="/bookingDoctor" element={<BookDoctor />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </>
  );
}

export default App;
