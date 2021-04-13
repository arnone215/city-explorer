import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {
  render() {
    let allListGroups = this.props.weatherData.map((day, index) => (
      <ListGroup.Item key={index}>{`${day.date}: ${day.description}`}</ListGroup.Item>
    ))
    console.log('in weather js', this.props.weatherData);
    return (
      <ListGroup>
        {allListGroups}
      </ListGroup>
    );
  }
}





export default Weather;