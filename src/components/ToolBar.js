import React from 'react';
import Tools from './Tools';
import PropTypes from 'prop-types';
import styles from './ToolBar.scss';
import Colourpicker from './Colourpicker';

const ToolBar = ({ mode, onModeChange, color, handleColorChange, colorList }) => (
    <div className={ styles.container }>

        <Tools selected={ mode }
            onModeChange={ onModeChange } />

        <Colourpicker selected={ color }
                    handleColorChange={ handleColorChange }
                    colorList={ colorList } />

    </div>
);
ToolBar.propTypes = {
    mode: PropTypes.number.isRequired,
    onModeChange: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    handleColorChange: PropTypes.func.isRequired,
    colorList: PropTypes.object.isRequired
};

export default ToolBar;
