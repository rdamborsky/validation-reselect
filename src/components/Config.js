import React, { Component, PropTypes } from 'react';

// at this level of complexity, I'd prefer to go with container.
// But for example purposes, component is fine.

class Config extends Component {

  render() {
    const props = this.props;
    const values = props.values;
    if (!values) {
      return <div>No config selected</div>;
    }

    const actions = props.actions;
    return (
      <div>
        <div>
          <label>Name</label>
          <br />
          <input value={ values.name } onChange={ e => actions.changeName(e.target.value) }/>
        </div>
        <div>
          <label>Properties descriptors</label>
          <br />
          { this.renderDescriptors() }
        </div>
        <div>
          <label>Owner user</label>
          <br />
          <input value={ values.owner } onChange={ e => actions.changeOwner(e.target.value) }/>
        </div>
      </div>
    );
  }

  renderDescriptors() {
    const props = this.props;
    const options = props.descriptors.map(desc => {
      return (
        <option key={ desc.id } value={ desc.id }>{ desc.name }</option>
      );
    });
    const handler = e => props.actions.changeDescriptor(e.target.value);
    return (
      <select value={ props.values.descriptor } onChange={ handler }>
        { options }
      </select>
    );
  }

}

Config.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    descriptor: PropTypes.string,
    owner: PropTypes.string
  }),
  descriptors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })),
  actions: PropTypes.shape({
    changeName: PropTypes.func.isRequired,
    changeDescriptor: PropTypes.func.isRequired,
    changeOwner: PropTypes.func.isRequired
  })
};

export default Config;
