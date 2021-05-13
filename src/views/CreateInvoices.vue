<template>
  <v-card>
    <v-card-title>Generar Factura</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-autocomplete
            v-model="select"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
            hide-no-data
            :search-input.sync="searchCustomer"
            :items="customer"
            item-text="name"
            return-object
            label="Clientes"
            @change="addCustomer(select)"
          />
        </v-col>
        <v-col cols="3">
          <v-autocomplete
            dense
            outlined
            :items="products"
            item-text="name"
            return-object
            v-model="insertProduct"
            label="Productos"
            :search-input.sync="searchProduct"
            @change="addToCart(insertProduct)"
          />
        </v-col>
        <v-col cols="3">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Invoice Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                dense
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @input="menu2 = false"
              @change="invoiceDate()"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="3">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dueDate"
                label="Due Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
                dense
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dueDate"
              @input="menu = false"
              @change="invoiceDate()"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row v-if="!isObjEmpty(select)">
        <v-col cols="3">
          <v-card>
            <v-card-title>{{ select.name }}</v-card-title>
            <v-card-text>
              <v-card-title>Datos</v-card-title>
              <v-card-text>
                <p>Direccion: {{ select.address }}</p>
                <p>Ciudad: {{ select.city }}</p>
                <p>Telefono: {{ select.cell_phone_number }}</p>
                <p>Email: {{ select.email }}</p>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers1"
            :items="cart"
            :hide-default-footer="true"
            dense
          >
            <template v-slot:[`item.quantity`]="{ item }">
              <v-text-field
                type="number"
                min="0"
                v-model="item.quantity"
                @input="updateItems(item)"
              ></v-text-field>
            </template>
            <template v-slot:[`item.discount`]="{ item }">
              <v-text-field
                input
                min="0"
                type="number"
                v-model="item.discount"
                @input="updateItems(item)"
              ></v-text-field>
            </template>
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
        </v-col>
      </v-row>
    </v-card-text>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-text-field
          suffix="Subtotal"
          :value="subtotalInvoice | formatPrice"
          class="mr-6"
          readonly
          dense
          full-width
          reverse
          prepend-icon="mdi-currency-usd"
        >
        </v-text-field>
        <v-text-field
          suffix="Iva"
          :value="ivaInvoice | formatPrice"
          class="mr-6"
          readonly
          dense
          full-width
          reverse
          prepend-icon="mdi-currency-usd"
        >
        </v-text-field>
        <v-text-field
          prepend-icon="mdi-currency-usd"
          suffix="Total"
          :value="totalInvoice | formatPrice"
          class="mr-6"
          readonly
          dense
          full-width
          reverse
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <view-invoice
          :invoice="invoice"
          :seeCustomer="seeCustomer"
        ></view-invoice>
      </v-col>
      <v-col>
        <v-btn class="primary" @click="generateInvoice()">Guardar</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import ViewInvoice from "../components/ViewInvoice.vue";
export default {
  components: { ViewInvoice },
  name: "CreateInvoices",
  data: () => ({
    invoice: {
      customerId: null,
      totalInvoice: 0,
      subtotalInvoice: 0,
      ivaInvoice: 0,
      dateInvoice: "",
      dateDue: "",
      invoiceDetails: [],
    },
    seeCustomer: {
      customer: {},
    },
    codInvoice:[],
    customer: [],
    select: {},
    insertProduct: {},
    products: [],
    product: {},
    subtotalInvoice: 0,
    totalInvoice: 0,
    ivaInvoice: 0,
    date: new Date().toISOString().substr(0, 10),
    dueDate: new Date().toISOString().substr(0, 10),
    menu: false,
    menu2: false,
    searchCustomer: "",
    searchProduct: "",

    headers1: [
      { text: "Producto", value: "name", width: "8%" },
      { text: "Cantidad", value: "quantity", width: "3%" },
      { text: "Precio", value: "price", width: "3%" },
      { text: "Descuento %", value: "discount", width: "3%" },
      { text: "IVA", value: "iva", width: "3%" },
      { text: "Total linea", value: "subtotal", width: "5%", align: "end" },
    ],
  }),

  watch: {
    searchCustomer(val) {
      if (val) {
        if (val.length > 3) {
          this.getCustomers(val);
        }
      } else {
        this.customer = [];
      }
    },
    searchProduct(val) {
      if (val) {
        if (val.length > 3) {
          this.getProducts(val);
        }
      } else {
        this.products = [];
      }
    },
  },
  created() {
    this.invoice.dateInvoice = this.date;
    this.invoice.dateDue = this.dueDate;
  },
  computed: mapState(["cart"]),
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
  methods: {
    isObjEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
    generateInvoice() {
      this.toCart = JSON.parse(JSON.stringify(this.cart));
      for (let i = 0; i < this.toCart.length; i++) {
        delete this.toCart[i].id;
        delete this.toCart[i].finalPrice;
        delete this.toCart[i].ivaProduct;
        delete this.toCart[i].name;
      }
      // console.log("este es el carrito", this.toCart);
      axios
        .post("http://localhost:3000/invoices/", { invoice: {
          ...this.invoice,
          
        }})
        .then((response) => {
          console.log('este es la factura', response);
         this.codInvoice = response.data;
        });
    },
    getCustomers(select) {
      axios
        .get(`http://localhost:3000/customers/search?search_query=${select}`)
        .then((response) => {
          this.customer = response.data;
        });
    },
    getProducts(insertProduct) {
      axios
        .get(
          `http://localhost:3000/products/search?search_query=${insertProduct}`
        )
        .then((response) => {
          this.products = response.data;
        });
    },
    addToCart(insertProduct) {
      this.product = {
        ProductId: insertProduct.id,
        id: insertProduct.id,
        name: insertProduct.name,
        price: insertProduct.price,
        quantity: (insertProduct.quantity = 1),
        iva: parseFloat(insertProduct.price) * 0.19,
        ivaProduct: parseFloat(insertProduct.price) * 0.19,
        subtotal: parseFloat(insertProduct.price * 1.19),
        discount: (insertProduct.discount = 0),
        finalPrice: parseFloat(insertProduct.price) * 1.19,
        // discountAmount:parseFloat(insertProduct.price) * (insertProduct.quantity)* (inserProduct.discount)
      };
      this.$store.commit("ADD_TO_CART", this.product);
      this.product = {};
      this.calculateTotal();
    },
    updateItems(item) {
      this.$store.commit("UPDATE_ITEMS", item);
      this.calculateTotal();
    },
    addCustomer(select) {
      this.invoice.customerId = select.id;
      this.seeCustomer.customer = select;
    },
    invoiceDate() {
      this.invoice.dateInvoice = this.date;
      this.invoice.dateDue = this.dueDate;
    },
    calculateTotal() {
      this.subtotalInvoice = 0;
      this.ivaInvoice = 0;
      this.totalInvoice = 0;
      for (var key in this.cart) {
        this.ivaInvoice += this.cart[key].iva;
        this.totalInvoice += this.cart[key].subtotal;
      }
      this.subtotalInvoice = this.totalInvoice - this.ivaInvoice;
      this.invoice.totalInvoice = this.totalInvoice;
      this.invoice.subtotalInvoice = this.subtotalInvoice;
      this.invoice.ivaInvoice = this.ivaInvoice;
    },
  },
};
</script>

