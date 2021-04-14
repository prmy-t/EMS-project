<template>
  <!-- SIDE_BAR_SHEET -->
  <v-main class="indigo lighten-5">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3" lg="2" sm="12">
          <SIDEBAR btn1="Student List" btn2="Faculty List" />
        </v-col>

        <!-- MAIN_SHEET -->
        <v-col cols="12" md="9" lg="10" sm="12">
          <!-- <v-sheet width="auto" height="auto" rounded="lg"> -->
          <PROFILE v-if="flag === 'profile'" />
          <STUDENTTABLE v-if="flag === 'student'" />
          <FACULTYTABLE v-if="flag === 'faculty'" />
          <!-- </v-sheet> -->
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SIDEBAR from "@/components/admin/sideBar";
import STUDENTTABLE from "@/components/admin/list/studentTable";
import FACULTYTABLE from "@/components/admin/list/facultyTable";
export default {
  layout: "admin",
  components: { SIDEBAR, STUDENTTABLE, FACULTYTABLE },
  computed: {
    flag: {
      get() {
        return this.$store.state.general.flag;
      },
      set(flag) {
        this.$store.commit("general/SET_FLAG", flag);
      }
    }
  },
  mounted() {
    const pin = this.$getCookie("token");
    if (!pin) {
      this.$router.push("/admin/login");
    } else this.flagValue();
  },
  methods: {
    flagValue() {
      this.flag = "student";
    }
  }
};
</script>
