import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import Index from "./pages/Index";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

const RoutesWrapper = (props: Props) => {
  const APP_USER = useSelector((state) => (state as any)?.user);

  return (
    <Routes>
      {APP_USER && (
        <>
          <Route path="/" element={<Index />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
      {!APP_USER && (
        <>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};

export default RoutesWrapper;
