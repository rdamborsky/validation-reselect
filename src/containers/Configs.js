import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Config from '../components/Config';
import * as actions from '../actions';
import { getConfigurations, getCurrentConfiguration, getDescriptors } from '../selectors/config';
import { getMenuDecorationClasses, getConfigDecoration } from '../selectors/validation/configs.decoration';

class Configs extends Component {

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ paddingRight: '15px', width: '150px' }}>
          { this.renderExisting() }
          <button onClick={ this.props.actions.addConfig }>Add Config</button>
        </div>
        <div>
          { this.renderSelected() }
        </div>
      </div>
    );
  }

  renderExisting() {
    const menuDecorationClasses = this.props.menuValidationDecoration;
    return this.props.configurations.map(config => {
      const id = config.id;
      const validityDecoration = menuDecorationClasses[id];
      return (
        <div key={ config.id } className="config item">
          <a href="javascript:;" onClick={ this.props.actions.selectConfig.bind(this, id) } className={ validityDecoration }>* { config.name }</a>
        </div>
      );
    });
  }

  renderSelected() {
    const props = this.props;
    const actions = props.actions;
    const configProps = {
      values: props.currentConfig,
      descriptors: props.descriptors,
      validationDecoration: props.configValidationDecoration,
      actions: {
        changeName: actions.changeConfigName,
        changeDescriptor: actions.changeConfigDescriptor,
        changeOwner: actions.changeConfigOwner
      }
    };
    return (
      <Config { ...configProps }/>
    );
  }

}

Configs.propTypes = {
  configurations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string
  })),
  currentConfig: PropTypes.object,
  descriptors: PropTypes.arrayOf(PropTypes.object),
  menuValidationDecoration: PropTypes.object,
  configValidationDecoration: PropTypes.object,
  actions: PropTypes.object
};

const mapStateToProps = state => ({
  configurations: getConfigurations(state),
  currentConfig: getCurrentConfiguration(state),
  descriptors: getDescriptors(state),
  menuValidationDecoration: getMenuDecorationClasses(state),
  configValidationDecoration: getConfigDecoration(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Configs);
