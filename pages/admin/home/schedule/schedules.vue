<template>
  <v-main class="indigo lighten-5">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="3" lg="2" sm="12">
          <SIDEBAR :flag="flag" btn1="Schedules" btn2="Add Schedule" />
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
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SIDEBAR from "@/components/admin/sideBar";
import SCHEDULES from "@/components/admin/schedule/schedules";
import SCHEDULEFORM from "@/components/admin/schedule/scheduleForm";
export default {
  layout: "admin",
  components: { SIDEBAR, SCHEDULES, SCHEDULEFORM },
  data() {
    return {};
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
    async getScheduleList() {
      const res = await axios.get(
        "http://localhost:3000/admin/home/getschedulelist"
      );
      if (res.data) {
        this.schedules = res.data;
        this.flag = "schedule";
      }
    }
  }
};
</script>
