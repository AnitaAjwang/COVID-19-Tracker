import React from 'react';
import { Cards, Chart, CountryPicker} from './components'; //import is done in components/index.js
import styles from './App.module.css';
import { fetchData } from './API';
import coronaImage from './images/coronaviruslogo.jpg';

class App extends React.Component{
    state = {
       data: {}, 
       country: '',
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        //console.log(fetchedData);
        this.setState({data:fetchedData});
    };

    handleCountryChange = async (country) => {
        //console.log(country);
        //fetch data
        const fetchedData = await fetchData(country);
        //set the state
        this.setState({ data:fetchedData, country: country});
        
    }


    render() {
        /**Here we are destructuring data
         * taking data out of this.state
         * such that {data} = this.state.data
         */
        const {data, country} = this.state;

        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID 19"/>
               <Cards data= {data}/>
               <CountryPicker handleCountryChange={this.handleCountryChange}/>
               <Chart data={data} country={country}/>

            </div>
        )
    }
}
export default App;