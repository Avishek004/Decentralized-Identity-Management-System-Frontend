import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-24 flex items-center justify-between bg-gradient-to-br from-[rgba(203,243,240,1)] to-[rgba(247,236,234,0.3)] p-6 sm:px-12 md:px-18 lg:px-24 xl:px-30">
      <NavLink to="/" className="text-xl not-italic font-semibold text-black cursor-pointer w-36 lg:w-44 font-hindi">
        BlockVerify
      </NavLink>
      <div className="flex items-center gap-5">
        <NavLink to="/sign-up" className="text-xl not-italic font-semibold text-black cursor-pointer font-hindi">
          Sign Up
        </NavLink>
        <NavLink to="/log-in" className="text-xl not-italic font-semibold text-black cursor-pointer font-hindi">
          Log in
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
