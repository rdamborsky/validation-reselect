import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Configs from './Configs';
import * as actions from '../actions';
import { getAppName } from '../selectors/general';
import { getDecoration } from '../selectors/validation/general.decoration';

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
          <label>Configurations</label>
          <Configs/>
        </div>
        <button>Save App</button>
      </div>
    );
  }

  onChangeAppName(e) {
    this.props.actions.changeAppName(e.target.value);
  }

}

AppContainer.propTypes = {
  appName: PropTypes.string,
  validationDecoration: PropTypes.object,
  actions: PropTypes.object
};

const mapStateToProps = state => ({
  appName: getAppName(state),
  validationDecoration: getDecoration(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
