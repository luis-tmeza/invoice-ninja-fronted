<template>
<v-dialog v-model="dialog" max-width="500px">
     <template v-slot:activator="{ on, attrs }">
  <v-btn color="primary" dark class="mb-2 " 
         v-bind="attrs"
         v-on="on"
         @click="addCustomer"> 
         New Client 
         </v-btn>
     </template>
  <v-card>
      <v-container>
          <v-row>
              <v-col cols="12" sm="6" md="4">
                    <v-text-field
                     v-model="customer.name"
                      label="Name"
                      type="string"
                    ></v-text-field>
                  </v-col>
          </v-row>
      </v-container>
  </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: {
    customers: {
      type: Array,
    },
  },

  data: () => ({
    
    mode: "",
    dialog: false,
    dialogDelete: false,

    editedIndex: -1,
    customer: {
      name: "",
      address: "",
      city: "",
      cell_phone_number: "",
      email: "",
    },
  }),

  methods: {
    addCustomer() {
      this.mode = "create";
      this.dialog = true;
      this.customers = {
        id: "",
        name: "",
        address: "",
        city: "",
        cell_phone_number: "",
        email: "",
      };
    },
    open() {
      this.dialog = true;
    },

    close() {
      this.dialog = false;
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
        });
    },
  },
};
</script>

