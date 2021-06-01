import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import covidImage from "./images/covid_image.png";
const App = () => {
  const [data, setData] = useState();
  const [country, setCountry] = useState();

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };
    getData();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(fetchedData);
    setData(fetchedData);
    setCountry(country);
    console.log(country);
  };

  if (!data) return <div className={styles.loading}>Loading....</div>;
  console.log(data);
  return (
    <div className={styles.container}>
      <img className={styles.image} src={covidImage} alt="covid 19"></img>
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};
export default App;
