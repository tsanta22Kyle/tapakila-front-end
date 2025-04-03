import styles from './page.module.css';

export default function AccountSettings() {
  return (
   <div className="body"> 
    <div className={styles.container}>
      <h1 className={styles.title}>Account Settings</h1>
      
      <div className={styles.settingsContainer}>
        <div className={styles.sidebar}>
          <button className={styles.activeTab}>Profile</button>
          <button>Security</button>
          <button>Notifications</button>
          <button>Preferences</button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2>Profile Information</h2>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}></div>
              <div>
                <button className={styles.uploadBtn}>Change Photo</button>
                <p className={styles.avatarHint}>JPG, GIF or PNG. Max 1MB</p>
              </div>
            </div>

            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" defaultValue="John Doe" />
              </div>
              
              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" defaultValue="john@example.com" />
              </div>
              
              <div className={styles.formGroup}>
                <label>Bio</label>
                <textarea rows="3">Product designer and developer</textarea>
              </div>
              
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</div> 
  );
}