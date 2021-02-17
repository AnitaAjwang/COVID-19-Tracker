import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

//async await deals with promises
export const fetchData = async (country) =>{
    let changeableUrl = url;

    if(country){
        changeableUrl= `${url}/countries/${country}`;
    }

    try{
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
        /**destructuring data
         *{data} is the same as response.data
         *{data:{confirmed}} is the same as data.confirmed
         */
        const modifiedData = {confirmed,recovered,deaths,lastUpdate};

        // return response;//returning response from API
        // console.log(response);
        return modifiedData;
        
    }
    catch(error)
    {
        return error;
    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);
        //console.log(data);

        const modifiedDailyData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedDailyData;
    }
    catch(error){
        return error;
    }
}

export const fetchCountries = async () => {
    try{
        const {data : {countries} } = await axios.get(`${url}/countries`);
        return countries.map((country) =>country.name);
        
    }
    catch(error){
        return error;
    }
}