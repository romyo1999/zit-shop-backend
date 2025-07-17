import React from 'react'

const Input = (props) => {
    const to=Math.random(10);
  return (
        <>
        <div className='' >
            <label htmlFor={to} className='custom-label'>{props.label}<span className='text-danger'>{props.required?"*":""}</span>:</label>
            <input type={props.type} 
            id={to}
            className='custom-input'
            placeholder={props.placeholder}
            // style={{display:"inline-block",borderRadius:"10px" ,border:0 ,borderBlockColor:"gray"}}
            onChange={(e)=>{props.setVar(e.target.value)}}
            value={props.var}
            style={{borderColor:props.error?"red":"#78b5df" }}

            />
        </div>
        </>
  )
}

export default Input
