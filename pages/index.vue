<template>
  <v-main class="indigo lighten-5">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="8" sm="8" class="mt-5">
          <v-card class="mx-auto rounded-lg my-auto " max-width="550">
            <v-container class="justify-center">
              <v-card-title class="justify-center">
                <p class="text-h4">
                  Login
                </p>
              </v-card-title>
              <v-card-text>
                <v-row justify="center" class="pa-5">
                  <v-col align="center" cols="12" lg="4" md="4" sm="4">
                    <v-btn width="130" href="/student/login">
                      <v-icon left>face</v-icon>
                      Student
                    </v-btn>
                  </v-col>
                  <v-col align="center" cols="12" lg="4" md="4" sm="4">
                    <v-btn width="130" href="/faculty/login">
                      <v-icon left>account_box </v-icon>
                      Faculty
                    </v-btn>
                  </v-col>
                  <v-col align="center" cols="12" lg="4" md="4" sm="4">
                    <v-btn width="130" href="/admin/login">
                      <v-icon left>admin_panel_settings </v-icon>
                      Admin
                    </v-btn>
                  </v-col>
                  <!-- <v-col>
                    <cleave
                      v-model="cardNumber"
                      :options="options"
                      name="card"
                    />
                  </v-col> -->
                </v-row>
              </v-card-text>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
export default {
  data() {
    return {};
  },

  layout: "login",

  methods: {}
};
</script>
