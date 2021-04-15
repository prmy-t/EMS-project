<template>
  <v-app id="inspire">
    <v-app-bar dark app flat color="indigo darken-2">
      <v-avatar class="mr-5" size="32">
        <img alt="Avatar" src="../static/icon.png" />
      </v-avatar>
      <v-toolbar-title
        :class="{ 'text-subtitle-2': this.$vuetify.breakpoint.xs }"
        >Examination Management System</v-toolbar-title
      >
      <!-- <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab class="text-subtitle-2" @click="list">
            <v-icon left>list</v-icon>
            List
          </v-tab>
          <v-tab @click="schedule">
            <v-icon left>schedule</v-icon>
            Schedule</v-tab
          >
          <v-tab @click="result">
            <v-icon left>description</v-icon>
            Result</v-tab
          
        </v-tabs>
      </template> -->
      <v-spacer></v-spacer>
    </v-app-bar>

    <nuxt />
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/footer";

export default {
  components: { Footer },
  data() {
    return {
      items: ["List", "Schedule"]
    };
  },
  computed: {
    isLoggedIn: {
      get() {
        return this.$store.state.auth.isLoggedIn;
      },
      set(isLoggedIn) {
        this.$store.commit("auth/SET_ISLOGGEDIN", isLoggedIn);
      }
    }
  },
  mounted() {
    this.reVerify();
  },
  methods: {
    login() {
      this.$router.push("/login");
    },

    reVerify() {
      this.$store.dispatch("auth/reVerify");
    }
  },
  computed: {
    isLoggedIn: {
      get() {
        return this.$store.state.auth.isLoggedIn;
      },
      set(status) {
        this.$store.commit("auth/SET_IS_LOGGEDIN", status);
      }
    }
  }
};
</script>
<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
