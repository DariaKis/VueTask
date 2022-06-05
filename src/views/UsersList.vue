<template>
<div>
<!--  <HeaderItem />-->

    <div class="container"  v-if="userInfo">
      <div class="board">
        <div class="users__wrapper">
          <div class="userList" >
              <UserItem v-for="user in USERS" :key="user.id" :user="user"/>
          </div>
<!--          <PagingBlock :user="user"/>-->
        </div>


      </div>
    </div>
</div>
</template>

<script>
  import UserItem from "../components/UserItem";
  // import PagingBlock from "../components/Paging";
  import {mapActions, mapGetters} from 'vuex';

  export default {

    data(){
      return {
        userInfo:JSON.parse(localStorage.getItem('user-info'))
      }
    },
    name: 'UsersList',
    components: {
      // PagingBlock,
      UserItem
    },
    computed: {
          ...mapGetters(['USERS'])
      },
    methods: {
        ...mapActions([
            'GET_USERS'
        ]),
    },
    mounted(){
        this.GET_USERS()
    }
  }


</script>