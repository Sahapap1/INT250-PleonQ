import { defineStore } from 'pinia';
import availableCategories from '../data/categories.json';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    allCategories: [],
    selectedCategories: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('selectedCategories', JSON.stringify(this.selectedCategories));
    },

    async fetchCategories() {
      this.isLoading = true;
      this.error = null;

      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate fetch

        // Static available options
        this.allCategories = JSON.parse(JSON.stringify(availableCategories));

        // Load selected from LocalStorage
        const localData = localStorage.getItem('selectedCategories');
        if (localData) {
          this.selectedCategories = JSON.parse(localData);
        } else {
          this.selectedCategories = []; // Default empty
          this.saveToLocalStorage();
        }
      } catch (err) {
        this.error = 'Failed to fetch categories.';
      } finally {
        this.isLoading = false;
      }
    },

    async toggleCategory(category) {
      if (this.isLoading) return; // Prevent spamming while saving

      const index = this.selectedCategories.indexOf(category);
      if (index === -1) {
        this.selectedCategories.push(category);
      } else {
        this.selectedCategories.splice(index, 1);
      }
      this.saveToLocalStorage();
    },

    // Simulate an explicit save button click
    async saveCategories() {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate save
        this.saveToLocalStorage();
      } catch (error) {
        this.error = 'Failed to save selected categories.';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
