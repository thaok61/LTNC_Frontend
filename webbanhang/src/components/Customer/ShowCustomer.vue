<template lang="html">

  <div id="app">
  <v-app id="inspire">
    <v-data-table
      v-model="selected"
      :single-select="true"
      show-select
      item-key="userId"
      :headers="headers"
      :items="customers"
      :sort-by="['userName', 'phoneNumber']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    ></v-data-table>
    <!-- <div v-if="selected"> -->
      <v-form>
    <v-btn color="error" class="mr-4" :disabled="!selected.length" @click="deleteUser">Delete</v-btn>
    <v-btn color="info" class="mr-4" :disabled="!selected.length" @click="edit">Edit</v-btn>
    <v-btn color="success" class="mr-4" @click="add">Add</v-btn>
      </v-form>
  </v-app>

</div>

</template>

<script lang="js">
  import axios from 'axios'
  export default  {
    name: 'show-customer',
    props: [],
    components: {
    },
    mounted () {

    },
    data () {
      return {
        headers: [
            {
              text: 'STT',
              align: 'start',
              sortable: false,
              value: 'userId',
            },
            { text: 'Mã Nhân Viên', value: 'code' },
            { text: 'Tài khoản', value: 'userName' },
            { text: 'SĐT', value: 'phoneNumber' },
            { text: 'Mật Khẩu', value: 'password' },
        ],
        customers: [],
        selected: [],
        }
    },

    created() {
      console.log(this.$store.state.mainURL);
      axios.get(this.$store.state.mainURL + '/api/customer').then(customers=> {
        this.customers = customers.data.data;
      })
    },


    methods: {
      deleteUser() {
        axios.delete(this.$store.state.mainURL + '/api/customer/' + this.selected[0].userId, {})
        .then((response) => {
          console.log(response.data.msg);
          var index = this.customers.indexOf(this.selected[0]);
          if (index > -1) {
            this.customers.splice(index, 1);
          }
        }, (error) => {
          alert(error);
        });
        
      },
      edit() {
        this.$emit('clicked', 'ChangeCustomer', this.selected[0].userId)
        window.$cookies.set('editCustomer',this.selected[0],Infinity);
        // console.log(window.$cookies.get('editCustomer'));
        
      },
      add() {
        this.$emit('clicked', 'ChangeCustomer', "")
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-customer {

  }
</style>
