import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUpModal = ({ modal, message }) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={modal}
      disableEscapeKeyDown={true}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          position: "relative",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          borderRadius: "1rem",
          background: "white",
        },
      }}
    >
      <img src="https://i.ibb.co/bLzKFCq/clear.png" alt="" onClick={() => window.location.reload()} className="absolute w-6 h-6 top-5 right-5" />
      <p className="w-full text-3xl not-italic text-center font-hindi_poppins">{message}</p>
      <button onClick={() => navigate(`/login`)} className="bg-[#8940F8] font-hindi font-black hover:bg-[#562f91] text-white px-6 py-3 rounded-lg">
        Please Log in here
      </button>
    </Dialog>
  );
};

export default SignUpModal;
