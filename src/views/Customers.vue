<template>
  <v-data-table :headers="headers" :items="customers" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cliente</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          dark
          class="mb-2"
          :to="{ name: 'CreateCustomer' }"
        >
          Nuevo Cliente</v-btn
        >
      </v-toolbar>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <select-action :item="item" :customers="customers"></select-action>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import SelectAction from "../components/SelectAction.vue";

export default {
  name: "customers",
  components: { SelectAction },
  data: () => ({
    mode: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Direccion", value: "address" },
      { text: "Ciudad", value: "city" },
      { text: "Numero de Celular", value: "cell_phone_number" },
      { text: "E-mail", value: "email" },
      { text: "", value: "actions", sortable: false },
    ],
    customers: [],
    editedIndex: -1,
    customer: {
      name: "",
      address: "",
      city: "",
      cell_phone_number: "",
      email: "",
    },
  }),

  created() {
    this.getCustomers();
  },
  filters: {
    upper(value) {
      return value.toUpperCase();
    },
    capitalizeWords(value) {
      value.toString();
      return value.replace(/\b\w/g, (l) => l.toUpperCase());
    },
    capitalize(value) {
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    lower(value) {
      return value.toLowerCase();
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  methods: {
    getCustomers() {
      axios.get("http://localhost:3000/customers").then((response) => {
        this.customers = response.data;
      });
    },
  },
};
</script>

