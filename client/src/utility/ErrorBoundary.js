import React from 'react'
import DashboardCard from '../components/dashboard/dashboardCard'
import { errorColor } from '../theme/theme'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <DashboardCard color={errorColor}>
        <div style={{
          textAlign: 'center'
        }}>
          <h2 style={{
            margin: '5px'
          }}>Whoops</h2>
          <p style={{
            margin: '5px'
          }}>an error occurred</p>
        </div>
      </DashboardCard>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary

