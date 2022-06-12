<template>
    <form >
        <div class="reset">
            <div class="input__title" v-if="selectedItem.length===0">Статус</div>
            <div class="input__title" v-else-if="selectedItem.length===4">Выбрано: все</div>
            <div class="input__title" v-else>Выбрано: {{selectedItem.length}}</div>

            <div class="arrow"></div>
        </div>
        <div class="__select">
            <div class="__select__content" >
                <div class="__select__wrapper">
                    <input id="opened" class="status__select__input" type="checkbox"
                           value="opened" v-model="selectedItem"/>
                    <label  for="opened" class="__select__label">Открыто</label>
                </div>
                <div class="__select__wrapper">
                    <input id="inProgress" class="status__select__input" type="checkbox"
                           value="inProgress" v-model="selectedItem"/>
                    <label  for="inProgress" class="__select__label">В работе</label>
                </div>
                <div class="__select__wrapper">
                    <input id="testing" class="status__select__input" type="checkbox"
                           value="testing" v-model="selectedItem"/>
                    <label  for="testing" class="__select__label">Тестирование</label>
                </div>
                <div class="__select__wrapper">
                    <input id="complete" class="status__select__input" type="checkbox"
                            value="complete" v-model="selectedItem"/>
                    <label for="complete" class="__select__label">Выполнено</label>
                </div>
            </div>

        </div>
    </form>
</template>
<script>
    export default {
        name: 'StatusSelect',
        data(){
            return {
                selectedStatus:0,
                selectedItem:[]

            }
        },
        props: {
            tasks: {
                type: Object,
                required: true
            },
            selectedQuantityStatus: {
                type: Function,
                required: true
            },
        },
        methods: {

        },
        created(){
            // console.log(this.selectedItem)
        }
    }

</script>
<style lang="scss">

</style>