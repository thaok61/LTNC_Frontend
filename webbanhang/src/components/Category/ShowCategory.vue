<template lang="html">

  <div id="app">
  <v-app id="inspire">
    
    <v-data-table
      v-model="selected"
      :single-select="true"
      show-select
      item-key="categoryId"
      :headers="headers"
      :items="categories"
      :sort-by="['categoryName', 'categoryImage']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
    <v-form>
    <v-btn color="error" class="mr-4" :disabled="!selected.length" @click="deleteCategory">Delete</v-btn>
    <v-btn color="info" class="mr-4" :disabled="!selected.length" @click="edit">Edit</v-btn>
    <v-btn color="success" class="mr-4" @click="add">Add</v-btn>
      </v-form>
  </v-app>

</div>

</template>

<script lang="js">
  import axios from 'axios'
  export default  {
    name: 'show-category',
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
          value: 'categoryId',
        },
        { text: 'Tên Loại Sản Phẩm', value: 'categoryName' },
        { text: 'Ảnh', value: 'categoryImage' },
        { text: 'Mô Tả', value: 'description' },
      ],
      categories: [],
      selected: [],
      }
    },
    created() {
      console.log(this.$store.state.mainURL);
      axios.get(this.$store.state.mainURL + '/api/category').then(categories=> {
        this.categories = categories.data;
      })
    },
    methods: {
      deleteCategory() {
        axios.delete(this.$store.state.mainURL + '/api/category/' + this.selected[0].categoryId, {},
        {
          headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
        })
        .then((response) => {
          console.log(response.data.msg);
          var index = this.categories.indexOf(this.selected[0]);
          if (index > -1) {
            this.categories.splice(index, 1);
          }
          // this.$router.go();
        }, (error) => {
          alert(error);
          console.log(localStorage.getItem('jwt'));
        });
        
      },
      edit() {
        this.$emit('clicked', 'ChangeCategory', this.selected[0].categoryId)
        window.$cookies.set('editCategory',this.selected[0],Infinity);
        
      },
      add() {
        this.$emit('clicked', 'ChangeCategory', "")
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-category {

  }
</style>
