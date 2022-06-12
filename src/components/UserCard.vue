<template>
    <div>
        <div class="container" >
            <div class="board">
                <div class="board__header">
                    <div class="task_header">
                        <h1 class="nameOfTask">

                            {{user.username}}
                        </h1>
                    </div>
                    <div>
                        <router-link :to="{name:'eventTask'}" :key="this.task"  class="take__to__work" >Добавить задачу</router-link>
                      <button v-if="userInfo.id===this.user.id" class="edit__task" @click="showModal">Редактировать</button>
                    </div>
                </div>
                <div class="task__wrapper">
                    <div class="user">
                        <img class="userIcon" :src="this.src"/>
                        <h2 class="aboutTitle">
                            О себе:
                        </h2>
                        <h2 class="aboutSubtitle">
                            {{user.about}}
                        </h2>
                    </div>
                    <div class="about__tasks">
                        <h2 class="taskTitle">Задачи</h2>
                        <div class="about__board"  >
                    <router-link :to="{name:'taskCard', params:{id: task.id}}" class="task" v-for="task in tasksOfUser" :key="task.id" :task="this.task">
                            <TypeBlock :task="task"/>
                            <div class="bodyTask">
                                {{task.title}}
                            </div>
                            <StatusBlock :task="task"/>
                            <RankBlock :task="task"/>
                        </router-link>
                    </div>
                        <PagingBlock>
                            <template #usersTasks>
                                <div class="tabs">
                                    <button  class="tabs__btn" :disabled="currentPage===0" @click="prevPage(page)">Назад</button>
                                    <button  class="tab" :class="{active: currentPage===page-1}" v-for="page in pageCount" :key="page" @click="changePage(page)" >
                                        {{page}}
                                    </button>
                                    <button class="tabs__btn" :disabled="currentPage===pageCount-1" @click="nextPage(page)" >Вперед</button>
                                </div>
                                <div class="showing__list" >
                                    Показано {{currentPage + 1}}-{{this.pageCount}} из {{this.pageCount}}
                                </div>
                            </template>
                        </PagingBlock>

                        <ModalEvent :isModalVisible="isModalVisible" :close="close" :users="users" :comments="comments" :tasks="tasks" @click="showModal"/>
                </div>
                </div>

            </div>
        </div>
    </div>

</template>


<script>
import PagingBlock from "./Paging";
import StatusBlock from "./StatusBlock"
import {mapActions, mapGetters} from 'vuex';
import TypeBlock from "./TypeBlock";
import RankBlock from "./RankBlock";
import ModalEvent from "./ModalEvent";


    export default {
        name: 'UserCard',
        data(){
            return {
                isModalVisible: false,
                userInfo:JSON.parse(localStorage.getItem('user-info')),
                user:this.$store.state.users.find(user => user.id === this.$route.params.id),
                src: this.$store.state.users.find(user => user.id === this.$route.params.id).photoUrl,
                currentPage:0,
                limit:10,
                pages:Array.from([]),
                formUser:{
                    name:"",
                    img: "",
                    about:""
                },


            }
        },
        components: {
            TypeBlock,
            PagingBlock,
            StatusBlock,
            RankBlock,
            ModalEvent
        },
        props: {

            // id:{
            //     type: String,
            //     required:true
            // },
            task: {
                type: Object,
                required:true
            }
        },
        computed: {
            ...mapGetters([ 'TASKS', 'USERS']),
            pageCount(){
                return (
                    Math.ceil(this.tasksOfUser.length/this.limit)
                )
            },
            userTasks(){
                return this.$store.state.tasks.filter(x=>x.assignedId===this.$route.params.id)
            },
            tasksOfUser(){
                let firstItem= this.currentPage * this.limit;
                let lastItem= firstItem + this.limit;
                return this.userTasks.slice(firstItem, lastItem)
            }



        },
        methods: {
            ...mapActions([
                'GET_USERS',
                'GET_TASKS'
            ]),
            showModal() {
                this.isModalVisible = true;
            },
            close() {
                this.isModalVisible = false;
            },
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
            this.GET_TASKS(),
            this.GET_USERS()

        },
        created(){

            // let taskAssignedId=this.TASKS.filter(task=>task.assignedId===this.user.id);
            // if(taskAssignedId){
            //     this.taskAssignedId=taskAssignedId
            // }



        }
    };

</script>

<style lang="scss">
    .container{
        width: 1280px;
        height: 750px;
        .board{
            padding: 30px 80px;
            .task_header {
                display: flex;
                align-items: center;

                .testingOrInProgressBtn {
                    padding: 2px 10px;
                    height: 20px;
                    background: #FFC700;
                    border: 1px solid #846F00;
                    border-radius: 5px;
                    color: #846F00;
                }
                .openedBtn {
                    padding: 2px 10px;
                    //width: 77px;
                    height: 20px;
                    background: #4BD379;
                    border: 1px solid #157536;
                    border-radius: 5px;
                    color: #157536;
                }
                .completeBtn{
                    padding: 2px 10px;
                    //width: 78px;
                    height: 20px;
                    background: #CCCCCC;
                    border: 1px solid #333333;
                    border-radius: 5px;
                    color: #333333;                }
            }

            .take__to__work {
                font-family: 'Roboto' ;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                width: 152px;
                height: 24px;
                background: #F4F4F4;
                border: 1px solid #333333;
                box-sizing: border-box;
                border-radius: 5px;
                text-decoration: none;
                padding: 1px 10px;
                margin-left: 10px;
                &:hover{
                    background: #E6E1FF;
                }
            }

            .edit__task{
                padding: 1px 20px;
                width: 155px;
                height: 24px;
                background: #7B61FF;
                border: 1px solid #7B61FF;
                box-sizing: border-box;
                border-radius: 5px;
                color: #FFFFFF;
                text-decoration: none;
                margin-left: 10px;
                font-family: 'Roboto' ;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
            }
            .task__wrapper {
                display: flex;
                position: relative;
                 .user {
                height: 602px;
                width: 340px;
                padding: 0 20px;
                border-right:  1px solid #B5B5B5;

                &Icon{
                    width: 186px;
                    height:186px;
                    margin-bottom: 20px;
                    border-radius: 50%
                }
                .aboutTitle{
                    font-family: 'Roboto', serif;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 19px;
                    align-items: center;
                    color: #CCCCCC;
                    margin-bottom: 5px;
                }
                .aboutSubtitle{
                    font-family: 'Roboto', serif;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 19px;
                    display: flex;
                    align-items: center;
                    color: #333333
                }
            }
        .about__tasks{
            width: 939px;
            padding: 0 20px;

            .taskTitle{
                font-family: 'Roboto', serif;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                align-items: center;
                color: #CCCCCC;
                margin-bottom: 5px;
            }
            .about__board{
                height: 534px;
                background: #FFFFFF;
                box-shadow: 0px 0px 2px 1px #B5B5B5;
                border-radius: 5px;
                margin-bottom: 20px;


                .task{
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    padding: 20px 30px;
                    position: static;
                    height: 68px;
                    text-decoration: none;
                    text-align: left;
                    &:nth-child(even) {
                        background-color:#F2F2F2;
                    }
                    &:hover {
                        border: 2px solid #4BD379;
                    }


                    &__item{
                        width: 100%;
                        padding: 20px 30px;
                        position: static;
                        height: 68px;
                        text-decoration: none;
                        text-align: left;
                        &:hover {
                            border: 2px solid #4BD379;
                        }
                    }
                }
                .about__wrapper{
                    height: 64px;
                    text-decoration: none;
                    &:hover {
                        border: 2px solid #4BD379;
                    }
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    &:nth-child(even) {
                        background-color:#F2F2F2;
                    }
                }
            }


            .bodyTask{
                width: 527px;
            }



        }
    }
   }}
    </style>