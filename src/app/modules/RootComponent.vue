<script setup lang="ts">
import calcAppProperties from '@app/shared/scripts/calcProperties';
import { onMounted } from 'vue';

onMounted(() => {
	// SCRIPTS
	calcAppProperties();
});
</script>

<template>
	<slot />
</template>
