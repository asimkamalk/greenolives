import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';

const Profile = () => {
    const { token, url, fetchUserData } = useContext(StoreContext);
    const [data, setData] = useState({
        name: '',
        email: '',
        address: {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            phone: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);
            const userData = await fetchUserData();
            if (userData) {
                setData({
                    name: userData.name || '',
                    email: userData.email || '',
                    address: {
                        firstName: userData.address?.firstName || '',
                        lastName: userData.address?.lastName || '',
                        street: userData.address?.street || '',
                        city: userData.address?.city || '',
                        phone: userData.address?.phone || ''
                    }
                });
            }
            setLoading(false);
        };
        loadProfile();
    }, [fetchUserData]);

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            setData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name.split('.')[1]]: value
                }
            }));
        } else {
            setData(prev => ({ ...prev, [name]: value }));
        }
    };

    const onSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess(false);
        try {
            await axios.put(url + '/api/user/update', data, { headers: { token } });
            setSuccess(true);
        } catch (err) {
            setError('Failed to update profile.');
        }
        setSaving(false);
    };

    if (loading) return <div style={{textAlign:'center',marginTop:40}}><span>Loading...</span></div>;

    return (
        <div style={{maxWidth: 500, margin: '40px auto', background: '#181818', padding: 32, borderRadius: 12, color: '#fff'}}>
            <h2 style={{marginBottom: 24}}>Profile / Edit Address</h2>
            <form onSubmit={onSave}>
                <label>Name</label>
                <input name="name" value={data.name} onChange={onChange} style={{width:'100%',marginBottom:12}} />
                <label>Email</label>
                <input name="email" value={data.email} onChange={onChange} style={{width:'100%',marginBottom:12}} />
                <label>First Name</label>
                <input name="address.firstName" value={data.address.firstName} onChange={onChange} style={{width:'100%',marginBottom:12}} />
                <label>Last Name</label>
                <input name="address.lastName" value={data.address.lastName} onChange={onChange} style={{width:'100%',marginBottom:12}} />
                <label>Address</label>
                <input name="address.street" value={data.address.street} onChange={onChange} style={{width:'100%',marginBottom:12}} />
                <label>City</label>
                <input name="address.city" value={data.address.city} onChange={onChange} style={{width:'100%',marginBottom:12}} />
                <label>Phone</label>
                <input name="address.phone" value={data.address.phone} onChange={onChange} style={{width:'100%',marginBottom:12}} />
                <button type="submit" disabled={saving} style={{marginTop:16,padding:'10px 24px',background:'#FF4C24',color:'#fff',border:'none',borderRadius:6}}>
                    {saving ? 'Saving...' : 'Save'}
                </button>
                {success && <div style={{color:'#4caf50',marginTop:10}}>Profile updated!</div>}
                {error && <div style={{color:'#e53935',marginTop:10}}>{error}</div>}
            </form>
        </div>
    );
};

export default Profile; 