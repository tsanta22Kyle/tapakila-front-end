"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../../globalStores/useAuth';
import styles from './page.module.css';

export default function UserSettings() {
  const router = useRouter();
  const { user: authUser, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || '',
    email: authUser?.email || '',
    avatar: authUser?.avatar || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    
    try {
      // Here you would call your API to update user settings
      // await apiTapakila.patch('/me', formData);
      
      // For now, we'll just simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.refresh(); // Refresh the page to get latest data
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading user data...</div>;
  }

  if (!authUser) {
    router.push('/login');
    return null;
  }

  return (
  <div className={styles.bodyS}>  
    <div className={styles.containerS}>
      <h1 className={styles.title}>User Settings</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            // Often emails shouldn't be changed directly
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="avatar" className={styles.label}>
            Avatar URL
          </label>
          <input
            type="url"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className={styles.input}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  </div>  
  );
}