import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ColourPicker.scss';

class ColourPicker extends Component {

    handleColorChange(selected, event) {
        event.preventDefault();
        this.props.handleColorChange(selected);
    }

    render() {
        const { selected, colorList } = this.props;
        return (
            <ul className={ styles.container }>
                {
                    Object.keys(colorList)
                    .map(
                        (color) => <li key={ `cp_${color}` }>
                                        <button title={ color }
                                                className={ selected === colorList[color] ? styles.selected : '' }
                                                style={{ background: colorList[color] }}
                                                onClick={ this.handleColorChange.bind(this, colorList[color]) } />
                                    </li>
                    )
                }
            </ul>
        );
    }

}

ColourPicker.propTypes = {
    selected: PropTypes.string.isRequired,
    handleColorChange: PropTypes.func.isRequired,
    colorList: PropTypes.object.isRequired
};

export default ColourPicker;
