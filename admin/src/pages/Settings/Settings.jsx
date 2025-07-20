import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Settings = () => {
  const [openingHour, setOpeningHour] = useState('10:00');
  const [closingHour, setClosingHour] = useState('00:00');
  const [timezone, setTimezone] = useState('Asia/Karachi');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:4001/api/settings');
        if (res.data.success && res.data.data) {
          setOpeningHour(res.data.data.openingHour || '10:00');
          setClosingHour(res.data.data.closingHour || '00:00');
          setTimezone(res.data.data.timezone || 'Asia/Karachi');
        }
      } catch (err) {
        toast.error('Failed to fetch settings');
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.post('http://localhost:4001/api/settings/update', {
        openingHour,
        closingHour,
        timezone,
      });
      if (res.data.success) {
        toast.success('Settings updated!');
      } else {
        toast.error('Failed to update settings');
      }
    } catch (err) {
      toast.error('Failed to update settings');
    }
    setSaving(false);
  };

  if (loading) return <div style={{textAlign:'center',marginTop:40}}>Loading...</div>;

  return (
    <div className="add" style={{maxWidth: 400, margin: '40px auto', background: '#fff', padding: 32, borderRadius: 12}}>
      <h2 style={{marginBottom: 24}}>Restaurant Hours</h2>
      <form onSubmit={handleSave}>
        <div style={{marginBottom: 16}}>
          <label>Opening Hour</label>
          <input type="time" value={openingHour} onChange={e => setOpeningHour(e.target.value)} required style={{width:'100%',padding:8,marginTop:4}} />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Closing Hour</label>
          <input type="time" value={closingHour} onChange={e => setClosingHour(e.target.value)} required style={{width:'100%',padding:8,marginTop:4}} />
        </div>
        <div style={{marginBottom: 16}}>
          <label>Timezone</label>
          <input type="text" value={timezone} onChange={e => setTimezone(e.target.value)} required style={{width:'100%',padding:8,marginTop:4}} />
          <div style={{fontSize:12,color:'#888',marginTop:4}}>e.g., Asia/Karachi</div>
        </div>
        <button type="submit" disabled={saving} style={{marginTop:16,padding:'10px 24px',background:'#FF4C24',color:'#fff',border:'none',borderRadius:6}}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default Settings; 