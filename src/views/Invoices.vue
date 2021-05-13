<template>
  <v-card>
    <v-card-title>
      <v-btn color="primary" dark class="mb-2" :to="{ name: 'CreateInvoices' }"
        >Generar Factura</v-btn
      ></v-card-title
    >
    <v-row>
      <v-col>
        <v-card-text>
          <v-data-table :items="invoices" :headers="headers">
            <template v-slot:[`item.date_invoice`]="{ item }">
              {{ item.date_invoice.slice(0,10) }}
            </template>
             <template v-slot:[`item.date_due`]="{ item }">
              {{ item.date_due.slice(0,10) }}    
            </template>
          </v-data-table>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      invoices: [],
      headers: [
        { text: "Numero de factura", value: "id" },
        { text: "Codigo del cliente", value: "id" },
        { text: "Fecha de factura", value: "date_invoice" },
        { text: "Fecha de vencimiento", value: "date_due" },
        { text: "Iva", value: "iva_invoice" },
        { text: "Total factura", value: "total_invoice" },
      ],
    };
  },
  created() {
    this.getInvoice();
  },
 

  methods: {
    getInvoice() {
      axios.get("http://localhost:3000/invoices").then((response) => {
        this.invoices = response.data;
      });
    },
  },
};
</script>
