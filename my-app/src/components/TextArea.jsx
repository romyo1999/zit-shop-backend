import React from 'react'

const TextArea = (props) => {
    const refer =Math.random(10)
  return (
    <>
    <div className='d-flex align-items-center' >
        <label  htmlFor={refer} className='custom-label'>{props.label}<span className='text-danger'>{props.required?"*":""}</span>:</label>
        <textarea type={props.type} 
        className='custom-input'
        id={refer}
        placeholder={props.placeholder}
        // style={{display:"inline-block",borderRadius:"10px" ,border:0 ,borderBlockColor:"gray"}}
        onChange={(e)=>{props.setVar(e.target.value)}}
        value={props.var}
        style={{borderColor:props.error?"red":"#78b5df"}}
        ></textarea>
    </div>
    </>
  )
}

export default TextArea
