<template>
    <form>
        <div class="resetName">
            <div class="input__title" v-if="selectedItem.length===0">Исполнитель</div>
            <div class="input__title" v-else-if="selectedItem.length===this.$store.state.users.length">Выбрано: все</div>
            <div class="input__title" v-else>Выбрано: {{selectedItem.length}}</div>
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
            // Select() {
            //     this.selectedQuantityStatus()
            // },
        }
    }
</script>
<style lang="scss">

</style>