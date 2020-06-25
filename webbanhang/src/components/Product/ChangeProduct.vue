<template lang="html">

  <v-app>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
      class="mt-5"
    >
      <v-text-field
        v-model="productName"
        :rules="productNameRules"
        label="Product Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="image"
        label="Image"
      ></v-text-field>

      <v-text-field
        v-model="price"
        :rules="priceRules"
        label="Price"
        type="number"
        required
      ></v-text-field>
      
      <v-text-field
        v-model="quantity"
        :rules="quantityRules"
        label="Quantity"
        type="number"
        required
      ></v-text-field>

      <v-text-field
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        required
      ></v-text-field>

      <select v-model="select" name="Category" class="form-control" tabindex="12">

    <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">{{ category.categoryName }}</option>

    </select> 


      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="changeProduct"
      >
        Add
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>

    </v-form>
</v-app>

</template>

<script lang="js">
import axios from 'axios'
  export default  {
    name: 'change-product',
    props: ['userId'],
    created () {
      var editProduct = this.editProductEntity;
      this.showListCategory();
      if (editProduct) {
        this.productName = editProduct.productName;
        this.image = editProduct.image;
        this.price = editProduct.price;
        this.description = editProduct.description;
        this.quantity = editProduct.quantity;
        this.select = editProduct.categoryId;
      }
    },
    data () {
      return {
      valid: true,
      select: null,
      categories: [
      ],

      productName: '',
      productNameRules: [
        v => !!v || 'Name is required',
      ],
      image: '',
      imageRules: [
        v => !!v || 'Image is required',
      ],
      price: '',
      priceRules: [
        v => !!v || 'Price is required',
      ],
      quantity: '',
      quantityRules: [
        v => !!v || 'Quantity is required',
      ],
      description: '',
      descriptionRules: [
      ],
      checkbox: false,
      lazy: false,
      editProductEntity:  window.$cookies.get('editProduct')
      }
    },
    methods: {
      changeProduct () {
        if (this.editProductEntity == '' || this.editProductEntity == null) {
          this.addProduct();
        } else {
          this.editProduct();
        }
      },
      addProduct () {
        
        axios.post(this.$store.state.mainURL + '/api/product', {
          productName: this.productName,
          productImage: this.productImage,
          description: this.description,
          image: this.image,
          price: this.price,
          quantity: this.quantity,
          categoryId: this.select
        }, {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
        })
        .then((response) => {
          console.log(response.data.msg);
          this.$emit('clicked', 'ShowProduct', "")
        }, (error) => {
          alert(error);
        });

        this.$refs.form.reset()
      },

      editProduct () {
        console.log(this.userId);
        
        axios.put(this.$store.state.mainURL + '/api/product/' + this.userId, {
          productName: this.productName,
          productImage: this.productImage,
          description: this.description,
          image: this.image,
          price: this.price,
          quantity: this.quantity,
          categoryId: this.select
        }, {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
        })
        .then((response) => {
          console.log(response.data.msg);
          this.$emit('clicked', 'ShowProduct', "")
        }, (error) => {
          
          
          alert(error);
        });

        this.$refs.form.reset()
        window.$cookies.set('editProduct','')
        
      },
      showListCategory () {
        axios.get(this.$store.state.mainURL + '/api/category').then(categories=> {
        this.categories = categories.data;
      })
      },
      reset () {
        this.$refs.form.reset()
      },
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .change-product {

  }
</style>
