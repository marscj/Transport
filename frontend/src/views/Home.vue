<template>
  <body class="font-custom min-h-screen">
    <header class="py-4 px-6 absolute top-0 left-0 right-0 z-10">
      <div class="container mx-auto">
        <div class="flex items-center">
          <div class="flex-1">
            <img src="@/assets/images/logo/logo.png" class="h-20" />
          </div>
          <nav class="hidden lg:flex items-center">
            <a
              href="#"
              class="px-6 py-3 font-bold uppercase text-primary border-b-2 border-primary"
            >Home</a>
            <a
              href="#about-us"
              class="px-6 py-3 font-bold uppercase text-secondary hover:text-primary"
            >About us</a>
            <a
              href="#services"
              class="px-6 py-3 font-bold uppercase text-secondary hover:text-primary"
            >Services</a>
            <a
              href="#price"
              class="px-6 py-3 font-bold uppercase text-secondary hover:text-primary"
            >Price</a>
            <a
              href="/login"
              class="px-6 py-3 font-bold uppercase bg-transparent hover:bg-teal-400 text-secondary rounded"
            >Login</a>
          </nav>
        </div>
      </div>
    </header>
    <div class="relative overflow-hidden px-6 pb-6">
      <img src="@/assets/images/pages/home/wave.svg" class="absolute top-0 left-2/5" />
      <div class="container mx-auto relative">
        <div class="flex flex-col md:flex-row items-center pt-32 pb-16 md:pb-0">
          <div class="md:w-1/2 lg:w-1/3 mb-4 sm:mb-16 md:mb-0">
            <h2 class="text-xl font-bold text-secondary-600 uppercase mb-2">rent a bus</h2>
            <h1
              class="text-4xl md:text-5xl font-bold text-secondary leading-tight mb-6 md:mb-10"
            >UBang Service</h1>
            <a
              href="#"
              class="bg-primary px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl text-secondary font-bold uppercase rounded hover:bg-primary-400"
            >Rent Now</a>
          </div>
          <div class="mt-16 sm:mt-0 flex-1 flex justify-end">
            <img src="@/assets/images/pages/home/hero.svg" />
          </div>
        </div>
      </div>
    </div>
    <div id="about-us" class="bg-blue-100 mt-32 py-12">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 md:pr-8 lg:pr-16">
            <img src="@/assets/images/pages/home/about-us.svg" class="-mt-24 md:mt-0 lg:-mt-24 mb-16 md:mb-0" />
          </div>
          <div class="md:w-1/2">
            <h3 class="flex flex-col text-4xl text-secondary font-bold mb-6">
              About us
              <span class="bg-primary h-1 w-20 block mt-4"></span>
            </h3>
            <p
              class="text-lg text-secondary-700 mb-4"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet est tellus, et consequat sem sodales id. Quisque molestie et mauris efficitur lacinia.</p>
            <p
              class="text-lg text-secondary-700"
            >Aliquam eget semper mi. Mauris magna risus, viverra in nulla id, placerat fermentum tellus. Aliquam non.</p>
          </div>
        </div>
      </div>
    </div>
    <div id="services" class="relative">
      <img src="@/assets/images/pages/home/circle.svg" class="absolute top-0 right-0 mt-64 hidden md:block" />
      <div class="container mx-auto px-6 py-32 relative">
        <h3 class="flex flex-col items-center text-4xl text-secondary font-bold">
          Services we offer
          <span class="bg-primary h-1 w-20 block mt-4"></span>
        </h3>
        <div
          class="flex flex-col md:flex-row items-center mb-24 md:mb-16 xl:mb-8 mt-16 md:mt-0 md:mt-16 lg:mt-0"
        >
          <img src="@/assets/images/pages/home/service1.svg" class="md:w-1/3" />
          <div class="md:ml-16 xl:ml-32">
            <h4
              class="text-2xl md:text-3xl font-bold text-secondary-800 mb-4"
            >Social Media Marketing</h4>
            <p
              class="text-secondary-700 text-lg mb-4"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet est tellus, et consequat sem sodales id. Quisque molestie et mauris efficitur lacinia.</p>
            <p
              class="text-secondary-700 text-lg"
            >Aliquam eget semper mi. Mauris magna risus, viverra in nulla id, placerat fermentum tellus. Aliquam non felis eu dui fermentum auctor. Aenean sed ante congue, facilisis ipsum eu, gravida lacus.</p>
          </div>
        </div>
        <div class="flex flex-col-reverse md:flex-row items-center mb-24 md:mb-16 xl:mb-8">
          <div class="md:mr-16 xl:mr-32">
            <h4
              class="text-2xl md:text-3xl font-bold text-secondary-800 mb-4"
            >Search Engine Optimization</h4>
            <p
              class="text-secondary-700 text-lg mb-4"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet est tellus, et consequat sem sodales id. Quisque molestie et mauris efficitur lacinia.</p>
            <p
              class="text-secondary-700 text-lg"
            >Aliquam eget semper mi. Mauris magna risus, viverra in nulla id, placerat fermentum tellus. Aliquam non felis eu dui fermentum auctor. Aenean sed ante congue, facilisis ipsum eu, gravida lacus.</p>
          </div>
          <img src="@/assets/images/pages/home/service2.svg" class="md:w-1/3" />
        </div>
        <div class="flex flex-col md:flex-row items-center">
          <img src="@/assets/images/pages/home/service3.svg" class="md:w-1/3" />
          <div class="md:ml-16 xl:ml-32">
            <h4
              class="text-2xl md:text-3xl font-bold text-secondary-800 mb-4"
            >Increase your followers</h4>
            <p
              class="text-secondary-700 text-lg mb-4"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet est tellus, et consequat sem sodales id. Quisque molestie et mauris efficitur lacinia.</p>
            <p
              class="text-secondary-700 text-lg"
            >Aliquam eget semper mi. Mauris magna risus, viverra in nulla id, placerat fermentum tellus. Aliquam non felis eu dui fermentum auctor. Aenean sed ante congue, facilisis ipsum eu, gravida lacus.</p>
          </div>
        </div>
      </div>
    </div>
    
    <footer class="bg-blue-100">
      <div
        class="container mx-auto px-6 py-12 text-secondary-500 text-center border-t border-gray-300"
      >
        <p>
          Copyright ©2019 UBangService. All rights reserved.
        </p>
      </div>
    </footer>
  </body>
</template>

<script>
export default {
  
};
</script>