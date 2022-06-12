<template>
    <div>
        <div class="container" @submit.prevent="prevent">
            <div class="board">
                <div class="board__header">
                    <div class="task_header">
                        <h1 class="nameOfTask">
                            <span v-if="this.$route.path === '/eventTask'">
                            Создание
                            </span>
                            <span v-else>
                            Редактирование
                            </span>

                        </h1>
                    </div>
                    <div>
                        <router-link :to="{name:'tasks'}">
                            <button class="edit__task" @click="createTask">Сохранить</button>
                        </router-link>
                        <router-link to="/tasks" class="take__to__work">Отмена</router-link>
                    </div>
                </div>
                <div class="task__wrapper" >
                    <div class="user">
                        <h3 class="itemTitle">Исполнитель</h3>
                        <select
                                name="assignedId"
                                id="assignedId"
                                :disabled="userId?true:false"
                                v-model="form.assignedId"
                                @click="prevent"
                        >

                                <option
                                    :value="user.id"
                                    v-for="user in this.$store.state.users" :key="user.id" :user="user">
                               {{user.username}}
                            </option>
                        </select>
                        <h3 class="itemTitle">Тип запроса</h3>
                        <select
                                name="type"
                                id="type"
                                required
                                v-model="form.type"
                        >
                            <option value="task" >Задача</option>
                            <option value="bug">Ошибка</option>
                        </select>

                        <h3 class="itemTitle">Приоритет</h3>
                        <select
                                name="rank"
                                id="rank"
                                v-model="form.rank"
                        >
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </div>
                    <div class="about__task__wrapper">
                        <h2 class="taskTitle">Название</h2>
                        <input name="title"
                               id="title"
                               v-model="form.title"
                        />



                        <h2 class="taskTitle">Описание</h2>
                        <textarea name="description"
                                  id="description"
                                  v-model="form.description"
                                  @click="prevent"

                        >
                        </textarea>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axiosInstance from "../api";


    export default {
        data(){
            return {
                currentTitle:"",
                task:this.$store.state.tasks.find(task => task.id === this.$route.params.id),
                userInfo:JSON.parse(localStorage.getItem('user-info')),
                form: {
                    userId: "",
                    title:"",
                    description: "",
                    type:"task",
                    rank:"low",
                    assignedId:"",
                    id:""
                },

        }},
        name: 'EventTask',
        props:{
            value:{
                type: String,
                required:true
            },
            id:{
                type:String,
                required:true
            },

        },


        created(){

        },

        methods:{

            createTask() {
                return axiosInstance.put(`/tasks/createOrEdit`, this.form)
                    .then(data => {
                        this.tasks.push(data);
                        this.form='';
                        return this.tasks;
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            },
            prevent(e){
                e.preventDefault()
            },
        },
        mounted(){
            this.form.userId= this.$route.params.id===undefined? JSON.parse(localStorage.getItem('user-info')).id: this.task.userId ;
             this.form.title= this.$route.params.id===undefined? "": this.task.title;
                this.form.description= this.$route.params.id===undefined? "": this.task.description;
                this.form.type= this.$route.params.id===undefined? "task": this.task.type;
                this.form.rank= this.$route.params.id===undefined? "low": this.task.rank;
                this.form.assignedId= this.$route.params.id===undefined? "": this.task.assignedId;
                this.form.id=this.$route.params.id===undefined?"": this.task.id

        }

    };
</script>

<style lang="scss">
    .user{
        .itemTitle {
            color: #CCCCCC;
            margin-bottom: 5px;
            width: 400px;
            height: 19px;
            font-family: 'Roboto', serif;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
        }

        select{
            margin-bottom: 20px;
            width: 300px;
            height: 24px;
        }
    }

    .about__task__wrapper{
        padding-left: 20px;
        input{
            width: 400px;
            height: 24px;
            margin-bottom: 20px;
            padding: 5px 10px;
        }
        textarea{
            width: 400px;
            height: 65vh;
            padding: 5px 10px;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;

        }
        .taskTitle{
            width: 400px;
            height: 19px;
            font-family: 'Roboto', serif;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #CCCCCC;
            margin-bottom: 5px;
        }
    }
</style>