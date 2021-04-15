<template>
  <v-container>
    <v-row>
      <v-col>
        <GENERATEMENU
          cardTitle="Get Sheet"
          btn="Get Sheet"
          @dataPass="getSheet"
        />

        <GETSHEET
          v-if="resultData.length > 0"
          :sheetData="resultData"
          :headerText="headerText"
          :title="scheduleTitle"
        />
      </v-col>
    </v-row>
    <v-row></v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import GENERATEMENU from "@/components/admin/result/generateMenu";
import GETSHEET from "@/components/admin/result/getSheet";
import GENERATEDSHEET from "@/components/admin/result/generatedSheet";
import admin from "../../layouts/admin.vue";
export default {
  components: { admin, GENERATEDSHEET, GETSHEET, GENERATEMENU },
  mounted() {},
  props: {
    btn: String
  },
  data() {
    return {
      sem: Number,
      sems: [1, 2, 3, 4, 5, 6, 7, 8],
      scheduleArray: [],
      scheduleTitles: [],
      scheduleIds: [],
      selectedTitle: String,
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
    },
    activeUser: {
      get() {
        return this.$store.state.user.activeUser;
      },

      set(activeUserObj) {
        this.$store.commit("user/SET_ACTIVEUSER", activeUserObj);
      }
    }
  },
  methods: {
    getIn(index) {
      this.titleIndex = this.scheduleTitles.indexOf(index);
    },
    async findSchedule(sem) {
      const branch = this.activeUser.branch;
      const userId = this.activeUser._id;
      const res = await axios.post(
        "https://ems-server0.herokuapp.com/student/result/getschedulelist",
        { sem, branch, userId }
      );
      if (res) {
        this.scheduleArray = res.data;
        let array = res.data;
        for (let i in array) {
          this.scheduleTitles.push(array[i].title);
          this.scheduleIds.push(array[i]._id);
        }
      }
    },
    async getResult() {
      let scheduleId = this.scheduleIds[
        this.scheduleTitles.indexOf(this.selectedTitle)
      ];

      let userEmail = this.activeUser.email;
      const res = await axios.post(
        "https://ems-server0.herokuapp.com/student/result/getresult",
        { scheduleId, userEmail }
      );
      if (res) {
        this.$emit("dataPass", res.data, this.selectedTitle);
      }
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
    }
  }
};
</script>
