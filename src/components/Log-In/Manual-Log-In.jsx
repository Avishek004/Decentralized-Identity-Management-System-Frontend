import { Button, TextField, Typography } from "@mui/material";
import LogInModal from "./Log-In-Modal";

const ManualLogIn = ({ handleManualLogin, values, handleChange, loading, errorMessage, successModal, errorModal, successMessage }) => {
  // console.log(errorModal);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-5">
      <Typography variant="h6" align="center" className="w-full">
        Log in form
      </Typography>
      <form onSubmit={handleManualLogin} className="flex flex-col items-center justify-center w-3/5 gap-5">
        <TextField
          fullWidth
          required
          id="username"
          label="Username"
          name="username"
          type="text"
          variant="outlined"
          value={values?.username}
          placeholder="Enter The Username"
          onChange={(event) => handleChange(event)}
        />
        <TextField
          fullWidth
          required
          type="password"
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          value={values?.password}
          placeholder="Enter The Password"
          onChange={(event) => handleChange(event)}
        />
        <Button fullWidth type="submit" variant="contained" disabled={!values?.username && !values?.password}>
          {loading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
};

export default ManualLogIn;
