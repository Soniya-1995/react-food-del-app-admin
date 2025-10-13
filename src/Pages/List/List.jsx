import React, { useEffect, useState } from 'react'
import './list.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {
  const [list, setList] = useState([]);
  const url = 'http://localhost:3001'
  const fetchList = async () => {
    const response = await axios.get(`${url}/allfooditem`);

    if (Array.isArray(response.data)) {
      setList(response.data);
    }
    else {
      toast.error("Error")

    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/delete`, { id: foodId })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)

    }
    else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>CategoryName</b>
          <b>price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          const priceOptions = Array.isArray(item.options) ? item.options[0] : {};
          return (
            <div key={index} className='list-table-format'>
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.CategoryName}</p>
              {/* Show all sizes/prices */}
              <div>
                {Array.isArray(item.options)
                  ? Object.entries(item.options[0] || {}).map(([size, price]) => (
                    <p key={size}>
                      {size}: ₹{price}
                    </p>
                  ))
                  : Object.entries(item.options || {}).map(([size, price]) => (
                    <p key={size}>
                      {size}: ₹{price}
                    </p>
                  ))}
              </div>
              <p onClick={() => removeFood(item._id)} className='cursor'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
