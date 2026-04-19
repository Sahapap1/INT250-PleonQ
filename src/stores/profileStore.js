import { defineStore } from 'pinia';
import profileData from '../data/profile.json';

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    profile: null,
    isLoading: false,
    error: null,
  }),
  
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('profileAppData', JSON.stringify(this.profile));
    },

    async fetchProfile() {
      this.isLoading = true;
      this.error = null;
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network
        
        const localData = localStorage.getItem('profileAppData');
        if (localData) {
          this.profile = JSON.parse(localData);
        } else {
          this.profile = JSON.parse(JSON.stringify(profileData));
          this.saveToLocalStorage();
        }
      } catch (err) {
        this.error = 'Failed to fetch profile data.';
      } finally {
        this.isLoading = false;
      }
    },

    async updateProfile(updatedData) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate save
        this.profile = { ...this.profile, ...updatedData };
        this.saveToLocalStorage();
      } catch (err) {
        this.error = 'Failed to update profile.';
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
