<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const anchor = ref(null);
const wrapper = ref(null);

onMounted(() => {
    addScrollListener();
})

onBeforeUnmount(() => {
    removeScrollListener();
})

function isVisible(element) {
    if (!element) {
        console.log('undefined element, ignoring');
        return;
    }
    
    const rect = element.getBoundingClientRect();
    const wrapperHeight = wrapper.value.getBoundingClientRect().height;
    return (
        rect.bottom + wrapperHeight <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function handlePageScroll () {
    if (isVisible(anchor.value)) {
        wrapper.value.setAttribute('style', 'position:relative;width:100%;bottom:0');
    } else {
        wrapper.value.removeAttribute('style');
    }
}

function addScrollListener() {
    window.addEventListener('scroll', handlePageScroll)
}

function removeScrollListener() {
    window.removeEventListener('scroll', handlePageScroll);
}
</script>
<template>
    <span id="floating-footer-button-anchor" ref="anchor"></span>
    <div class="floating-footer-button-wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<style lang="scss">
@keyframes floater {
  0%{transform: translateY(-10%);transition: ease 0.5s;}
  50%{transform: translateY(10%);transition: ease 0.5s;}
}

.floating-footer-button-wrapper {
    position: fixed;
    bottom: 3rem;
    z-index: 9;
    transform: translateY(-10%);
    animation: floater 1.5s infinite;
    transition: ease 0.5s;
    
    width: calc(100% - 1.5rem);
    @media (min-width: 576px) {
        max-width: calc(540px - 1.5rem);
    }
    @media (min-width: 768px) {
        max-width: calc(720px - 1.5rem);
    }
    @media (min-width: 992px) {
        max-width: calc(960px - 1.5rem);
    }
    @media (min-width: 1200px) {
        max-width: calc(1140px - 1.5rem);
    }
    @media (min-width: 1400px) {
        max-width: calc(1320px - 1.5rem);
    }
    & > * {
        box-shadow: 1px 2px 5px 1px rgba(0, 0, 0, 0.2);
    }
}
</style>