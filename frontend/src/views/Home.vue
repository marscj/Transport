<template>
<body class="font-custom min-h-screen">
  <header class="py-4 px-6 absolute top-0 left-0 right-0 z-10">
    <div class="container mx-auto">
      <div class="flex items-end">
        <nav class="hidden lg:flex items-center text-secondary ml-auto">
          <a href="#" class="px-6 py-3 font-bold uppercase border-b-2 border-primary">Home</a>
          <a href="#about-us" class="px-6 py-3 font-bold uppercase hover:text-secondary">About us</a>
          <a href="#contact-us" class="px-6 py-3 font-bold uppercase hover:text-primary">Contact us</a>
          <a href="#price" class="px-6 py-3 font-bold uppercase hover:text-primary">Price</a>
          
          <a v-if="user" class="px-6 py-3 uppercase text-white">
            {{user.displayName}}
          </a> 
          <a
            v-else
            href="/login"
            class="px-6 py-3 font-bold uppercase bg-primary hover:text-white rounded"
            style="color:white;"
          >LOGIN</a>
        </nav>
      </div>
    </div>
  </header>
  <div class="relative pb-6" style="height:700px;">
    <img src="@/assets/images/pages/home/bus-1.jpeg" class="top-0 w-full h-full object-cover" />
    <div class="container mx-auto relative">
      <div class="flex">
        <div class="mr-auto">
          <a
            href="/login"
            class="bg-primary px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl text-white font-bold uppercase rounded hover:bg-primary-400"
            style="color:white;"
          >Rent Now</a>
        </div>
      </div>
    </div>
  </div>
  <div id="about-us" class="bg-blue-100 mt-32 py-12">
    <div class="container mx-auto px-6">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2 md:pr-8 lg:pr-16">
          <img
            src="@/assets/images/pages/home/about-us.svg"
            class="-mt-24 md:mt-0 lg:-mt-24 mb-16 md:mb-0"
          />
        </div>
        <div class="md:w-1/2">
          <h3 class="flex flex-col text-4xl text-secondary font-bold mb-6">
            About us
            <span class="bg-primary h-1 w-40 block mt-4"></span>
          </h3>
          <p
            class="text-lg text-secondary-700 mb-4"
          >ubang services is a part of Bastaki group of companies,we are reliable and professional transportation provider. we are offering great expertise in all your transportation needs, Ubang service passionate and willing to serve our respected clients with smile face. Ubang is platform where you can spend unforgettable time with comfort and you can explore your destination with style.we are happy to serve our customers 7 days a week.</p>
        </div>
      </div>
    </div>
  </div>
  <div id="contact-us" class="relative">
    <div class="container mx-auto px-6 py-32 relative">
      <h3 class="flex flex-col items-center text-4xl text-secondary font-bold">
        Contact us
        <span class="bg-primary h-1 w-56 block mt-4"></span>
      </h3>

      <div class="flex flex-col-reverse md:flex-row items-center mb-24 md:mb-16 xl:mb-8">
        <div class="flex-1">
          <pre class="text-gray-700">telephone:</pre>
          <h4 class="text-2xl md:text-3xl font-bold text-secondary-800 mb-4 pt-1">04 320 3048</h4>
          <pre class="text-gray-700 pt-4">mobile:</pre>
          <h4 class="text-2xl md:text-3xl font-bold text-secondary-800 mb-4 pt-1">0551237084</h4>
        </div>
        <img src="@/assets/images/pages/home/service2.svg" class="pt-10" />
      </div>
    </div>
  </div>

  <div id="price" class="container mx-auto">
    <h3 class="flex flex-col items-center text-4xl text-secondary font-bold">
      Price
      <span class="bg-primary h-1 w-56 block mt-4"></span>
    </h3>
    <price-table class="mt-10" :showSidebar="false" :showThead="false" :showID="false" />
  </div>

  <footer class="bg-blue-100">
    <div
      class="container mx-auto px-6 py-12 text-secondary-500 text-center border-t border-gray-300"
    >
      <p>Copyright ©2019 UBangService. All rights reserved.</p>
    </div>
  </footer>
</body>
</template>

<script>
import PriceTable from "@/views/price/Table.vue";
export default {
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {
    PriceTable
  }
};
</script>