<template>
    <form >
        <div class="resetType">
            <div class="input__title">{{titleOfSelect}}</div>
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
            titleOfSelect(){
                if(this.selectedItem.length===0){
                    return "Тип"
                }else if(this.selectedItem.length===2){
                    return "Выбрано: все"
                }else{
                    return "Выбрано: " + this.selectedItem.length
                }
            },

        },
        create(){

        }

    }
</script>
<style lang="scss">

</style>