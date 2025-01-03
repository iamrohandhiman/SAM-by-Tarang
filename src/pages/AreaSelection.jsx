import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import Spline from '@splinetool/react-spline';
import { ProgressBar } from '../components/specific/ProgressBar';
import { getWeather } from '../services/weatherCall';
import MapComponent from '../components/specific/MapComponent';
import { Outlet, Link } from "react-router-dom";
import { IconLearnMore } from '../assets/fonts/IconLearnMore';

export const AreaSelection = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedPointsParent, setSelectedPointsParent] = useState([]);
  const [pointLocationParent, setPointsLocationParent] = useState([]);
  const [polygonAreaParent, setPolygonAreaParent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedPointsParent.length > 0) {
        try {
          const coordinates = pointLocationParent[0];
          const data = await getWeather();
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather:', error);
        }
      }
    };
    fetchWeatherData();
  }, [selectedPointsParent]);

  const searchLocation = () => {
    if (!searchQuery.trim() || !geocoder) return;
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        map.setCenter(location);
        map.setZoom(15);
      }
    });
  };

  const formatSelectedPoints = () => {
    return selectedPointsParent.map(point => `${point.lat},${point.lng}`);
  };

  const handleProceed = async () => {
    const areaData = {
      area: polygonAreaParent,
      location: pointLocationParent[0] || 'Not selected',
      selectedPoints: formatSelectedPoints(),
    };

    try {
      const response = await fetch('http://localhost:5000/user/pageOne/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(areaData),
      });

      if (response.ok) {
        console.log('Data posted successfully');
      } else {
        console.error('Failed to post data');
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <>
      <div className="absolute w-full">
        <div className="h-[294px] absolute z-0 w-full">
          <Spline scene="https://prod.spline.design/EP1vya0fhavhsOq4/scene.splinecode" />
        </div>
        <ProgressBar page={1} />
      </div>

      <div className="absolute mt-[294px] w-full bg-blue-900 h-screen">
        <div className="w-full flex justify-between items-center">
          <div className="mt-8 ml-8">
            <div className="flex justify-start items-center px-11 w-[641px] h-[123px] bg-blue-950 border-2 border-gray-500 rounded-[29px] mb-5">
              <div className="w-[135px] text-[30px] text-white">Select Area</div>
              <div className="h-[80%] w-[1px] mx-4 bg-slate-50"></div>
              <div className="text-[21px] text-white">
                Please click on the map to select and outline the points in a clockwise direction to define the area.
              </div>
            </div>

            <div className="px-11 w-[641px] h-[546px] bg-blue-950 border-2 border-gray-500 rounded-[29px]">
              {weatherData !== null ? (
                <div className="mt-5 text-black text-xl w-[500px] text-[13px] font-semi font-serif bg-orange-300 border-[1px] border-orange-500">
                  your selected location is a <span className="font-bold">prime spot</span> weather is{' '}
                  <span className="font-bold">{weatherData}°C</span>
                </div>
              ) : (
                <div className="text-black text-xl w-[80%] text-[13px] font-mono bg-orange-300 border-[1px] border-orange-500 p-5">
                  Select a point to view weather
                </div>
              )}
              
              <div className="font-sans text-white text-xl p-5 bg-blue-900 rounded-[13px]">
                <span className="font-bold">Location → </span>
                {pointLocationParent[0] || 'Not selected'}
              </div>
              <div className="font-sans text-white text-xl p-5 bg-blue-900 rounded-[13px] mt-5">
                <span className="font-bold">Area → </span>
                {polygonAreaParent} m²
              </div>

              <div className="w-[80%] h-[1px] bg-white mt-3 ml-12"></div>
              <div className="text-[40px] text-white">Search Area</div>
              <div className="w-[546px] flex items-center justify-center">
                <textarea
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
                  className="w-full h-12 resize-none bg-blue-800 rounded-lg border-2 border-gray-600 placeholder:pl-2 leading-loose overflow-hidden"
                  placeholder="Search for Area"
                />
              </div>
              <div className="w-[80%] h-[0.5px] bg-white mt-3 ml-12"></div>

              <div className='transition-all hover:opacity-45 rounded-[50px] flex justify-center items-center h-[43px] w-[184px] bg-slate-100 mt-[100px]'>
                <Link to="user/area/plan" onClick={handleProceed}>Proceed</Link>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-[25px] p-5 rounded-[25px] bg-blue-950 mr-4">
              <MapComponent
                setSelectedPointsParent={setSelectedPointsParent}
                setPointsLocationParent={setPointsLocationParent}
                setPolygonAreaParent={setPolygonAreaParent}
                setGeocoder={setGeocoder}
                geocoder={geocoder}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
