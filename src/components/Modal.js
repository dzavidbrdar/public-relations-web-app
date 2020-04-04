import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  onClose = e => { if(window.confirm('Do you want to discard this review?'))
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div class="modal" id="modal">
        <h2>Make a review</h2> 
        <div class="content">        
          {this.props.children}</div>
        <div class="actions">
          <button class="toggle-button" onClick={this.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};