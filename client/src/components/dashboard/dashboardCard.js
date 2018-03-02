import React, { Component } from "react";
import PropTypes from "prop-types";
import { textColor, accentColor } from "../../theme/theme";
import ErrorBoundary from "../../utility/ErrorBoundary";

class DashboardCard extends Component {
  render() {
    let styles = {
      border: "1px solid",
      borderColor: this.props.color ? this.props.color : accentColor,
      margin: "5px",
      padding: "5px",
      borderRadius: "5px",
      color: textColor,
      width: "150px",
      height: "170px",
      position: "relative"
    };

    return (
      <ErrorBoundary>
        <div style={{ ...this.props.styles, ...styles }}>
          {this.props.children}
        </div>
      </ErrorBoundary>
    );
  }
}

export default DashboardCard;

DashboardCard.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.object,
  color: PropTypes.string
};
