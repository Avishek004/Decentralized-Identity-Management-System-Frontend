import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../lib/api/auth";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const UserInfoSection = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col items-center justify-center w-full gap-10 p-6 sm:px-12 md:px-18 lg:px-24 xl:px-30 sm:py-8 md:py-10 lg:py-12 xl:py-16">
      <div className="flex items-center justify-between w-full">
        <Typography variant="h4">User Information</Typography>
        <Button type="button" color="info" onClick={(event) => navigate(`/edit-user-info`)} variant="outlined" startIcon={<Edit />}>
          Edit User Info
        </Button>
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
          <div className="flex flex-col items-center justify-center w-full gap-10">
            <Card sx={{ padding: "20px" }}>
              <CardMedia
                sx={{ width: 300, height: 300 }}
                image={`${import.meta.env.VITE_PINATA_GATEWAY_URL}/ipfs/${student?.image}`}
                title={student?.firstName + student?.lastName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" align="center">
                  {student?.firstName + " " + student?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Full Stack Developer
                </Typography>
              </CardContent>
            </Card>
            <TableContainer component={Paper}>
              <Table sx={{}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Public Key Address</TableCell>
                    <TableCell align="center">Address Info</TableCell>
                    <TableCell align="center">Phone Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{student?.address}</TableCell>
                    <TableCell align="center">{student?.addressInfo}</TableCell>
                    <TableCell align="center">{student?.number}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* <p className="text-sm not-italic font-medium font-poppins">
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
            </p> */}
          </div>
        )
      )}
    </div>
  );
};

export default UserInfoSection;
