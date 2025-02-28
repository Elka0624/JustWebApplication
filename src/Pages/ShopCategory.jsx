import React, { useContext, useState } from 'react'
import './Css/ShopCategory.css'
import { ShopContext } from '../Contex/ShopContext'
import dropdown_icon from '../assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import LoadSkleton from '../Components/LoadScleton/LoadSkleton'

const ShopCategory = (props) => {
  const context = useContext(ShopContext)
  const [selectedPrice, setSelectedPrice] = useState('none')

  const productMatching = context.all_product.filter(item => 
    item.category === props.category && 
    (selectedPrice === 'none' || item.new_price <= selectedPrice)
  ).length

  const handleSelect = (e) => {
    setSelectedPrice(e.target.value === 'none' ? 'none' : parseInt(e.target.value))
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Barcha</span> {productMatching} Mahsulotlar
        </p>
        <div className="shopCategory-sort">
          <select name="" id="" onChange={handleSelect}>
            <option value="none">Saralash Narxi</option>
            <option value="100">100.000</option>
            <option value="200">200.000</option>
            <option value="300">300.000</option>
            <option value="400">400.000</option>
            <option value="500">500.000</option>
            <option value="600">600.000</option>
          </select>
        </div>
      </div>
      {context.loading ? (
        <LoadSkleton />
      ) : (
        <div className="shopCategory-products">
          {context.all_product.map((item, i) => {
            if (props.category === item.category && (selectedPrice === 'none' || item.new_price <= selectedPrice)) {
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            } else {
              return null;
            }
          })}
        </div>
      )}
      <div className="shopcategory-loadmore">
        Ko'proq ko'ring
      </div>
    </div>
  )
}

export default ShopCategory
