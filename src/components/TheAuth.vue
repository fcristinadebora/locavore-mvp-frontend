<script setup>
import { useAuthStore } from "../stores";

const { setupAuth } = await useAuthStore();

setupAuth();
</script>