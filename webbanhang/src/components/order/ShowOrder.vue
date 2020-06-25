<template lang="html">

  <section class="show-order">
    <div v-for="product in listProducts">
    <h1>product.productName</h1>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'show-order',
    props: ['listProducts'],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .show-order {

  }
</style>
