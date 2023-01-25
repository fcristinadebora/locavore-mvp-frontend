<template>
  <main class="d-flex flex-column">
    <slot></slot>
  </main>
</template>

<style lang="scss">
main {
  min-height: calc(100vh - 310px) !important;
  margin-top: 75px;
}
</style>
