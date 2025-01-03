import { useState } from 'react';
import { IconDropDown } from '../../assets/fonts/IconDropDown.jsx';
import Logo from '../../assets/images/08pAuxMLiJOy.png';
import { SecondaryNavbar } from './SecondaryNavbar.jsx';

export const Navbar = () => {
  // State to track hover state on 'Products'
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);

  // Handle hover start
  const onHover = () => {
    setIsHoveringProducts(true);
  };

  // Handle hover end
  const onHoverEnd = () => {
    setIsHoveringProducts(false);
  };

  return (
    <div>
      {/* Main Navbar */}
      <div className="h-[87px] w-full bg-blue-950 flex justify-between items-center">
        {/* left */}
        <div className="flex justify-center items-center pl-[179px]">
          <img src={Logo} className="h-[45px]" alt="Logo" />
          <div
            className="flex justify-center items-center font-sans text-[20px] font-normal text-white ml-16 transition-all delay-10 cursor-pointer  hover:text-blue-600"
            onMouseEnter={onHover} 
           
          >
            Products <IconDropDown />
          </div>
          <div className="flex justify-center items-center font-sans text-[20px] font-normal text-white ml-16 transition-all delay-10 cursor-pointer  hover:text-blue-600">
            Learn <IconDropDown />
          </div>
          <div className="flex justify-center items-center font-sans text-[20px] font-normal text-white ml-16 transition-all delay-10 cursor-pointer  hover:text-blue-600">
            Customers
          </div>
        </div>

        {/* right */}
        <div className="flex justify-center items-center mr-[179px]">
          <div className="flex justify-center items-center font-sans text-[20px] font-normal text-white ml-16 transition-all delay-10 cursor-pointer  hover:text-blue-600">
            Login
          </div>
          <div className="bg-blue-900 h-[40px] w-[124px] flex justify-center items-center font-sans text-[20px] font-normal text-white ml-16 border-[1px] border-blue-200 rounded-[50px] transition-all delay-10 cursor-pointer hover:opacity-50">
            Plan Solar
          </div>
        </div>
      </div>

      {/* Optional State-based Rendering for Secondary Navbar */}
      <div onMouseLeave={onHoverEnd}>
      {isHoveringProducts && <SecondaryNavbar  />}
      </div>
     
    </div>
  );
};
