<template>
  <q-form
    ref="form"
    @submit="onSubmit"
    @reset="onReset"
  >
    <div class="row q-col-gutter-md">
      <div class="col">
        <q-input
          v-model="device.vendor"
          label="Vendor"
          filled
          dense
          lazy-rules
          :rules="[val => !!val || 'Vendor is required']"
          class="q-pb-none"
        />
      </div>
      <div class="col text-center">
        <q-btn-toggle
          v-model="device.status"
          :options="[
            {
              value: 'offline',
              slot: 'offline'
            },
            {
              value: 'online',
              slot: 'online'
            }
          ]"
          :toggle-color="device.status==='offline' ? 'negative' : 'positive'"
          text-color="grey-8"
          class="q-mt-xs"
          size="md"
          dense
          outline
          rounded
        >
          <template v-slot:offline>
            <div class="row items-center no-wrap">
              <q-icon name="las la-power-off"  :color="device.status==='offline' ? 'negative' : 'grey-8'"  />
              <div class="text-center">
                Offline
              </div>
            </div>
          </template>

          <template v-slot:online>
            <div class="row items-center no-wrap">
              <div class="text-center">
                Online
              </div>
              <q-icon right name="las la-check-circle" :color="device.status==='offline' ? 'grey-8' : 'positive'" />
            </div>
          </template>
        </q-btn-toggle>
      </div>
      <div class="col-3">
        <q-btn type="submit" color="primary" flat icon="las la-save" size="md" round />
        <q-btn type="reset" color="primary" flat icon="las la-ban" size="md" :disable="!selected" round />
        <q-btn type="button" color="primary" flat icon="las la-trash" @click="onDelete" size="md" :disable="!selected" round />
      </div>
    </div>
  </q-form>
</template>

<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  item: {
    type: [Object, null] ,
    default: () => null
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save', 'remove', 'unselect'])

const device = ref({
  vendor: '',
  status: 'offline'
})

watch(() => props.item, (val) => {
  device.value = val || {
    vendor: '',
    status: 'offline'
  }
})

function onSubmit() {
  emit('save', device.value)
}

function onReset() {
  emit('unselect')
}

function onDelete() {
  emit('remove', device.value)
}
</script>
