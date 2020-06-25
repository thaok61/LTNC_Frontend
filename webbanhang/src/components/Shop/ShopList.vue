<template>
  <v-container class="grey lighten-5">
    <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.productId"
          :cols="3"
        >
          <v-card>
            <div v-if="card.image == null">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
              
              height="200px"
            >
            </v-img>
            </div>
            <div v-else>
            <v-img
              :src="card.image"
              
              height="200px"
            >
            </v-img>
            </div>
            <v-card-title>{{ card.productName }}</v-card-title>
            
            <v-card-subtitle class="pb-0">{{ card.price }} USD</v-card-subtitle>
            
            <v-card-subtitle class="pb-0">Quantity: {{ card.quantity }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ card.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon @click="addToCart(card)">mdi-plus</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script lang="js">
import axios from 'axios'
  export default  {
    name: 'shop-list',
    props: [],
    mounted () {
      console.log('categoryId' + this.categoryId);
      
      if (this.categoryId == '') {
      axios.get(this.$store.state.mainURL + '/api/product').then(products=> {
        this.cards = products.data.data;
      })} else {
        axios.post(this.$store.state.mainURL + '/api/product/getByCategory', {
          categoryId: this.categoryId
        }).then(products=> {
        this.cards = products.data.data;
      })
      }
    },
    data () {
      return {
        cards: [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        ],
        listProducts: [],
        categoryId: localStorage.getItem('categoryId')
      }
    },
    methods: {
      addToCart(product) {
        var index = this.listProducts.findIndex(x => x.productId === product.productId)
        if (index != -1)
        {
          this.listProducts[index].quantityBuy += 1
        } else {
          product.quantityBuy = 1;
          this.listProducts.push(product);
        }
        this.$emit('clickedBadge', this.listProducts)
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .shop-list {

  }
</style>
