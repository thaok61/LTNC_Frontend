<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login Form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="userName"
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="login">Login</v-btn>
              </v-card-actions>
              <v-card-subtitle>
                No Account?
                <a color:blue @click="register">Register</a>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="js">
  import axios from 'axios'
  export default  {
    name: 'login',
    props: [],
    mounted () {

    },
    data () {
      return {
        userName: '',
        password: '',
        is_admin: '',
      }
    },
    methods: {
      login() {
        if (this.password.length > 0 && this.userName.length > 0)
        axios.post(this.$store.state.mainURL + '/api/customer/login', {
          userName: this.userName,
          password: this.password,
        })
        .then((response) => {
          
          localStorage.setItem('userName',response.data.data.userName);
          localStorage.setItem('jwt',response.data.data.token);
          if(response.data.data.roleName[0].includes("ADMIN")) {
            this.is_admin = true;
            console.log('Admin');
            this.$router.go();
            
            this.$emit('clickedLogin', 'true', "")
          } else {
            this.is_admin = false;
            console.log('User');
            this.$router.go();
            
            this.$emit('clickedLogin', 'false', "")
          }
          localStorage.setItem('is_admin',this.is_admin);
        }, (error) => {
          alert(error);
        });
      },
      register () {
        this.$emit('clickedComponent', 'ChangeCustomer')
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
.login {
}
</style>
