var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon"),
  themeToggleLightIcon = document.getElementById("theme-toggle-light-icon"),
  themeToggleBtn = document.getElementById("theme-toggle");
"dark" === localStorage.getItem("color-theme") ||
(!("color-theme" in localStorage) &&
  window.matchMedia("(prefers-color-scheme: dark)").matches)
  ? (document.documentElement.classList.add("dark"),
    (themeToggleBtn.checked = !1))
  : (document.documentElement.classList.remove("dark"),
    (themeToggleBtn.checked = !0)),
  [themeToggleDarkIcon, themeToggleLightIcon, themeToggleBtn].forEach((e) => {
    e.addEventListener("click", function (e) {
      return (
        e.stopPropagation(),
        localStorage.getItem("color-theme")
          ? "light" === localStorage.getItem("color-theme")
            ? (document.documentElement.classList.add("dark"),
              localStorage.setItem("color-theme", "dark"),
              void (themeToggleBtn.checked = !1))
            : (document.documentElement.classList.remove("dark"),
              localStorage.setItem("color-theme", "light"),
              void (themeToggleBtn.checked = !0))
          : document.documentElement.classList.contains("dark")
          ? (document.documentElement.classList.remove("dark"),
            void localStorage.setItem("color-theme", "light"))
          : (document.documentElement.classList.add("dark"),
            void localStorage.setItem("color-theme", "dark"))
      );
    });
  });
let sideBarBtn = document.getElementById("sidebar-btn"),
  sideBarExpandBtn = document.getElementById("sidebar-expand"),
  layout = document.getElementById("layout");
function collapseSideBar() {
  window.innerWidth < 650 &&
    !sideBarBtn.classList.contains("reverse") &&
    sideBarBtn.click();
}
function toggleFullScreen() {
  var e = window.document,
    t = e.documentElement,
    a =
      t.requestFullscreen ||
      t.mozRequestFullScreen ||
      t.webkitRequestFullScreen ||
      t.msRequestFullscreen,
    l =
      e.exitFullscreen ||
      e.mozCancelFullScreen ||
      e.webkitExitFullscreen ||
      e.msExitFullscreen;
  e.fullscreenElement ||
  e.mozFullScreenElement ||
  e.webkitFullscreenElement ||
  e.msFullscreenElement
    ? l.call(e)
    : a.call(t);
}
sideBarBtn.addEventListener("click", function (e) {
  layout.classList.toggle("grid-cols-[257px,1fr]"),
    layout.classList.toggle("minimize"),
    sideBarBtn.classList.toggle("reverse");
}),
  window.addEventListener("resize", collapseSideBar),
  window.addEventListener("load", collapseSideBar),
  sideBarExpandBtn.addEventListener("click", toggleFullScreen);
const dropdownContent = document.querySelectorAll(".dropdown-label");
function checkAndCloseDropDown(e) {
  let t = e.currentTarget;
  t &&
    t.matches(":focus") &&
    setTimeout(function () {
      t.blur();
    }, 0);
}
dropdownContent &&
  dropdownContent.forEach((e) => {
    e.addEventListener("mousedown", (e) => checkAndCloseDropDown(e));
  });
const Utils = ChartUtils.init(),
  DATA_COUNT = 12,
  NUMBER_CFG = { count: 12, min: 0, max: 100 },
  ctx = document.getElementById("performanceChart"),
  labels = Utils.months({ count: 12 }),
  data = {
    labels: labels,
    datasets: [
      {
        label: "Occupied",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: "#FC8D9D",
        fill: !0,
      },
      {
        label: "Vacant",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: "#F3BCFD",
        fill: !0,
      },
      {
        label: "Maintenance",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: "#80B7FB",
        fill: !0,
      },
      {
        label: "Reserved",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: "#B9A2FB",
        fill: !0,
      },
    ],
  },
  config = {
    type: "line",
    data: data,
    options: {
      responsive: !0,
      plugins: {
        title: { display: !1 },
        tooltip: { mode: "index" },
        legend: {
          align: "start",
          labels: {
            boxWidth: 16,
            boxHeight: 16,
            usePointStyle: !0,
            pointStyle: "rectRounded",
          },
        },
      },
      interaction: { mode: "nearest", axis: "x", intersect: !1 },
      scales: {
        x: { title: { display: !1 } },
        y: { stacked: !1, display: !1, title: { display: !1 } },
      },
    },
  };
if (ctx) {
  new Chart(ctx, config);
}
const ctxRevenue = document.getElementById("revenueChart"),
  dataRevenue = {
    labels: labels,
    datasets: [
      {
        label: "Direct",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: "#5415F1",
        fill: !0,
      },
      {
        label: "Social",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: "#DD50D6",
        fill: !0,
      },
    ],
  },
  configRevenue = {
    type: "line",
    data: dataRevenue,
    options: {
      responsive: !0,
      plugins: {
        title: { display: !1 },
        tooltip: { mode: "index" },
        legend: {
          align: "start",
          labels: {
            boxWidth: 16,
            boxHeight: 16,
            usePointStyle: !0,
            pointStyle: "rectRounded",
          },
        },
      },
      interaction: { mode: "nearest", axis: "x", intersect: !1 },
      scales: {
        x: { display: !1, title: { display: !1 } },
        y: { stacked: !1, display: !1, title: { display: !1 } },
      },
    },
  };
if (ctxRevenue) {
  new Chart(ctxRevenue, configRevenue);
}
const ctxVisit = document.getElementById("visitChart"),
  dataVisit = {
    labels: ["Direct", "Social", "Email", "Other"],
    datasets: [
      {
        label: "",
        data: [300, 50, 100, 150],
        backgroundColor: ["#FC8D9D", "#F3BCFD", "#80B7FB", "#B9A2FB"],
        hoverOffset: 4,
      },
    ],
  },
  configVisit = {
    type: "doughnut",
    data: dataVisit,
    options: {
      responsive: !0,
      plugins: {
        title: { display: !1 },
        tooltip: { mode: "index" },
        legend: {
          align: "start",
          labels: {
            boxWidth: 16,
            boxHeight: 16,
            usePointStyle: !0,
            pointStyle: "rectRounded",
          },
        },
      },
    },
  };
if (ctxVisit) {
  new Chart(ctxVisit, configVisit);
}
const ctxDepartment = document.getElementById("departmentChart"),
  dataDepartment = {
    labels: ["Grocery", "Laptop", "Gaming", "Others"],
    datasets: [
      {
        label: "",
        data: [100, 100, 100, 100],
        backgroundColor: ["#2775FF", "#50D1B2", "#7364DB", "#E23738"],
        hoverOffset: 4,
        borderWidth: 0,
        borderRadius: 14,
      },
    ],
  },
  configDepartment = {
    type: "doughnut",
    data: dataDepartment,
    options: {
      cutout: 75,
      responsive: !0,
      plugins: {
        title: { display: !1 },
        tooltip: { mode: "index" },
        legend: {
          position: "right",
          align: "end",
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: !0,
            pointStyle: "circle",
          },
        },
      },
    },
  };
if (ctxDepartment) {
  new Chart(ctxDepartment, configDepartment);
}
const ctxSeller = document.getElementById("sellerChart"),
  dataSeller = {
    labels: labels,
    datasets: [
      {
        label: "Order",
        data: Utils.numbers(NUMBER_CFG),
        borderColor: "#50D1B2",
        backgroundColor: "#50D1B2",
      },
      {
        label: "Earnings",
        data: Utils.numbers(NUMBER_CFG),
        borderColor: "#EC8C56",
        backgroundColor: "#EC8C56",
      },
      {
        label: "Refunds",
        data: Utils.numbers(NUMBER_CFG),
        borderColor: "#E23738",
        backgroundColor: "#E23738",
      },
    ],
  },
  configSeller = {
    type: "line",
    data: dataSeller,
    options: {
      responsive: !0,
      plugins: {
        title: { display: !1 },
        legend: {
          position: "bottom",
          align: "center",
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: !0,
            pointStyle: "circle",
          },
        },
      },
      elements: { line: { tension: 0.3 } },
    },
  };
if (ctxSeller) {
  new Chart(ctxSeller, configSeller);
}
const ctxIncome = document.getElementById("incomeChart"),
  dataIncome = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: Utils.numbers({ count: 10, min: 0, max: 40 }),
        borderColor: "#50D1B2",
        backgroundColor: "#50D1B2",
        pointRadius: 0,
      },
    ],
  },
  configIncome = {
    type: "line",
    data: dataIncome,
    options: {
      responsive: !0,
      scales: { x: { display: !1 }, y: { display: !1 } },
      plugins: { title: { display: !1 }, legend: { display: !1 } },
      elements: { line: { tension: 0.5 } },
    },
  };
if (ctxIncome) {
  new Chart(ctxIncome, configIncome);
}
const ctxExpences = document.getElementById("expencesChart"),
  dataExpences = {
    labels: labels,
    datasets: [
      {
        label: "Expences",
        data: Utils.numbers({ count: 10, min: 0, max: 40 }),
        borderColor: "#E23738",
        backgroundColor: "#E23738",
        pointRadius: 0,
      },
    ],
  },
  configExpences = {
    type: "line",
    data: dataExpences,
    options: {
      responsive: !0,
      scales: { x: { display: !1 }, y: { display: !1 } },
      plugins: { title: { display: !1 }, legend: { display: !1 } },
      elements: { line: { tension: 0.5 } },
    },
  };
if (ctxExpences) {
  new Chart(ctxExpences, configExpences);
}
const ctxCash = document.getElementById("cashChart"),
  dataCash = {
    labels: labels,
    datasets: [
      {
        label: "Cash",
        data: Utils.numbers({ count: 10, min: 0, max: 40 }),
        borderColor: "#2775FF",
        backgroundColor: "#2775FF",
        pointRadius: 0,
      },
    ],
  },
  configCash = {
    type: "line",
    data: dataCash,
    options: {
      responsive: !0,
      scales: { x: { display: !1 }, y: { display: !1 } },
      plugins: { title: { display: !1 }, legend: { display: !1 } },
      elements: { line: { tension: 0.5 } },
    },
  };
if (ctxCash) {
  new Chart(ctxCash, configCash);
}
const ctxProfit = document.getElementById("profitChart"),
  dataProfit = {
    labels: labels,
    datasets: [
      {
        label: "Profit",
        data: Utils.numbers({ count: 10, min: 0, max: 40 }),
        borderColor: "#EC8C56",
        backgroundColor: "#EC8C56",
        pointRadius: 0,
      },
    ],
  },
  configProfit = {
    type: "line",
    data: dataProfit,
    options: {
      responsive: !0,
      scales: { x: { display: !1 }, y: { display: !1 } },
      plugins: { title: { display: !1 }, legend: { display: !1 } },
      elements: { line: { tension: 0.5 } },
    },
  };
if (ctxProfit) {
  new Chart(ctxProfit, configProfit);
}
const ctxEmployee = document.getElementById("employeeChart"),
  configEmployee = {
    type: "doughnut",
    data: {
      labels: ["Men", "Women"],
      datasets: [
        {
          label: "# of Votes",
          data: [70, 30],
          backgroundColor: ["#50D1B2", "#E23738"],
          borderWidth: 0,
          offset: 20,
        },
      ],
    },
    options: {
      rotation: -90,
      circumference: 180,
      legend: { display: !1 },
      tooltip: { enabled: !1 },
      cutout: 50,
      plugins: {
        legend: {
          display: !1,
          position: "bottom",
          align: "center",
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: !0,
            pointStyle: "circle",
            padding: 10,
          },
        },
      },
    },
  };
if (ctxEmployee) {
  new Chart(ctxEmployee, configEmployee);
}
function colorChart(e, t) {
  const a = document.getElementById(`${e}Chart`),
    l = {
      labels: labels,
      datasets: [
        {
          label: e,
          data: Utils.numbers({ count: 10, min: 0, max: 40 }),
          borderColor: t,
          backgroundColor: t,
          pointRadius: 0,
        },
      ],
    };
  if (a) {
    new Chart(a, {
      type: "line",
      data: l,
      options: {
        responsive: !0,
        scales: { x: { display: !1 }, y: { display: !1 } },
        plugins: { title: { display: !1 }, legend: { display: !1 } },
        elements: { line: { tension: 0.5 } },
      },
    });
  }
}
colorChart("purple", "#7747CA"),
  colorChart("fuchsia", "#DD50D6"),
  colorChart("sky", "#0BD6F4"),
  colorChart("red", "#E23738");
const borderRadius = 70,
  borderRadiusAllCorners = {
    topLeft: 70,
    topRight: 70,
    bottomLeft: 70,
    bottomRight: 70,
  },
  ctxBarChart = document.getElementById("barChart"),
  BAR_CFG = { count: 12, min: 0, max: 100 },
  barChartLabels = Utils.months({ count: 6 }),
  barChartData = {
    labels: barChartLabels,
    datasets: [
      {
        label: "Instagram",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#7747CA",
        barThickness: 12,
        borderRadius: borderRadiusAllCorners,
      },
      {
        label: "Facebook",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#2775FF",
        barThickness: 12,
        borderRadius: borderRadiusAllCorners,
      },
      {
        label: "Twitter",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#FB7BB8",
        barThickness: 12,
        borderRadius: borderRadiusAllCorners,
      },
    ],
  },
  barChartConfig = {
    type: "bar",
    data: barChartData,
    options: {
      plugins: {
        title: { display: !1 },
        legend: {
          align: "center",
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: !0,
            pointStyle: "circle",
          },
        },
      },
      responsive: !0,
      scales: { x: { stacked: !0 }, y: { stacked: !0 } },
    },
  };
if (ctxBarChart) {
  new Chart(ctxBarChart, barChartConfig);
}
const listGridBtn = document.querySelectorAll(".list-grid-btn");
for (let e = 0; e < listGridBtn.length; e++)
  listGridBtn[e].addEventListener("click", function () {
    const e = document.getElementsByClassName("active");
    (e[0].className = e[0].className.replace(" active", "")),
      (this.className += " active"),
      localStorage.setItem("activeClass", "true");
  });
function makeSidebarActive(e) {
  e.siblings().each(function () {
    $(this).removeClass("active");
  }),
    e.addClass("active");
}
$(document).ready(function () {
  if (localStorage) {
    var e = localStorage.sideMenuItem;
    makeSidebarActive($(".sidemenu-item").eq(e));
  }
  $(".sidemenu-item").click(function () {
    localStorage && (localStorage.sideMenuItem = $(this).index()),
      makeSidebarActive($(this));
  });
});
const detailButtons = document.querySelectorAll(".show-detail"),
  detailModal = document.getElementById("details-modal"),
  sidebarTransaction = document.getElementById("transaction-detail");
sidebarTransaction.addEventListener("click", () => {
  detailModal.checked = !0;
}),
  detailButtons.forEach((e) => {
    e.addEventListener("click", () => {
      detailModal.checked = !0;
    });
  });
const addButtons = document.querySelectorAll(".show-add-project"),
  projectModal = document.getElementById("project-modal");
addButtons.forEach((e) => {
  e.addEventListener("click", () => {
    projectModal.checked = !0;
  });
});
const innerAddButtons = document.querySelectorAll(".show-add-project-2"),
  addModal = document.getElementById("add-modal");
innerAddButtons.forEach((e) => {
  e.addEventListener("click", () => {
    (addModal.checked = !0), (projectModal.checked = !1);
  });
});
const shareButtons = document.getElementById("show-share-modal"),
  shareModal = document.getElementById("share-modal");
shareButtons.addEventListener("click", () => {
  shareModal.checked = !0;
});
const mailButton = document.getElementById("show-mail-modal"),
  mailModal = document.getElementById("mail-modal");
mailButton.addEventListener("click", () => {
  mailModal.checked = !0;
});
const ctxMultiBarChart = document.getElementById("multiBarChart"),
  multiBarChartLabels = ["Designer", "Developer", "Manager", "Customer"],
  multiBarChartData = {
    labels: multiBarChartLabels,
    datasets: [
      {
        label: "Document",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#FB7185",
      },
      {
        label: "Video",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#F0ABFC",
      },
      {
        label: "Audio",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#60A5FA",
      },
      {
        label: "Images",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#A78BFA",
      },
      {
        label: "Exe",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#FB923C",
      },
      {
        label: "Other",
        data: Utils.numbers(BAR_CFG),
        backgroundColor: "#2DD4BF",
      },
    ],
  },
  multiBarChartConfig = {
    type: "bar",
    data: multiBarChartData,
    options: {
      plugins: {
        title: { display: !1 },
        legend: {
          align: "center",
          position: "bottom",
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: !0,
            pointStyle: "circle",
          },
        },
      },
      responsive: !0,
    },
  };
if (ctxMultiBarChart) {
  new Chart(ctxMultiBarChart, multiBarChartConfig);
}
const ctxCanvas = document.getElementById("canvas");
ctxCanvas &&
  fetch("https://unpkg.com/world-atlas/countries-50m.json")
    .then((e) => e.json())
    .then((e) => {
      const t = ChartGeo.topojson.feature(e, e.objects.countries).features;
      new Chart(ctxCanvas.getContext("2d"), {
        type: "choropleth",
        data: {
          labels: t.map((e) => e.properties.name),
          datasets: [
            {
              label: "Google",
              data: t
                .slice(0, 10)
                .map((e) => ({ feature: e, value: Math.random() })),
              backgroundColor: "#2775FF",
            },
            {
              label: "Facebook",
              data: t
                .slice(10, 20)
                .map((e) => ({ feature: e, value: Math.random() })),
              backgroundColor: "#50D1B2",
            },
            {
              label: "Pinterest",
              data: t
                .slice(21, 50)
                .map((e) => ({ feature: e, value: Math.random() })),
              backgroundColor: "#E23738",
            },
            {
              label: "Others",
              data: t.map((e) => ({ feature: e, value: Math.random() })),
              backgroundColor: "#E8EDF2",
            },
          ],
        },
        options: {
          showOutline: !1,
          showGraticule: !1,
          plugins: {
            legend: {
              display: !0,
              position: "left",
              align: "end",
              labels: {
                boxWidth: 8,
                boxHeight: 8,
                usePointStyle: !0,
                pointStyle: "circle",
              },
            },
          },
          scales: { xy: { projection: "equalEarth" } },
        },
      });
    });
//# sourceMappingURL=app.js.map
