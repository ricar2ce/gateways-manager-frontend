<template>
  <q-table
    title="Gateways"
    :rows="rows"
    :columns="columns"
    row-key="serialNumber"
    :pagination="pagination"
    :loading="loading"
    :rows-per-page-options="[5, 10, 15]"
    binary-state-sort
  >
    <template #top>
      <q-toolbar>
        <q-toolbar-title>Gateways</q-toolbar-title>
        <q-space />
        <q-btn
          color="primary"
          text="Add Gateway"
          icon="add"
          @click="onCreate"
          style="max-width: 37px;"
        >
          <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to add a new gateway</q-tooltip>
        </q-btn>
        <q-btn
          color="primary"
          text="Refresh"
          icon="refresh"
          @click="loadData"
          style="max-width: 37px;"
          class="q-ml-md"
        >
          <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to refresh the gateways list</q-tooltip>
        </q-btn>
      </q-toolbar>
    </template>

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props" :key="props.rowIndex">
        <q-td auto-width>
          <q-btn
            size="sm"
            color="primary"
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'las la-times' : 'las la-stream'"
            round
            dense
          >
            <q-tooltip  anchor="center right" self="center left" :offset="[10, 10]">Click to expand gateway devices list</q-tooltip>
          </q-btn>
        </q-td>
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          <span v-if="col.name==='actions'">
            <q-btn dense flat round color="primary" icon="las la-edit" @click="onEdit(props.row)">
              <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to edit gateway details</q-tooltip>
            </q-btn>
            <q-btn dense flat round color="negative" icon="las la-trash-alt" @click="onRemove(props.row)" >
              <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to delete gateway</q-tooltip>
            </q-btn>
          </span>

          {{ col.name==='number' ? props.rowIndex + 1 : col.value }}
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props" :key="props.rowIndex">
        <q-td colspan="100%">
          <DevicesTable :data="props.row.peripheralDevices" />
        </q-td>
      </q-tr>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense flat round color="primary" icon="las la-edit" @click="onEdit(props.row)">
          <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to edit gateway details</q-tooltip>
        </q-btn>
        <q-btn dense flat round color="negative" icon="las la-trash-alt" @click="onRemove(props.row)" >
          <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to delete gateway</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import DevicesTable from "components/DevicesTable.vue";

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
    sortable: false,
    headerStyle: 'padding-right: 25px'
  }
]

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => ({
      page: 1,
      rowsPerPage: 5,
      sortBy: 'id',
      descending: false,
      rowsNumber: 0
    })
  },
  loading: {
    type: Boolean,
    default: false
  },
  onCreate: {
    type: Function,
    default: () => {}
  },
  onEdit: {
    type: Function,
    default: () => {}
  },
  onRemove: {
    type: Function,
    default: () => {}
  },
  loadData: {
    type: Function
  }
})
</script>
