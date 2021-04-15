<template>
  <v-main class="indigo lighten-5">
    <v-container class="indigo darken-1" fluid>
      <v-row justify="start" dense>
        <v-col align="center" md="2" lg="1" sm="2" cols="12">
          <v-btn @click="list" dark text>List</v-btn>
        </v-col>

        <v-col align="center" md="2" lg="1" sm="3" cols="12">
          <v-btn @click="schedule" dark text>Schedules</v-btn>
        </v-col>

        <v-col align="center" md="2" lg="1" sm="3" cols="12">
          <v-btn @click="result" dark text>Results</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3" lg="2" sm="12">
          <SIDEBAR
            @profileEvent="profileEvent"
            :flag="flag"
            btn1="Schedules"
            btn2="Add Schedule"
          />
        </v-col>
        <!-- Schedule List -->
        <v-col cols="12" md="9" lg="10" sm="12">
          <div v-if="flag == 'schedule'">
            <SCHEDULES @refresh="getScheduleList" />
          </div>
          <!-- Add Schedule -->
          <div v-if="flag == 'addSchedule'">
            <SCHEDULEFORM @refresh="getScheduleList" />
          </div>
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        Admin dosen't need Profile 😀

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SIDEBAR from "@/components/admin/AdminSideBar";
import SCHEDULES from "@/components/admin/schedule/schedules";
import SCHEDULEFORM from "@/components/admin/schedule/scheduleForm";
export default {
  layout: "admin",
  components: { SIDEBAR, SCHEDULES, SCHEDULEFORM },
  data() {
    return {
      snackbar: false
    };
  },

  mounted() {
    const pin = this.$getCookie("token");
    if (!pin) {
      this.$router.push("/admin/login");
    } else this.getScheduleList();
  },
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
  methods: {
    profileEvent() {
      this.snackbar = true;
    },
    async getScheduleList() {
      const res = await axios.get(
        "http://localhost:3000/admin/home/getschedulelist"
      );
      if (res.data) {
        this.schedules = res.data;
        this.flag = "schedule";
      }
    },
    list() {
      this.$router.push("/admin/home/list");
    },
    schedule() {
      this.$router.push("/admin/home/schedule/schedules");
    },
    result() {
      this.$router.push("/admin/home/result");
    }
  }
};
</script>
