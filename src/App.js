import React from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Jumbotron } from 'react-bootstrap';
import Weather from './Weather.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityData: '',
      weatherData: [],
      lat: '',
      lon: '',
    };
  }
  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      console.log(cityData);
      let cityICareAboutData = cityData.data[0];
      // this.getWeatherData();
      const newWeatherData = await this.getWeatherData(cityICareAboutData);
      console.log(newWeatherData);
      this.setState({
        cityData: cityICareAboutData.display_name,
        lat: cityICareAboutData.lat,
        lon: cityICareAboutData.lon,
        weatherData: newWeatherData
      });
      console.log(this.state.cityData, this.state.lat, this.state.lon)

    } catch (err) {
      console.log(err);
      this.setState({ error: `${err.message}: ${err.response.data.error}` });
    }
  }
  getWeatherData = async (cityICareAboutData) => {
    console.log('here');
    const weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`, {params: {lat: cityICareAboutData.lat, lon: cityICareAboutData.lon}}).catch((err) => console.log(err));
    // this.setState({
    //   weatherData: weatherData.data
    // })
    return weatherData.data;
  }
  render() {
    console.log(this.state);
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="city">
            <Form.Label>City name</Form.Label>
            <Form.Control value={this.state.city} onInput={e => this.setState({ city: e.target.value })}></Form.Control>
          </Form.Group>
          <Button variant="primary"
            type="submit">
            Explore!
          </Button>
        </Form>
        {this.state.error ? <h3>{this.state.error}</h3> : ''}
        {this.state.lat !== undefined ?
          (
            <>
              <Jumbotron>
                <h3>{this.state.cityData}</h3>
                <h5>{this.state.lat}, {this.state.lon}</h5>
                <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=13`} alt={`Map of ${this.state.cityData}`} />
              </Jumbotron>
              <Weather weatherData={this.state.weatherData} />
            </>
          )
          : ''}

      </>
    )
  }
}

export default App;
