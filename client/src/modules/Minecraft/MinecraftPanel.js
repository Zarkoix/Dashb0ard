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
      editIP: false,
      ip: ''
    };
  }

  fetchData = ip => {
    let text = ip ? ('/' + ip) : ''
    console.log(text)
    fetch('/api/module/endpoint' + text, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        module: 'minecraft',
        token: this.props.token
      }
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        this.setState({
          data: data,
          loading: false,
          ip: data.ip
        })

      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchData()
  }

  render () {
    let styles = {
      root: {
        textAlign: 'center'
      }
    };

    return (
      <div className="minecraft__panel" style={styles.root}>
        {this.state.loading ? (
          <Spinner color={this.props.color}/>
        ) : (
          <DashboardCard color={this.props.color}>
            <h2>Minecraft</h2>
            {this.state.editIP ? (
              <input
                value={this.state.ip}
                ref={(input) => { this.ipInput = input }}
                onChange={e =>
                  this.setState({
                    ip: e.target.value
                  })
                }
                onBlur={() => this.setState({
                  editIP: false,
                  ip: this.state.data.ip
                })}
                style={{borderColor: this.props.color}}
                type="text"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    this.fetchData(this.state.ip)
                    this.setState({
                      editIP: false
                    })
                  }
                }}
              />
            ) : (
              <h4
                className="ip"
                style={{color: this.props.color}}
                onClick={() => {
                  this.setState({editIP: true})
                  setTimeout(() => this.ipInput.focus(), 0)
                }}
              >
                {'' + this.state.ip}
              </h4>
            )}

            <div className="players">
              {this.state.data.players.online}/{this.state.data.players.max}
            </div>
            <div className="poweredBy">
              Powered by{' '}
              <a
                style={{color: this.props.color}}
                href="https://api.mcsrvstat.us/"
              >
                mcsrvstat.us
              </a>
            </div>
          </DashboardCard>
        )}
      </div>
    );
  }
}

export default MinecraftPanel

MinecraftPanel.propTypes = {
  color: PropTypes.string,
  token: PropTypes.string
};
