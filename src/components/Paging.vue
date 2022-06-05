<template>
    <div class="card__footer" >
        <div class="tabs">
            <button  class="tabs__btn">Назад</button>

            <button class="tab" v-for="page in pages" :key="page" :page="page" >
                <div :class="{showing__list: currentPage===page}" @click="handlePageChange(page)" > {{page + 1}} </div>
            </button>

            <button class="tabs__btn" >Вперед</button>
        </div>
        <div class="showing__list" >
            Показано {{page + 1}}-{{this.pageCount}} из {{this.pageCount}}
        </div>
    </div>
</template>
<script>

    export default {
        name: 'PagingBlock',
        props: {
            user:{
                type: Object,
                required:true
            },
            task:{
                type: Object,
                required:true
            },
            total:{
                type:Number,
                required:true
            }

        },
        data (){
            return {
                pages:Array.from([]),
                page:0,
                currentPage:0,
                limit:10
            }
        },
        computed:{
            pageCount(){
                return (
                 Math.ceil(this.$store.state.total/this.$store.state.limit)
                )
            },

        },
        methods:{
            countOfTabs(){
                for(let i=0; i<this.pageCount;i++) {
                    this.pages.push(i);
                }
                   return this.pages
            },

            handlePageChange(page) {
                this.handlePageChange(page)
            },

        },
        mounted(){
            this.countOfTabs()
        },
        created(){

        },

    };

</script>

<style lang="scss">
    .card__footer{
        width:100%;
        justify-content: space-between;
        display: flex;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        .tabs {
            display: flex;
            align-items: center;
            justify-content: center;
            &__btn {
                width: 67px;
                height: 24px;
                background: #B5B5B5;
                border: 1px solid #B5B5B5;
                box-sizing: border-box;
                border-radius: 5px;
                color: #CCCCCC;
                &:hover {
                    background: #F4F4F4;
                    color:black;
                    border: 1px solid #333333;
                }
            }

            .tab {
                width: 24px;
                height: 24px;
                background-color: #7B61FF;
                color: #F4F4F4;
                border: 1px solid #7B61FF;
                box-sizing: border-box;
                border-radius: 5px;
                text-align: center;
                margin: 0 5px;
                align-items: center;
                &.active {
                    background: #F4F4F4;
                    color:black;
                    border: 1px solid #333333;
                }
            }
        }
        .showing__list{
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            color: #B5B5B5;
        }

    }
</style>