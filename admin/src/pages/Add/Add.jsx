import React, { useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {


    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Appetizer"
    });

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return null;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: data.category
            })
            setImage(false);
        }
        else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept="image/*" id="image" hidden />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select name='category' onChange={onChangeHandler} >
                            <option value="Appetizer">Appetizer</option>
                            <option value="Kids Special">Kids Special</option>
                            <option value="Salad Zone">Salad Zone</option>
                            <option value="Green's Classic">Green's Classic</option>
                            <option value="Soup Corner">Soup Corner</option>
                            <option value="Green's Special">Green's Special</option>
                            <option value="Tea Lover">Tea Lover</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cold Coffee">Cold Coffee</option>
                            <option value="Burger Crowd">Burger Crowd</option>
                            <option value="Iced Coffee">Iced Coffee</option>
                            <option value="Panini Corner">Panini Corner</option>
                            <option value="Special Drinks">Special Drinks</option>
                            <option value="Colada's">Colada's</option>
                            <option value="Pizza House">Pizza House</option>
                            <option value="Steak House">Steak House</option>
                            <option value="Pasta La Vistas">Pasta La Vistas</option>
                            <option value="Around The World">Around The World</option>
                            <option value="Rice Corner">Rice Corner</option>
                            <option value="Chinese Corner">Chinese Corner</option>
                            <option value="BBQ Corner">BBQ Corner</option>
                            <option value="Pakistani Corner">Pakistani Corner</option>
                            <option value="Sea Food">Sea Food</option>
                            <option value="Green's Platters">Green's Platters</option>
                            <option value="Naan">Naan</option>
                            <option value="Smoothies">Smoothies</option>
                            <option value="Margaritas's">Margaritas's</option>
                            <option value="Regular Drinks">Regular Drinks</option>
                            <option value="Icecream / Dessert">Icecream / Dessert</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='25' />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
