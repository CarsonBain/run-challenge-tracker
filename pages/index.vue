<template>
  <div>
    <div class="text-center max-w-xs m-auto mb-10">
      <h1 class="uppercase font-semibold text-gray-800 mb-5">Leader board</h1>
      <div class="flex flex-col text-xl space-y-4">

      <div class="flex justify-between border rounded-lg border-yellow-200 bg-yellow-50 py-2 px-4 items-center">

        <div class="flex space-x-2 items-center">
          <span class="text-xs rounded-full bg-yellow-100 text-yellow-500 border border-yellow-500 w-4 h-4 flex items-center justify-center">1</span><span class="text-sm font-semibold">Calvin</span></div>
        <div class="text-sm font-semibold">40.5km</div>
      </div>
      <div class="flex justify-between border rounded-lg border-gray-200 bg-gray-50 py-2 px-4 items-center">

        <div class="flex space-x-2 items-center">
          <span class="text-xs rounded-full bg-gray-100 text-gray-500 border border-gray-500 w-4 h-4 flex items-center justify-center">2</span><span class="text-sm font-semibold">Calvin</span></div>
        <div class="text-sm font-semibold">40.5km</div>
      </div>
      <div class="flex justify-between border rounded-lg border-gray-200 py-2 px-4 items-center">

        <div class="flex space-x-2 items-center">
          <span class="text-xs rounded-full bg-yellow-900 text-yellow-100 border border-yellow-900 w-4 h-4 flex items-center justify-center">3</span><span class="text-sm font-semibold">Calvin</span></div>
        <div class="text-sm font-semibold">40.5km</div>
      </div>
      </div>
    </div>
    <h2 class="uppercase font-semibold text-gray-800 mb-5">Weekly stats</h2>
    <div
      class="grid md:grid-cols-2 xl:grid-cols-4 gap-4"
      v-if="!$fetchState.pending"
    >
      <div v-for="week in weeklyActivityKms" :key="week.id" class="border-gray-200 border bg-gray-50 rounded p-4">
        <div class="text-center">
          <h3 class="uppercase font-bold tracking-wide">
            Week {{ week.id }}
          </h3>
          <h3 class="uppercase text-gray-700 tracking-wide text-xs">
            {{ week.dates }}
          </h3>
        </div>
        <div class="flex space-x-2 mt-4 justify-evenly">
          <div class="flex flex-col items-center space-y-1">
            <div>
              Carson
            </div>
            <div class="text-xl bg-red-100 text-red-700 p-1 rounded-md">
              {{ week.carsonKms }}
              km
            </div>
          </div>
          <div class="flex flex-col items-center space-y-1">
            <div>
              Calvin
            </div>
            <div class="text-xl bg-green-100 text-green-700 p-1 rounded-md">
              {{ week.calvinKms }}
              km
            </div>
          </div>
          <div class="flex flex-col items-center space-y-1">
            <div>
              Aaron
            </div>
            <div class="text-xl bg-green-100 text-green-700 p-1 rounded-md">
              {{ week.calvinKms }}
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
      weeklyActivityKms: [
        {
          id: 1,
          dates: 'June 7 - 13',
          from: "2021-05-01T00:00:00.000Z",
          to: "2021-06-03T00:00:00.000Z",
          calvinKms: 0,
          carsonKms: 0
        },
        {
          id: 2,
          dates: 'June 7 - 13',
          from: "2021-05-01T00:00:00.000Z",
          to: "2021-06-03T00:00:00.000Z",
          calvinKms: 0,
          carsonKms: 0
        },
        {
          id: 3,
          dates: 'June 7 - 13',
          from: "2021-05-01T00:00:00.000Z",
          to: "2021-06-03T00:00:00.000Z",
          calvinKms: 0,
          carsonKms: 0
        },
        {
          id: 4,
          dates: 'June 7 - 13',
          from: "2021-05-01T00:00:00.000Z",
          to: "2021-06-03T00:00:00.000Z",
          calvinKms: 0,
          carsonKms: 0
        },
      ]
    };
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
    this.formatWeeklyData();
  },
  methods: {
    formatWeeklyData() {
      this.weeklyActivityKms.forEach(week => {
        week.calvinKms = this.getTotalKmsForDateRange(this.calvinsActivities, week.from, week.to);
        week.carsonKms = this.getTotalKmsForDateRange(this.carsonsActivities, week.from, week.to);
      })    
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
      return 0;
    },
  }
};
</script>
