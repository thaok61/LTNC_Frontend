<template lang="html">
<v-app>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
      class="mt-5"
    >
      <v-text-field
        v-model="code"
        :counter="10"
        :rules="codeRules"
        label="CODE"
        required
      ></v-text-field>

      <v-text-field
        v-model="userName"
        :counter="10"
        :rules="userNameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :counter="10"
        :rules="passwordRules"
        label="password"
        type="password"
        required
      ></v-text-field>

      <v-text-field
        v-model="retypePassword"
        :counter="10"
        :rules="passwordRules"
        label="Retype password"
        type="password"
        required
      ></v-text-field>

      <div v-if="retypePassword == password" style="color:green">Correct password</div>
      
      <div v-else style="color:red">Password and Retype password not same</div>
      
      <v-text-field
        v-model="phoneNumber"
        :rules="phoneRules"
        label="Phone"
        type="number"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Role"
        required
      ></v-select>

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
        @click="changeCustomer"
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
  export default {
    name: 'ChangeCustomer',
    props: ['userId'],
    data: () => ({
      valid: true,
      code: '',
      codeRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      userName: '',
      userNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      password: '',
      retypePassword: '',
      passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      phoneNumber: '',
      phoneRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      address: '',
      addressRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      select: null,
      items: [
        'ROLE_USER',
      ],
      checkbox: false,
      lazy: false,
      editCustomerEntity:  window.$cookies.get('editCustomer')
    }),
    mounted () {
      var editCustomer = this.editCustomerEntity;
      // console.log(window.$cookies.get('editCustomer'));
      console.log(this.editCustomerEntity);
      
      if (editCustomer) {
        
        this.code = editCustomer.code;
        this.userName = editCustomer.userName;
        this.phoneNumber = editCustomer.phoneNumber;
        this.address = editCustomer.address;
        
      }
      
    },
    methods: {
      changeCustomer () {
        if (this.editCustomerEntity == '' || this.editCustomerEntity == null) {
          this.addCustomer();
        } else {
          this.editCustomer();
        }
      },
      addCustomer () {
        
        axios.post(this.$store.state.mainURL + '/api/customer', {
          code: this.code,
          userName: this.userName,
          password: this.password,
          phoneNumber: this.phoneNumber,
          address: this.address,
          roleName: [this.select]
        })
        .then((response) => {
          console.log(response.data.msg);
          this.$emit('clicked', 'ShowCustomer', "")
          this.$emit('clickedRegister', 'login')
        }, (error) => {
          alert(error);
        });

        this.$refs.form.reset()
      },

      editCustomer () {
        // axios.post(this.$store.state.mainURL + '/api/customer', {
        //   code: this.code,
        //   userName: this.userName,
        //   password: this.password,
        //   phoneNumber: this.phoneNumber,
        //   address: this.address,
        //   roleName: [this.select]
        // })
        // .then((response) => {
        //   console.log(response.data.msg);
        //   this.$router.push({ path: '/customer/login'})
        //   this.$router.go();
        // }, (error) => {
        //   alert(error);
        // });

        // this.$refs.form.reset()
        alert("Edit OK")
        console.log(this.userId)
        window.$cookies.set('editCustomer','')
        this.$emit('clicked', 'ShowCustomer', "")
      },
      reset () {
        this.$refs.form.reset()
      },
    },
}


</script>

<style scoped lang="scss">
  .change-customer {

  }
</style>
