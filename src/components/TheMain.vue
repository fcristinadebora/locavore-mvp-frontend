<template>
  <main class="flex-shrink-0">
    <div class="container">
      <slot></slot>
    </div>
  </main>
</template>

<style lang="scss">
main {
  min-height: calc(100vh - 160px) !important;
  margin-top: 75px;
}
</style>
