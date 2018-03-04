import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconBuild from "material-ui/svg-icons/action/build";
import IconPerson from 'material-ui/svg-icons/social/person'

import AdminPanel from "../adminPanel/adminPanel";

import TodoPanel from "../../modules/Todo/TodoPanel";
import BitcoinPanel from "../../modules/Bitcoin/BitcoinPanel";
import WeatherPanel from "../../modules/Weather/WeatherPanel";
import Bio180Panel from "../../modules/Bio180/Bio180Panel";
import Acctg219Panel from "../../modules/Acctg219/Acctg219Panel";
import MinecraftPanel from "../../modules/Minecraft/MinecraftPanel";

import Icon from "../../logo.svg";

import {
  accentColor,
  accentColor2,
  accentColor3,
  accentColor4,
  accentColor5,
  accentColor6,
  secondaryColor
} from "../../theme/theme";
import socket from "../Websockets/Socket";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      adminPanel: false
    };
  }

  componentDidMount() {
    this.getUserInfo(this.props.token);
  }

  getUserInfo = token => {
    fetch("/api/user", {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        token: token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(user => {
        this.setState({
          user: user
        });
      });
  };

  toggleAdminPanel = () => {
    this.setState({
      adminPanel: !this.state.adminPanel
    });
  };

  styles = {
    div: {
      height: "100%"
    },
    appbar: {
      boxShadow: "none"
    },
    DashboardCard: {
      alignSelf: "flex-start"
    }
  };

  render() {
    let appBarProps = {
      iconElementRight: (
        <span>
          <IconButton onClick={() => {}}>
            <IconPerson color={secondaryColor}/>
          </IconButton>
          {this.state.user.admin ? (
            <IconButton onClick={this.toggleAdminPanel}>
              <IconBuild color={secondaryColor}/>
            </IconButton>
          ) : null}
        </span>
      ),
      iconElementLeft: (
        <img
          style={{
            height: "40px",
            margin: "5px 0"
          }}
          src={Icon}
          alt="Logo"
        />
      )
    };

    return (
      <div style={this.styles.div}>
        <AppBar title="Dashb0ard" style={this.styles.appbar} {...appBarProps} />
        {this.state.adminPanel ? (
          <AdminPanel token={this.props.token} />
        ) : (
          <main>
            <div
              style={{
                width: "90%",
                height: "90%",
                display: "flex",
                flexDirection: "row",
                margin: "5%",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              <TodoPanel
                styles={this.styles.DashboardCard}
                color={accentColor2}
                token={this.props.token}
              />
              <BitcoinPanel
                styles={this.styles.DashboardCard}
                color={accentColor3}
                token={this.props.token}
              />
              <WeatherPanel
                styles={this.styles.DashboardCard}
                color={accentColor}
                token={this.props.token}
              />
              <Bio180Panel
                styles={this.styles.DashboardCard}
                color={accentColor4}
                token={this.props.token}
              />
              <Acctg219Panel
                styles={this.styles.DashboardCard}
                color={accentColor5}
                token={this.props.token}
              />
              <MinecraftPanel
                styles={this.styles.DashboardCard}
                color={accentColor6}
                token={this.props.token}
              />
            </div>
          </main>
        )}
      </div>
    );
  }
}

export default socket(Dashboard);
