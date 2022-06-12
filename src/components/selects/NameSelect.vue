<template>
    <form>
        <div class="resetName">
            <div class="input__title">{{titleOfSelect}}</div>
            <div class="arrow"></div>
        </div>
        <div class="__select">
            <div class="__select__content" >
                <div class="__select__wrapper" v-for="user in this.$store.state.users" :key="user.id" :user="user">
                    <div class="__select__item" >
                        <input
                                :id=user.id
                                class="user__select__input"
                                type="checkbox"
                                :value=user.id
                                v-model="selectedItem"

                        />
                        <label
                                class="__select__label"
                                :for=user.id
                        >
                            {{user.username}}
                        </label>
                    </div>
                </div>

            </div>
        </div>
    </form>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data(){
            return{
                selectedItem:[]
            }
        },
        name: 'NameSelect',
        props: {
            tasks: {
                type: Object,
                required: true
            },
            users: {
                type: Object,
                required: true
            },
            selectedQuantityStatus :{
                type:Function,
                required: true
            },
        },
        methods: {
            ...mapActions([
                'GET_USERS'
            ]),
            // Select() {
            //     this.selectedQuantityStatus()
            // },
        },
        computed:{
            ...mapGetters(['USERS']),
            titleOfSelect(){
                if(this.selectedItem.length===0){
                    return "Исполнитель"
                }else if(this.selectedItem.length===this.USERS.length){
                    return "Выбрано: все"
                }else{
                    return "Выбрано: " + this.selectedItem.length
                }
            }
        },

        mounted(){
            this.GET_USERS()
        }
    }
</script>
<style lang="scss">

</style>