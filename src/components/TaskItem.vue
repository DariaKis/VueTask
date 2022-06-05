<template>


    <div  class="task" :key={id}>
       <router-link :to="{name:'taskCard', params:{id: task.id}}" :key="task.id" :deleteTask="deleteTask" :task="task" :user="user">
        <div class="task__check">
            <div>
                <TypeBlock :task="task"/>
            </div>
        </div>
        <div class="task__title">
            {{task.title}}
        </div>
        <div class="task__user">
            {{this.$store.state.users.find(x=>x.id===task.assignedId).username}}
        </div>
        <div class="task__status">
            <StatusBlock :task="task"/>
        </div>
        <div class="wrapper">
            <RankBlock :task="task"/>
        </div>
       </router-link>

        <DropDown :task="task"
                  :deleteTask="deleteTask"
                  :statusTesting="statusTesting"
                  :statusInProgress="statusInProgress"
                  :statusOpened="statusOpened"
                  :statusComplete="statusComplete"
        />

    </div>

</template>

<script>
    import StatusBlock from "./StatusBlock";
    import TypeBlock from "./TypeBlock";
    import RankBlock from "./RankBlock";
    import DropDown from "./DropDown";
    import axiosInstance from "../api";

    export default {
        data(){
            return {
                testing: "testing",
                opened: "opened",
                complete: "complete",
                inProgress: "inProgress"
            }
        },
        name: 'TaskItem',
        components: {
            DropDown,
            StatusBlock,
            TypeBlock,
            RankBlock
        },
        props: {
            task:{
                type: Object,
                required:true
            },
            user:{
                type: Object,
                required:true
            }
        },
        methods:{
            deleteTask(){
                return axiosInstance.delete(`/tasks/${this.task.id}`)
                    .then(() => {
                        return this.tasks;
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            },
            statusTesting(){

                axiosInstance.patch(`/tasks/${this.task.id}/status/${this.testing}`);
                return this.$store.state.tasks

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

        },

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

                .nameOfTask {
                    width: auto;
                    margin-bottom: 0;
                    margin-right: 10px;
                }

                .addTask {
                    text-decoration: none;
                    padding: 0 20px;
                    width: 169px;
                    height: 24px;
                    color: #FFFFFF;
                    background: #7B61FF;
                    border: 1px solid #7B61FF;
                    box-sizing: border-box;
                    border-radius: 5px;
                    font-family: 'Roboto', serif;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 19px;
                    font-weight: 300;
                }
            }

            .card__wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 20px;
                width: 1280px;
                background: #FFFFFF;
                box-shadow: 0px 0px 5px 3px #B5B5B5;
                border-radius: 5px;

                .filter {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;

                    .type {
                        width: 98px;
                    }

                    .name {
                        width: 527px;
                    }

                    .status {
                        width: 120px;
                    }

                    .user {
                        width: 180px;
                    }

                    .priority {
                        width: 120px;
                    }

                    button {
                        color: #FFFFFF;
                        padding: 0px 20px;
                        width: 125px;
                        height: 24px;
                        background: #7B61FF;
                        border: 1px solid #7B61FF;
                        box-sizing: border-box;
                        border-radius: 5px;
                        font-family: 'Roboto', serif;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 19px;
                    }
                }

                .card__task {
                    width: 100%;
                    background: #FFFFFF;
                    box-shadow: 0 0 2px 1px #B5B5B5;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    justify-content: space-between;

                    .task {
                        text-decoration: none;
                        display: flex;
                        justify-content: space-between;
                        height: 68px;
                        align-items: center;
                        padding-left: 30px;
                        font-family: 'Roboto', serif;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 19px;

                        a{
                            text-decoration: none;
                            display: flex;
                        }

                        &:nth-child(even) {
                            background-color: #F2F2F2;
                        }

                        &:hover {
                            border: 2px solid #4BD379;
                        }
                        .typeImg{
                            padding-right: 30px;
                        }

                        &__title{
                            text-decoration: none;
                            width: 527px;
                            margin-right: 14px;
                            padding-left: 20px;
                        }

                        &__user {
                            width: 180px;
                            margin-right: 14px;
                            padding-left: 20px;
                        }

                    }
                }
            }
        }
    }

</style>