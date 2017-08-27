import React, { Component } from 'react';
import { Modal, Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import { submitEvent } from '../actions/actions';
import { connect } from 'react-redux';

class EventAdd extends Component {
  constructor() {
    super();
    this.state = {
      userInputTitle: '',
      userInputStartDate: '',
      userInputEndDate: '',
      userInputCategory: '',
      userInputDetails: ''
    };
  }

  submitEvent() {
    this.props.submitEvent({
      title: this.state.userInputTitle,
      start: this.state.userInputStartDate,
      end: this.state.userInputEndDate,
      category: this.state.userInputCategory,
      details: this.state.userInputDetails
    });

    this.props.close();
  }

  handleChangeUserInputDetails = e => { this.setState({ userInputDetails: e.target.value }) }
  handleChangeUserInputCategory = e => { this.setState({ userInputCategory: e.target.value }) }
  handleChangeUserInputStartDate = e => { this.setState({ userInputStartDate: e.target.value }) }
  handleChangeUserInputEndDate = e => { this.setState({ userInputEndDate: e.target.value }) }
  handleChangeUserInputTitle = e => { this.setState({ userInputTitle: e.target.value }) }
  formatDate = (date) => new Date(date).toDateString()

  render() {

    const date = this.props.currentDate ? this.formatDate(this.props.currentDate._d) : "";

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header>
            <Modal.Title>Events for: {date}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Enter event title:</ControlLabel>
              <FormControl
                type="text"
                value={this.state.userInputTitle}
                placeholder="Enter event title"
                onChange={this.handleChangeUserInputTitle.bind(this)}
              />
              <ControlLabel>Enter start date:</ControlLabel>
              <FormControl
                type='text'
                value={this.state.userInputStartDate}
                placeholder="Enter start date"
                onChange={this.handleChangeUserInputStartDate.bind(this)}
              />
              <ControlLabel>Enter end date:</ControlLabel>
              <FormControl
                type='text'
                value={this.state.userInputEndDate}
                placeholder="Enter end date"
                onChange={this.handleChangeUserInputEndDate.bind(this)}
              />
              <ControlLabel>Enter category:</ControlLabel>
              <FormControl
                type='text'
                value={this.state.userInputCategory}
                placeholder="Enter category"
                onChange={this.handleChangeUserInputCategory.bind(this)}
              />
              <ControlLabel>Enter details:</ControlLabel>
              <FormControl
                type='text'
                value={this.state.userInputDetails}
                placeholder="Enter details"
                onChange={this.handleChangeUserInputDetails.bind(this)}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.close}>Close</Button>
            <Button onClick={this.submitEvent.bind(this)} className="btn btn-primary">Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  submitEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(EventAdd);