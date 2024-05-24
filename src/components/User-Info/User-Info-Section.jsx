import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../lib/api/auth";

const UserInfoSection = () => {
  const {
    data: student,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userinfo"],
    queryFn: () => getUserInfo(),
  });

  console.log(student);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 p-6 sm:px-12 md:px-18 lg:px-24 xl:px-30 sm:py-10 md:py-14 lg:py-16 xl:py-20">
      <div className="flex items-center justify-between w-full">
        <p className="text-xl text-black font-poppins">User Information</p>
        <Link to="/edit-user-info">Edit User Info</Link>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full min-h-screen bg-white">
          <div className="w-20 h-20 border-solid rounded-full animate-spin border-y-8 border-blue border-t-transparent" />
        </div>
      ) : isError ? (
        <div className="w-full bg-white">
          <p className="w-full text-xl not-italic font-medium tracking-wide text-center text-black font-poppins">{error.message}</p>
        </div>
      ) : (
        isSuccess &&
        student && (
          <div className="flex flex-col w-full gap-5">
            <p className="text-sm not-italic font-medium font-poppins">
              <span className="text-blue">Name: </span>
              <span className="text-black">{student?.data?.firstName + " " + student?.data?.lastName}</span>
            </p>
            <p className="text-sm not-italic font-medium font-poppins">
              <span className="text-blue">Address: </span>
              <span className="text-black">{student?.data?.addressInfo}</span>
            </p>
            <p className="text-sm not-italic font-medium font-poppins">
              <span className="text-blue">Phone Number: </span>
              <span className="text-black">{student?.data?.number}</span>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default UserInfoSection;
