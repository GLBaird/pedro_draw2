import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Canvas.scss';

class Canvas extends Component {

    render() {
        const { selected, colorList } = this.props;
        return (
            <div>Canvas</div>
        );
    }

}

ColourPicker.propTypes = {
    selected: PropTypes.string.isRequired,
    handleColorChange: PropTypes.func.isRequired,
    colorList: PropTypes.object.isRequired
};

export default ColourPicker;
