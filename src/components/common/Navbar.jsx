import { NavLink } from "react-router-dom";

const Navbar = () => {
  const loggedInUser = localStorage.getItem("access_token");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return (
    <div className="w-full h-24 flex items-center justify-between bg-gradient-to-br from-[rgba(203,243,240,1)] to-[rgba(247,236,234,0.3)] p-6 sm:px-12 md:px-18 lg:px-24 xl:px-30">
      <NavLink to="/" className="text-xl not-italic font-semibold text-black cursor-pointer w-36 lg:w-44 font-hindi">
        BlockVerify
      </NavLink>
      <div className="flex items-center gap-5">
        {loggedInUser ? (
          <>
            <NavLink to="/user-info" className="text-xl not-italic font-semibold text-black cursor-pointer font-hindi">
              User Info
            </NavLink>
            <button onClick={() => handleLogout()} className="text-xl not-italic font-semibold text-black cursor-pointer font-hindi">
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/sign-up" className="text-xl not-italic font-semibold text-black cursor-pointer font-hindi">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="text-xl not-italic font-semibold text-black cursor-pointer font-hindi">
              Log in
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
