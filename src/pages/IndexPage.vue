<template>
  <GatewaysTable
    :rows="gateways"
    :pagination="pagination"
    :loading="loading"
    :loadData="loadData"
    @create="onCreate"
    @edit="onEdit"
    @remove="onRemove"
  />

  <q-dialog
    v-model="dialog"
    :auto-close="false"
    @hide="onHide"
  >
    <q-card style="width: 700px; max-width: 60vw;" class="glass">
      <q-toolbar>
        <q-toolbar-title><span class="text-weight-bold">{{ !selected ? 'Add New Gateway' : 'Edit' }} {{ selected?.name }}</span></q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup/>
      </q-toolbar>

      <q-card-section>
        <GatewayForm
          :item="selected"
          @refresh="loadData"
          @close="onClose"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {ref, onBeforeMount} from 'vue'
import { useQuasar } from 'quasar'
import { useRouter} from "vue-router";
import { useAPI } from "src/composables/useAPI";
import GatewaysTable from "components/GatewaysTable.vue";
import GatewayForm from "components/GatewayForm.vue";

const $q = useQuasar()
const api = useAPI()
const router = useRouter()
const gateways = ref([])
const loading = ref(false)
const dialog = ref(false)
const selected = ref(null)
const pagination = ref({
  page: 1,
  rowsPerPage: 5,
  sortBy: 'id',
  descending: false,
  rowsNumber: 0
})

onBeforeMount(async () => {
  await loadData()
})

const onHide = () => {
  dialog.value = false
  selected.value = null
}

const onClose = () => {
  onHide()
  loadData()
}

const loadData = async () => {
  await getGateways()
}

const onCreate = () => {
  dialog.value = true
}

const onDblClick = (e, row) => {
  router.push(`/details/${row.serialNumber}`)
}

const onEdit = (row) => {
  selected.value = row
  dialog.value = true
}

const onRemove = async (row) => {
  loading.value = true
  $q.dialog({
    title: 'Confirm',
    message: `Are you sure you want to delete  ${row.name}?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    api.remove(`/gateways/${row.serialNumber}`)
      .then(async (res) => {
        if (!res?.success) throw new Error(res.statusText)
        await getGateways()
      })
      .catch((error) => {
        console.error(error)
        $q.notify({
          message: error.message,
          color: 'negative',
          position: 'bottom'
        })
      })
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    loading.value = false
  })
}

async function getGateways() {
  loading.value = true
  await api.get('/gateways')
    .then((res) => {
      gateways.value = res.data
    })
    .catch((error) => {
      $q.notify({
        message: error.message,
        color: 'negative',
        position: 'bottom'
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
