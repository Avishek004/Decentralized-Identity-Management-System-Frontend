import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfo, updateUserInfo } from "../../lib/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const EditUserInfoSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    picture: "",
    addressInfo: "",
    number: "",
  });

  const { data: userinfo, isSuccess } = useQuery({
    queryKey: ["userinfo"],
    queryFn: () => getUserInfo(),
  });

  useEffect(() => {
    if (isSuccess && userinfo) {
      setValues(userinfo.data);
    }
  }, [isSuccess, userinfo]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  console.log(values);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await updateUserInfo(values)
      .then((res) => {
        console.log(res);
        navigate("/user-info");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 p-6 sm:px-12 md:px-18 lg:px-24 xl:px-30 sm:py-10 md:py-14 lg:py-16 xl:py-20">
      <Typography variant="h3" align="center" className="w-full">
        Update User Information
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-3/5 gap-5">
        <TextField
          fullWidth
          id="firstName"
          type="text"
          name="firstName"
          label="First Name"
          variant="outlined"
          value={values?.firstName}
          placeholder="Enter the First Name"
          onChange={(event) => handleChange(event)}
        />
        <TextField
          fullWidth
          id="lastName"
          type="text"
          name="lastName"
          label="Last Name"
          variant="outlined"
          value={values?.lastName}
          placeholder="Enter the Last Name"
          onChange={(event) => handleChange(event)}
        />
        <TextField
          fullWidth
          id="addressInfo"
          type="text"
          name="addressInfo"
          label="Address Info"
          variant="outlined"
          value={values?.addressInfo}
          placeholder="Enter the Address Info"
          onChange={(event) => handleChange(event)}
        />
        <TextField
          fullWidth
          id="number"
          type="number"
          name="number"
          label="Phone Number"
          variant="outlined"
          value={values?.number}
          placeholder="Enter the Phone Number"
          onChange={(event) => handleChange(event)}
        />
        <Button type="submit" variant="contained">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default EditUserInfoSection;
