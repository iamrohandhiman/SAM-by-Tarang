import React, { useState } from 'react'
import { BroseDropDown } from '../../assets/fonts/BroseDropDown'
import { IconLearnMore } from '../../assets/fonts/IconLearnMore'

export const SecondaryNavbar = () => {

//
 

  return (
    <div className='absolute w-full z-50'>
    <div className='flex justify-center items-center bg-blue-950 border-[1px] border-blue-300 '>
      {/* left center */}

          <div className='transition-all delay-10 hover:opacity-55 cursor-pointer '>
           
           {/* Browse Solar */}
             <div className=' h-14 flex justify-start items-center border-l-[1px]  border-r-[1px] border-blue-300 pr-[100px] pt-2  '>
                 {/* ICON */}
                  <div><BroseDropDown/></div>
                 {/* tesxt */}
                 <div className='font-sans text-[48px] font-normal text-white ml-[14px] pb-0 '  >Browse Solar</div>
             </div>
           {/* Panels */}
           <div className='flex justify-start items-center border-l-[1px] mt-0 pt-0 border-r-[1px] border-blue-300 pr-[100px] h-12 '>
                 <div className='font-sans text-[48px] font-normal text-white  ml-[73px]' >Pannels</div>
            </div>
             
          
           {/* line */}
           <div className='flex w-full justify-center items-center border-l-[1px]   border-r-[1px] border-blue-300 '>
                 <div className='w-[384px] h-[1px] mt-4 mb-2 bg-white '></div>
            </div>

           {/* solar pannels for everyspace everyneed */}
            <div className='flex items-center justify-center border-l-[1px]   border-r-[1px] border-blue-300'>
              <div className='text-blue-300 font-semibold text-[20px] pr-[12px]'>Solar Panels for every Space, Every Need</div>
            </div>

           {/* serving India's 20Kw+ Need */} 
           <div className='flex items-center justify-center border-l-[1px]   border-r-[1px] border-blue-300 '>
              <div className='text-gray-400 font-semibold text-[20px] pr-[128px]'>Serving India's 20Kw+ Need </div>
            </div>


           {/* {Learn more} */}
           <div className='flex items-center justify-center border-l-[1px]  pl-6 border-r-[1px] py-[44px] border-blue-300 '>
              <div className='text-white font- text-[20px]  pr-[280px] flex justify-center items-center'>Learn More <IconLearnMore/></div>
              
            </div>

          </div>


      {/* right center */}
             <div className='transition-all delay-10 hover:opacity-55 cursor-pointer '>
           
           {/* Browse Solar */}
             <div className=' h-14 flex justify-start items-center   border-r-[1px] border-blue-300 pr-[100px] pt-2'>
                 {/* ICON */}
                  <div><BroseDropDown/></div>
                 {/* tesxt */}
                 <div className='font-sans text-[48px] font-normal text-white ml-[14px] pb-0' >Explore</div>
             </div>
           {/* Subsidy Options */}
           <div className='flex justify-start items-center  mt-0 pt-0 border-r-[1px] border-blue-300 pr-[100px] h-12 '>
                 <div className='font-sans text-[48px] font-normal text-white  ml-[73px]' >Subsidy Options</div>
            </div>
             
          
           {/* line */}
           <div className='flex w-full justify-center items-center   border-r-[1px] border-blue-300 '>
                 <div className='w-[384px] h-[1px] mt-4 mb-2 bg-white '></div>
            </div>

           {/*Unlock Government Golar Subsidies*/}
            <div className='flex items-center justify-center   border-r-[1px] border-blue-300 '>
              <div className='text-blue-300 font-semibold text-[20px] pr-[55px]'>Unlock Government Golar Subsidies</div>
            </div>

           {/* serving India's 20Kw+ Need */} 
           <div className='flex items-center justify-center  border-r-[1px] border-blue-300 '>
              <div className='text-gray-400 font-semibold text-[20px] pr-[20px]'>Empowering Households with Subsidies </div>

              

            </div>


           {/* {Learn more} */}
           <div className='flex items-center justify-center  pl-6 border-r-[1px] py-[44px] border-blue-300 '>
              <div className='text-white font- text-[20px]  pr-[280px] flex justify-center items-center'>Learn More <IconLearnMore/></div>
              
            </div>

          </div>

    </div>
  </div>
  )
}
