<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../stores";
import { useRoute, useRouter } from "vue-router";


const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// It's mounted in every route
onMounted(() => {
    checkRouteAndRedirect();
})

async function checkRouteAndRedirect () {
    await authStore.setupAuth();

    if (route.path.startsWith('/account') && !authStore.isLoggedIn()) {
        router.push('/');
    }

    console.log(route.path.startsWith('/login') , route.path.startsWith('/register') , route.path.startsWith('/quiz'), authStore.isLoggedIn());
    if ((route.path.startsWith('/login') || route.path.startsWith('/signup') || route.path.startsWith('/quiz')) && authStore.isLoggedIn()) {
        router.push('/');
    }
}
</script>
