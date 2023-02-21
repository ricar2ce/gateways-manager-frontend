<template>
  <q-breadcrumbs class="q-mb-lg">
    <q-breadcrumbs-el label="Gateways List" icon="las la-list-alt" />
  </q-breadcrumbs>
  <GatewaysTable
    :rows="gateways"
    :columns="columns"
    :pagination="pagination"
    :loading="loading"
    @create="onCreate"
    @row-dblclick="onDblClick"
    @edit="onEdit"
    @view="onView"
  />

  <q-dialog
    v-model="dialog"
    :auto-close="false"
    @hide="onHide"
  >
    <q-card style="width: 700px; max-width: 60vw;">
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

const columns = [
  {
    name: 'number',
    label: 'No.',
    align: 'left',
    sortable: false
  },
  {
    name: 'serialNumber',
    label: 'Serial Number',
    field: 'serialNumber',
    align: 'left',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'ipv4Address',
    label: 'IP',
    field: 'ipv4Address',
    align: 'left',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'right',
    sortable: false
  }
]

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

const onView = (row) => {
  onDblClick(null, row)
}

async function getGateways() {
  loading.value = true
  await api.get('/gateways')
    .then((data) => {
      gateways.value = data
    })
    .catch((error) => {
      $q.notify({
        message: error.message,
        color: 'negative',
        position: 'top'
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
