<template lang="html">

  <div id="app">
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="categories"
      :sort-by="['categoryName', 'categoryImage']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
  </v-app>

</div>

</template>

<script lang="js">
  import axios from 'axios'
  import {mainurl} from './src/constant.js'
  export default  {
    name: 'show-category',
    props: [],
    mounted () {

    },
    data () {
      return {
        headers: [
        {
          text: 'STT',
          align: 'start',
          sortable: false,
          value: 'categoryId',
        },
        { text: 'Tên Loại Sản Phẩm', value: 'categoryName' },
        { text: 'Ảnh', value: 'categoryImage' },
        { text: 'Mô Tả', value: 'description' },
      ],
      categories: [],
      }
    },
    created() {
      axios.get(this.mainurl + '/api/category').then(categories=> {
        console.log(categories.data);
        
        this.categories = categories.data;
      })
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-category {

  }
</style>
