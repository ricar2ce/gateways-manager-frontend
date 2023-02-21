<template>
  <q-table
    title="Gateways"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :pagination="pagination"
    :loading="loading"
    :rows-per-page-options="[5, 10, 15]"
    binary-state-sort
    @row-dblclick="onRowDblClick"
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
      </q-toolbar>
    </template>

    <template v-slot:body-cell-number="props">
      <q-td :props="props">
        {{props.rowIndex + 1}}
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn dense flat round color="grey-8" icon="las la-eye" @click="onView(props.row)" >
          <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to view gateway details</q-tooltip>
        </q-btn>
        <q-btn dense flat round color="primary" icon="las la-edit" @click="onEdit(props.row)">
          <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to edit gateway details</q-tooltip>
        </q-btn>
        <q-btn dense flat round color="negative" icon="las la-trash-alt" @click="elements.remove(props.row.id)" >
          <q-tooltip  anchor="center left" self="center right" :offset="[10, 10]">Click to delete gateway</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
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
  onRowDblClick: {
    type: Function,
    default: () => {}
  },
  onEdit: {
    type: Function,
    default: () => {}
  },
  onView: {
    type: Function,
    default: () => {}
  }
})
</script>

<style scoped>

</style>
