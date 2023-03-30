const getDataCity = async (city) => {
  //this function will get the data from the API
  try {
    if (!city) throw new Error("City is required");
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fda02f1840193b81e28ff9fa5b755c2`
    );

    if (!response.ok) {
      if(response.status === 404) {
        throw new Error(`Error 404: City "${city}" not found!`)
      }
      else{
      throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    }

    const data = await response.json();

    return { temp: data.main.temp - 273.15, humidity: data.main.humidity, status: 'ok' };
  } catch (error) {
    return {status: 'error', message: error}
  }
}

export default getDataCity;