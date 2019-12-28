import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const TogglableView = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div className='col-sm-12'>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility} className='btn btn-primary col-sm-3' data-cy={props.buttonLabel+'-toggle'}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility} className='btn btn-info col-sm-3' data-cy='cancel-toggle'>cancel</button>
            </div>
        </div>
    )
})
TogglableView.displayName = 'TogglableView'
TogglableView.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default TogglableView