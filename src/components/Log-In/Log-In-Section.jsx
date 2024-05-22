import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Web3 } from "web3";
import { login } from "../../lib/api/auth";
import { useNavigate } from "react-router-dom";

const LogInSection = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [values, setValues] = useState({
    address: "",
    username: "",
    password: "",
  });

  async function connectMetamask() {
    //check metamask is installed
    console.log(window.ethereum);
    if (window.ethereum) {
      setLoading(true);
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);
      console.log(web3);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      //show the first connected account in the react page
      setValues({
        ...values,
        address: accounts[0],
      });
      setIsMetamaskConnected(true);
      setLoading(false);
    } else {
      alert("Please download metamask");
    }
  }

  console.log(values);

  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, address, password } = values;
    console.log(values);

    // instantiate Web3 with the injected provider
    const web3 = new Web3(window.ethereum);
    console.log(web3);

    const signature = await web3.eth.personal.sign(username, address, password);
    console.log(signature);

    const payload = { username, address, password, signature };

    await login(payload)
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res?.data?.token);
        navigate(`/`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 p-6 sm:py-10 md:py-14 lg:py-16 xl:py-20 sm:px-12 md:px-18 lg:px-24 xl:px-30">
      {!isMetamaskConnected ? (
        <>
          <Typography variant="h6" align="center" className="w-full">
            To Initiate the log in process, you have to connect metamask wallet.
          </Typography>
          <Button type="button" variant="contained" onClick={() => connectMetamask()}>
            {loading ? "Connecting..." : "Connect to Metamask"}
          </Button>
        </>
      ) : (
        isMetamaskConnected && (
          <>
            <Typography variant="h6" align="center" className="w-full">
              Log in form
            </Typography>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-3/5 gap-5">
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
          </>
        )
      )}
    </div>
  );
};

export default LogInSection;
