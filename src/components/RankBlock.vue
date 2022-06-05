<template>
    <div>
        <div class="wrapper"  v-if="task.rank==='high'">
            <div class="task__highRank"><img class="arrowIcon" src="@/assets/img/High.png"/>Высокий</div>
        </div>
        <div class="wrapper"  v-else-if="task.rank==='medium'">
            <div class="task__mediumRank"><img class="arrowIcon" src="@/assets/img/Medium.png"/>Средний</div>
        </div>
        <div class="wrapper"  v-else>
            <div class="task__lowRank"><img class="arrowIcon" src="@/assets/img/Low.png"/>Низкий</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'RankBlock',
        props: {
            task:{
                type: Object,
                required:true
            },

        },
    }
</script>
<style lang="scss">
    .wrapper {
        align-items: center;
        margin-right: 35px;
        width: 95px;
        .arrowIcon{
            width: 16px;
            height: 7px;
            margin-right: 8px;
            margin-top: 4px;
        }
    }
    .task__lowRank{
        width:80px;
        display: flex;
        height: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #3CA961;
        margin-left: 10px;
    }
    .task__mediumRank{
        display: flex;
        height: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #E9B500;
        margin-left: 10px;
    }
    .task__highRank{
        display: flex;
        height: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #D14343;
        margin-left: 10px;
    }
</style>