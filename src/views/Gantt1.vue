<!-- https://phuoc.ng/collection/css-grid/create-a-gantt-chart/ -->
<template>
  <div class="relative border border-slate-200 w-full">
    <!-- Background lines -->
    <div class="absolute inset-0 grid grid-cols-[5rem_repeat(5,1fr)] -z-10">
      <div class="border-r border-slate-200 h-full"></div>
      <div class="border-r border-slate-200 h-full"></div>
      <div class="border-r border-slate-200 h-full"></div>
      <div class="border-r border-slate-200 h-full"></div>
      <div class="border-r border-slate-200 h-full"></div>
    </div>

    <!-- Header -->
    <div class="relative grid grid-cols-[5rem_repeat(5,1fr)] border-b border-slate-200">
      <div></div>
      <div class="text-center">Mon</div>
      <div class="text-center">Tue</div>
      <div class="text-center">Wed</div>
      <div class="text-center">Thu</div>
      <div class="text-center">Fri</div>
    </div>

    <!-- Rows -->
    <div class="grid grid-cols-[5rem_1fr] border-b border-slate-200">
      <div class="px-1">John</div>
      <div class="grid grid-cols-5">
        <div class="col-start-2 col-span-3 h-4 bg-green-500 rounded-lg m-1"></div>
        <div class="col-start-1 col-span-2 h-4 bg-red-500 rounded-lg m-1"></div>
      </div>
    </div>

    <div class="grid grid-cols-[5rem_1fr] border-b border-slate-200">
      <div class="px-1">Smith</div>
      <div class="grid grid-cols-5">
        <div class="col-start-2 col-span-2 h-4 bg-green-500 rounded-lg m-1"></div>
        <div class="col-start-3 col-span-2 h-4 bg-gray-300 rounded-lg m-1"></div>
        <div class="col-start-3 col-span-3 h-4 bg-gray-300 rounded-lg m-1"></div>
      </div>
    </div>

    <div class="grid grid-cols-[5rem_1fr] border-b border-slate-200">
      <div class="px-1">Foo</div>
      <div class="grid grid-cols-5">
        <div class="col-start-1 col-span-1 h-4 bg-red-500 rounded-lg m-1"></div>
        <div class="col-start-3 col-span-2 h-4 bg-green-500 rounded-lg m-1"></div>
        <div class="col-start-2 col-span-2 h-4 bg-gray-300 rounded-lg m-1"></div>
        <div class="col-start-2 col-span-3 h-4 bg-gray-300 rounded-lg m-1"></div>
      </div>
    </div>

    <div class="grid grid-cols-[5rem_1fr] border-b border-slate-200">
      <div class="px-1">Bar</div>
      <div class="grid grid-cols-5">
        <div class="col-start-1 col-span-3 h-4 bg-red-500 rounded-lg m-1"></div>
        <div class="col-start-2 col-span-2 h-4 bg-green-500 rounded-lg m-1"></div>
        <div class="col-start-3 col-span-2 h-4 bg-gray-300 rounded-lg m-1"></div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>