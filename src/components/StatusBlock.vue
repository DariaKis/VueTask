<template>
    <div class="statusTask">
        <div v-if="task.status==='opened'">
            <button class="openedBtn">Открыта</button>
        </div>
        <div v-else-if="task.status==='testing'">
            <button class="testingOrInProgressBtn">Тестирование</button>
        </div>
        <div v-else-if="task.status==='complete'">
            <button class="completeBtn">Выполнено</button>
        </div>
        <div v-else>
            <button class="testingOrInProgressBtn">В работе</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'StatusBlock',
        props: {
            task:{
                type: Object,
                required:true
            },

        },
    }
</script>
<style lang="scss">
    .statusTask{
        width: 113px;
        margin-right: 21px;
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
            color: #333333;
        }
    }
</style>