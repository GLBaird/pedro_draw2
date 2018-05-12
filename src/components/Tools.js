import React, { Component } from 'react';

import PropTypes from 'prop-types';

import styles from './Tools.scss';

export const DrawingMode = {
    Brush: 0,
    Box: 1,
    Circle: 2
}

class Tools extends Component {

    handleClick(selected, event) {
        event.preventDefault();
        this.props.onModeChange(selected);
    }

    render() {
        let { selected } = this.props;
        return (
            <div className={ styles.container }>

                <button className={ selected === DrawingMode.Brush ? styles.selected : '' }
                        onClick={this.handleClick.bind(this, DrawingMode.Brush)}>
                    Brush
                </button>

                <button className={ selected === DrawingMode.Box ? styles.selected : '' }
                        onClick={this.handleClick.bind(this, DrawingMode.Box)}>
                    Box
                </button>

                <button className={ selected === DrawingMode.Circle ? styles.selected : '' }
                        onClick={this.handleClick.bind(this, DrawingMode.Circle)}>
                    Circle
                </button>
                
            </div>
        );
    }

}

Tools.propTypes = {
    selected: PropTypes.number.isRequired,
    onModeChange: PropTypes.func.isRequired
};

export default Tools;