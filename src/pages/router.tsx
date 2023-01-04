import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home";
import LayoutWithBottomNavigation from "../components/layout/LayoutWithBottomNavigation";
import ScrapPage from "./scrap";

const PageRouter = () => {
  return (
    <BrowserRouter>
      <LayoutWithBottomNavigation>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/scrap"} element={<ScrapPage />} />
        </Routes>
      </LayoutWithBottomNavigation>
    </BrowserRouter>
  );
};

export default PageRouter;
