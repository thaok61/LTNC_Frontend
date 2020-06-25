<template lang="html">

  <div class="main">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Customer
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="current= 'ChangeCustomer'">Add</a>
          <a class="dropdown-item" @click="current= 'ShowCustomer'">Show</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="current= 'ChangeCategory'">Add</a>
          <a class="dropdown-item" @click="current= 'ShowCategory'">Show</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Product
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="current= 'ChangeProduct'">Add</a>
          <a class="dropdown-item" @click="current= 'ShowProduct'">Show</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
</nav>

<component :is="current" @clicked="onClickChild" :userId="userId"></component>


</div>

</template>

<script lang="js">
import ShowCustomer from '../Customer/ShowCustomer'
import ChangeCustomer from '../Customer/ChangeCustomer'
import ShowCategory from '../Category/ShowCategory'
import ChangeCategory from '../Category/ChangeCategory'
import ShowProduct from '../Product/ShowProduct'
import ChangeProduct from '../Product/ChangeProduct'
  export default  {
    name: 'admin-home-page',
    props: [],
    components: {
      ShowCustomer,
      ChangeCustomer,
      ShowCategory,
      ChangeCategory,
      ShowProduct,
      ChangeProduct,
    },
    mounted () {
      
    },
    data () {
      return {
        userName: localStorage.getItem('userName'),
        current: "ShowCustomer",
        userId: '',
      }
    },
    methods: {
      onClickChild (component, userId) {
      console.log(component) // someValue
      this.current = component
      this.userId = userId
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
  right: 0;
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
  margin-left: 100px; /* Same as the width of the sidebar */
  padding: 0px 10px;
  margin-top: 50px;
}
</style>
