 <template>
  <div class="text-center">
    <v-menu transition="scale-transition" origin="center center">
      <template v-slot:activator="{ on, attrs }">
        <v-btn elevation="4" x-small v-bind="attrs" v-on="on">
          select
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-icon @click="item">mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="() => {}">
          <v-list-item-title> Ver Contacto</v-list-item-title>
        </v-list-item>
        <v-list-item @click="() => {}">
          <v-list-item-title> Actualizar</v-list-item-title>
        </v-list-item>
        <v-list-item @click="deleteCustomer(item)">
          <v-list-item-title> Eliminar </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "infoCustomers",
  data: () => ({}),
  props: {
    customers: {
      type: Array,
    },

    item: {
      type: Object,
    },
  },

  methods: {
    deleteCustomer(item) {
      axios.delete("http://localhost:3000/customers/" + item.id).then(() => {});
    },
  },
};
</script>

