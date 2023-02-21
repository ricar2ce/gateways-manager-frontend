<template>
  <div class="row">
    <div class="col">
      <DeviceForm :item="selected" :selected="selected!==null" @remove="removeDevice" @save="saveDevice" @unselect="unselect" />
    </div>
  </div>
  <div class="row">
    <div class="col">
      <q-table
        title="Devices"
        :rows="internalValue"
        :columns="columns"
        row-key="uid"
        :loading="loading"
        @row-click="onSelect"
        hide-pagination
        flat
      >
        <template v-slot:body-cell-number="props">
          <q-td :props="props">
            {{props.rowIndex + 1}}
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge :color="props.row.status==='offline' ? 'negative' : 'positive'" text-color="white" :label="props.row.status" />
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup>
import {ref, onBeforeMount, watch} from 'vue'
import DeviceForm from "components/DeviceForm.vue";

/**
 * PROPS
 *         uid: {
 *           type: Number,
 *           required: true,
 *           unique: true,
 *         },
 *         vendor: {
 *           type: String,
 *           required: true,
 *         },
 *         dateCreated: {
 *           type: Date,
 *           required: true,
 *           default: Date.now,
 *         },
 *         status: {
 *           type: String,
 *           required: true,
 *           enum: ['online', 'offline'],
 *           default: 'offline',
 *         },
 */

const columns = [
  {
    name: 'uid',
    label: 'UID',
    field: 'uid',
    align: 'left',
    sortable: true
  },
  {
    name: 'vendor',
    label: 'Vendor',
    field: 'vendor',
    align: 'left',
    sortable: true
  },
  {
    name: 'dateCreated',
    label: 'Date Created',
    field: 'dateCreated',
    align: 'left',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    field: 'status',
    align: 'left',
    sortable: true
  }
]

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ([]),
    required: true
  }
})

const emit = defineEmits(["update:modelValue"]);

const rows = ref([])
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
  console.log('select', select)
  selected.value = select
}

function saveDevice (device) {
  if (device.uid) {
    internalValue.value = internalValue.value.map(item => {
      if (item.uid === device.uid) {
        return device
      }
      return item
    })
  } else {
    internalValue.value = [...internalValue.value, device]
  }
  emit("update:modelValue", internalValue.value);
}

function removeDevice (uid) {
  internalValue.value = internalValue.value.filter(item => item.uid !== uid);
  emit("update:modelValue", internalValue.value);
}

function unselect () {
  selected.value = null
}

onBeforeMount(() => {
  internalValue.value = props.modelValue;
})
</script>

<style scoped>

</style>
