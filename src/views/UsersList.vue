<template  >
<div>
<!--  <HeaderItem />-->

    <div class="container"  v-if="userInfo">
      <div class="board">
        <div class="users__wrapper">
          <div class="userList" >
              <UserItem v-for="user in usersForOnePage" :key="user.id" :user="user"/>
          </div>
            <PagingBlock>
                <template #footerUser>
                    <div class="tabs">
                        <button  class="tabs__btn" :disabled="currentPage===0" @click="prevPage(page)">Назад</button>
                        <button  class="tab" :class="{active: currentPage===page-1}" v-for="page in pageCount" :key="page.id" @click="changePage(page)" >
                            {{page}}
                        </button>
                        <button class="tabs__btn" :disabled="currentPage===pageCount-1" @click="nextPage(page)" >Вперед</button>
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
  import UserItem from "../components/UserItem";
 import PagingBlock from "../components/Paging";
  import {mapActions, mapGetters} from 'vuex';

  export default {

    data(){
      return {
        userInfo:JSON.parse(localStorage.getItem('user-info')),
          currentPage:0,
          limit:10,
          pages:Array.from([]),
      }
    },
    name: 'UsersList',
    components: {
      PagingBlock,
      UserItem
    },
    computed: {
          ...mapGetters(['USERS']),
        // ...mapGetters(["getCurrentFilters", 'getUsers']),
        pageCount(){
            return (
                Math.ceil(this.USERS.length/this.limit)
            )
        },
        usersForOnePage(){
            let firstItem= this.currentPage * this.limit;
            let lastItem= firstItem + this.limit;
            return Array.from(this.$store.state.users).slice(firstItem, lastItem)
        }
      },
    methods: {
        ...mapActions([
            'GET_USERS'
        ]),
        // ...mapActions(["fetchAllUsers", "fetchUsers"]),
        countOfTabs(){
            for(let i=0; i<this.pageCount;i++) {
                this.pages.push(i);
            }
            return this.pages
        },
        changePage(page){
            this.currentPage=page-1
        },
        nextPage(){
            this.currentPage=this.currentPage+1
        },
        prevPage(){
            this.currentPage=this.currentPage-1
        },
    },
    mounted(){
        this.GET_USERS()
        // this.fetchAllUsers();
        // this.fetchUsers();
    },
      created(){
      }

  }


</script>