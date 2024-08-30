import { Outlet } from "react-router-dom";
import Head from "../Head";

export const AppLayout = () => {
  return (
    <>
      <Head />
      <Outlet />
    </>
  );
};
