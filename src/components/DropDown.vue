<template>
    <div class="task__edit" >
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="task__tools">
            <div class="tools__wrapper">
                <router-link :to="{name:'editTask', params:{id: task.id}}" :key="task" class="tools" >Редактировать</router-link>
                <h4 class="tools" @click="deleteTaskItem" :id="task.id">Удалить</h4>
                <div v-if="isShowForInProgress(task.status)">
                    <h4 class="tools" :id="task.id" @click="statusToInProgress">Взять в работу</h4>
                                    </div>
                                     <div v-if="isShowForTesting(task.status)">
                                        <h4 class="tools" :id="task.id" @click="statusToTesting">На тестирование</h4>
                                     </div>
                                     <div v-if="isShowForOpened(task.status)">
                                        <h4 class="tools" :id="task.id" @click="statusToOpened">Переоткрыть</h4>
                                     </div>
                                    <div v-if="isShowForComplete(task.status)" >
                                         <h4 class="tools" :id="task.id" @click="statusToComplete"  >Готово</h4>
                                    </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                testing: "testing",
                opened:"opened",
                complete:"complete",
                inProgress:"inProgress"
            }
            },
        name: 'DropDown',
        props: {
            task:{
                type: Object,
                required:true
            },
            id:{
                type:String,
                required: true
            },
            deleteTask:{
                type:Function,
                required: true
            },
            statusComplete:{
                type:Function,
                required: true
            },
            statusInProgress :{
                type:Function,
                    required: true
            },
            statusOpened :{
                type:Function,
                required: true
            },
            statusTesting :{
                type:Function,
                required: true
            }

        },
        methods:{
            deleteTaskItem(){
                this.deleteTask()
            },
            statusToTesting(){
                this.statusTesting();

            },
            statusToInProgress(){
                this.statusInProgress()
            },
            statusToOpened(){
              this.statusOpened()
            },
            statusToComplete(){
               this.statusComplete()
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
            }
        },

    }
</script>
<style lang="scss">
    .task__edit {
        width: 20px;
        height: 20px;;
        margin-right: 35px;
        margin-left: 60px;
        align-items: center;
        position: relative;

        &:hover .bar {
            background-color: white;
        }
        &:hover .task__tools{
            display: block;
        }

        &:hover {
            background: #7B61FF;
            mix-blend-mode: normal;
            border-radius: 5px;
        }

        .bar {
            width: 10px;
            height: 2px;
            background-color: #7B61FF;
            margin: 3px 0 2px 5px;
        }
    }
    .task__tools{
        padding: 2px 0px;
        display: none;
        position: absolute;
        width: 105px;
        right: 0px;
        top: 20px;
        background: #FFFFFF;
        box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
        border-radius: 5px;
        z-index: 1;

        .tools__wrapper {
            display: flex;
            flex-direction: column;
            padding-left: 4px;

            .tools {

                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 14px;

                padding: 0 5px;
                margin-bottom: 5px;
                text-decoration: none;
                cursor: pointer;

                &:hover {
                    color: #FF6161;
                }
            }
        }
    }
</style>