import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../components/GeneralUI/Spinner/Spinner'
import './Acctg219.css'
import DashboardCard from '../../components/dashboard/dashboardCard'

class Acctg219 extends Component {
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
        module: 'acctg219',
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
      })
  }

  render () {
    let styles = {
      root: {
        textAlign: 'center'
      }
    }

    return (
      <div className="bio180Panel" style={styles.root}>
        {this.state.loading
          ? <Spinner color={this.props.color}/>
          : <DashboardCard color={this.props.color}>
            <h2>Acctg219</h2>
            <div className="date" style={{ color: this.props.color }}>For {this.state.data.date}</div>
            <div className="contents">
              <div>{this.state.data.topic}</div>
              <div>{this.state.data.reading}</div>
              <div>RQ: {this.state.data.hw}</div>
              <div className="poweredBy"><a style={{ color: this.props.color }} href="https://canvas.uw.edu/courses/1129260">Canvas</a></div>
            </div>
          </DashboardCard>
        }
      </div>)
  }
}

export default Acctg219

Acctg219.propTypes = {
  color: PropTypes.string,
  token: PropTypes.string
}