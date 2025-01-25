<!-- https://phuoc.ng/collection/css-grid/create-a-gantt-chart/ -->
<template>
  <div class="gantt">
    <div class="gantt__lines">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <!-- Header -->
    <div class="gantt__period">
        <div></div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
    </div>

    <div class="gantt__row">
        <div class="gantt__assign">John</div>
        <div class="gantt__tasks">
            <div class="gantt__task gantt__task--done" style="grid-column: 2 / 5"></div>
            <div class="gantt__task gantt__task--overdue" style="grid-column: 1 / 3"></div>
        </div>
    </div>

    <div class="gantt__row">
        <div class="gantt__assign">Smith</div>
        <div class="gantt__tasks">
            <div class="gantt__task gantt__task--done" style="grid-column: 2 / 4"></div>
            <div class="gantt__task gantt__task--todo" style="grid-column: 3 / 5"></div>
            <div class="gantt__task gantt__task--todo" style="grid-column: 3 / 6"></div>
        </div>
    </div>

    <div class="gantt__row">
        <div class="gantt__assign">Foo</div>
        <div class="gantt__tasks">
            <div class="gantt__task gantt__task--overdue" style="grid-column: 1 / 2"></div>
            <div class="gantt__task gantt__task--done" style="grid-column: 3 / 5"></div>
            <div class="gantt__task gantt__task--todo" style="grid-column: 2 / 4"></div>
            <div class="gantt__task gantt__task--todo" style="grid-column: 2 / 5"></div>
        </div>
    </div>

    <div class="gantt__row">
        <div class="gantt__assign">Bar</div>
        <div class="gantt__tasks">
            <div class="gantt__task gantt__task--overdue" style="grid-column: 1 / 4"></div>
            <div class="gantt__task gantt__task--done" style="grid-column: 2 / 4"></div>
            <div class="gantt__task gantt__task--todo" style="grid-column: 3 / 5"></div>
        </div>
    </div>
</div>
</template>

<script setup>

</script>

<style scoped>
.gantt {
  border: 1px solid rgb(203 213 225);
  position: relative;
  width: 100%;
}
.gantt__lines {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;

  display: grid;
  grid-template-columns: 5rem repeat(5, 1fr);
  grid-template-rows: 1fr;
}
.gantt__lines div {
    border-right: 1px solid rgb(203 213 225 / 0.4);
}
.gantt__period {
  display: grid;
  grid-template-columns: 5rem repeat(5, 1fr);
}
.gantt__period div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gantt__row {
  display: grid;
  grid-template-columns: 5rem 1fr;
  align-items: center;
  border-top: 1px solid rgb(203 213 225);
  padding: 0.5rem 0;
}
.gantt__assign {
  padding: 0 0.25rem;
}
.gantt__tasks {
  display: grid;
  grid-row-gap: 0.25rem;
  grid-template-columns: repeat(5, 1fr);
}
.gantt__task {
    border-radius: 9999px;
    height: 1rem;
}
.gantt__task--done {
    background: rgb(74 222 128);
}
.gantt__task--todo {
    background: rgb(96 165 250);
}
.gantt__task--overdue {
    background: rgb(190 18 60);
}
</style>