<template>
  <div >
<!--    <Header/>-->
    <div class="login">
      <form class="login__form" @submit.prevent="formSubmit">
        <p class="title">Авторизация</p>
        <div class="login__input">
          <p class="subtitle">Логин</p>
          <input
                  className="input__text"
                  placeholder="username@e.mail"
                  v-model="form.login"
          />

        </div>
        <div class="login__input">
          <p class="subtitle">Пароль</p>
          <input
                  class="input__text"
                  type="password"
                  placeholder="*******"
                  required
                  v-model="form.password"
                 />
        </div>
        <div>
          <button
                  type="submit"
                  @click.prevent="signIn"

          >
            Вход
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>

  import isAuth from "../api/isAuth";
  import router from "../router";
  import {mapActions, mapGetters} from 'vuex';


  export default {

    name: 'LoginPage',

    data(){
      return {
        mode:'signIn',
        form: {
          login:'',
          password: ''
        },
        isAuth:false,
      }
    },
    computed:{
      isSignInForm(){
        return this.mode==='signIn'
      },
      ...mapGetters(['LOGIN_ID'])
    },
    methods:{
      ...mapActions([
        'GET_LOGIN_ID'
      ]),
      formSubmit(){
        this.signIn
      },

       isLogin(){
        if (isAuth(true)){
          router.push('/tasks')
        }
       },


      async signIn(){
        try {
          const result=await fetch('http://93.95.97.34/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
              login: this.form.login,
              password: this.form.password
            }),
            headers: {
              'Content-type': 'application/json'
            }

          });
          const userIsAuth= await result.json();
          if(result.status !==200 && result.status !==204){
            throw new Error()
          }else{
            localStorage.setItem("user-info",JSON.stringify(userIsAuth));
            this.isAuth=true;
            this.isLogin()

          }
        }catch (e) {
          alert("Неверный пароль или логин");
        }
      }
    },
    created(){

    },

    mounted(){
    this.GET_LOGIN_ID()
    }
  }

</script>

<style lang="scss">
  .login{

    height: 730px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    &__form{
      height: 288px;
      background: #FFFFFF;
      box-shadow: 0px 0px 5px 3px #B5B5B5;
      border-radius: 5px;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 30px;

      p.title{
        font-weight: 300;
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 30px;
      }
      .login__input{
        font-size: 14px;
        font-weight: 400 ;
        width: 240px;
        height: 48px;
        margin-bottom: 30px;

        p.subtitle{
          font-family: 'Roboto', serif;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 19px;
          color: #CCCCCC;
          margin-bottom: 5px;
          text-align: left;
        }

        .input__text{
          width: 100%;
          font-family: 'Inter', sans-serif;
        }
      }
      button{
        width: 240px;
        height: 24px;
        color: white;
        border: 1px solid #5EE48C;
        border-radius: 5px;
        background-color: #5EE48C;
      }
    }
  }
  </style>