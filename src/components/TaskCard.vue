<template>
    <div>

    <div class="container" >
        <div class="board">
            <div class="board__header">
                <div class="task_header">
                    <h1 class="nameOfTask">
                        {{task.title}}<br/>
                    </h1>
                    <StatusBlock :task="task"/>
                </div>

                <div class="changeStatus">
                    <div v-if="isShowForInProgress(task.status)">
                        <button class="take__to__work"  @click="statusInProgress">Взять в работу</button>
                    </div>
                    <div v-if="isShowForTesting(task.status)">
                        <button class="take__to__work" @click="statusTesting">На тестирование</button>
                    </div>
                    <div v-if="isShowForOpened(task.status)">
                        <button class="take__to__work" @click="statusOpened">Переоткрыть</button>
                    </div>
                    <div v-if="isShowForComplete(task.status)">
                        <button class="take__to__work"  @click="statusComplete">Готово</button>
                    </div>


                    <router-link :to="{name:'editTask', params:{id: task.id}}" :task="task" type="button" class="edit__task" >Редактировать</router-link>
                    <router-link :to="{name:'tasks'}">
                    <button @click="deleteTask" class="delete__task">Удалить</button>
                    </router-link>
                </div>

            </div>
            <div class="task__wrapper">
                <div class="about__task">
                    <div class="formItem">
                        <h3 class="itemTitle">Исполнитель</h3>
                        <h3 class="itemSubtitle">{{USERS.find(x=>x.id===task.assignedId).username}}</h3>
                    </div>
                    <div class="formItem">
                        <h3 class="itemTitle">Автор задачи</h3>
                        <h3 class="itemSubtitle">{{USERS.find(x=>x.id===task.userId).username}}</h3>
                    </div>
                    <div class="formItem">
                        <h3 class="itemTitle">Тип запроса</h3>
                        <h3 class="itemSubtitle" v-if="task.type==='task'">
                            Задача
                        </h3>
                        <h3 class="itemSubtitle" v-else>
                            Ошибка
                        </h3>
                    </div>
                    <div class="formItem">
                        <h3 class="itemTitle">Приоритет</h3>
                        <h3 class="itemSubtitle" v-if="task.rank==='high'">
                            Высокий
                        </h3>
                        <h3 class="itemSubtitle" v-else-if="task.rank==='medium'">
                            Средний
                        </h3>
                        <h3 class="itemSubtitle" v-else>
                            Низкий
                        </h3>
                    </div>
                    <div class="formItem">
                        <h3 class="itemTitle">Дата создания</h3>
                        <h3 class="itemSubtitle">{{timeOfCreate}}</h3>
                    </div>
                    <div class="formItem">
                        <h3 class="itemTitle">Дата изменения</h3>
                        <h3 class="itemSubtitle">{{timeOfUpdate}}</h3>
                    </div>
                    <div class="formItem">
                        <h3 class="itemTitle">Затрачено времени</h3>
                        <h3 class="itemSubtitle">{{hours +" "+getNumEndingHours(hours) +" "+ minutes+ " " +getNumEndingMinutes(minutes)}}</h3>
                    </div>
                    <button class="taskBtn" @click="showModal">Сделать запись о работе</button>
                </div>
                <div class="description__task">
                    <h3 >Описание</h3>
                    <p>
                        {{task.description}}
                    </p>
                </div>
                <PagingBlock :task="task"/>

                    <CommentsBlock :id="task.id" :task="task"/>

                <ModalEvent :close="close" :is-modal-visible="isModalVisible" :comments="comments" :users="users" :tasks="tasks" />
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import CommentsBlock from "./CommentsBlock";
    import {mapActions, mapGetters} from 'vuex';
    import moment from 'moment';
    import axiosInstance from "../api";
    import StatusBlock from "./StatusBlock";
    import ModalEvent from "./ModalEvent";



    export default {

        name: 'TaskCard',
        data(){
            return {
                task:this.$store.state.tasks.find(task => task.id === this.$route.params.id),
                testing: "testing",
                opened:"opened",
                complete:"complete",
                inProgress:"inProgress",
                isModalVisible: false,
                arrForHours:["час","часа","часов"],
                arrForMinutes:["минута","минуты","минут"],
                hEnding:0,
                i:0,
                mEnding:0,
            }
        },

        props: {
            id:{
                type: String,
                required:true
            },
            user:{
                type: Object,
                required:true
            }
        },
        components: {
            ModalEvent,
            StatusBlock,
            CommentsBlock
        },
        computed: {
            ...mapGetters(['TASKS', 'USERS']),
            timeOfCreate() {
                return moment(this.task.dateOfCreation).format('DD.MM.YY HH:mm')
                    },
            timeOfUpdate(){
                return moment(this.task.dateOfUpdate).format('DD.MM.YY HH:mm')
            },

            hours (){
                return   Math.trunc(this.task.timeInMinutes/60)
            },
             minutes (){
                return this.task.timeInMinutes % 60
             },
        },
        methods: {
            ...mapActions([
                'GET_TASKS',
                'GET_USERS'
            ]),
            deleteTask(){
                return axiosInstance.delete(`/tasks/${this.task.id}`)
                    .then(() => {
                        return this.tasks;
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            },
            isShowForInProgress(status){
                return status==="opened" || status==="testing"
            },
            isShowForTesting(status) {
                return status === "inProgress"
            },
            isShowForOpened(status){
                return status==="inProgress" || status==="complete"|| status==="testing"
            },
            isShowForComplete(status){
                return status==="opened" ||status==="inProgress"|| status==="testing"
            },
            statusTesting(){
                return axiosInstance.patch(`/tasks/${this.task.id}/status/${this.testing}`)

            },
            statusInProgress(){
                return axiosInstance.patch(`/tasks/${this.task.id}/status/${this.inProgress}`)

            },
            statusOpened(){
                return axiosInstance.patch(`/tasks/${this.task.id}/status/${this.opened}`)

            },
            statusComplete(){
                return axiosInstance.patch(`/tasks/${this.task.id}/status/${this.complete}`)

            },
            showModal() {
                this.isModalVisible = true;
            },
            close() {
                this.isModalVisible = false;
            },
            getNumEndingHours()
            {
                let iNumber = this.hours % 100;
                if (this.hours>=11 && this.hours<=19) {
                    this.hEnding=this.arrForHours[2];
                }
                else {
                    this.i = iNumber % 10;
                    switch (this.i)
                    {
                        case (1): this.hEnding = this.arrForHours[0]; break;
                        case (2):
                        case (3):
                        case (4): this.hEnding = this.arrForHours[1]; break;
                        default: this.hEnding = this.arrForHours[2];
                    }
                }
                return this.hEnding;
            },
            getNumEndingMinutes(){
                let iNumber = this.minutes % 100;
                if (this.minutes>=11 && this.minutes<=19) {
                    this.mEnding=this.arrForMinutes[2];
                }
                else {
                    this.i = iNumber % 10;
                    switch (this.i)
                    {
                        case (1): this.mEnding = this.arrForMinutes[0]; break;
                        case (2):
                        case (3):
                        case (4): this.mEnding = this.arrForMinutes[1]; break;
                        default: this.mEnding = this.arrForMinutes[2];
                    }
                }
                return this.mEnding;
            }
        },
        mounted(){
                this.GET_TASKS(),
                this.GET_USERS()
        },
        created(){
        }

    };
</script>

<style lang="scss">
    .container {
        .board {
            &__header {
                width: 1280px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
        }
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
    .changeStatus{
        display: flex
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

    .delete__task{
        padding: 0px 20px;
        width: 103px;
        height: 24px;
        background: #FF6161;
        border: 1px solid #FF6161;
        box-sizing: border-box;
        border-radius: 5px;
        color: #FFFFFF;
        margin-left: 10px;
        font-family: "Roboto";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
    }

    .task__wrapper{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 20px;
        width: 1280px;
        height: 100%;
        background: #FFFFFF;
        box-shadow: 0px 0px 5px 3px #B5B5B5;
        border-radius: 5px;

        .about__task{
            width: 340px;
            border-right: 1px solid #B5B5B5;
            height: 70vh;
            text-align: left;
            .formItem{
                margin-bottom: 20px;
                .itemTitle{
                    color: #CCCCCC;
                    margin-bottom: 5px;
                }

            }
            .taskBtn{
                width: 228px;
                height: 24px;
                background: #7B61FF;
                border: 1px solid #7B61FF;
                box-sizing: border-box;
                border-radius: 5px;
                color: white;
            }
        }
        .description__task{
            padding: 0 20px;
            width: 440px;
            font-family: 'Roboto', serif;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            text-align: left;
            h3{
                color: #CCCCCC;
                margin-bottom: 5px;
            }
            p{
                text-indent: 40px;
                color: black;
            }
        }


    }
</style>