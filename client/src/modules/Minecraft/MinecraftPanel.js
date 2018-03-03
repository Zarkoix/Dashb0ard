import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/GeneralUI/Spinner/Spinner'
import './MinecraftPanel.css'
import DashboardCard from '../../components/dashboard/dashboardCard'

class MinecraftPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      loading: true,
    }
  }

  componentDidMount() {
    fetch('/api/module/endpoint', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        module: 'minecraft',
        token: this.props.token
      }
    })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      this.setState({
        data: data,
        loading: false
      })
    }).catch((err) => console.log(err))
  }

  render () {
    let styles = {
      root: {
        textAlign: 'center'
      }
    }

    return (
      <div className="minecraft__panel" style={styles.root}>
        {this.state.loading
          ? <Spinner color={this.props.color}/>
          : <DashboardCard color={this.props.color}>
              <h2>Minecraft</h2>
              <div className="rate" >{this.state.data.players.online}/{this.state.data.players.max}</div>
              <div className="poweredBy">Powered by <a style={{ color: this.props.color }} href="https://api.mcsrvstat.us/">mcsrvstat.us</a></div>
            </DashboardCard>
        }
      </div>)
  }
}

export default MinecraftPanel

MinecraftPanel.propTypes = {
  color: PropTypes.string,
  token: PropTypes.string
}