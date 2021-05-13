<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:[`item.price`]="{ item }">
        {{ item.price | formatPrice }}
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Productos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                
                v-on="on"
                @click="addProduct"
              >
                Nuevo Producto
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="product.name"
                        label="Name"
                        type="string"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="product.price"
                        label="Price($)"
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="product.stock"
                        label="Stock"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveProduct">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editProduct(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteProduct(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    mode: "",
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "Producto", value: "name" },
      { text: "Precio($)", value: "price" },
      { text: "Stock", value: "stock" },
      { text: "Accion", value: "actions", sortable: false },
    ],
    products: [],
    editedIndex: -1,
    product: {
      name: "",
      price: 0,
      stock: 0,
    },
  }),

  created() {
    this.getProducts();
  },

  methods: {
    open() {
      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },

    addProduct() {
      this.mode = "create";
      this.dialog = true;
      this.product = { id: "", name: "", price: "", stock: "" };
    },

    editProduct(product) {
      this.mode = "Edit";
      this.product = product;
      this.dialog = true;
    },

    getProducts() {
      axios.get("http://localhost:3000/products").then((response) => {
        this.products = response.data;
      });
    },

    createProduct() {
      console.log("create");
      axios
        .post("http://localhost:3000/products", this.product)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            this.name = "";
            this.price = "";
            this.stock = "";
            this.$emit("saveSuccess", true);
          }
          this.getProducts();
        });
    },

    deleteProduct(item) {
      this.product = item;
      axios
        .delete("http://localhost:3000/products/" + this.product.id)
        .then((response) => {
          this.products = response.data;
        });
    },

    updateProduct() {
      console.log("Edit");
      axios
        .put("http://localhost:3000/products/" + this.product.id, this.product)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.product.name = "";
            this.product.id = "";
            this.product.price = "";
            this.product.stock = "";
            this.$emit("saveSuccess", true);
          }
          this.getProducts();
        });
    },

    saveProduct() {
      if (this.mode === "Edit") {
        this.updateProduct();
      } else {
        this.createProduct();
      }
      this.close();
    },
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
};
</script>
