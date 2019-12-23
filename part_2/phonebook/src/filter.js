import React, { useState } from 'react'

const Filter = (props) => {  
    const { filter, setFilter} = props
    const changeFilter = (event) => {
        //console.log(event.target.value)
        setFilter(event.target.value)
      }
    

    return (
        <div>
            filter shown with <input value={filter} onChange={changeFilter}/>
        </div>
    )
}


export default Filter