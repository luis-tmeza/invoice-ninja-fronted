<template>
  <v-card>
    <v-row>
      <v-col cols="10">
        <v-card flat>
          <v-card-title>Nuevo Cliente</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                outlined
                dense
                v-model="customer.name"
                label="Nombre del Cliente"
                prepend-icon="perm_identity"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="customer.address"
                label="Direccion"
                prepend-icon="home"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="customer.city"
                label="Ciudad"
                prepend-icon="location_city"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="customer.cell_phone_number"
                label="Numero de Telefono"
                prepend-icon="phone_in_talk"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="customer.email"
                label="Correo Electronico"
                prepend-icon="email"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card flat>
          <v-card-title>Contacto</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                outlined
                dense
                v-model="contact.first_name"
                label="Nombre de contacto"
                prepend-icon="contacts"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="contact.last_name"
                label="Apellidos"
                prepend-icon="contacts"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="contact.email"
                label="Correo Electronico"
                prepend-icon="email"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="contact.phone"
                label="Numero de Telefono"
                prepend-icon="phone_in_talk"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="createCustomer()">Save</v-btn>
      <v-btn color="primary">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    customer: {
      name: "",
      address: "",
      city: "",
      cell_phone_number: "",
      email: "",
    },

    contact: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      customer_id: "",
    },
  }),

  methods: {
    createCustomer() {
      let cust = null;
      axios
        .post("http://localhost:3000/customers", this.customer)
        .then((response) => {
          cust = response.data.id;
          console.log(response);
          this.customer.name = "";
          this.customer.address = "";
          this.customer.city = "";
          this.customer.cell_phone_number = "";
          this.customer.email = "";
        })
        .then(() => {
          this.createContact(cust);
        });
    },

    createContact(id) {
      this.contact.customer_id = id;
      axios
        .post("http://localhost:3000/contacts", this.contact)
        .then((response) => {
          console.log(response);
          this.contact.first_name = "";
          this.contact.last_name = "";
          this.contact.email = "";
          this.contact.phone = "";
        });
    },
  },
};
</script>













