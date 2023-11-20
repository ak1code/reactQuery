import React from 'react'

const ProductCart = ({image,category,title,price}) => {
  return (
    <div id='singleCart'>
        <img src={image} />
        <p>{category}</p>
        <p>{title}</p>
        <p>{price}</p>
        
    </div>
  )
}

export default ProductCart