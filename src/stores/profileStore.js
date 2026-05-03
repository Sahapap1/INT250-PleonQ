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
        await new Promise(resolve => setTimeout(resolve, 800));

        const current = sessionStorage.getItem('user')
        const currentUser = JSON.parse(current)

        if (!currentUser) {
          throw new Error('User not logged in')
        }

        const localData = localStorage.getItem('profileAppData')

        if (localData) {
          const parsedLocal = JSON.parse(localData)

          if (parsedLocal.userId === currentUser.id) {
            this.profile = parsedLocal
            return
          } else {
            localStorage.removeItem('profileAppData')
          }
        }

        const parsed = JSON.parse(JSON.stringify(profileData))
        const matched = parsed.find(p => p.userId === currentUser.id)

        if (!matched) {
          throw new Error('Profile not found')
        }

        this.profile = matched
        this.saveToLocalStorage()

      } catch (err) {
        this.error = 'Failed to fetch profile data.'
        console.error(err)
      } finally {
        this.isLoading = false
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
