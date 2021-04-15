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
      cityData: {},
      weatherData: [],
    };
  }
  handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.city);
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      console.log(cityData);
      let cityICareAboutData = cityData.data[0];
      this.setState({
        cityData: cityICareAboutData
      });

      this.getWeatherData();
    } catch (err) {
      console.log(err);
      this.setState({ error: `${err.message}: ${err.response.data.error}` });
    }
  }
  getWeatherData = async () => {
    const weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`)
    this.setState({
      weatherData: weatherData.data
    })

  }
  render() {
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
        {this.state.cityData.lat !== undefined ?
          (
            <>
              <Jumbotron>
                <h3>{this.state.cityData.display_name}</h3>
                <h5>{this.state.cityData.lat}, {this.state.cityData.lon}</h5>
                <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt={`Map of ${this.state.cityData.display_name}`} />
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
