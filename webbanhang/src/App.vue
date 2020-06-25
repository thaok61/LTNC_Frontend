<template> 
<div data-app>
  <div style="position:absolute; right:10px; top:10px; z-index: 1;">
      <div v-if="userName == 'guest'">      
        
            <button class="btn btn-outline-success my-2 my-sm-0" @click="current= 'login'">Login</button>
      </div>
      <div v-else>
            <button class="btn btn-outline-success my-2 my-sm-0" @click="logOut">Log Out, {{ userName }}</button>
      </div>
  </div>
  <div v-if="is_admin == 'true'">
    <adminhome/>
  </div>
  <div v-else-if="current == 'login' || current == 'ChangeCustomer'">
    <component :is="current" @clickedLogin="onClickLogin" @clickedComponent="onClickRegister"></component>
  </div>
  <div v-else>
    <home/>
  </div>
</div>
  
</template>

<script>
import home from '../src/components/Shop/HomePage'
import adminhome from '../src/components/Shop/AdminHomePage'
import login from '../src/components/Customer/Login'
import ChangeCustomer from '../src/components/Customer/ChangeCustomer'
import axios from 'axios'
export default {
  name: 'App',

  components: {
    home,
    adminhome,
    login,
    ChangeCustomer
  },
  created () {
    console.log(this.is_admin);
    
  },
  data: () => ({
    products: [],
    is_admin: localStorage.getItem('is_admin'),
    userName: localStorage.getItem('userName'),
    current:'',
  }),

  methods: {
    logOut() {
      axios.get(this.$store.state.mainURL + '/api/customer/logout').then(response=> {
        console.log(response.data.data);
        localStorage.setItem('userName','guest');
        localStorage.removeItem('jwt');
        localStorage.removeItem('is_admin');
        
        this.userName = localStorage.getItem('userName');
        console.log(this.userName);
        
        this.$router.go();
        })
      },
    onClickLogin (value) {
      console.log(value) // someValue
      this.is_admin = value
    },
    onClickRegister (value) {
      console.log(value)
      this.current = value
    }
  }
};
</script>
<style scoped>

</style>
