import React, { ReactElement, useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";

interface Props {
  component: React.ComponentType;
  redirectedTo: string;
  reverse?: boolean;
}
const ProtectedRoute = ({
  redirectedTo,
  component: Component,
  reverse = false,
}: Props) => {
  // const user = authService.getCurrentUser();
  const user = authService.getCurrentUser();
  const location = useLocation();

  console.log("===============ProtectedRoute=====================");
  console.log(user);
  console.log("===============ProtectedRoute=====================");

  // useEffect(() => {
  //   if (user !== null) {
  //     setIsLoading(false);
  //   }
  // }, [user]);

  // if (isLoading) {
  //   return <div>Loading...</div>; // Or a more sophisticated loading component
  // }

  if (reverse) {
    return user ? (
      <Navigate to={redirectedTo} state={{ from: location }} replace />
    ) : (
      <Component />
    );
  }

  return user ? (
    <Component />
  ) : (
    <Navigate to={redirectedTo} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
