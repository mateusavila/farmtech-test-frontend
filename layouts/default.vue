<template>
  <div class="bg-gradient-to-tr from-rose-50 to-white min-h-screen">
    <header class="bg-white h-[70px] shadow-md">
      <div class="w-[calc(100%-40px)] mx-auto flex items-center h-full max-w-[1200px] flex justify-between">
        <img 
          src="/logo.png" 
          alt="Farm Tech" 
          width="164" 
          height="40" 
          loading="eager">
        <div class="lg:hidden block">
          <img 
            src="/doctors.svg" 
            alt="Um desenho de uma enfermeira e uma médica." 
            width="433" 
            height="410" 
            loading="lazy"
            class="h-[60px] block w-full">
        </div>
      </div>
    </header>
    <main class="lg:py-[30px]">
      <slot />
    </main>
  </div>
</template>
