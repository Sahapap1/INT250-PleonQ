import { defineStore } from 'pinia'
import jobsData from '../data/jobs.json'

export const useJobStore = defineStore('job', {
  state: () => {
    const sessionJobs = sessionStorage.getItem('jobsAppData');
    return {
      jobs: sessionJobs ? JSON.parse(sessionJobs) : jobsData
    };
  },

  getters: {
    getJobById: (state) => {
      return (id) => state.jobs.find(job => job.id == id)
    }
  },

  actions: {
    saveToSession() {
      sessionStorage.setItem('jobsAppData', JSON.stringify(this.jobs));
    },

    toggleLike(id) {
      const job = this.jobs.find(j => j.id == id)
      if (job) {
        job.liked = !job.liked
        this.saveToSession();
      }
    },

    addJob(newJob) {
      this.jobs.push(newJob)
      this.saveToSession();
    }
  }
})