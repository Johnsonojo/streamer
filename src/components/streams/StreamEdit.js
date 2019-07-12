import React, { Component } from "react";
import { connect } from "react-redux";
import { editStream, getStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";
class StreamEdit extends Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
        {/* <StreamForm
          initialValues={{
            title: this.props.stream.title,
            description: this.props.stream.description
          }}
          onSubmit={this.onSubmit}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { editStream, getStream }
)(StreamEdit);
