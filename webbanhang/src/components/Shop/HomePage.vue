<template lang="html">
  <v-app>
  <div class="sidenav">
  <div v-for="category in categories" :key="category.categoryId">
  <a @click="findByCategory('ShopList', category.categoryId)">{{category.categoryName}}</a>
  </div>
  </div>
  <div class="main">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Nhom 3</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" @click="resetFilterCategory">Shop</a>
      </li>
    </ul>
  </div>
</nav>
<div v-if="currentComponentUser == 'CartItem'">
<component :is="currentComponentUser" @clickedBadge="onClickListProducts" :listProducts = "listProducts"></component>
</div>
<div v-else>
<component :is="currentComponentUser" @clickedBadge="onClickListProducts" ></component>
</div>
<div class="badge">
  <v-badge
        color="red"
        :content="listProducts.length"
        :value="listProducts.length"
      >
        <v-icon large @click="goToCartItem">mdi-shopping</v-icon>
      </v-badge>
</div>
</div>
  </v-app>
</template>

<script lang="js">
import axios from 'axios'
import CartItem from '../Cart/CartItem'
import ShopList from '../Shop/ShopList'
  export default  {
    name: 'home-page',
    props: [],
    components: {
      ShopList,
      CartItem
    },
    mounted () {
      axios.get(this.$store.state.mainURL + '/api/product').then(products=> {
        console.log(products.data);
        
        this.products = products.data.data;
      });
      this.userName = localStorage.getItem('userName');
      axios.get(this.$store.state.mainURL + '/api/category').then(categories=> {
        this.categories = categories.data;
      });
    },
    data () {
      return {
        products: [],
        listProducts: [],
        currentComponentUser: "ShopList",
        userName: '',
        categories:[],
        categoryId: localStorage.getItem('userName')
      }
    },
    methods: {
      logOut() {
      axios.get(this.$store.state.mainURL + '/api/customer/logout').then(response=> {
        console.log(response.data.data);
        localStorage.setItem('userName','guest');
        localStorage.removeItem('jwt');
        localStorage.removeItem('is_admin');
        this.userName = localStorage.getItem('userName');
        })
      },
      resetFilterCategory () {
        this.currentComponentUser = 'ShopList'; 
        localStorage.setItem('categoryId','')
        this.$router.go();
      },
      onClickListProducts (value) {
        this.listProducts = value;
      },
      findByCategory (component, categoryId) {
        this.currentComponentUser = component
        localStorage.setItem('categoryId',categoryId)
        this.$router.go();
      },
      goToCartItem () {
        this.currentComponentUser= 'CartItem';
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .home-page {

  }
  .sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}

/* The navigation menu links */
.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}
.main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
  margin-top: 50px;
}

.badge {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
