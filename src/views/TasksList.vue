<template>
  <div v-if="userInfo">
<!--    <Header/>-->
    <div class="container" >
      <div class="board">
        <div class="board__header">
          <h1 class="nameOfTask">Задачи</h1>
          <router-link :to="{name:'eventTask'}" :key="task" :task="task" class="addTask">Добавить задачу</router-link>
        </div>
        <div class="card__wrapper">
          <div class="filter">
            <TypeSelect :tasks="tasks" :selectedQuantityStatus="selectedQuantityStatus" :type="options" @types="selectItem"/>
              <QuerySelect :tasks="tasks" :selectedQuantityStatus="selectedQuantityStatus"/>
                <NameSelect :users="users" :tasks="tasks" />
                <StatusSelect :tasks="tasks" :selectedQuantityStatus="selectedQuantityStatus"/>
                  <RankSelect :tasks="tasks" :selectedQuantityStatus="selectedQuantityStatus"/>
                    <button >Применить</button>
          </div>
          <div class="card__task" >

    <TaskItem v-for="task in TASKS" :key="task.id" :task="task" :user="user" :deleteTask="deleteTask"/>
          </div>
          <PagingBlock :task="task" :user="user" :total="total" @handlePageChange="handlePageChange"/>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import TaskItem from "../components/TaskItem";
    import axiosInstance from "../api";
    import PagingBlock from "../components/Paging";
    import {mapActions, mapGetters} from 'vuex';
    import TypeSelect from "../components/selects/TypeSelect";
    import StatusSelect from "../components/selects/StatusSelect";
    import RankSelect from "../components/selects/RankSelect";
    import NameSelect from "../components/selects/NameSelect";
    import QuerySelect from "../components/selects/QuerySelect";

  export default {
  name: 'TasksList',
    data(){
      return {
          selected:"",
        userInfo:JSON.parse(localStorage.getItem('user-info')),
        page:0,
        filter:{
          query: "",
          assignedUsers: [],
          userIds: [],
          type: [],
          status: [],
          rank: []
        },
          total:0,
          limit:10,
          sortType:[],
          taskList: [],

      }
    },
  components: {
      TypeSelect,
      NameSelect,
      StatusSelect,
      RankSelect,
      QuerySelect,
      PagingBlock,
      TaskItem
  },


      computed: {
          ...mapGetters(['TASKS']),

      },
      methods: {
          ...mapActions([
              'GET_TASKS',
          ]),
       // loadTasks(){
       //
       //
       //    },
          selectedQuantityStatus() {
              if (this.selectedStatus === 0) {
                  return "Статус"
              } else if (this.selectedStatus === 4) {
                  return "Выбрано: все"
              } else {
                  return "Выбрано: " + `${this.selectedStatus}`
              }
          },

          // selectItem(data){
          //     if(data===null) {
          //         return this.$store.state.tasks
          //     }
          //     for(let item of data){
          //         if(item){
          //             this.xxxxx.push(item.id)
          //         }
          //     }
          //     return this.xxxxx
          // },

          getParams(page, limit,filter) {
              let params = {};
              if (filter) {
                  params["filter"] = filter;
              }
              if (page) {
                  params["page"] = page;
              }
              if (limit) {
                  params["limit"] = limit;
              }
              return params;
          },
          postParams() {
              const params = this.getParams(
                  this.page,
                  this.limit,
                  this.filter
              );
               return axiosInstance.post(`/tasks`, params)
                  .then((response) => {
                      this.taskList = response.data.data;
                      this.total = response.data.total;
                  })
                  .catch((e) => {
                      console.log(e);
                  });
          },
          handlePageChange(value) {
              this.page = value;
              this.postParams();
          },



      },
      mounted(){
          this.GET_TASKS()
      },
      created() {
      }


  }



</script>

