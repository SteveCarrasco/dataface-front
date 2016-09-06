import React from 'react';

export default class ErrorMessage extends React.Component {
  render() {
    return (
      <div className="alert alert-border-left green lighten-4 green-text text-darken-2">
        <strong>{ this.props.message }</strong>
      </div>
    )
  }
}
