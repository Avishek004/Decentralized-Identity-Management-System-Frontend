import { Web3 } from "web3";

export const web3Connection = async () => {
  let web3;
  web3 = new Web3(window.ethereum);

  return web3;
};
