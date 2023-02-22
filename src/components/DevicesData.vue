<template>
  <div class="row">
    <div class="col">
      <DeviceForm :selected="selected" :editing="selected!==null" @remove="removeDevice" @save="saveDevice" @unselect="unselect" />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <DevicesTable :data="internalValue" @select="onSelect" :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, watch} from 'vue'
import { useQuasar } from 'quasar'
import DeviceForm from "components/DeviceForm.vue";
import DevicesTable from "components/DevicesTable.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ([]),
    required: true
  }
})

const emit = defineEmits(["update:modelValue"]);

const $q = useQuasar()
const loading = ref(false)
const selected = ref(null)
const internalValue = ref([]);

watch(()=>internalValue.value, (val)=>{
  emit("update:modelValue", val);
});

watch(()=>props.modelValue, (val)=>{
  internalValue.value = val;
  emit("update:modelValue", val);
});

function onSelect (evt, select) {
  selected.value = select
}

async function saveDevice (device) {
  let newDevice = true
  internalValue.value = internalValue.value.map(item => {
    if (item.uid === device.uid) {
      newDevice = false
      return device
    }
    return item
  })
  if (newDevice){
    if(internalValue.value.length < 10) {
      device.dateCreated = new Date()
      internalValue.value.push(device)
    } else {
      $q.notify({
        message: 'Gateways can only have 10 devices',
        color: 'negative',
        position: 'bottom',
        timeout: 2000
      })
    }
  }
  emit("update:modelValue", internalValue.value);
  unselect()
}

function removeDevice (uid) {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this device?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    internalValue.value = props.modelValue.filter(item => item.uid !== uid);
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    unselect()
  })
}

function unselect () {
  selected.value = null
}

onBeforeMount(() => {
  internalValue.value = props.modelValue;
})
</script>
