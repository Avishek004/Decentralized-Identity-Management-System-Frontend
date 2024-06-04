import axios from "axios";

export const fileUpload = async (payload) => {
  return await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", payload, {
    maxContentLength: "Infinity", // This is needed to prevent axios from erroring out with large files
    headers: {
      "Content-Type": `multipart/form-data; boundary=${payload._boundary}`,
      Authorization: `Bearer ${import.meta.env.VITE_PINATA_SECRET_KEY}`,
    },
  });
};
