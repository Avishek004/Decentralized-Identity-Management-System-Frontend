import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { Web3 } from "web3";
import { getNonce, login, loginWithMetamask } from "../../lib/api/auth";
import { useNavigate } from "react-router-dom";
import LoginTabs from "./Log-In-Tabs";

const LogInSection = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [values, setValues] = useState({
    address: "",
    username: "",
    password: "",
  });

  async function connectMetamask() {
    //check metamask is installed
    // console.log(window.ethereum);
    if (window.ethereum) {
      setLoading(true);
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);
      // console.log(web3);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();
      // console.log(accounts);

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

  // console.log(values);

  const handleChange = (event) => {
    // console.log(event.target.name, event.target.value);
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const handleManualLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { username, address, password } = values;
    // console.log(values);

    // instantiate Web3 with the injected provider
    const web3 = new Web3(window.ethereum);
    // console.log(web3);

    let nonce;

    await getNonce()
      .then((res) => {
        // console.log(res);
        nonce = res?.data?.nonce;
      })
      .catch((err) => {
        console.error(err);
      });

    // Try to sign the message
    let signature;
    try {
      signature = await web3.eth.personal.sign(nonce, address, password);
      // console.log("Signature:", signature);
    } catch (signError) {
      // User refused to sign the message
      // console.error("User refused to sign the message:", signError);
      setLoading(false);
      setErrorModal(true);
      setErrorMessage("You refused to sign the message.");
      return;
    }

    const payload = { username, address, password, signature, nonce };

    await login(payload)
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          setLoading(false);
          setSuccessModal(true);
          setSuccessMessage(res?.data?.message);
          localStorage.setItem("access_token", res?.data?.token);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          setLoading(false);
          console.error(err);
          setErrorModal(true);
          setErrorMessage(err?.response?.data?.message);
        }
      });
  };

  // console.log(errorModal);

  const handleMetamaskLogin = async (event) => {
    setLoading(true);
    const { address } = values;
    // console.log(values);

    // instantiate Web3 with the injected provider
    const web3 = new Web3(window.ethereum);
    // console.log(web3);

    let nonce;

    await getNonce()
      .then((res) => {
        // console.log(res);
        nonce = res?.data?.nonce;
      })
      .catch((err) => {
        console.error(err);
      });

    // Sign the nonce with the user's address
    // Try to sign the message
    let signature;
    try {
      signature = await web3.eth.personal.sign(nonce, address, "");
      // console.log("Signature:", signature);
    } catch (signError) {
      // User refused to sign the message
      // console.error("User refused to sign the message:", signError);
      setLoading(false);
      setErrorModal(true);
      setErrorMessage("You refused to sign the message.");
      return;
    }

    const payload = { address, signature, nonce };

    // Send the signed message to the server
    await loginWithMetamask(payload)
      .then((res) => {
        if (res?.status === 200) {
          setLoading(false);
          setSuccessModal(true);
          setSuccessMessage(res?.data?.message);
          localStorage.setItem("access_token", res?.data?.token);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        setErrorModal(true);
        setErrorMessage(err.response.data.message);
      });
  };

  const handleNavigate = () => {
    if (errorModal) {
      setErrorModal(false);
      navigate(`/login`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="w-full p-6 sm:py-10 md:py-14 lg:py-16 xl:py-20 sm:px-12 md:px-18 lg:px-24 xl:px-30">
      {!isMetamaskConnected ? (
        <div className="flex flex-col items-center justify-center w-full gap-8">
          <Typography variant="h6" align="center" className="w-full">
            To Initiate the log in process, you have to connect metamask wallet.
          </Typography>
          <Button type="button" variant="contained" onClick={() => connectMetamask()}>
            {loading ? "Connecting..." : "Connect to Metamask"}
          </Button>
        </div>
      ) : (
        isMetamaskConnected && (
          <LoginTabs
            handleManualLogin={handleManualLogin}
            values={values}
            handleChange={handleChange}
            loading={loading}
            errorMessage={errorMessage}
            handleMetamaskLogin={handleMetamaskLogin}
            successModal={successModal}
            errorModal={errorModal}
            successMessage={successMessage}
            handleNavigate={handleNavigate}
          />
        )
      )}
    </div>
  );
};

export default LogInSection;
