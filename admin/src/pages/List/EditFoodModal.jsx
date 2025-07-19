import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './EditFoodModal.css';

const EditFoodModal = ({ food, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name: food.name,
    description: food.description,
    price: food.price,
    category: food.category,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('id', food._id);
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('category', form.category);
      if (image) formData.append('image', image);
      const response = await axios.post('http://localhost:4001/api/food/update', formData);
      if (response.data.success) {
        toast.success('Food updated successfully!');
        onUpdated();
        onClose();
      } else {
        toast.error(response.data.message || 'Update failed');
      }
    } catch (err) {
      toast.error('Update failed');
    }
    setLoading(false);
  };

  return (
    <div className="edit-food-modal-backdrop">
      <div className="edit-food-modal">
        <h3>Edit Food Item</h3>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
          <label>Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} required />
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} required />
          <label>Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="edit-food-modal-actions">
            <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoodModal; 