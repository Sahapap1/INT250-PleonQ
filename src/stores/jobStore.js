import { defineStore } from 'pinia'
import jobsData from '../data/jobs.json'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: jobsData
  }),

  getters: {
    getJobById: (state) => {
      return (id) => state.jobs.find(job => job.id == id)
    }
  },

  actions: {
    toggleLike(id) {
      const job = this.jobs.find(j => j.id == id)
      if (job) {
        job.liked = !job.liked
      }
    },

    addJob(newJob) {
      this.jobs.push(newJob)
    }
  }
})