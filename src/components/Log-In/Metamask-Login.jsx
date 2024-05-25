import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

const MetamaskLogin = ({ handleMetamaskLogin }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Button type="button" color="info" onClick={(event) => handleMetamaskLogin(event)} variant="outlined" startIcon={<Edit />}>
        Login With Metamask
      </Button>
    </div>
  );
};

export default MetamaskLogin;
