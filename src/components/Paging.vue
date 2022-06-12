<template>
    <div class="card__footer" >

        <footer>
        <slot name="footerTask"></slot>
        <slot name="footerUser"></slot>
        <slot name="usersTasks"></slot>
        </footer>
    </div>
</template>
<script>

    export default {
        name: 'PagingBlock',
        props: {

        },
        data (){
            return {
                pages:Array.from([]),

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
    footer{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .card__footer {
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
                    color:#333333;
                    border: 1px solid #333333;
                }

                .showing__list{
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 16px;
                    color: #B5B5B5;
                }
            }
        }


    }
</style>