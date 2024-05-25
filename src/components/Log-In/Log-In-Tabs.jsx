import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ManualLogIn from "./Manual-Log-In";
import MetamaskLogin from "./Metamask-Login";

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LoginTabs({ handleManualLogin, values, handleChange, loading, errorMessage, handleMetamaskLogin }) {
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Tabs value={value} onChange={handleChangeTab} aria-label="login tabs example">
          <Tab label="Manual Login" {...a11yProps(0)} />
          <Tab label="Metamask Login" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ManualLogIn
          handleManualLogin={handleManualLogin}
          values={values}
          handleChange={handleChange}
          loading={loading}
          errorMessage={errorMessage}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MetamaskLogin handleMetamaskLogin={handleMetamaskLogin} />
      </CustomTabPanel>
    </Box>
  );
}
