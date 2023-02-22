<template>
  <div class="row justify-center q-my-lg">
    <div class="col-8">
      <q-banner class="glass text-white text-center" rounded>
        <div class="row inline justify-center q-col-gutter-md">
          <q-icon :name="icon" color="white" size="md" />
          <div class="text-h5 text-brand">{{ title }}</div>
        </div>
      </q-banner>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Gateways Manager'
  },
  icon: {
    type: String,
    default: 'las la-server'
  }
})
</script>

<style scoped>

</style>
