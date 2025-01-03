import React from 'react'
import image from "../../assets/images/map (1) 1.png"
import heate from "../../assets/images/heater 1.png"
import budget from "../../assets/images/budget 1.png"

export const ProgressBar = ({ page }) => {
  // Set the ring color based on the page
  const getRingColor = (circleNumber) => {
    if (page === circleNumber) {
      return 'border-white'; 
    } else if (page > circleNumber) {
      return 'border-white'; 
    } else {
      return 'border-gray-600'; 
    }
  };

  return (
    <div className='absolute w-full z-0'>
      {/* section indicator */}
      <div className='flex justify-start pl-[36px] pt-[20px] items-center text-white text-[18px] font-thin'>
        <span className='text-gray-400'>plan/select/</span> area
      </div>

      {/* progress bar */}
      <div className='text-white flex justify-center items-center w-full pt-6'>
        {/* circle one */}
        <div className={`flex justify-center items-center h-[59px] w-[59px] bg-blue-950 border-[4px] ${getRingColor(1)} rounded-full`}>
          <img src={image} className='h-[30px]' alt="" />
        </div>

        {/* connectingLineOne */}
        <div className='w-[340px] h-1 bg-gray-600'> </div>

        {/* circle two */}
        <div className={`flex justify-center items-center h-[59px] w-[59px] bg-blue-950 border-[4px] ${getRingColor(2)} rounded-full`}>
          <img src={heate} className='h-[35px]' alt="" />
        </div>

        {/* connectingLineTwo */}
        <div className='w-[340px] h-1 bg-gray-600'> </div>

        {/* circle three */}
        <div className={`flex justify-center items-center h-[59px] w-[59px] bg-blue-950 border-[4px] ${getRingColor(3)} rounded-full`}>
          <img src={budget} className='h-[30px]' alt="" />
        </div>
      </div>

      <div className='justify-between items-center flex px-[315px]'>
        <div className='pl-2 font-semibold text-white'>1. Select Area</div>
        <div className='pl-2 font-semibold text-white'>2. Plan Your Solar</div>
        <div className='pl-2 font-semibold text-white'>3. Get quotation</div>
      </div>

      {/* descriptions */}
      <div className='justify-between items-center flex px-[305px]'>
        <div className=' pr-8 font-semibold text-white'><span className='text-gray-300'>(roof-tops/spaces)</span></div>
        <div className='  font-semibold text-white '><span className='text-gray-300'> (panel/budgeting/services)</span></div>
        <div className='font-semibold text-white'><span className='text-gray-300'>(your plan/your budget )</span></div>
      </div>
    </div>
  )
}
