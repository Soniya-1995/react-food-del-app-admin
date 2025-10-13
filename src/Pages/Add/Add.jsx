import React, { useState } from 'react'
import './add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Add = () => {
  const [image,setImage] = useState(false);
  const [options, setOptions] = useState([{ name: "half", price: "" }, { name: "full", price: "" }]);
  const [data,setData]= useState({
    name:"",
    description:"",
    price:"",
    CategoryName:"",
  })

  const onChangeHandler = (e)=>{
    setData(data=>({...data,[e.target.name]:e.target.value}))
  }

  const onSubmitHandler = async (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append("name",data.name)
  formData.append("description",data.description)
  formData.append("price",data.price)
  formData.append("CategoryName",data.CategoryName)
  formData.append("image",image)
   formData.append("options", JSON.stringify(
    options.reduce((acc, curr) => {
      acc[curr.name] = curr.price;
      return acc;
    }, {})
     ));
  console.log(formData);
  const response = await axios.post("http://localhost:3001/allfooditem",formData);
  if (response.data.success) {
    setData({
    name:"",
    description:"",
    price:"",
    CategoryName:"",
    })
    setImage(false);
    setOptions([{ name: "half", price: "" }, { name: "full", price: "" }]);
    toast.success("Product added successfully!");
    
  }
  else{
    console.log('error')

  }
  }

 
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
           <p>Upload Image</p>
           <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
           </label>
           <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here'/>
        </div>
        <div className="add-product-description flex-col">
         <p>Product Description</p>
         <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
         </div>
         <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select  onChange={onChangeHandler} value={data.CategoryName} name='CategoryName'>
              <option value="Lunch/Dinner">Lunch/Dinner</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Starter">Starter</option>
              <option value="Pizza">Pizza</option>
              
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            {options.map((opt, index) => (
    <div key={index} className="flex-row mb-2">
      <input
        type="text"
        placeholder="Option Name (e.g., half)"
        value={opt.name}
        onChange={(e) => {
          const newOptions = [...options];
          newOptions[index].name = e.target.value;
          setOptions(newOptions);
        }}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={opt.price}
        onChange={(e) => {
          const newOptions = [...options];
          newOptions[index].price = e.target.value;
          setOptions(newOptions);
        }}
        required
      />
       <button type="button" className ='btn'onClick={() => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
      }}>Remove</button>
    </div>
    ))}
          </div>
         </div>
         <button type='submit' className='add-btn'>ADD</button>
      </form>
    
    </div>
  )
}

export default Add