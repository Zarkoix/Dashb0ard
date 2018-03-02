import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../../components/GeneralUI/Spinner/Spinner";
import "./WeatherPanel.css";
import DashboardCard from "../../components/dashboard/dashboardCard";

class BitcoinPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }

  componentDidMount() {
    fetch("/api/module/endpoint", {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        module: "weather",
        token: this.props.token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          data: data,
          loading: false
        });
      });
  }

  kToF = k => Math.round((k * 9 / 5 - 459.67) * 10) / 10;

  render() {
    let styles = {
      root: {
        textAlign: "center"
      }
    };

    return (
      <div className="weatherPanel" style={styles.root}>
        {this.state.loading ? (
          <Spinner color={this.props.color} />
        ) : (
          <DashboardCard color={this.props.color}>
            <h2>Weather</h2>
            {this.state.data.main ? (
              <div>
                <h4 style={{ color: this.props.color }}>Seattle</h4>
                <div>Now: {this.kToF(this.state.data.main.temp)}°F</div>
                <div>Max: {this.kToF(this.state.data.main.temp_max)}°F</div>
                <div>Min: {this.kToF(this.state.data.main.temp_min)}°F</div>
              </div>
            ) : (
              <h2>An error occured :(</h2>
            )}
            <div className="poweredBy">
              Powered by{" "}
              <a
                style={{ color: this.props.color }}
                href="http://openweathermap.org/city"
              >
                OpenWeatherMap
              </a>
            </div>
          </DashboardCard>
        )}
      </div>
    );
  }
}

export default BitcoinPanel;

BitcoinPanel.propTypes = {
  color: PropTypes.string,
  token: PropTypes.string
};
