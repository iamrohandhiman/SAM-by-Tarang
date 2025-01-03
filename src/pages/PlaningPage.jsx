import React from "react";
import { ProgressBar } from "../components/specific/ProgressBar";
import Spline from "@splinetool/react-spline";

export const PlaningPage = () => {
  return (
    <>
      <div className="absolute w-full">
        <div className="h-[294px] absolute z-0 w-full">
          <Spline scene="https://prod.spline.design/EP1vya0fhavhsOq4/scene.splinecode" />
        </div>
        <ProgressBar page={2} />
      </div>

      <div className="absolute mt-[294px] w-full bg-blue-900 h-screen"></div>
    </>
  );
};
