import { defineStore } from 'pinia';
import tasksData from '../data/tasks.json';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    isLoading: false,
    error: null,
  }),
  
  getters: {
    allTasks: (state) => state.tasks,
    pendingTasks: (state) => state.tasks.filter(t => t.status === 'Pending'),
    inProgressTasks: (state) => state.tasks.filter(t => t.status === 'In Progress'),
    completedTasks: (state) => state.tasks.filter(t => t.status === 'Completed'),
  },

  actions: {
    // Internal helper to save to local storage tracking
    saveToLocalStorage() {
      localStorage.setItem('taskAppData_v2', JSON.stringify(this.tasks));
    },

    async fetchTasks() {
      this.isLoading = true;
      this.error = null;
      this.tasks = [];
      
      try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API loading
        
        // Persistent Memory Check
        const localData = localStorage.getItem('taskAppData_v2');
        if (localData) {
          this.tasks = JSON.parse(localData);
        } else {
          // Deep copy from JSON file as initial sync
          this.tasks = JSON.parse(JSON.stringify(tasksData));
          this.saveToLocalStorage();
        }
      } catch (err) {
        this.error = 'Network error: Unable to retrieve tasks.';
      } finally {
        this.isLoading = false;
      }
    },
    
    async addTask(task) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate save
        const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
        this.tasks.unshift({ ...task, id: newId });
        this.saveToLocalStorage();
      } catch (err) {
        this.error = 'Failed to create task.';
      } finally {
        this.isLoading = false;
      }
    },

    async updateTask(updatedTask) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate update
        const idx = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (idx !== -1) {
          this.tasks[idx] = { ...updatedTask };
          this.saveToLocalStorage();
        }
      } catch (err) {
        this.error = 'Failed to update task.';
      } finally {
        this.isLoading = false;
      }
    },

    async deleteTask(taskId) {
      this.isLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 600)); // Simulate delete
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveToLocalStorage();
      } catch (err) {
        this.error = 'Failed to delete task.';
      } finally {
        this.isLoading = false;
      }
    }
  }
});
