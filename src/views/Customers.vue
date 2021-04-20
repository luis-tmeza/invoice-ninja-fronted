<template>
  <v-data-table :headers="headers" :items="customers" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Cliente</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="customer.name"
                      label="Name"
                      type="string"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="customer.address"
                      label="Price($)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="customer.city"
                      label="Stock"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="customer.cell_phone_number"
                      label="Stock"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="customer.email"
                      label="Stock"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
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
    this.getProducts();
  },

  methods: {
    getProducts() {
      axios.get("http://localhost:3000/customers").then((response) => {
        this.customers = response.data;
      });
    },
  },
};
</script>
