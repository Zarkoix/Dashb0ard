import React, { Component } from 'react'
import PropTypes from 'prop-types'
import socket from '../../components/Websockets/Socket'
import { actions } from './todoActions'
import Spinner from '../../components/GeneralUI/Spinner/Spinner'
import './TodoPanel.css'
import DashboardCard from '../../components/dashboard/dashboardCard'

class TodoPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.initialState,
      loading: true,
      newTodo: ''
    }
  }

  initialState = {
    todos: []
  }

  componentDidMount() {
    fetch('/api/module/data', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        module: 'todo',
        token: this.props.token
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
          this.setState({
            data: data.todos ? data : this.initialState,
            loading: false
          })
      })
    this.props.socket.registerType('todo', this.onMessage)
  }

  /*
    Sets the current data to that from the server

    This pattern is bad for network efficiency, but means we don't have to calculate deltas between server and client
    state while retaining the benefits of isomorphic javascript
   */
  onMessage = (message) => {
    const data = actions[message.data.action](this.state.data, message.data.value)
    this.setState({
      data: data.todos ? data : this.initialState
    })
  }

  /*
    Dispatches a web socket message to create a new item
   */
  callNewTodo = (t) => {
    this.props.socket.send(JSON.stringify({
      type: 'todo',
      data: {
        action: 'createTODO',
        value: t
      }
    }))
  }

  /*
    Dispatches a web socket message to delete the item at index t
   */
  callDeleteTodo = (t) => {
    this.props.socket.send(JSON.stringify({
      type: 'todo',
      data: {
        action: 'deleteTODO',
        value: t
      }
    }))
  }

  styles = {
    root: {
      textAlign: 'center'
    }
  }

  render () {
    return (
      <div className="todoPanel" style={this.styles.root}>
        {this.state.loading
          ? <Spinner color={this.props.color}/>
          : <DashboardCard color={this.props.color}>
            <h2>Todo</h2>
            <ul>
              {this.state.data.todos.map((t, i) => (
                <li
                  key={i}
                  onClick={() => this.callDeleteTodo(i)}
                >
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <input
              value={this.state.newTodo}
              onChange={(e) => this.setState({
                newTodo: e.target.value
              })}
              style={{borderColor: this.props.color}}
              type="text"
              placeholder="Buy Groceries..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  this.callNewTodo(this.state.newTodo)
                  this.setState({
                    newTodo: ''
                  })
                }
              }}
            />
          </DashboardCard>
        }
      </div>
    )
  }
}

export default socket(TodoPanel)

TodoPanel.propTypes = {
  color: PropTypes.string,
  socket: PropTypes.object.isRequired,
  token: PropTypes.string
}