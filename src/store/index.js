import { createStore } from 'vuex'
import axiosInstance from "@/api";


export default createStore({
  state: {
    baseUrl:axiosInstance,
    users:{},
    tasks:{},
    filter:{
      query: "",
      assignedUsers: [],
      userIds: [],
      type: [],
      status: [],
      rank: []
    },
    page:1,
    limit:10,
    total:0,
    comments:[],


  },

  mutations: {
    SET_ALL_TASKS:(state,tasks)=>{
      state.tasks=tasks
    },

    SET_ALL_PAGES:(state, total)=>{
      state.total=total;
    },
    SET_ALL_USERS:(state,users)=>{
      state.users=users
    },
    SET_TYPE:(state,type)=> {
      state.filter.type =type;
    }


  },



  actions: {

    GET_TASKS({commit}){
      return axiosInstance.post(`/tasks`,{ filter:{}, page:0, limit:10} )
          .then((total)=>{
            commit('SET_ALL_PAGES',total.data.total);
            return total;
          })
          .then((tasks)=>{
            commit('SET_ALL_TASKS',tasks.data.data);
            commit('SET_TYPE',tasks.filter.type.data);

            return tasks;
          })

          .catch(e => {
            this.error = e;
          })
    },



    GET_USERS({commit}){
      return axiosInstance.get(`/users/all`)
          .then((users)=>{
            commit('SET_ALL_USERS',users.data);
            return users;
          })
          .catch(e => {
              this.error = e;
            });

    },





    },



  getters: {
    getBaseUrl: (state) => {
      return state.baseUrl
    },
    USERS(state) {
      return state.users
    },

    TASKS(state) {
      return state.tasks
    },
    TYPES(state){
      return state.tasks
    }


  }


})

