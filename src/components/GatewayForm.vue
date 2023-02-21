<template>
  <q-form ref="form" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      v-model="model.serialNumber"
      label="Serial Number"
      filled
      dense
      lazy-rules
      :rules="[val => !!val || 'Serial Number is required']"
    />
    <q-input
      v-model="model.name"
      label="Name"
      filled
      lazy-rules
      dense
      :rules="[val => !!val || 'Name is required']"
    />
    <q-input
      v-model="model.ipv4Address"
      label="IP"
      filled
      lazy-rules
      :rules="[
        val => !!val || 'IP is required',
        val => val.match(/^(\d{1,3}\.){3}\d{1,3}$/) || 'IP is invalid (e.g. 192.168.0.1)'
      ]"
      dense
    />
    <q-separator dark />
    <DevicesTableForm
      v-model="model.peripheralDevices"
    />
    <q-btn type="submit" color="primary" label="Submit" />
    <q-btn type="reset" color="primary" flat label="Reset" />
  </q-form>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue'
import { useQuasar } from 'quasar'
import { useAPI } from "src/composables/useAPI";
import DevicesTableForm from "components/DevicesData.vue";

const $q = useQuasar()
const api = useAPI()
const form = ref(null)
const model = ref({
  serialNumber: '',
  name: '',
  ipv4Address: '',
  peripheralDevices: []
})

const emit = defineEmits(['refresh', 'close'])

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

const onSubmit = async () => {
  const { serialNumber, name, ipv4Address } = model.value
  const data = {
    serialNumber,
    name,
    ipv4Address
  }
  if (props?.item?.serialNumber) {
    await api.put(`/gateways/${props.item.serialNumber}`, data)
      .then((res) => {
        $q.notify({
          message: 'Gateway updated successfully',
          color: 'positive',
          icon: 'las la-check-circle'
        })
        emit('close')
      })
  } else {
    await api.post('/gateways', data)
      .then((res) => {
        $q.notify({
          message: 'Gateway created successfully',
          color: 'positive',
          icon: 'las la-check-circle'
        })
        emit('refresh')
        form.value.reset()
      })
  }
}

const onReset = () => {
  model.value = {
    serialNumber: props?.item?.serialNumber || '',
    name: props?.item?.name || '',
    ipv4Address: props?.item?.ipv4Address || '',
    peripheralDevices: props?.item?.peripheralDevices || []
  }
}

onBeforeMount(() => {
  onReset()
})
</script>

<style scoped>

</style>
