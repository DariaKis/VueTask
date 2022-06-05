<template>
    <div>
        <div class="task__check" v-if="task.type==='task'">
            <img src="@/assets/img/Task.png"/>
        </div>
        <div class="task__check" v-else>
            <img src="@/assets/img/Bug.png"/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TypeBlock',
        props: {
            task:{
                type: Object,
                required:true
            },

        },
    }
</script>
<style lang="scss">
    .task__check{
        width: 24px;
        height: 24px;
        background: #00D1FF;
        border-radius: 5px;
        margin-right: 58px;
        position: relative;

        .circle{
            position: absolute;
            width: 12px;
            height: 12px;
            left: 6px;
            top: 6px;
            background: #FFFFFF;
            border-radius: 50px;
        }
    }
</style>