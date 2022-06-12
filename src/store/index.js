import { createStore } from 'vuex'
import axiosInstance from "@/api";


export default createStore({
  state: {
    baseUrl:axiosInstance,
    users:{},
    user:{},
    tasks:{},
    task:{},
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

    form: {
      login:'',
      password: ''
    },


  },

  mutations: {
    SET_ALL_TASKS:(state,tasks)=>{
      state.tasks=tasks
    },
    SET_TASK_BY_ID:(state, task)=>{
      state.task=task
    },

    SET_ALL_PAGES:(state, total)=>{
      state.total=total;
    },
    SET_ALL_USERS:(state,users)=>{
      state.users=users
    },
    SET_USER_BY_ID:(state, user)=>{
      state.user=user
    },
    SET_TYPE:(state,type)=> {
      state.filter.type =type;
    },
    SET_LOGIN_ID:(state, password, login)=>{
      state.form.password=password;
      state.form.login=login
    }


  },



  actions: {

    GET_TASKS({commit}){
      return axiosInstance.post(`/tasks`,{ filter:{}, page:0, limit:0} )
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
    GET_TASK({commit,id}){
      return axiosInstance.get(`/tasks/${id}`,id )
          .then((task)=>{
            commit('SET_TASKS_BY_ID',task.data);
            return task;
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
    GET_USER({commit,id}){
      return axiosInstance.get(`/users/${id}`,id )
          .then((user)=>{
            commit('SET_USER_BY_ID',user.data);
            return user;
          })
          .catch(e => {
            this.error = e;
          })
    },

    GET_LOGIN_ID({commit}){
      return axiosInstance.post(`/users/login`)
          .then((form)=>{
            commit('SET_LOGIN_ID', form.data);
            // const userIsAuth= await result.json();
            // if(result.status !==200 && result.status !==204){
            //   throw new Error()
            // }else{
            //   localStorage.setItem("user-info",JSON.stringify(userIsAuth));
            //   this.isAuth=true;
            //   this.isLogin()
            //
            // }

            return form;
          })
          .catch(e => {
            this.error = e;
          });
    }

    },



  getters: {
    getBaseUrl: (state) => {
      return state.baseUrl
    },
    USERS(state) {
      return state.users
    },
    USER(state){
      return state.user
    },

    TASKS(state) {
      return state.tasks
    },
    TASK(state){
      return state.task
    },
    TYPES(state){
      return state.tasks
    },
    LOGIN_ID(state){
      return state.form
}


  }


})

