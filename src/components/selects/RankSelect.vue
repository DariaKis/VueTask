<template>
    <form>
        <div class="reset">
            <div class="input__title" v-if="selectedItem.length===0">Приоритет</div>
            <div class="input__title" v-else-if="selectedItem.length===3">Выбрано: все</div>
            <div class="input__title" v-else>Выбрано: {{selectedItem.length}}</div>
            <div class="arrow"></div>
        </div>
        <div class="__select">
            <div class="__select__content">
                <div class="__select__wrapper">
                    <input id="low" class="rank__select__input" type="checkbox"
                           value="low" v-model="selectedItem" />
                    <label for="low" class="__select__label">Низкий</label>
                </div>
                <div class="__select__wrapper">
                    <input id="medium" class="rank__select__input" type="checkbox"
                           value="medium" v-model="selectedItem"/>
                    <label for="medium" class="__select__label">Средний</label>
                </div>
                <div class="__select__wrapper">
                    <input id="high" class="rank__select__input" type="checkbox"
                           value="high" v-model="selectedItem" />
                    <label for="high" class="__select__label" >Высокий</label>
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
        name: 'RankSelect',
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

        }
    }
</script>
<style lang="scss">

</style>