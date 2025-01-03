import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import Spline from '@splinetool/react-spline';
import { ProgressBar } from '../components/specific/ProgressBar';
import { getWeather } from '../services/weatherCall';
import MapComponent from '../components/specific/MapComponent';

export const AreaSelection = () => {
  const [weatherData, setWeatherData] = useState(23); // Default to null
  const [selectedPointsParent,setSelectedPointsParent] = useState([])
  const [pointLocationParent,setPointsLocationParent] = useState([])
  const [polygonAreaParent,setPolygonAreaParent] = useState(0)
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
        <div className="w-full flex justify-between items-center">
          {/* Left */}
          <div className="mt-8 ml-8">
            {/* Upper Div */}
            <div className="flex justify-start items-center px-11 w-[641px] h-[123px] bg-blue-950 border-2 border-gray-500 rounded-[29px] mb-5">
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
            <div className=" px-11 w-[641px] h-[546px] bg-blue-950 border-2 border-gray-500 rounded-[29px]">
              {weatherData ? (
                <div className= "mt-5 text-black text-xl w-[80%] text-[16px] font-semi font-serif bg-orange-300 border-[1px] border-orange-500">your selected location is a <span className='font-bold'>prime spot </span>weather is  <span className='font-bold'>{weatherData}°C</span></div>
              ) : (
                <div className="text-black text-xl w-[80%] text-[13px] font-mono bg-orange-300 border-[1px] border-orange-500 p-5 ">Loading weather data...</div>
              )}
              <div className='font-sans text-white text-xl p-5 bg-blue-900  rounded-[13px]'><span className='font-bold'>{"Location → " }</span>{pointLocationParent[0]}</div>
              <div className='font-sans text-white text-xl p-5 bg-blue-900 rounded-[13px] mt-5'><span className='font-bold'>{"Area → " }</span>{polygonAreaParent} m²</div>
              
              {/* line seprating search area */}

              <div className='w-[80%] h-[1px] bg-white mt-3 ml-12'></div>
              <div className='text-[40px] text-white'>Search Area</div>
              <div className='w-[546px] flex items-center justify-center'>
                <textarea  className=' flex items-center justify-center w-[546px]' name="" id="" placeholder='Search for Area'></textarea>
              </div>


              {/* test logging for selected poonts */}
              {console.log(selectedPointsParent)}
              {console.log(pointLocationParent)}
              {console.log(polygonAreaParent)}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className='mt-[25px] p-5 rounded-[25px] bg-blue-950  mr-4'>
            <MapComponent 
            setSelectedPointsParent={setSelectedPointsParent} 
            setPointsLocationParent={setPointsLocationParent}
            setPolygonAreaParent={setPolygonAreaParent}
            />
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
