import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import LayoutWithBottomNavigation from "../components/layout/LayoutWithBottomNavigation";

const PageRouter = () => {
  return (
    <BrowserRouter>
      <LayoutWithBottomNavigation>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </LayoutWithBottomNavigation>
    </BrowserRouter>
  );
};

export default PageRouter;
