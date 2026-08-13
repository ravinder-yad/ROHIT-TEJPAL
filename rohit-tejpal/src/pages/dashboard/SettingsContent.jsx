import React, { useState, useRef } from 'react';
import { FiCamera, FiEdit2, FiMapPin, FiPlus, FiLock, FiBell, FiTrash2, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SettingsContent = ({ user }) => {
  const { updateUser } = useAuth();
  const fileInputRef = useRef(null);

  // Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: user?.name || '', phone: user?.phone || '' });

  // Address State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: '', phone: '', houseFlat: '', streetArea: '', city: '', state: '', pincode: '', type: 'Home', isDefault: false
  });

  // Password State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  // Notifications State
  const [notifications, setNotifications] = useState({
    orderUpdates: user?.notifications?.orderUpdates !== false,
    promoUpdates: user?.notifications?.promoUpdates === true,
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // --------- PROFILE HANDLERS ---------
  const handleProfileSave = async () => {
    try {
      const res = await axios.put(`${apiUrl}/api/users/profile`, profileData);
      updateUser(res.data);
      setIsEditingProfile(false);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error updating profile', 'error');
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const res = await axios.put(`${apiUrl}/api/users/profile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      updateUser(res.data);
      showToast('Photo updated successfully!', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error uploading photo', 'error');
    }
  };

  // --------- PASSWORD HANDLERS ---------
  const handlePasswordSave = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match!", 'error');
      return;
    }
    try {
      await axios.put(`${apiUrl}/api/users/password`, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setIsChangingPassword(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Password changed successfully!', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error changing password', 'error');
    }
  };

  // --------- NOTIFICATION HANDLERS ---------
  const handleNotificationToggle = async (field, value) => {
    try {
      const newNotifs = { ...notifications, [field]: value };
      setNotifications(newNotifs);
      const res = await axios.put(`${apiUrl}/api/users/notifications`, newNotifs);
      updateUser({ ...user, notifications: res.data.notifications });
      showToast('Notifications updated', 'success');
    } catch (error) {
      showToast('Error updating notifications', 'error');
    }
  };

  // --------- ADDRESS HANDLERS ---------
  const resetAddressForm = () => {
    setAddressForm({ fullName: '', phone: '', houseFlat: '', streetArea: '', city: '', state: '', pincode: '', type: 'Home', isDefault: false });
    setIsAddingAddress(false);
    setEditingAddressId(null);
  };

  const handleAddressSave = async () => {
    try {
      if (editingAddressId) {
        const res = await axios.put(`${apiUrl}/api/users/addresses/${editingAddressId}`, addressForm);
        updateUser({ ...user, addresses: res.data });
        showToast('Address updated successfully', 'success');
      } else {
        const res = await axios.post(`${apiUrl}/api/users/addresses`, addressForm);
        updateUser({ ...user, addresses: res.data });
        showToast('Address added successfully', 'success');
      }
      resetAddressForm();
    } catch (error) {
      showToast(error.response?.data?.message || 'Error saving address', 'error');
    }
  };

  const handleEditClick = (addr) => {
    setAddressForm({
      fullName: addr.fullName || '', phone: addr.phone || '', houseFlat: addr.houseFlat || '',
      streetArea: addr.streetArea || '', city: addr.city || '', state: addr.state || '',
      pincode: addr.pincode || '', type: addr.type || 'Home', isDefault: addr.isDefault || false
    });
    setEditingAddressId(addr._id);
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = async (id) => {
    if(!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      const res = await axios.delete(`${apiUrl}/api/users/addresses/${id}`);
      updateUser({ ...user, addresses: res.data });
      showToast('Address deleted successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error deleting address', 'error');
    }
  };


  return (
    <div className="mx-auto space-y-8 pb-12" style={{ maxWidth: '800px', position: 'relative' }}>
      
      {/* TOAST UI */}
      {toast.show && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white', padding: '12px 24px', borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontWeight: 'bold',
          transition: 'all 0.3s ease-in-out', animation: 'slideIn 0.3s ease-out'
        }}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-primary-dark)', margin: '0 0 8px 0' }}>Settings</h2>
        <p style={{ color: '#6b7280', margin: 0 }}>Manage your account, profile and security</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* PROFILE SECTION */}
        <section className="bg-white shadow-sm border border-gray-200" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '24px 32px', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary-dark)', margin: 0 }}>Account Settings</h3>
              {!isEditingProfile && (
                <button 
                  onClick={() => setIsEditingProfile(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}
                  className="hover:text-yellow-600"
                >
                  <FiEdit2 /> Edit Profile
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Full Name</label>
                    <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div style={{ flex: '1 1 300px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Mobile Number</label>
                    <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Email Address (Cannot change)</label>
                  <input type="email" value={user?.email || ''} disabled style={{ width: '100%', padding: '10px 16px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', color: '#9ca3af', borderRadius: '8px', cursor: 'not-allowed' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px' }}>
                  <button onClick={() => { setIsEditingProfile(false); setProfileData({ name: user?.name, phone: user?.phone }); }} style={{ padding: '10px 24px', backgroundColor: '#f3f4f6', color: '#374151', fontSize: '14px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleProfileSave} style={{ padding: '10px 24px', backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-gold)', fontSize: '14px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Save Changes</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Avatar Box */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '12px', backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: 'bold', position: 'relative', overflow: 'hidden' }} className="group">
                    {user?.profileImage ? (
                      <img src={user.profileImage.startsWith('http') ? user.profileImage : `${apiUrl}${user.profileImage}`} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      user?.name?.charAt(0)
                    )}
                    <div onClick={() => fileInputRef.current?.click()} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', cursor: 'pointer' }} className="group-hover:opacity-100">
                      <FiCamera style={{ color: 'white', width: '24px', height: '24px' }} />
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" style={{ display: 'none' }} />
                  <button onClick={() => fileInputRef.current?.click()} style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-primary-dark)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '6px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}>Change Photo</button>
                </div>
                
                {/* Details */}
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0 0 16px 0', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>Profile Information</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      <div>
                        <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Full Name</p>
                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{user?.name}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Email Address</p>
                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{user?.email}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>Mobile Number</p>
                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: 0 }}>{user?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ADDRESSES SECTION */}
        <section className="bg-white shadow-sm border border-gray-200" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FiMapPin /> Saved Addresses</h3>
              </div>
              {!isAddingAddress && (
                <button 
                  onClick={() => setIsAddingAddress(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'var(--color-gold)', color: 'var(--color-primary-dark)', fontSize: '14px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                >
                  <FiPlus /> Add New Address
                </button>
              )}
            </div>

            {isAddingAddress ? (
              <div style={{ backgroundColor: '#f9fafb', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0 0 20px 0', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>{editingAddressId ? 'Edit Address' : 'Add New Address'}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Full Name</label>
                    <input type="text" value={addressForm.fullName} onChange={e=>setAddressForm({...addressForm, fullName: e.target.value})} style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Mobile Number</label>
                    <input type="text" value={addressForm.phone} onChange={e=>setAddressForm({...addressForm, phone: e.target.value})} style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>House / Flat / Building</label>
                    <input type="text" value={addressForm.houseFlat} onChange={e=>setAddressForm({...addressForm, houseFlat: e.target.value})} style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Street / Area</label>
                    <input type="text" value={addressForm.streetArea} onChange={e=>setAddressForm({...addressForm, streetArea: e.target.value})} style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>City</label>
                    <input type="text" value={addressForm.city} onChange={e=>setAddressForm({...addressForm, city: e.target.value})} style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>State</label>
                    <input type="text" value={addressForm.state} onChange={e=>setAddressForm({...addressForm, state: e.target.value})} style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>PIN Code</label>
                    <input type="text" value={addressForm.pincode} onChange={e=>setAddressForm({...addressForm, pincode: e.target.value})} style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: 'span 1' }}>
                    <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Address Type</label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                        <input type="radio" name="addressType" checked={addressForm.type === 'Home'} onChange={() => setAddressForm({...addressForm, type: 'Home'})} style={{ accentColor: 'var(--color-gold)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Home</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', backgroundColor: 'white', padding: '8px 16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                        <input type="radio" name="addressType" checked={addressForm.type === 'Office'} onChange={() => setAddressForm({...addressForm, type: 'Office'})} style={{ accentColor: 'var(--color-gold)' }} />
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Office</span>
                      </label>
                    </div>
                  </div>
                  <div style={{ gridColumn: 'span 2', marginTop: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={addressForm.isDefault} onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})} style={{ width: '16px', height: '16px', accentColor: 'var(--color-gold)' }} />
                      <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>Set as Default Address</span>
                    </label>
                  </div>
                </div>
                <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button onClick={resetAddressForm} style={{ padding: '10px 24px', backgroundColor: 'white', color: '#374151', fontSize: '14px', fontWeight: 'bold', borderRadius: '8px', border: '1px solid #d1d5db', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleAddressSave} style={{ padding: '10px 24px', backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-gold)', fontSize: '14px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Save Address</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {!user?.addresses || user.addresses.length === 0 ? (
                   <p style={{ color: '#6b7280', fontSize: '14px', fontStyle: 'italic' }}>No saved addresses found. Add one above.</p>
                ) : user.addresses.map(addr => (
                  <div key={addr._id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', backgroundColor: '#f9fafb', position: 'relative' }}>
                    {addr.isDefault && (
                      <span style={{ position: 'absolute', top: '24px', right: '24px', backgroundColor: 'var(--color-gold)', color: 'var(--color-primary-dark)', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 8px', borderRadius: '4px' }}>Default</span>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: 0 }}>🏠 {addr.type}</h4>
                    </div>
                    <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', marginBottom: '16px' }}>
                      <p style={{ fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>{addr.fullName}</p>
                      <p style={{ margin: '0 0 4px 0' }}>{addr.houseFlat}, {addr.streetArea}</p>
                      <p style={{ margin: '0 0 4px 0' }}>{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p style={{ margin: 0 }}>{addr.phone}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                      <button onClick={() => handleEditClick(addr)} style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--color-primary-dark)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>[ Edit ]</button>
                      <button onClick={() => handleDeleteAddress(addr._id)} style={{ fontSize: '14px', fontWeight: 'bold', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>[ Delete ]</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SECURITY SECTION */}
        <section className="bg-white shadow-sm border border-gray-200" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FiLock /> Password & Security</h3>
            </div>

            <div style={{ backgroundColor: '#f9fafb', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>Password</h4>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Protect your account with a strong password</p>
              </div>
              {!isChangingPassword && (
                <button 
                  onClick={() => setIsChangingPassword(true)}
                  style={{ padding: '10px 20px', backgroundColor: 'white', color: '#374151', fontSize: '14px', fontWeight: 'bold', borderRadius: '8px', border: '1px solid #d1d5db', cursor: 'pointer' }}
                >
                  Change Password
                </button>
              )}
            </div>

            {isChangingPassword && (
              <div style={{ marginTop: '16px', padding: '24px', border: '1px solid #e5e7eb', backgroundColor: 'white', borderRadius: '12px', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Current Password</label>
                  <input type="password" value={passwordForm.currentPassword} onChange={e=>setPasswordForm({...passwordForm, currentPassword: e.target.value})} placeholder="••••••••" style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>New Password</label>
                  <input type="password" value={passwordForm.newPassword} onChange={e=>setPasswordForm({...passwordForm, newPassword: e.target.value})} placeholder="••••••••" style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Confirm New Password</label>
                  <input type="password" value={passwordForm.confirmPassword} onChange={e=>setPasswordForm({...passwordForm, confirmPassword: e.target.value})} placeholder="••••••••" style={{ width: '100%', padding: '10px 16px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button onClick={() => {setIsChangingPassword(false); setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })}} style={{ flex: 1, padding: '10px', backgroundColor: '#f3f4f6', color: '#374151', fontSize: '14px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handlePasswordSave} style={{ flex: 1, padding: '10px', backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-gold)', fontSize: '14px', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Update</button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* NOTIFICATIONS SECTION */}
        <section className="bg-white shadow-sm border border-gray-200" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><FiBell /> Notifications</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>Order Updates</h4>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Get updates on your order status and delivery</p>
                </div>
                <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" className="sr-only peer" checked={notifications.orderUpdates} onChange={(e) => handleNotificationToggle('orderUpdates', e.target.checked)} />
                  <div style={{ width: '44px', height: '24px', backgroundColor: notifications.orderUpdates ? 'var(--color-gold)' : '#d1d5db', borderRadius: '9999px', transition: 'background-color 0.2s' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', transform: notifications.orderUpdates ? 'translateX(22px)' : 'translateX(2px)', margin: '2px', transition: 'transform 0.2s' }}></div>
                  </div>
                </label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>Promotional Updates</h4>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Receive exclusive offers and alerts</p>
                </div>
                <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" className="sr-only peer" checked={notifications.promoUpdates} onChange={(e) => handleNotificationToggle('promoUpdates', e.target.checked)} />
                  <div style={{ width: '44px', height: '24px', backgroundColor: notifications.promoUpdates ? 'var(--color-gold)' : '#d1d5db', borderRadius: '9999px', transition: 'background-color 0.2s' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', transform: notifications.promoUpdates ? 'translateX(22px)' : 'translateX(2px)', margin: '2px', transition: 'transform 0.2s' }}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SettingsContent;
