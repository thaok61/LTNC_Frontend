<template>
<v-app>
    <v-list rounded>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group  color="primary">
        <v-list-item
          v-for="(product, index) in products"
          :key="index"
        >
			<v-list-item-avatar>
          <v-img
              :src="product.image"
              
              height="200px"
            ></v-img>
        </v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title v-text="product.productName"></v-list-item-title>
				<v-list-item-subtitle>Price: {{ product.price }}$</v-list-item-subtitle>
				<v-list-item-subtitle v-if="product.quantity !=0">Quantiy: {{ product.quantity }}</v-list-item-subtitle>
				<v-list-item-subtitle v-else>Quantiy: Het hang</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-content>
				<v-list-item-title>{{ product.quantityBuy * product.price }} $</v-list-item-title>
			</v-list-item-content>
			<v-list-item-action>
				<v-text-field type=number min=0 v-model="product.quantityBuy" @change="updateQuantity(product, index)" label="Quantity"></v-text-field>
				
			</v-list-item-action>
			<v-list-item-action>
				<v-btn @click="deleteProduct(index)">Delete</v-btn>
				
			</v-list-item-action>
			

        </v-list-item>
      </v-list-item-group>
    </v-list>
	<v-form>
    <v-btn color="info" class="mr-4" :disabled="!listProducts.length" @click="addToCart">Pay</v-btn>
    </v-form>
</v-app>
</template>

<script lang="js">
import axios from 'axios'
  export default  {
    name: 'cart-item',
    props: ['listProducts'],
    created () {
		// console.log(this.listProducts);
		
		this.products = this.listProducts
		
    },
    data () {
      return {
		products: [
    //   {productId: '1', productName: 'adsf', price: '123', quantity: '21312', quantityBuy: '123'},
    ]
      }
    },
    methods: {
		addToCart () {
			if (this.listProducts != [] || this.listProducts != null || localStorage.getItem('userName') != 'guest') {
				var postData = {
				listProducts: this.products
			};

			let axiosConfig = {
			headers: {
			'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			}
			};
			axios.post(this.$store.state.mainURL + '/createOrder/' + localStorage.getItem('userName'), postData, axiosConfig)
				.then((res) => {
			alert("RESPONSE RECEIVED: " + res.data.data);
			this.$router.go();
				}
			, (error) => {
			alert(error.response.data.msg);
		});
		}},
		deleteProduct (index) {
          if (index > -1) {
            this.listProducts.splice(index, 1);
		}
		this.$emit('clickedBadge', this.listProducts);
		},
		updateQuantity (value, index) {
			this.listProducts.splice(index, 1, value);
			this.$emit('clickedBadge', this.listProducts);
		}
	},
	computed: {
	}
}
</script>
