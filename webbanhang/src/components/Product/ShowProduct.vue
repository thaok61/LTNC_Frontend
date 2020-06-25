<template lang="html">

  <div id="app">
  <v-app id="inspire">
    <v-data-table
      v-model="selected"
      :single-select="true"
      show-select
      item-key="productId"
      :headers="headers"
      :items="products"
      :sort-by="['productName', 'image']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
    <v-form>
    <v-btn color="error" class="mr-4" :disabled="!selected.length" @click="deleteProduct">Delete</v-btn>
    <v-btn color="info" class="mr-4" :disabled="!selected.length" @click="edit">Edit</v-btn>
    <v-btn color="success" class="mr-4" @click="add">Add</v-btn>
      </v-form>
  </v-app>

</div>


</template>

<script lang="js">
import axios from 'axios'

  export default  {
    name: 'show-product',
    props: [''],
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
      selected: [],
      }
    },
    created() {
      axios.get(this.$store.state.mainURL + '/api/product').then(products=> {
        console.log(products.data);
        
        this.products = products.data.data;
      })
    },
    methods: {
      deleteProduct() {
        axios.delete(this.$store.state.mainURL + '/api/product/' + this.selected[0].productId, {} ,
        {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
        })
        .then((response) => {
          console.log(response.data.msg);
          var index = this.products.indexOf(this.selected[0]);
          if (index > -1) {
            this.productso.splice(index, 1);
          }
          // this.$router.go();
        }, (error) => {
          alert(error);
          console.log(localStorage.getItem('jwt'));
        });
        
      },
      edit() {
        this.$emit('clicked', 'ChangeProduct', this.selected[0].productId)
        window.$cookies.set('editProduct',this.selected[0],Infinity);
        // console.log(window.$cookies.get('editProduct'));
        
      },
      add() {
        this.$emit('clicked', 'ChangeProduct', "")
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-product {

  }
</style>
