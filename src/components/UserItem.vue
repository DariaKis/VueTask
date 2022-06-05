<template>
    <div  class="userList__item"  :key={id} >
        <router-link :to="{name:'userCard', params:{id: user.id}}" :user="user" :task="task">
            {{user.username}}
        </router-link>
    </div>
</template>


<script>
    export default {
        name: 'UserItem',
        props: {
            user:{
                type: Object,
                required:true
            },
            task: {
                type: Object,
                required:true
            }
        },
    }
</script>

<style lang="scss">
    .container{
        width: 1280px;
        height: 750px;
        .board{
            padding: 30px 80px;

            h1{
                line-height: 28.13px;
                font-size: 24px;
                font-weight: 300;
                width: 159px;
                height: 28px;
                margin-bottom: 20px;
            }

            .users__wrapper{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 20px;
                width: 1280px;
                background: #FFFFFF;
                box-shadow: 0px 0px 5px 3px #B5B5B5;
                border-radius: 5px;

                .userList{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 1240px;
                    background: #FFFFFF;
                    box-shadow:  0px 0px 2px 1px #B5B5B5;
                    border-radius: 5px;
                    flex: none;
                    margin-bottom:20px;
                    :nth-child(even) {
                        background-color:#F2F2F2;
                    }

                    &__item{
                        width: 100%;
                        padding: 20px 30px;
                        position: static;
                        height: 68px;
                        text-decoration: none;
                        text-align: left;
                        &:hover {
                            border: 2px solid #4BD379;
                        }
                        a {
                            text-decoration: none;
                        }
                    }

                    .card__footer {
                        width:100%;
                        justify-content: space-between;
                        display: flex;
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
                            }
                            .tab{
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
                }
            }
        }
    }
</style>