<template>
  <div>
    <div class="text-center max-w-xs m-auto mb-10">
      <h1 class="uppercase font-semibold text-gray-800 mb-1 text-lg">Leaderboard</h1>
      <h2 class="text-gray-600 text-sm mb-5">Total kms June 7 - July 4</h2>
      <div v-if="!$fetchState.pending" class="flex flex-col text-xl space-y-4">
        <div
          class="flex justify-between border rounded-lg border-yellow-300 bg-yellow-50 py-2 px-4 items-center"
        >
          <div class="flex space-x-2 items-center">
            <span>🥇</span
            ><span class="text-sm font-semibold text-yellow-700">{{
              totalKmsPerUser[0].name
            }}</span>
          </div>
          <div class="text-sm font-semibold text-yellow-700">
            {{ totalKmsPerUser[0].total }} km
          </div>
        </div>
        <div
          class="flex justify-between border rounded-lg border-gray-400 bg-gray-50 py-2 px-4 items-center"
        >
          <div class="flex space-x-2 items-center">
            <span>🥈</span
            ><span class="text-sm font-semibold text-gray-700">{{
              totalKmsPerUser[1].name
            }}</span>
          </div>
          <div class="text-sm font-semibold text-gray-700">
            {{ totalKmsPerUser[1].total }} km
          </div>
        </div>
        <div
          class="flex justify-between border rounded-lg bg-yellow-800 bg-opacity-10 border-yellow-800 py-2 px-4 items-center"
        >
          <div class="flex space-x-2 items-center">
            <span
              >🥉</span
            ><span class="text-sm font-semibold text-yellow-900">{{
              totalKmsPerUser[2].name
            }}</span>
          </div>
          <div class="text-sm font-semibold text-yellow-900">
            {{ totalKmsPerUser[2].total }} km
          </div>
        </div>
      </div>
    </div>
    <h2 class="uppercase font-semibold text-gray-800 mb-1 text-center text-lg">Weekly stats</h2>
    <h3 class="text-gray-600 text-sm mb-5 text-center">Minimum per week: 20km</h3>
    <div
      class="grid md:grid-cols-2 xl:grid-cols-4 gap-4"
      v-if="!$fetchState.pending"
    >
      <div
        v-for="week in weeklyActivityKms"
        :key="week.id"
        class="border-gray-200 border bg-gray-50 rounded p-4"
      >
        <div class="text-center">
          <h3 class="uppercase font-semibold tracking-wide">Week {{ week.id }}</h3>
          <h3 class="uppercase text-gray-700 tracking-wide text-xs">
            {{ week.dates }}
          </h3>
        </div>
        <div class="flex space-x-2 mt-4 justify-evenly">
          <div class="flex flex-col items-center space-y-1">
            <div class="text-sm">
              Carson
            </div>
            <div
              :class="[
                week.carsonKms < 20
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              ]"
              class="text-lg p-1 rounded-md"
            >
              {{ week.carsonKms }}
              km
            </div>
          </div>
          <div class="flex flex-col items-center space-y-1">
            <div class="text-sm">
              Calvin
            </div>
            <div
              :class="[
                week.calvinKms < 20
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              ]"
              class="text-lg p-1 rounded-md"
            >
              {{ week.calvinKms }}
              km
            </div>
          </div>
          <div class="flex flex-col items-center space-y-1">
            <div class="text-sm">
              Aaron
            </div>
            <div
              :class="[
                week.aaronKms < 20
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              ]"
              class="text-lg p-1 rounded-md"
            >
              {{ week.aaronKms }}
              km
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
// https://javascript.plainenglish.io/strava-api-react-app-326e63527e2c

// http://www.strava.com/oauth/authorize?client_id=66903&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all

export default {
  data() {
    return {
      calvinsActivities: [],
      carsonsActivities: [],
      aaronsActivities: [],
      weeklyActivityKms: [
        {
          id: 1,
          dates: "June 7 - June 13",
          from: "2021-06-07T04:00:00Z",
          to: "2021-06-14T03:59:59Z",
          calvinKms: 0,
          carsonKms: 0,
          aaronKms: 0
        },
        {
          id: 2,
          dates: "June 14 - June 20",
          from: "2021-06-14T04:00:00Z",
          to: "2021-06-21T03:59:59Z",
          calvinKms: 0,
          carsonKms: 0,
          aaronKms: 0
        },
        {
          id: 3,
          dates: "June 21 - June 27",
          from: "2021-06-21T04:00:00Z",
          to: "2021-06-27T03:59:59Z",
          calvinKms: 0,
          carsonKms: 0,
          aaronKms: 0
        },
        {
          id: 4,
          dates: "June 28 - July 4",
          from: "2021-05-01T04:00:00Z",
          to: "2021-06-03T03:59:59Z",
          calvinKms: 0,
          carsonKms: 0,
          aaronKms: 0
        }
      ]
    };
  },
  computed: {
    totalKmsPerUser() {
      const carsonTotal = this.weeklyActivityKms.reduce(
        (a, { carsonKms }) => +a + +carsonKms,
        0
      );
      const calvinTotal = this.weeklyActivityKms.reduce(
        (a, { calvinKms }) => +a + +calvinKms,
        0
      );
      const aaronTotal = this.weeklyActivityKms.reduce(
        (a, { aaronKms }) => +a + +aaronKms,
        0
      );
      const totals = [
        { name: "Carson", total: parseFloat(carsonTotal).toFixed(1) },
        { name: "Calvin", total: parseFloat(calvinTotal).toFixed(1) },
        { name: "Aaron", total: parseFloat(aaronTotal).toFixed(1) }
      ];
      return totals.sort((a, b) =>
        parseFloat(a.total) > parseFloat(b.total) ? -1 : 1
      );
    }
  },
  async fetch() {
    const calvinsActivities = await this.$axios.$get(
      `/api/v1/activities/calvin`
    );
    this.calvinsActivities = calvinsActivities.data;

    const carsonsActivities = await this.$axios.$get(
      `/api/v1/activities/carson`
    );
    this.carsonsActivities = carsonsActivities.data;

    const aaronsActivities = await this.$axios.$get(`/api/v1/activities/aaron`);
    this.aaronsActivities = aaronsActivities.data;

    this.formatWeeklyData();
    this.loading = false
  },
  methods: {
    formatWeeklyData() {
      this.weeklyActivityKms.forEach(week => {
        week.calvinKms = this.getTotalKmsForDateRange(
          this.calvinsActivities,
          week.from,
          week.to
        );
        week.carsonKms = this.getTotalKmsForDateRange(
          this.carsonsActivities,
          week.from,
          week.to
        );
        week.aaronKms = this.getTotalKmsForDateRange(
          this.aaronsActivities,
          week.from,
          week.to
        );
      });
    },
    isBetweenDates(dateToCheck, fromDate, toDate) {
      return (
        new Date(fromDate).getTime() <= new Date(dateToCheck).getTime() &&
        new Date(dateToCheck).getTime() <= new Date(toDate).getTime()
      );
    },
    getTotalKmsForDateRange(data, fromDate, toDate) {
      if (data.length) {
        const filteredActivities = data.filter(activity => {
          return (
            activity.type === "Run" &&
            this.isBetweenDates(activity.start_date, fromDate, toDate)
          );
        });
        const totalDistance = filteredActivities.reduce(
          (a, { distance }) => a + distance,
          0
        );
        const totalDistanceInKm = parseFloat(totalDistance) * 0.001;
        return parseFloat(totalDistanceInKm).toFixed(1);
      }
      return parseFloat(0).toFixed(1);
    }
  }
};
</script>
