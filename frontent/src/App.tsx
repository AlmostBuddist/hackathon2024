import { useState } from "react";
import "./App.css";
import { defaultQuery } from "./url/axios";
import { IScanerResponse } from "../types";

function App() {
  const [devices, setDevices] = useState<IScanerResponse[]>([]);
  const [isLoaging, setIsLoading] = useState<boolean>(false);

  const onSearch = async () => {
    try {
      setIsLoading(true);

      const res = await defaultQuery.get<IScanerResponse[]>("/search_devices");
      setDevices(res.data);
      console.log(res);
    } catch (err) {
      const typesError = err;
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={onSearch} disabled={isLoaging}>
        Поиск устройств
      </button>

      {isLoaging && <div>Loading...</div>}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {devices.map((elem) => (
          <div>
            <div>Имя: {elem.name}</div>
            <div>MAc-Адрес: {elem.address}</div>
            <div>Serial-Number: {elem.serialNumber}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
