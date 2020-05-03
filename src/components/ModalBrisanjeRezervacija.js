import React, { Component } from 'react';
import "../nadijaModal.css";
import PropTypes from "prop-types";

class ModalBrisanjeRezervacija extends Component {
    onClose = e => { 
    this.props.onClose && this.props.onClose(e);
  };
   handleCancel = e => { 
    this.props.onClose && this.props.onClose(e); 
  }; 
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div class="irma modal" id="modal">
                <h2>Cancel reservation </h2>
                <div class="irma content">
                    {this.props.children}</div>
                <div class="irma  actions">
                    <button id="btnCancel" class="irma toggle-button" onClick={this.handleCancel}>
                    </button>
                    <button class="irma toggle-button" onClick={this.onClose}>
                        Return
          </button>
                </div>
            </div>
        );
    }
}

export default ModalBrisanjeRezervacija;