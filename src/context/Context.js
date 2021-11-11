import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();


const ContextProvider = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.binance.com/api/v3/trades?symbol=XRPBTC")
  .then((response) => response.json())
  .then((data) => setData(data)).catch((error) => console.log(error));
  }, [])
 
  return (
    <DataContext.Provider
      value={{ data }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default ContextProvider;