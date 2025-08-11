import React, { useEffect, useState } from 'react'
import './List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import EditFoodModal from './EditFoodModal';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar, FaGem, FaRegGem } from 'react-icons/fa';

const List = () => {

  const [list, setList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFood, setEditFood] = useState(null);
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  const handleEditClick = (food) => {
    setEditFood(food);
    setShowEditModal(true);
  }

  const handleToggleFlag = async (foodId, flag, value) => {
    try {
      const response = await axios.post(`${url}/api/food/updateFlag`, {
        id: foodId,
        flag,
        value
      });
      if (response.data.success) {
        toast.success('Updated successfully');
        fetchList();
      } else {
        toast.error('Update failed');
      }
    } catch (err) {
      toast.error('Error updating');
    }
  };

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Status</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <td style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                <span style={{cursor: 'pointer'}} title="Toggle Popular" onClick={() => handleToggleFlag(item._id, 'isPopular', !item.isPopular)}>
                  {item.isPopular ? <FaStar color="#FFD700" size={20} /> : <FaRegStar color="#bbb" size={20} />}
                </span>
                <span style={{cursor: 'pointer'}} title="Toggle Featured" onClick={() => handleToggleFlag(item._id, 'isFeatured', !item.isFeatured)}>
                  {item.isFeatured ? <FaGem color="#00BFFF" size={20} /> : <FaRegGem color="#bbb" size={20} />}
                </span>
              </td>
              <p>{item.category}</p>
              <p>Rs {item.price}</p>
              <td className="action-cell">
                <span className="edit-btn" onClick={() => handleEditClick(item)}>✏️</span>
                <span className="delete-btn" onClick={() => removeFood(item._id)}>x</span>
              </td>
            </div>
          )
        })}
      </div>
      {showEditModal && (
        <EditFoodModal food={editFood} onClose={() => setShowEditModal(false)} onUpdated={fetchList} />
      )}
    </div>
  )
}

export default List
