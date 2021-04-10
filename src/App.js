import React from 'react';
import './App.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      cityData: {}
    };
  }
  handleFormSubmit = async(event) => {
    event.preventDefault();
    console.log(this.state.city);
    let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
    console.log(cityData);
    let cityICareAboutData = cityData.data[0];
    this.setState({
      cityData: cityICareAboutData
    });
  }
  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="city">
            <Form.Label>City name</Form.Label>
            <Form.Control value={this.state.city} onInput={e => this.setState({city: e.target.value})}></Form.Control>
          </Form.Group>
          <Button variant="primary"
          type="submit">
            Explore!
          </Button>
        </Form>
        {this.state.cityData.lat !== undefined ? <Jumbotron>
          <h3>{this.state.cityData.display_name}</h3>
          <h5>{this.state.cityData.lat}, {this.state.cityData.lon}</h5>

        </Jumbotron> : ''}
      </>
    )
  }
}

export default App;
