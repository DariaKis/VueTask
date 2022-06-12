<template>

 <div v-show="isModalVisible"  class="modal__active">
    <div class="modal__wrapper" >
<!--        <modal>-->
<!--            <slot name="modalTask"></slot>-->
<!--            <slot name="modalUser"></slot>-->
<!--        </modal>-->
        <h2 class="modal__title">{{this.$route.path.substr(0, 9)==="/taskCard" ? "Запись о работе" :"Редактирование пользователя"}}</h2>

        <div class="body" v-if="this.$route.path.substr(0, 9)==='/taskCard'">
            <div class="body__field">
                <h4>Затраченное время</h4>
                <input
                        name="value"
                        id="value"
                        type="number"
                        v-model="formTask.value"
                />
            </div>
            <div class="body__field">
                <h4>Единица измерения</h4>
                <select name="quantity"
                        id="quantity"
                        v-model="formTask.quantity"
                >
                    <option value="days">Дней</option>
                    <option value="hours">Часов</option>
                    <option value="minutes">Минут</option>
                </select>
            </div>
            <div class="body__field">
                <h4>Комментарий</h4>
                <textarea
                        class="aboutInfo"
                        name="comment"
                        id="comment"
                        v-model="formTask.comment"
                >
                </textarea>
            </div>
        </div>

        <div class="body" v-else>
            <div class="body__field">
                <h4>Имя пользователя</h4>
                <input
                        name="currentUserName"
                        id="currentUserName"
                        type="text"
                        v-model="formUser.name"/>

            </div>
            <div class="body__field">
                <h4>URL фотографии</h4>
                <input
                        name="currentPhoto"
                        id="currentPhoto"
                        v-model="formUser.img"
                />

            </div>
            <div class="body__field">
                <h4>О себе</h4>
                <textarea
                        name="currentUserAbout"
                        id="currentUserAbout"
                        class="aboutInfo"
                        v-model="formUser.about"
                >
               </textarea>
            </div>
        </div>


        <div class="modal__footer">
            <button v-if="this.$route.path.substr(0, 9)==='/taskCard'" class="purpleBtn" @click="editTime" > Добавить</button>
            <button v-else class="purpleBtn" @click="editUser"> Сохранить</button>
            <button class="greyBtn" @click="closeModal">Отмена</button>
        </div>
    </div>
 </div>

</template>
<script>
    import axiosInstance from "../api";
    import {mapActions, mapGetters} from 'vuex';


    export default {
        data () {
            return {
                formTask: {
                    value:10,
                    quantity: "minutes",
                    comment:""
                },
                formUser:{
                    name:"",
                    img: "",
                    about:""
                },

            };
        },
        name: 'ModalEvent',
        template: '#ModalEvent',
        props:{
            isModalVisible:{Boolean},

            close:{
                type:Function,
                required: true
            },
            task:{
                type:Object,
                required: true
            }
        },
        computed:{
            ...mapGetters(['TASK'])

        },
        mounted(){
            this.formUser.name=JSON.parse(localStorage.getItem('user-info')).username;
            this.formUser.img= JSON.parse(localStorage.getItem('user-info')).photoUrl;
            this.formUser.about=JSON.parse(localStorage.getItem('user-info')).about
            // this.TASK()
        },
        methods:{
            ...mapActions([
                'GET_TASK'
            ]),
            closeModal(){
               return this.close
            },
            timeInMinutes(){
                if(this.formTask.quantity==="hours"){
                    return this.formTask.value*60
                }else if(this.formTask.quantity==="minutes"){
                    return this.formTask.value
                }else{
                    return this.formTask.value*1440
                }
            },

            editTime() {
                return axiosInstance.patch(`/tasks/${this.task.id}/worktime`, {
                    timeInMinutes:this.timeInMinutes(this.formTask),
                    comment:this.formTask.comment,
                    currentUser: this.userInfo.id,
                })
                    .then(data => {
                        this.close();
                        this.tasks.push(data);
                        return this.tasks;
                    })

                    .catch((e) => {
                        this.error = e;
                    });

            },
            editUser() {
                return axiosInstance.put(`users/edit`, {
                    id:this.userInfo.id,
                    login: this.userInfo.login,
                    username: this.formUser.currentUserName,
                    about: this.formUser.currentUserAbout,
                    photoUrl: this.formUser.currentPhoto,
                    password: "123"
                })
                    .then(data => {
                        this.close();
                        this.users.push(data);
                        return this.users;
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            },

        },
        created(){
        }

    }

</script>
<style lang="scss">
    .modal {
        display: none;
    }
    .modal__active {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(181, 181, 181, 0.35);
    }

    .modal__wrapper {
        background: #FFFFFF;
        border-radius: 5px;
        width: 430px;
        height: 405px;

        .modal__title {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            padding: 20px 30px;
            border-bottom: 1px solid #B5B5B5;
            margin-bottom: 20px;
        }

        .body {
            width: 430px;
            padding: 0 30px;
            border-bottom: 1px solid #B5B5B5;

            &__field {
                margin-bottom: 20px;

                h4 {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 19px;
                    color: #CCCCCC;
                    margin-bottom: 5px;
                }

                input {
                    width: 100%;
                }
                .aboutInfo {
                    width: 100%;
                    height: 76px;
                }
                select{
                    width: 100%;
                }
            }
        }

        .modal__footer {
            padding: 20px 30px;

            .purpleBtn {
                padding: 0px 20px;
                width: 120px;
                height: 24px;
                background: #7B61FF;
                border: 1px solid #7B61FF;
                border-radius: 5px;
                color: #FFFFFF;
                margin-right: 10px;
            }

            .greyBtn {
                padding: 0px 20px;
                width: 98px;
                height: 24px;
                background: #F4F4F4;
                border: 1px solid #333333;
                border-radius: 5px;
            }
        }
    }
</style>