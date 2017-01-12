import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Configs from './Configs';
import * as actions from '../actions';
import { getAppName } from '../selectors/general';
import { getDecoration } from '../selectors/validation/general.decoration';
import { getConfigsValidationMessage } from '../selectors/validation/configs.decoration';

class AppContainer extends Component {

  componentWillMount() {
    // we get actions passed in using mapDispatchToProps
    // this will trigger AJAX request upon its completition,
    // list of objects for dropdown will be saved into store
    this.props.actions.loadDescriptors();
  }

  render() {
    const props = this.props;
    const decor = props.validationDecoration;
    return (
      <div>
        <div>
          <label>Application name</label>
          <input value={ props.appName } onChange={ this.onChangeAppName.bind(this) } className={ decor.appNameClasses }/>
        </div>
        <div>
          <label>
            Configurations
            { this.renderConfigsMessage() }
          </label>
          <Configs/>
        </div>
        <button>Save App</button>
      </div>
    );
  }

  onChangeAppName(e) {
    this.props.actions.changeAppName(e.target.value);
  }

  renderConfigsMessage() {
    const message = this.props.configsValidationMessage;
    if (!message) {
      return null;
    }
    return (
      <span className="message">{ message }</span>
    );
  }

}

AppContainer.propTypes = {
  appName: PropTypes.string,
  validationDecoration: PropTypes.object,
  configsValidationMessage: PropTypes.string,
  actions: PropTypes.object
};

const mapStateToProps = state => ({
  appName: getAppName(state),
  validationDecoration: getDecoration(state),
  configsValidationMessage: getConfigsValidationMessage(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
