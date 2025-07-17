import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = (props) => {
  return (
    <>
      <Link className={`col-lg-${props.grid} col-md-2 col-sm-2 mt-3 mb-3 box-shadow  d-flex flex-column align-items-center justify-content-center `} style={{textDecorationLine:"none" ,overflow:"hidden"}} to={props.route}>
            <img src={props.image} alt='filter photo' className='img-fluid' style={{width:"100%" ,height:"auto"}}/>
            <strong className='text-dark fs-4' >{props.name}</strong>
      </Link>
    </>
  )
}

export default CategoryCard
