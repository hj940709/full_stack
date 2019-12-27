import React from 'react'
import { connect } from 'react-redux'
import {changeFilter} from '../reducers/filterReducer'

const Filter = ({changeFilter}) => {
    return (
        <div>
            filter <input onChange={(e)=>changeFilter(e.target.value)} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdote,
        filter: state.filter,
        notification: state.notification
    }
}
const mapDispatchToProps = {
    changeFilter,
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter