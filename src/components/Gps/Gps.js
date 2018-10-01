import React, { Component } from 'react';

class Gps extends Component {
  constructor(props) {
    super(props)

    this.state = {
      position: {},
      currentTripDistance:[]
    }

    this.geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
    }

    this.metersInMile = 1609.34
    this.feetInMeter = 3.28084
    this.userGps
  }

  componentDidMount = () => {
    this.gpsInit()
  }

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.userGps)
  }

  gpsInit = () => {
    this.userGps = navigator.geolocation.watchPosition(this.geoSuccess, this.geoError, this.state.geoOptions);
  }

  geoSuccess = (position) => {
    console.log(position)
    this.setState({position})
  }
  
  geoError = () => {
    alert("No GPS available");
  }

  getDistance = (lat, long, alt) => {

  }

  render() {
    return (
      <div className="home">
        {this.state.position.coords &&
          <div>
            <p>
              Lat: {this.state.position.coords.latitude}
            </p>
            <p>
              Long: {this.state.position.coords.longitude}
            </p>
            <p>
              Mph: {(this.state.position.coords.speed * 60 * 60) / this.metersInMile}
            </p>
            <p>
              Alt: {this.state.position.coords.altitude * this.state.feetInMeter} ft
            </p>
          </div>
        }
      </div>
    );
  }
}


export default Gps;