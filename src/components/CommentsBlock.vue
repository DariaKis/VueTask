<template>
    <div class="comment__task">
        <div class="comment__form">
            <p>Комментарий ({{comments.length}})</p>
            <textarea
                    type="text"
                    name="text"
                    id="text"
                    v-model="form.text"
            ></textarea>
            <button @click="createComments">Добавить комментарий</button>
        </div>
        <div class="comment__wrapper"  >
                <div class="comment__body" v-for="comment in comments" :key="comment.id" :comment="comment">
                    <div>
                        <div class="comment__author">{{this.$store.state.users.find(x=>x.id===comment.userId).username}}</div>
                        <div class="comment" >{{comment.text}} </div>
                    </div>
                        <button  v-if="userInfo===comment.userId" @click="deleteComment">Удалить</button>
                </div>
        </div>
    </div>

</template>
<script>
    import axiosInstance from "../api";

    export default {
        data(){
            return {
                comments:[],
                form:{
                    userInfo:JSON.parse(localStorage.getItem('user-info')).id,
                    taskId: this.task.id,
                    text: "",
                },
            }
        },
        name: 'CommentsBlock',
        props: {
            task:{
                type: Object,
                required:true
            },
            id:{
                type: String,
                required:true
            },


        },

        created(){
            this.fetchComments();
            console.log(this.comments.id);
        },


        methods: {
            fetchComments() {
                return axiosInstance.get(`/comments/${this.id}`)
                    .then(comments => {
                        this.comments = comments.data;
                        return this.comments
                    })

                    .catch(e => {
                        this.error = e;
                    })
            },
            createComments() {
                return axiosInstance.put(`/comments/createOrEdit`, this.form)
                    .then(data => {
                        this.comments.push(data);
                        return this.comments;
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            },
            deleteComment(){
                return axiosInstance.delete(`/comments/${this.comment.id}`)
            },
        },

    }

</script>

<style lang="scss">

    .comment__task {
        height: 70vh;
        border-left: 1px solid #B5B5B5;
        width: 498px;
        padding: 0 20px;
        display: flex;
        text-align: left;
        flex-direction: column;

        .comment__form {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;

            p {
                color: #CCCCCC;
                margin-bottom: 10px;
            }

            textarea {
                color: #CCCCCC;
                height: 76px;
                margin-bottom: 15px;
                border-color: #CCCCCC;
                padding: 5px 10px;
                &:focus {
                    color: black;
                }
            }

            button {
                padding: 0px 20px;
                position: static;
                width: 221px;
                height: 24px;
                background: #5EE48C;
                border: 1px solid #5EE48C;
                box-sizing: border-box;
                border-radius: 5px;
                color: #FFFFFF;
            }
        }

        .comment__wrapper {
            margin-bottom: 20px;
            display: flex;
            /*justify-content: space-between;*/
            flex-direction: column;
            width: 100%;


            .comment__body {
                margin-bottom: 20px;
                &:hover button{
                    display: block;
                }

                .comment__author {
                    color: #CCCCCC;
                    line-height: 19px;
                    margin-bottom: 5px;
                    position: relative;
                }
            }
            button{
                position: absolute;
                text-align: center;
                color: #D14343;
                border: none;
                background-color: #FFFFFF;
                right: 30px;
                display:none;
            }
        }
    }



</style>