<template>
  <div class="header" v-if="this.$route.path !== '/'">
     <img src="@/assets/img/Logo.png"/>
        <div class="headerIsLogin">
          <nav class="navbar" >
            <router-link class="navbar__links" to="/tasks">Задачи</router-link>
            <router-link  class="navbar__links" to="/users">Пользователи</router-link>
          </nav>
          <div class="user__info">
            <h3 class="user__name" >{{userInfo.username}}</h3>
            <img class="user__icon" :src="this.src"/>
            <div class="info">
              <div class="info__wrapper">
                <router-link :to="{name:'userCard', params:{id: userInfo.id}}" :key="userInfo" class="linkTo">Посмотреть профиль</router-link>
                <div class="linkTo" @click="signOut" >Выйти из системы</div>
              </div>
            </div>
          </div>
        </div>
  </div>
  <router-view/>
</template>
<script>


  export default {
      mode: 'signOut',
        data() {
            return {
              userInfo: JSON.parse(localStorage.getItem('user-info')),
              src: JSON.parse(localStorage.getItem('user-info')).photoUrl,
              isAuth:true
            }
        },

      methods:{
        formSubmit(){
          this.signOut
        },
        verifyIsAuth(){
          if (localStorage.length===0) {
            this.router.push('/')
          }
        },
        signOut(){
          localStorage.removeItem('user-info');
          this.isAuth=false;
          this.verifyIsAuth()
        },
      },
    created() {
      }
    }
</script>

<style lang="scss">
#app {
  font-family: "Open Sans";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #333333;
}

nav {
  margin-left: 400px;

  a {
    color: #333333;
    text-decoration: none;
    padding: 16px 16px 20px 16px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;



      &.router-link-exact-active {
      color: #333333;
      border-bottom: 2px solid#7B61FF;
    }
  }
}

.navbar{
  margin-right: 400px;
  &__links {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;

    .link{
      text-decoration: none;

      padding: 16px;
      &-active{
        border-bottom: 2px solid#7B61FF;
      }
    }
  }
}

.header{
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .headerIsLogin{
    display: flex;
  }
  .user__info{
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    &:hover .info{
      display: block;
    }

    .user__name{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      margin-right: 10px;
    }

    .user__icon{
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    .info {
      cursor: pointer;
      padding: 2px 0px;
      display: none;
      position: absolute;
      width: 136px;
      height: 40px;
      right: 0px;
      top: 22px;
      background: #FFFFFF;
      box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
      border-radius: 5px;
      z-index: 1;
      &__wrapper{
        display: flex;
        flex-direction: column;

        .linkTo{
          font-family: 'Inter', serif;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 14px;
          padding: 0 5px;
          margin-bottom: 5px;
          text-decoration: none;
          &:hover{
            color: #FF6161;
          }
        }
      }
    }
  }
  img{
    height: 20px;
  }
}

* {
  color: black;
  //font-family: 'Open Sans', sans-serif;
  //font-family: 'Roboto', sans-serif;
  //font-family: 'Inter', sans-serif;


}
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;

}

body{
  height: 100vh;
  width: 1440px;
  margin: 0;
  padding: 0;
  //@include _fontParams;
  color: black;
  background-color: #E5E5E5;


}
</style>
