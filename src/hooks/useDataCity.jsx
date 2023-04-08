const API_KEY = "9fda02f1840193b81e28ff9fa5b755c2";

const useDataCity = async (city) => {
  try {
    if (!city) throw new Error("City is required");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`404: City "${city}" not found!`);
      } else {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }

    const {
      main: { temp, humidity },
      id,
      name,
    } = await response.json();

    return {
      temp: temp - 273.15,
      humidity,
      id,
      name,
      isError: false,
    };
  } catch (error) {
    return { isError: true, message: error };
  }
};

export default useDataCity;
