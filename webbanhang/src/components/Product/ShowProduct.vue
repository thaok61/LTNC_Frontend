<template lang="html">

  <div id="app">
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="products"
      :sort-by="['productName', 'image']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
  </v-app>

</div>


</template>

<script lang="js">
import axios from 'axios'

  export default  {
    name: 'show-product',
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
          value: 'productId',
        },
        { text: 'Tên sản phẩm', value: 'productName' },
        { text: 'Ảnh', value: 'image' },
        { text: 'Mô Tả', value: 'description' },
        { text: 'Giá bán' , value: 'price'},
        { text: 'Định lượng' , value: 'quantity'},
      ],
      products: [],
      }
    },
    created() {
      axios.get('http://172.16.1.41/api/product').then(products=> {
        console.log(products.data);
        
        this.products = products.data.data;
      })
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-product {

  }
</style>
