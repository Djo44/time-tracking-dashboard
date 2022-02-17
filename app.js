const aktivnosti = document.querySelectorAll(".title");
const currentHours = document.querySelectorAll(".hours");
const previousHours = document.querySelectorAll(".last-week");
const dailyBtn = document.querySelector(".daily");
const weeklyBtn = document.querySelector(".weekly");
const monthlyBtn = document.querySelector(".monthly");

let parametar;
/* procesData(data) */
function getData() {
  fetch("./data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //display data from API into .title class
      const displayTitle = () => {
        let activities = data.map(function (activity) {
          return activity.title;
        });

        aktivnosti.forEach((element, index) => {
          element.innerHTML = activities[index];
        });
      };

      // get hours data from data.json
      let getHours = data.map(function (hrs) {
        return hrs.timeframes;
      });

      const getDailyHours = () => {
        currentHours.forEach((element, index) => {
          element.innerHTML = `${getHours[index].daily.current}hrs`;
        });

        previousHours.forEach((element, index) => {
          element.innerHTML = `Last Day - ${getHours[index].daily.previous}hrs`;
        });
      };

      const getWeeklyHours = () => {
        currentHours.forEach((element, index) => {
          element.innerHTML = `${getHours[index].weekly.current}hrs`;
        });

        previousHours.forEach((element, index) => {
          element.innerHTML = `Last Week - ${getHours[index].weekly.previous}hrs`;
        });
      };

      const getMonthlyHours = () => {
        currentHours.forEach((element, index) => {
          element.innerHTML = `${getHours[index].monthly.current}hrs`;
        });

        previousHours.forEach((element, index) => {
          element.innerHTML = `Last Month - ${getHours[index].monthly.previous}hrs`;
        });
      };

      getWeeklyHours();
      displayTitle();

      dailyBtn.addEventListener("click", function () {
        getDailyHours();
        dailyBtn.style.color = "white";
        weeklyBtn.style.color = "hsl(235, 45%, 61%)";
        monthlyBtn.style.color = "hsl(235, 45%, 61%)";
      });

      weeklyBtn.addEventListener("click", function () {
        getWeeklyHours();
        dailyBtn.style.color = "hsl(235, 45%, 61%)";
        weeklyBtn.style.color = "white";
        monthlyBtn.style.color = "hsl(235, 45%, 61%)";
      });

      monthlyBtn.addEventListener("click", function () {
        getMonthlyHours();
        dailyBtn.style.color = "hsl(235, 45%, 61%)";
        weeklyBtn.style.color = "hsl(235, 45%, 61%)";
        monthlyBtn.style.color = "white";
      });
    });
}

getData();
