<template>
<v-card>

  <v-data-table :headers= "headers" :items= "customers">
    <template v-slot:top>
   <v-toolbar flat>
     <v-toolbar-title>Clientes</v-toolbar-title>
     <v-divider class="mx-4" inset vertical></v-divider>
     <v-space>   </v-space>
      <template v-slot >
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              
            >
              Nuevo Cliente
            </v-btn>
          </template>
   </v-toolbar>
  
  
    </template>
    
  </v-data-table>
</v-card>
  
</template>

<script>

export default ({
  name:"infoCustomers",
  data: () => ({
    headers:[
       
    ],
    customers:[]
  }
)})
</script>
