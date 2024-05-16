import { Typography } from "@mui/material";
import { useState } from "react";
import { Web3 } from "web3";

const Home = () => {
  const [connectedAccount, setConnectedAccount] = useState();

  async function connectMetamask() {
    //check metamask is installed
    console.log(window.ethereum);
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);
      console.log(web3);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      //show the first connected account in the react page
      setConnectedAccount(accounts[0]);
    } else {
      alert("Please download metamask");
    }
  }

  console.log(connectedAccount);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 p-10">
      <Typography variant="h3">Welcome to the Web3 Authentication</Typography>
      {/* Button to trigger Metamask connection */}
      <button onClick={() => connectMetamask()}>Connect to Metamask</button>

      {/* Display the connected account */}
      <h2>{connectedAccount}</h2>
    </div>
  );
};

export default Home;
