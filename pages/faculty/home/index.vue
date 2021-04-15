<template>
  <v-main class="indigo lighten-5">
    <v-container class="ml-1">
      <v-row>
        <v-col md="2">
          <SIDEBAR :badge="badge" />
        </v-col>

        <v-col lg="10">
          <v-sheet class="ml-8" width="1100" rounded="lg">
            <PROFILE v-if="flag === 'profile'" />
            <SCHEDULES v-if="flag === 'schedule'" :schedules="schedules" />

            <RESULTMENU v-if="flag === 'result'" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import SIDEBAR from "@/components/user/sideBar";
import PROFILE from "@/components/user/facultyProfile";
import SCHEDULES from "@/components/user/facultySchedules";
import RESULTMENU from "@/components/user/facultyResultMenu";
import RESULTCARD from "@/components/user/resultCard";
export default {
  components: { SIDEBAR, PROFILE, SCHEDULES, RESULTMENU, RESULTCARD },
  data() {
    return {
      model: "",
      schedules: [],
      badge: 0
    };
  },
  mounted() {
    const pin = this.$getCookie("token");
    if (!pin) {
      this.$router.push("/faculty/login");
    } else this.getScheduleList();
  },
  methods: {
    async getScheduleList() {
      this.$store.dispatch("auth/reVerify");
      const id = this.activeUser._id;
      console.log("user: " + this.activeUser._id);

      const res = await axios.post(
        "https://ems-server0.herokuapp.com/faculty/home/getschedulelist",
        { id }
      );

      if (res.data) {
        console.log(res.data);
        this.schedules = res.data;
        // this.badge = this.schedules.length;
      }
    }
  },
  computed: {
    flag: {
      get() {
        return this.$store.state.general.flag;
      },
      set(flag) {
        this.$store.commit("general/SET_FLAG", flag);
      }
    },
    isLoggedIn: {
      get() {
        return this.$store.state.auth.isLoggedIn;
      },
      set(status) {
        this.$store.commit("auth/SET_IS_LOGGEDIN", status);
      }
    },
    activeUser: {
      get() {
        return this.$store.state.user.activeUser;
      },

      set(activeUserObj) {
        this.$store.commit("user/SET_ACTIVEUSER", activeUserObj);
      }
    }
  }
};
</script>
