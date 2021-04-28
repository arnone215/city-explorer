import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Movies extends React.Component {
  render() {
    let allListGroups = this.props.movieData.map((city, index) => (
      <ListGroup.Item key={index}>{`${city.title}: ${city.overview}`}</ListGroup.Item>
    ))
    console.log('in movie js', this.props.movieData);
    return (
      <ListGroup>
        {allListGroups}
      </ListGroup>
    );
  }
}





export default Movies;