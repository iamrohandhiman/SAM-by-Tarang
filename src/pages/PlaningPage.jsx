import React, { useRef } from "react";
import logoPanel from "../assets/images/Group 23.png"
import CompanyImages from "../assets/images/Group 2.png"
import { ProgressBar } from "../components/specific/ProgressBar";
import Spline from "@splinetool/react-spline";
import { FabricCanvas } from "../components/layout/FabricMap";
import { useState } from "react";
import MapComponent from "../components/specific/MapComponent";
import { IconLearnMore } from "../assets/fonts/IconLearnMore";
export const PlaningPage = () => {
  // const [panelCount,setpanelCount] = useState(0)
  // const [ph,setph]=useState(60)
  // const [pw,setpw]=useState(40)

  return (
    <>
      <div className="absolute w-full">
        <div className="h-[294px] absolute z-0 w-full">
          <Spline scene="https://prod.spline.design/EP1vya0fhavhsOq4/scene.splinecode" />
        </div>
        <ProgressBar page={2} />
      </div>


      <div>
         <img src="" alt="" />
      </div>
     
    

      <div className="absolute mt-[294px] w-full bg-blue-900 h-full]">
       {/* main backgroung */}
      

      {/* overview div */}
      <div className="flex justify-start items-center px-14 pt-2">
            <span className="text-[24px] text-white ">Overview-Plan</span>
      </div>
      
      <div className=" flex justify-center items-center ml-[150px]   w-[80%] text-[16px] text-gray-300 bg-blue-950 rounded-[10px] my-4 py-1 ">
           <div className="flex justify-center items-start px-10 "> *Notice:the estimated area can be off by a margin percentage of 5%.Google maps are updated every 6 months[1] if your selected region is unavailable or not found please raise a ticket For buisnness quieres you can contact sambytarang@gmail.com  <IconLearnMore/> </div>
      </div>

      <div>
        <img src={CompanyImages} alt="" />
      </div>

      <div className="flex justify-center items-center ">
        <div className="bg-[#9BB3FB] mr-4 text-blue-950 w-[543px] h-[303px] rounded-[20px] flex-col items-center justify-center pl-8 ">
          <div className="text-[46px]">Estimate your Plan and Costs</div>
          <div className="mt-[100px] text-[22px]">It is complete and Comprehensive</div>
        </div>

        <div className="bg-[#9BB3FB] mL-4 text-blue-950 w-[543px] h-[303px] rounded-[20px] flex-col items-center justify-center pl-8 ">
          <div className="text-[46px]">Estimate your Plan and Costs</div>
          <div className="mt-[100px] text-[22px]">It is complete and Comprehensive</div>
        </div>
      </div>

      <div >
        <img src={logoPanel} className="h-[40px] ml-[40px] my-6" alt="" />
      </div>

       {/* pannelLayoutdivcont */}
       <div className="flex justify-between items-center">
          <div className="bg-blue-950  rounded-[10px] flex justify-center items-center ">
             {/* <FabricCanvas setpanelCount={setpanelCount} ph={ph} pw={pw}></FabricCanvas> */}
             <FabricCanvas ></FabricCanvas>
          </div>



          <div className="bg-blue-950  rounded-[10px]">
              Count is {panelCount}
          </div>
       </div>

      </div>
    </>
  );
};
