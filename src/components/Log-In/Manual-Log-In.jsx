import { Button, TextField, Typography } from "@mui/material";
import React from "react";

const ManualLogIn = ({ handleManualLogin, values, handleChange, loading, errorMessage }) => {
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
      {errorMessage && (
        <Typography variant="h5" align="center" className="w-full text-red-900">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default ManualLogIn;
