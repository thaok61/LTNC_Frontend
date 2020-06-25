<template lang="html">

  <v-app>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
      class="mt-5"
    >
      <v-text-field
        v-model="categoryName"
        :rules="categoryNameRules"
        label="Category Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="categoryImage"
        :rules="cateogryImageRules"
        label="Image"
        required
      ></v-text-field>

      <v-text-field
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        required
      ></v-text-field>

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
        @click="changeCategory"
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
    name: 'change-category',
    props: ['userId'],
    mounted () {
      var editCategory = this.editCategoryEntity;
      
      if (editCategory) {
        this.categoryName = editCategory.categoryName;
        this.categoryImage = editCategory.categoryImage;
        this.description = editCategory.description;
        
      }
    },
    data () {
      return {
      valid: true,
      categoryName: '',
      categoryNameRules: [
        v => !!v || 'Name is required',
      ],
      categoryImage: '',
      cateogryImageRules: [
        v => !!v || 'Image is required',
      ],
      description: '',
      descriptionRules: [
      ],
      checkbox: false,
      lazy: false,
      editCategoryEntity:  window.$cookies.get('editCategory')
      }
    },
    methods: {
      changeCategory () {
        if (this.editCategoryEntity == '' || this.editCategoryEntity == null) {
          this.addCategory();
        } else {
          this.editCategory();
        }
      },
      addCategory () {
        
        axios.post(this.$store.state.mainURL + '/api/category', {
          categoryName: this.categoryName,
          categoryImage: this.categoryImage,
          description: this.description
        })
        .then((response) => {
          console.log(response.data.msg);
          this.$emit('clicked', 'ShowCategory', "")
        }, (error) => {
          alert(error);
        });

        this.$refs.form.reset()
      },

      editCategory () {
        console.log(this.userId);
        
        axios.put(this.$store.state.mainURL + '/api/category/' + this.userId, {
          categoryName: this.categoryName,
          categoryImage: this.categoryImage,
          description: this.description
        }, {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
        })
        .then((response) => {
          console.log(response.data.msg);
          this.$emit('clicked', 'ShowCategory', "")
        }, (error) => {
          console.log(localStorage.getItem('jwt'));
          
          alert(error);
        });

        this.$refs.form.reset()
        window.$cookies.set('editCategory','')
        
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
  .change-category {

  }
</style>
