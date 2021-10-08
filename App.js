import React, { useEffect, useState } from 'react';
import { Alert } from "react-native";
import Loading from './Loading';
import * as Location from "expo-location";
import axios from "axios";
import Weather from './Weather';

const API_KEY = "8ddc3b89597f00e79eee6b94f5279d86";

const App = () => {

  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState();
  const [temp, setTemp] = useState();
  
  const getWeather = async (latitude, longitude) => {
      const {
        data: {
          main: { temp },
          weather
        }
      } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
      );
    
    
    console.log(temp);
    setLoading(false);
    setCondition(weather[0].main);
    setTemp(temp);
  }

  const getLocation = async () => {
      try {
        await Location.requestForegroundPermissionsAsync();

        const {
          coords: { latitude, longitude }
        } = await Location.getCurrentPositionAsync();

        await getWeather(latitude, longitude);
        
      } catch (error) {
        Alert.alert("Can't find you.", "So sad");
      }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return loading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
}


export default App;

// export default class extends React.Component {

//     state = {
//       isLoading:true
//     };

//     getWeather = async (latitude, longitude) => {
//       const {
//         data: {
//           main: { temp },
//           weather
//         }
//       } = await axios.get(
//         `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
//       );

//       this.setState({ isLoading: false, condition: weather[0].main, temp });
//     };

//     getLocation = async () => {
//       try {
//         await Location.requestForegroundPermissionsAsync();

//         const {
//           coords: { latitude, longitude }
//         } = await Location.getCurrentPositionAsync();

//         this.getWeather(latitude, longitude);
        
//       } catch (error) {
//         Alert.alert("Can't find you.", "So sad");
//       }
//     };

//     componentDidMount() {
//       this.getLocation();
//     }

//     render() {
//       const { isLoading, temp, condition } = this.state;
//       console.log(condition);
//       return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}  />;
//     }
// }