import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/GeneralUI/Spinner/Spinner'
import './BitcoinPanel.css'
import DashboardCard from '../../components/dashboard/dashboardCard'

class BitcoinPanel extends Component {
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
        module: 'bitcoin',
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
      <div className="bitcoinPanel" style={styles.root}>
        {this.state.loading
          ? <Spinner color={this.props.color}/>
          : <DashboardCard color={this.props.color}>
              <h2>₿</h2>
              <div className="rate" >${Math.trunc(this.state.data.last)}</div>
              <div className="poweredBy">Powered by <a style={{ color: this.props.color }} href="https://www.coindesk.com/price/">Coindesk</a></div>
            </DashboardCard>
        }
      </div>)
  }
}

export default BitcoinPanel

BitcoinPanel.propTypes = {
  color: PropTypes.string,
  token: PropTypes.string
}