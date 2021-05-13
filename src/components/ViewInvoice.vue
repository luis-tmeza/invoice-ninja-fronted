<template>
  <div id="app">
    <v-app id="inspire">
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Ver factura
            </v-btn>
          </template>
          <v-card class="black">
            <v-card-title>
              <v-btn @click="dialog = false" class="error">Salir</v-btn>
            </v-card-title>
            <v-card-text>
              <v-row class="d-flex justify-center">
                <v-col cols="8">
                  <v-card max-height="1000" max-width="614">
                    <v-card-text>
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-col cols="6">
                          <ul>
                            <h1>Factura No. {{}} </h1>
                          </ul>
                        </v-col>
                        <v-col cols="6">
                          <ul>
                            <p>
                              Fecha de Facturacion: {{ invoice.dateInvoice }}
                            </p>
                            <p>Fecha de vencimiento: {{ invoice.dateDue }}</p>
                          </ul>
                        </v-col>
                      </v-row>
                      <v-col>
                        <v-card flat>
                          <v-card-text>
                            <p>Cliente: {{ seeCustomer.customer.name }}</p>
                            <p>Direccion: {{ seeCustomer.customer.address }}</p>
                            <p>Ciudad: {{ seeCustomer.customer.city }}</p>
                            <p>
                              Telefono:
                              {{ seeCustomer.customer.cell_phone_number }}
                            </p>
                            <p>Email: {{ seeCustomer.customer.email }}</p>
                          </v-card-text>
                        </v-card>
                      </v-col>

                      <v-data-table
                        :items="cart"
                        :headers="headers"
                        :hide-default-footer="true"
                        dense
                        disable-sort
                      >
                        <template v-slot:[`item.subtotal`]="{ item }">
                          {{ item.subtotal | formatPrice }}
                        </template>
                        <template v-slot:[`item.iva`]="{ item }">
                          {{ item.iva | formatPrice }}
                        </template>
                        <template v-slot:[`item.price`]="{ item }">
                          {{ item.price | formatPrice }}
                        </template>
                      </v-data-table>
                      <v-row>
                        <v-col>
                          <ul style="text-align: right">
                            <p></p>
                            <p>
                              <b>
                                Subtotal: ${{
                                  invoice.subtotalInvoice | formatPrice
                                }}</b
                              >
                            </p>

                            <p>
                              <b>
                                Iva: ${{ invoice.ivaInvoice | formatPrice }}
                              </b>
                            </p>

                            <p>
                              <b>
                                Total: ${{
                                  invoice.totalInvoice | formatPrice
                                }}</b
                              >
                            </p>
                          </ul>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    invoice: {
      type: Object,
    },
    seeCustomer: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
      headers: [
        { text: "Producto", value: "name" },
        { text: "Cantidad", value: "quantity" },
        { text: "Precio", value: "price" },
        { text: "Descuento", value: "discount" },
        { text: "IVA", value: "iva" },
        { text: "Total linea", value: "subtotal" },
      ],
    };
  },
  computed: mapState(["cart"]),
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
