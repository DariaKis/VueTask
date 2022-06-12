<template >
  <div v-if="userInfo" >
<!--    <Header/>-->
    <div class="container" >
      <div class="board">
        <div class="board__header">
          <h1 class="nameOfTask">Задачи</h1>
          <router-link :to="{name:'eventTask'}" :key="task" :task="task" class="addTask">Добавить задачу</router-link>
        </div>
        <div class="card__wrapper">
          <div class="filter">
<!--            <TypeSelect :tasks="tasks" :selectedQuantityStatus="selectedQuantityStatus" :type="options" @types="selectItem"/>-->
              <form @change=" handlePageChange">
                  <div class="resetType">
                      <div class="input__title">{{titleOfSelect}}</div>
                      <div class="arrow"></div>
                  </div>
                  <div class="__select"  >
                      <div class="__select__content" >
                          <div class="__select__wrapper" @click="types" >
                              <input id="task" class="type__select__input" type="checkbox"
                                     value="task" v-model="selectedItem"/>
                              <label  for="task" class ="__select__label" >Задача</label>
                          </div>
                          <div class="__select__wrapper" @click="types">
                              <input id="bug" class="type__select__input" type="checkbox"
                                     value="bug" v-model="selectedItem" />
                              <label for="bug" class ="__select__label" >Ошибка</label>
                          </div>

                      </div>
                  </div>
              </form>

              <QuerySelect :tasks="tasks" :selectedQuantityStatus="selectedQuantityStatus"/>
                <NameSelect :users="users" :tasks="tasks" />
                <StatusSelect :tasks="tasks" :selectedQuantityStatus="selectedQuantityStatus"/>
                  <RankSelect :tasks="tasks" :selectedQuantityStatus="selectedQuantityStatus"/>
                    <button >Применить</button>
          </div>
          <div class="card__task" >

    <TaskItem v-for="task in tasksForOnePage" :key="task.id" :task="task" :user="user" :deleteTask="deleteTask"/>
          </div>
            <PagingBlock>
                <template #footerTask>
                    <div class="tabs">
                        <button  class="tabs__btn" :disabled="currentPage===0" @click="prevPage(page)">Назад</button>
                        <button  class="tab" :class="{active: currentPage===page}" v-for="page in pages" :key="page.id" @click="changePage(page)" >
                            {{page+1}}
                        </button>
                        <button class="tabs__btn" :disabled="currentPage===pages.length-1" @click="nextPage(page)" >Вперед</button>
                    </div>
                    <div class="showing__list" >
                        Показано {{currentPage + 1}}-{{this.pageCount}} из {{this.pageCount}}
                    </div>
                </template>
            </PagingBlock>
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
    // import TypeSelect from "../components/selects/TypeSelect";
    import StatusSelect from "../components/selects/StatusSelect";
    import RankSelect from "../components/selects/RankSelect";
    import NameSelect from "../components/selects/NameSelect";
    import QuerySelect from "../components/selects/QuerySelect";

  export default {
  name: 'TasksList',
    data(){
      return {


          selectedItem:[],


          selected:"",
        userInfo:JSON.parse(localStorage.getItem('user-info')),
          // page:0,
        currentPage:0,
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
          pages:Array.from([]),

      }
    },
  components: {
      // TypeSelect,
      NameSelect,
      StatusSelect,
      RankSelect,
      QuerySelect,
      PagingBlock,
      TaskItem
  },


      computed: {
          ...mapGetters(['TASKS']),
          pageCount(){
              return (
                  Math.ceil(this.TASKS.length/this.limit)
              )
          },
          tasksForOnePage(){
              let firstItem= this.currentPage * this.limit;
              let lastItem= firstItem + this.limit;
              return this.TASKS.slice(firstItem, lastItem)
          },
          titleOfSelect(){
              if(this.selectedItem.length===0){
                  return "Тип"
              }else if(this.selectedItem.length===2){
                  return "Выбрано: все"
              }else{
                  return "Выбрано: " + this.selectedItem.length
              }
          },

      },
      methods: {
          ...mapActions([
              'GET_TASKS',
          ]),
          countOfTabs(){
              for(let i=0; i<this.pageCount;i++) {
                  this.pages.push(i);
              }
              return this.pages
          },
          changePage(page){
              this.currentPage=page
          },
          nextPage(){
              this.currentPage=this.currentPage+1
          },
          prevPage(){
              this.currentPage=this.currentPage-1
          },

          handlePageChange(selectedItem) {
              this.handlePageChange(selectedItem)
          },
          // selectedQuantityStatus() {
          //     if (this.selectedStatus === 0) {
          //         return "Статус"
          //     } else if (this.selectedStatus === 4) {
          //         return "Выбрано: все"
          //     } else {
          //         return "Выбрано: " + `${this.selectedStatus}`
          //     }
          // },
          filterData() {

                  return this.TASKS.filter((item) => {
                      return (this.type.length === 0 || item.type.includes(this.type))
                          // &&
                          // (this.colors.length === 0 || this.colors.includes(item.color)) &&
                          // (this.sizes.length === 0 || this.sizes.includes(item.size))
                  }).sort((a, b) => {
                      return a[this.selectedItem].toString().localeCompare(b[this.selectedItem].toString())
                  })

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
                      this.error = e;
                  });
          },
          // handlePageChange(value) {
          //     this.page = value;
          //     this.postParams();
          // },



      },
      mounted(){
          this.GET_TASKS(),
              this.countOfTabs()
      },
      created() {
        console.log(this.selectedItem.length)
      }


  }



</script>

