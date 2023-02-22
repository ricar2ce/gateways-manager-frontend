<template>
  <q-table
    title="Devices"
    :rows="data"
    :columns="columns"
    row-key="uid"
    :loading="loading"
    @row-click="onSelect"
    card-class="bg-grey-9"
    :pagination="pagination"
    hide-pagination
    flat
    dense
  >
    <template v-slot:body-cell-number="props">
      <q-td :props="props">
        {{props.rowIndex + 1}}
      </q-td>
    </template>
    <template v-slot:body-cell-dateCreated="props">
      <q-td :props="props">
        {{new Date(props.row.dateCreated).toLocaleString()}}
      </q-td>
    </template>
    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <q-badge :color="props.row.status==='offline' ? 'negative' : 'positive'" text-color="white" :label="props.row.status" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  onSelect: {
    type: Function,
    default: () => {}
  }
})

const pagination = {
  rowsPerPage: 0,
  page: 1
}

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
</script>
