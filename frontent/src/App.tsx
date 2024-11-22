import { useState } from "react";
import "./App.css";
import { defaultQuery } from "./url/axios";

function App() {
  const [isLoaging, setIsLoading] = useState<boolean>(false);

  const onSearch = async () => {
    try{

    setIsLoading(true);

    const res = await defaultQuery.get("/search_devices");

    console.log(res);
  } catch (err) {
    const typesError = err;
    console.log(err)
  } finally {
    setIsLoading(false)
  }
  };

  return (
    <>
      <button onClick={onSearch} disabled={isLoaging}>
        Поиск устройств
      </button>

      {isLoaging && <div>Loading...</div>}
    </>
  );
}

export default App;
