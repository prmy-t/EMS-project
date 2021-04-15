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
            btn1="Result Sheets"
            btn2="Edit Sheets"
            @refresh="resetValues"
          />
        </v-col>
        <v-col cols="12" md="9" lg="10" sm="12">
          <!-- RESULT SHEET -->
          <div v-if="flag === 'resultSheets'">
            <v-card flat rounded="lg">
              <GENERATEMENU
                cardTitle="Get Sheet"
                btn="Get Sheet"
                @dataPass="getSheet"
              />
            </v-card>

            <GETSHEET
              class="mt-2"
              v-if="resultData.length > 0"
              :sheetData="resultData"
              :headerText="headerText"
              :title="scheduleTitle"
            />
          </div>

          <!-- EDIT SHEET -->
          <div v-if="flag === 'editSheets'">
            <v-card flat rounded="lg">
              <GENERATEMENU
                cardTitle="Generate Sheet"
                btn="Generate Sheet"
                @dataPass="generateSheet"
              />
            </v-card>

            <GENERATEDSHEET
              class="mt-2"
              v-if="displayData.length > 0"
              :sheetData="displayData"
              :semData="semData"
              :title="scheduleTitle"
              :id="scheduleId"
              :rooms="rooms"
              :capacity="capacity"
            />
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
import SIDEBAR from "@/components/admin/AdminSideBar";
import GENERATEMENU from "@/components/admin/result/generateMenu";
import GETSHEET from "@/components/admin/result/getSheet";
import GENERATEDSHEET from "@/components/admin/result/generatedSheet";
export default {
  layout: "admin",
  components: { SIDEBAR, GENERATEMENU, GETSHEET, GENERATEDSHEET },
  data() {
    return {
      snackbar: false,
      model: 1,
      sheetData: [],
      displayData: [],
      scheduleTitle: "",
      scheduleId: String,
      rooms: Number,
      capacity: Number,
      headerText: [],
      resultData: [],
      semData: Number,
      objectKeys: [],
      search: ""
    };
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
  mounted() {
    const pin = this.$getCookie("token");
    if (!pin) {
      this.$router.push("/admin/login");
    } else this.flagValue();
  },
  methods: {
    profileEvent() {
      this.snackbar = true;
    },
    resetValues() {
      this.displayData = [];
      this.semData = null;
      this.scheduleTitle = null;
      this.scheduleId = null;
    },
    flagValue() {
      this.flag = "resultSheets";
    },
    getSheet(data, sem, title) {
      this.scheduleTitle = title;
      let students = data.students;
      this.resultData = [];
      for (let i in students) {
        let subjects = students[i]["subjects"];
        let student = {};
        let j = 0;
        student.firstName = students[i].firstName;
        student.lastName = students[i].lastName;
        student.examId = students[i].examId;
        this.headerText = Object.keys(students[i]["subjects"]);
        student.subjects = this.headerText;
        for (let sub in subjects) {
          student[j] = subjects[sub];
          j++;
        }
        console.log(students[i]);
        student.cgpa = students[i].cgpa;
        student.backLog = students[i].backLog;
        this.resultData.push(student);
      }
    },
    generateSheet(data, sem, title, titleId) {
      this.scheduleTitle = title;
      this.scheduleId = titleId;
      this.sheetData = data.students;
      this.displayData = data.students;
      this.rooms = data.rooms;
      this.capacity = data.capacity;
      this.semData = sem;
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
