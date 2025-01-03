import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import Spline from '@splinetool/react-spline';
import { ProgressBar } from '../components/specific/ProgressBar';
import { getWeather } from '../services/weatherCall';

export const AreaSelection = () => {
  const [weatherData, setWeatherData] = useState(23); // Default to null

    

  return (
    <>
      <div className="absolute w-full">
        {/* Spline z-index 0 */}
        <div className="h-[294px] absolute z-0 w-full">
          <Spline scene="https://prod.spline.design/EP1vya0fhavhsOq4/scene.splinecode" />
        </div>

        {/* ProgressBar */}
        <ProgressBar page={1} />

        {/* Select Area */}
      </div>

      <div className="absolute mt-[294px] w-full bg-blue-900 h-screen">
        <div className="w-full flex justify-center items-center">
          {/* Left */}
          <div className="mt-8">
            {/* Upper Div */}
            <div className="flex justify-start items-center px-11 w-[641px] h-[123px] bg-blue-950 border-2 border-gray-500 rounded-[29px]">
              {/* Select Area */}
              <div className="w-[135px] text-[30px] text-white">Select Area</div>

              {/* Line */}
              <div className="h-[80%] w-[1px] mx-4 bg-slate-50"></div>

              {/* Information */}
              <div className="text-[21px] text-white">
                Please click on the map to select and outline the points in a clockwise direction to define the area.
              </div>
            </div>

            {/* Lower Div Info Upload */}
            <div className="flex justify-start items-center px-11 w-[641px] h-[546px] bg-blue-950 border-2 border-gray-500 rounded-[29px]">
              {weatherData ? (
                <div className="text-black text-xl w-[80%] text-[13px] font-semi font-serif bg-orange-300 border-[1px] border-orange-500">your selected location is a <span className='font-bold'>prime spot </span>weather is  <span className='font-bold'>{weatherData}°C</span></div>
              ) : (
                <div className="text-black text-xl w-[80%] text-[13px] font-mono bg-orange-300 border-[1px] border-orange-500">Loading weather data...</div>
              )}

              
            </div>
          </div>

          {/* Right */}
          <div>Map</div>
        </div>
      </div>
    </>
  );
};
