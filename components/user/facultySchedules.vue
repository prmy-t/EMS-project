<template>
  <div>
    <v-card v-if="schedules.length > 0 && flag == 'schedule'">
      <v-card-title
        ><v-icon color="primary" left large>star</v-icon> Available Schedules
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" v-for="(schedule, index) in schedules" :key="index">
            <!-- <v-card> </v-card> -->
            <v-card rounded="lg" class="mr-1 ml-3">
              <v-row>
                <v-col cols="9">
                  <v-card-title class="font-weight-bold text-h5">
                    {{ schedule.title }}</v-card-title
                  >
                  <v-card-subtitle>
                    <p class="text-subtitle-1">
                      Branch: {{ schedule.branch }} | Sem:
                      {{ schedule.sem }}
                    </p></v-card-subtitle
                  >
                </v-col>
                <v-col>
                  <!-- <template v-slot:activator="{ on, attrs }"> -->
                  <v-btn @click="scheduleDetail(schedule)" color="primary"
                    >Details</v-btn
                  >
                  <!-- </template> -->
                </v-col></v-row
              >

              <!-- <v-card-actions> --><v-container
              > </v-container>
              <!-- </v-card-actions> -->
            </v-card>
            <v-dialog v-model="detailsDialog" width="900">
              <DETAIL :item="item" @refresh="closeDialog" />
            </v-dialog>
            <v-snackbar text color="primary" v-model="snackbar" timeout="3000">
              <v-icon color="primary" left>check_circle</v-icon>
              {{ text }}
            </v-snackbar>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card height="600" v-if="schedules.length <= 0 && flag == 'schedule'">
      <v-container>
        <p class="text-h5" align="center">
          <v-icon large left>sentiment_very_dissatisfied </v-icon>
          No Schedules found
        </p>
        <p class="mt-12 text-h6" align="Center">
          You can create one from
          <v-icon>add </v-icon>Add Schedule
        </p></v-container
      >
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import DETAIL from "@/components/admin/schedule/facultyDetailDialog";

export default {
  components: { DETAIL },
  data() {
    return {
      snackbar: false,
      text: "",
      schedules: {},
      detailsDialog: false,
      editDialog: false,
      deleteDialog: false,
      instDialog: false,
      inst: null,
      item: {},
      instId: null,
      decValue: ["Declare", "Undeclare"],
      deleteScheduleData: {},
      inst: ""
    };
  },
  mounted() {
    this.scheduleRefresh();
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
    async scheduleRefresh() {
      const res = await axios.get(
        "https://ems-server0.herokuapp.com/admin/home/getschedulelist"
      );

      if (res.data) {
        this.schedules = res.data;

        // this.dataLength = res.data.length;
        // this.flag = "schedule";
      }
    },
    scheduleDetail(item) {
      this.item = item;
      this.detailsDialog = true;
    },
    async findSchedule(id) {
      const res = await axios.post(
        "https://ems-server0.herokuapp.com/admin/home/findschedule",
        { id }
      );
      this.deleteScheduleData = res.data;
    },
    async deleteSchedule() {
      const id = this.deleteScheduleData._id;
      const res = await axios.post(
        "https://ems-server0.herokuapp.com/admin/home/deleteschedule",
        { id }
      );
      if (res) {
        this.deleteDialog = false;
        this.scheduleRefresh();
      }
    },
    editSchedule(schedule) {
      this.item = schedule;
      console.log(this.item);
      this.flag = "addSchedule";
    },
    openInstruction(item) {
      // console.log(, item.instruction);
      this.instId = item._id;
      this.inst = item.instruction;
    },
    async addInstruction(instruction) {
      let id = this.instId;
      let inst = instruction;

      const res = await axios.post(
        "https://ems-server0.herokuapp.com/admin/home/addinstruction",
        { id, inst }
      );
      if (res) {
        this.instDialog = false;
        this.scheduleRefresh();
      }
    },
    async declareSchedule(id, value) {
      const declare = value;
      const res = await axios.post(
        "https://ems-server0.herokuapp.com/admin/home/scheduledeclare",
        { id, declare }
      );
      if (res.data) {
        this.scheduleRefresh();
        this.text = value + "d successfully.";
        this.snackbar = true;
      } else console.log("error");
    },
    closeDialog() {
      this.detailsDialog = false;
      this.editDialog = false;
    }
  }
};
</script>
