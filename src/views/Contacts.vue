<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>{{ item.name | upper }}</v-card-title>
        <v-card-text>
          <v-card-title>Datos</v-card-title>
          <v-card-text>
            <p>Direccion: {{ item.address }}</p>
            <p>Ciudad: {{ item.city }}</p>
            <p>Telefono: {{ item.cell_phone_number }}</p>
            <p>Email: {{ item.email }}</p>
          </v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="6" v-for="(contact, index) in contactsDetails" :key="index">
      <v-card>
        <v-card-title>Contacto</v-card-title>
        <v-card>
          <v-card-text>
            <p>Primer nombre: {{ contact.first_name }}</p>
            <p>Apellidos: {{ contact.last_name }}</p>
            <p>email: {{ contact.email }}</p>
            <p>Telefono: {{ contact.phone }}</p>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  props: {
    item: {
      type: Object,
    },
  },
  data: () => ({
    contacts: [],
    contactsDetails: [],
  }),

  created() {
    this.getContact();
  },
  methods: {
    getContact() {
      axios.get("http://localhost:3000/contacts").then((response) => {
        this.contacts = response.data;
        for (var item in this.contacts) {
          if (this.contacts[item].customer_id === this.item.id) {
            this.contactsDetails.push(this.contacts[item]);
          }
        }
      });
    },
  },
  filters: {
    upper(value) {
      return value.toUpperCase();
    },
  },
};
</script>



