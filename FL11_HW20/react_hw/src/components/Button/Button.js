import React from 'react';
import PropTypes from 'prop-types'
import './Button.scss'

class Button extends React.Component {
    render() {
        let className = 'btn'
        let callback = this.props.callback;

        if(this.props.disabled) {
            className = 'btn disabled'
            callback = null;
        }

        return(
            <span onClick={callback} className={className}>{this.props.text}</span>
        )
    }
}

Button.propTypes = {
    props: PropTypes.string,
    disabled: PropTypes.bool
}

export default Button