import React, { Component } from 'react';

import PropTypes from 'prop-types';

import styles from './TitleBar.scss';

export const TitleBarActions = {
    new:  0,
    save: 1,
    open: 2
};

class TitleBar extends Component {

    handleClick(action, event) {
        // because it's a <button></button> it would submit a form
        event.preventDefault();
        this.props.onTitleBarAction(action);
    }

    render () {
        return (
            <div className={ styles.container }>
            Pedro Draw
            <div>
                <button onClick={this.handleClick.bind(this, TitleBarActions.new)}>New</button>
                <button onClick={this.handleClick.bind(this, TitleBarActions.open)}>Open</button>
                <button onClick={this.handleClick.bind(this, TitleBarActions.save)}>Save</button>
            </div>
            </div>
        );
    }

}

TitleBar.propTypes = {
    onTitleBarAction: PropTypes.func.isRequired
};

export default TitleBar;
