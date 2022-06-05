<template>
    <form >
        <div class="resetType">
            <div class="input__title" v-if="selectedItem.length===0">Тип</div>
            <div class="input__title" v-else-if="selectedItem.length===2">Выбрано: все</div>
            <div class="input__title" v-else>Выбрано: {{selectedItem.length}}</div>
            <div class="arrow"></div>
        </div>
        <div class="__select"  >
            <div class="__select__content" >
                <div class="__select__wrapper" @click="types" >
                    <input id="task" class="type__select__input" type="checkbox"
                           value="task" v-model="selectedItem"/>
                    <label  for="task" class ="__select__label" >Задача</label>
                </div>
                <div class="__select__wrapper" @click="types">
                    <input id="bug" class="type__select__input" type="checkbox"
                           value="bug" v-model="selectedItem" />
                    <label for="bug" class ="__select__label" >Ошибка</label>
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
        name: 'TypeSelect',
        props: {
            tasks: {
                type: Object,
                required: true
            },
            selectedQuantityStatus :{
                type:Function,
                required: true
            },

        },
        methods: {
            types () {
                this.$emit('types',
                    this.selectedItem,
                )}

        },
        computed:{
        },
        create(){

        }

    }
</script>
<style lang="scss">

</style>