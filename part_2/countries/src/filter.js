import React, { useState } from 'react'

const Filter = (props) => {  
    const { filter, setFilter} = props
    const changeFilter = (event) => {
        //console.log(event.target.value)
        setFilter(event.target.value)
      }
    

    return (
        <div>
            find countries <input value={filter} onChange={changeFilter}/>
        </div>
    )
}


export default Filter