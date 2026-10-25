(() => {
  "use strict";

  const root = document.documentElement;

  const translations = {
    en: {
      brandSub: "INFINITY VOGT SOLAR SERVICES",
      overview: "Overview",
      dashboard: "Dashboard",
      projects: "Projects",
      services: "Services",
      messages: "Inquiries",
      clients: "Clients",
      manage: "Manage",
      content: "Website content",
      analytics: "Analytics",
      settings: "Settings",
      needHelp: "Need a hand?",
      supportText:
        "Manage your website with confidence. Contact your technical team for support.",
      contactSupport: "CONTACT SUPPORT",
      adminName: "Admin Manager",
      superAdmin: "Super Admin",
      breadcrumb: "Workspace",
      searchPlaceholder: "Search projects, clients...",
      welcome: "Good evening, Admin 👋",
      welcomeSub:
        "Here’s what’s happening with your solar business today.",
      export: "Export report",
      addProject: "Add project",
      totalProjects: "Total projects",
      activeClients: "Active clients",
      newInquiries: "New inquiries",
      siteVisits: "Website visits",
      vsLastMonth: "vs last month",
      performance: "Business performance",
      performanceSub:
        "Project inquiries and completed projects over time",
      last6: "Last 6 months",
      last12: "Last 12 months",
      projectProgress: "Project progress",
      projectProgressSub: "Current priority projects",
      viewAll: "View all",
      projectOne: "Cairo Solar Farm",
      utilityScale: "Utility-scale solar",
      projectTwo: "New Capital Offices",
      commercial: "Commercial installation",
      projectThree: "Alexandria Residence",
      residential: "Residential solar",
      projectFour: "Delta Industrial Plant",
      industrial: "Industrial power",
      recentInquiries: "Recent inquiries",
      recentInquiriesSub:
        "Latest messages submitted through your website",
      client: "Client",
      service: "Service",
      date: "Date",
      status: "Status",
      solarInstallation: "Solar installation",
      maintenance: "Maintenance",
      consulting: "Energy consulting",
      systemDesign: "System design",
      new: "New",
      inReview: "In review",
      contacted: "Contacted",
      completed: "Completed",
      activity: "Recent activity",
      activitySub: "Latest updates from your team",
      activity1Title: "Project status updated",
      activity1Text:
        "Cairo Solar Farm moved to installation phase.",
      twoHours: "2 hours ago",
      activity2Title: "New client inquiry",
      activity2Text:
        "Mohamed Khaled requested a solar installation quote.",
      fourHours: "4 hours ago",
      activity3Title: "Website content published",
      activity3Text:
        "The commercial solar service page was updated.",
      yesterday: "Yesterday",
      activity4Title: "Project gallery refreshed",
      activity4Text: "Three new project images were added.",
      twoDays: "2 days ago",
      projectsOverview: "Projects overview",
      projectsOverviewSub:
        "A quick view of active installations",
      manageProjects: "Manage projects",
      project: "Project",
      type: "Type",
      location: "Location",
      progress: "Progress",
      inProgress: "In progress",
      planning: "Planning",
      footer:
        "Infinity Vogt Solar Services · Admin workspace",
      addNewProject: "Add a new project",
      projectName: "Project name",
      cancel: "Cancel",
      saveProject: "Save project",
      noResults: "No inquiries match your search.",
      exported: "Report exported successfully.",
      added: "Project added to this dashboard.",
      notifications: "You have 4 unread inquiries.",
      projectsNotice:
        "Project management is a UI demo. Connect this page to your backend to save changes.",
      contentNotice:
        "Website content management can be connected to your CMS.",
      servicesNotice:
        "Service management can be connected to your backend.",
      clientsNotice:
        "Client management can be connected to your backend.",
      settingsNotice:
        "Settings are a UI demo in this static prototype."
    },

    ar: {
      brandSub: "إنفينيتي فوجت لخدمات الطاقة الشمسية",
      overview: "نظرة عامة",
      dashboard: "لوحة التحكم",
      projects: "المشروعات",
      services: "الخدمات",
      messages: "الاستفسارات",
      clients: "العملاء",
      manage: "الإدارة",
      content: "محتوى الموقع",
      analytics: "التحليلات",
      settings: "الإعدادات",
      needHelp: "هل تحتاج إلى مساعدة؟",
      supportText:
        "أدر موقعك بثقة. تواصل مع فريق الدعم الفني عند الحاجة.",
      contactSupport: "تواصل مع الدعم",
      adminName: "مدير النظام",
      superAdmin: "مدير عام",
      breadcrumb: "مساحة العمل",
      searchPlaceholder: "ابحث عن مشروع أو عميل...",
      welcome: "مساء الخير، مدير النظام 👋",
      welcomeSub:
        "إليك ملخص ما يحدث في أعمال الطاقة الشمسية اليوم.",
      export: "تصدير التقرير",
      addProject: "إضافة مشروع",
      totalProjects: "إجمالي المشروعات",
      activeClients: "العملاء النشطون",
      newInquiries: "الاستفسارات الجديدة",
      siteVisits: "زيارات الموقع",
      vsLastMonth: "مقارنة بالشهر الماضي",
      performance: "أداء الأعمال",
      performanceSub:
        "استفسارات المشروعات والمشروعات المكتملة بمرور الوقت",
      last6: "آخر 6 أشهر",
      last12: "آخر 12 شهرًا",
      projectProgress: "تقدم المشروعات",
      projectProgressSub: "المشروعات ذات الأولوية حاليًا",
      viewAll: "عرض الكل",
      projectOne: "مزرعة القاهرة الشمسية",
      utilityScale: "محطة طاقة شمسية كبيرة",
      projectTwo: "مكاتب العاصمة الإدارية",
      commercial: "تركيب تجاري",
      projectThree: "سكن الإسكندرية",
      residential: "طاقة شمسية سكنية",
      projectFour: "مصنع الدلتا الصناعي",
      industrial: "طاقة صناعية",
      recentInquiries: "أحدث الاستفسارات",
      recentInquiriesSub: "آخر الرسائل المرسلة عبر الموقع",
      client: "العميل",
      service: "الخدمة",
      date: "التاريخ",
      status: "الحالة",
      solarInstallation: "تركيب أنظمة شمسية",
      maintenance: "الصيانة",
      consulting: "استشارات الطاقة",
      systemDesign: "تصميم الأنظمة",
      new: "جديد",
      inReview: "قيد المراجعة",
      contacted: "تم التواصل",
      completed: "مكتمل",
      activity: "النشاط الأخير",
      activitySub: "آخر تحديثات فريق العمل",
      activity1Title: "تم تحديث حالة المشروع",
      activity1Text:
        "انتقلت مزرعة القاهرة الشمسية إلى مرحلة التركيب.",
      twoHours: "منذ ساعتين",
      activity2Title: "استفسار جديد من عميل",
      activity2Text:
        "طلب محمد خالد عرض سعر لتركيب نظام شمسي.",
      fourHours: "منذ 4 ساعات",
      activity3Title: "نشر محتوى جديد بالموقع",
      activity3Text:
        "تم تحديث صفحة خدمات الطاقة الشمسية التجارية.",
      yesterday: "أمس",
      activity4Title: "تحديث معرض المشروعات",
      activity4Text: "تمت إضافة ثلاث صور جديدة للمشروعات.",
      twoDays: "منذ يومين",
      projectsOverview: "نظرة عامة على المشروعات",
      projectsOverviewSub:
        "ملخص سريع للمشروعات الجاري تنفيذها",
      manageProjects: "إدارة المشروعات",
      project: "المشروع",
      type: "النوع",
      location: "الموقع",
      progress: "نسبة الإنجاز",
      inProgress: "قيد التنفيذ",
      planning: "التخطيط",
      footer:
        "إنفينيتي فوجت لخدمات الطاقة الشمسية · لوحة الإدارة",
      addNewProject: "إضافة مشروع جديد",
      projectName: "اسم المشروع",
      cancel: "إلغاء",
      saveProject: "حفظ المشروع",
      noResults: "لا توجد استفسارات تطابق بحثك.",
      exported: "تم تصدير التقرير بنجاح.",
      added: "تمت إضافة المشروع إلى لوحة العرض.",
      notifications: "لديك 4 استفسارات غير مقروءة.",
      projectsNotice:
        "إدارة المشروعات هنا تجريبية. اربط الصفحة بالـ Backend لحفظ التغييرات.",
      contentNotice:
        "يمكن ربط إدارة المحتوى بنظام إدارة المحتوى الخاص بك.",
      servicesNotice: "يمكن ربط إدارة الخدمات بالـ Backend.",
      clientsNotice: "يمكن ربط إدارة العملاء بالـ Backend.",
      settingsNotice:
        "الإعدادات تجريبية في هذه النسخة الثابتة."
    }
  };

  // Current language
  let lang = localStorage.getItem("ivss-admin-lang") || "en";

  // Bootstrap toast
  const toastEl = document.getElementById("appToast");
  const toast = bootstrap.Toast.getOrCreateInstance(toastEl, {
    delay: 3000
  });

  function notify(message) {
    document.getElementById("toastMessage").textContent = message;
    toast.show();
  }

  // Apply English or Arabic
  function applyLanguage(nextLang) {
    lang = nextLang;

    const dict = translations[lang];

    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;

      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    document
      .querySelectorAll("[data-i18n-placeholder]")
      .forEach((el) => {
        const key = el.dataset.i18nPlaceholder;

        if (dict[key] !== undefined) {
          el.placeholder = dict[key];
        }
      });

    document.getElementById("langToggle").innerHTML =
      `<span class="fw-bold small">${lang === "en" ? "ع" : "EN"}</span>`;

    document.getElementById("year").textContent =
      new Date().getFullYear();

    localStorage.setItem("ivss-admin-lang", lang);

    if (chart) {
      updateChart();
    }
  }

  // Chart data
  let chart;

  const labels6 = {
    en: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    ar: ["مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر"]
  };

  const labels12 = {
    en: [
      "Nov", "Dec", "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug", "Sep", "Oct"
    ],
    ar: [
      "نوفمبر", "ديسمبر", "يناير", "فبراير", "مارس", "أبريل",
      "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر"
    ]
  };

  const inquiry6 = [18, 25, 21, 32, 29, 38];
  const completed6 = [10, 14, 12, 19, 23, 27];

  const inquiry12 = [
    11, 15, 18, 17, 22, 20, 18, 25, 21, 32, 29, 38
  ];

  const completed12 = [
    5, 8, 10, 9, 13, 12, 10, 14, 12, 19, 23, 27
  ];

  function chartColors() {
    const dark = root.dataset.theme === "dark";

    return {
      text: dark ? "#a0b0a5" : "#748279",
      grid: dark ? "#2a3a30" : "#e4ebe6"
    };
  }

  function initChart() {
    const colors = chartColors();

    chart = new Chart(
      document.getElementById("performanceChart"),
      {
        type: "line",

        data: {
          labels: labels6[lang],

          datasets: [
            {
              label:
                lang === "ar"
                  ? "استفسارات جديدة"
                  : "New inquiries",

              data: inquiry6,
              borderColor: "#16845b",
              backgroundColor: "rgba(22,132,91,.10)",
              fill: true,
              tension: 0.38,
              borderWidth: 2.5,
              pointRadius: 3,
              pointHoverRadius: 5
            },

            {
              label:
                lang === "ar"
                  ? "مشروعات مكتملة"
                  : "Completed projects",

              data: completed6,
              borderColor: "#8ebc3f",
              backgroundColor: "transparent",
              fill: false,
              tension: 0.38,
              borderWidth: 2.5,
              pointRadius: 3,
              pointHoverRadius: 5
            }
          ]
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,

          interaction: {
            intersect: false,
            mode: "index"
          },

          plugins: {
            legend: {
              position: "bottom",
              align: "start",

              labels: {
                usePointStyle: true,
                boxWidth: 7,
                boxHeight: 7,
                padding: 20,
                color: colors.text,
                font: {
                  size: 11
                }
              }
            }
          },

          scales: {
            x: {
              grid: {
                display: false
              },

              ticks: {
                color: colors.text,
                font: {
                  size: 10
                }
              }
            },

            y: {
              beginAtZero: true,

              grid: {
                color: colors.grid
              },

              border: {
                display: false
              },

              ticks: {
                color: colors.text,
                precision: 0,
                font: {
                  size: 10
                }
              }
            }
          }
        }
      }
    );
  }

  function updateChart() {
    const months = document.getElementById("chartRange").value;

    chart.data.labels =
      months === "6" ? labels6[lang] : labels12[lang];

    chart.data.datasets[0].data =
      months === "6" ? inquiry6 : inquiry12;

    chart.data.datasets[1].data =
      months === "6" ? completed6 : completed12;

    chart.data.datasets[0].label =
      lang === "ar" ? "استفسارات جديدة" : "New inquiries";

    chart.data.datasets[1].label =
      lang === "ar" ? "مشروعات مكتملة" : "Completed projects";

    const colors = chartColors();

    chart.options.plugins.legend.labels.color = colors.text;
    chart.options.scales.x.ticks.color = colors.text;
    chart.options.scales.y.ticks.color = colors.text;
    chart.options.scales.y.grid.color = colors.grid;

    chart.update();
  }

  // Language toggle
  document
    .getElementById("langToggle")
    .addEventListener("click", () => {
      applyLanguage(lang === "en" ? "ar" : "en");
    });

  // Dark / light mode
  document
    .getElementById("themeToggle")
    .addEventListener("click", () => {
      root.dataset.theme =
        root.dataset.theme === "dark" ? "light" : "dark";

      document.getElementById("themeToggle").innerHTML =
        root.dataset.theme === "dark"
          ? '<i class="bi bi-sun"></i>'
          : '<i class="bi bi-moon-stars"></i>';

      if (chart) {
        updateChart();
      }

      localStorage.setItem(
        "ivss-admin-theme",
        root.dataset.theme
      );
    });

  // Mobile navigation
  document
    .getElementById("menuToggle")
    .addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("show");
    });

  // Sidebar navigation
  document.querySelectorAll(".side-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".side-link").forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

      if (window.innerWidth < 992) {
        document.getElementById("sidebar").classList.remove("show");
      }

      const section = link.dataset.section;

      const messages = {
        projects: "projectsNotice",
        services: "servicesNotice",
        clients: "clientsNotice",
        content: "contentNotice",
        settings: "settingsNotice"
      };

      if (messages[section]) {
        notify(translations[lang][messages[section]]);
      }
    });
  });

  // Notifications
  document
    .getElementById("notificationButton")
    .addEventListener("click", () => {
      notify(translations[lang].notifications);
    });

  // Manage projects
  document
    .getElementById("manageProjects")
    .addEventListener("click", () => {
      notify(translations[lang].projectsNotice);
    });

  // Export inquiries to CSV
  document
    .getElementById("exportButton")
    .addEventListener("click", () => {
      const rows = [
        ...document.querySelectorAll("#inquiriesTable tr")
      ].map((row) =>
        [...row.children].map((cell) =>
          cell.innerText.replace(/\s+/g, " ").trim()
        )
      );

      const csv = rows
        .map((row) =>
          row
            .map((value) =>
              `"${value.replace(/"/g, '""')}"`
            )
            .join(",")
        )
        .join("\r\n");

      const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;"
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "ivss-inquiries-report.csv";
      a.click();

      URL.revokeObjectURL(url);

      notify(translations[lang].exported);
    });

  // Add project modal
  const projectModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("projectModal")
  );

  document
    .getElementById("addProjectButton")
    .addEventListener("click", () => {
      projectModal.show();
    });

  // Save a new project to the table
  document
    .getElementById("projectForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document
        .getElementById("projectName")
        .value.trim();

      const location = document
        .getElementById("projectLocation")
        .value.trim();

      const type = document
        .getElementById("projectType")
        .selectedOptions[0].textContent;

      if (!name || !location) {
        return;
      }

      const tbody = document.querySelector("#projectsTable tbody");
      const row = document.createElement("tr");

      [name, type, location].forEach((value, index) => {
        const td = document.createElement("td");

        if (index === 0) {
          const strong = document.createElement("strong");
          strong.textContent = value;
          td.appendChild(strong);
        } else {
          td.textContent = value;
        }

        row.appendChild(td);
      });

      const progressTd = document.createElement("td");

      progressTd.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <div class="progress flex-grow-1" style="max-width:100px">
            <div class="progress-bar" style="width:0%"></div>
          </div>
          <span>0%</span>
        </div>
      `;

      row.appendChild(progressTd);

      const statusTd = document.createElement("td");
      const badge = document.createElement("span");

      badge.className = "status status-new";
      badge.textContent = translations[lang].planning;

      statusTd.appendChild(badge);
      row.appendChild(statusTd);

      tbody.prepend(row);

      projectModal.hide();
      event.target.reset();

      notify(translations[lang].added);
    });

  // Search inquiries
  document
    .getElementById("globalSearch")
    .addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase().trim();
      let visible = 0;

      document
        .querySelectorAll("#inquiriesTable tbody tr")
        .forEach((row) => {
          const match = row.innerText
            .toLowerCase()
            .includes(query);

          row.style.display = match ? "" : "none";

          if (match) {
            visible++;
          }
        });

      document.getElementById("emptyState").style.display =
        visible ? "none" : "block";
    });

  // Change chart date range
  document
    .getElementById("chartRange")
    .addEventListener("change", updateChart);

  // Restore saved theme
  root.dataset.theme =
    localStorage.getItem("ivss-admin-theme") || "light";

  document.getElementById("themeToggle").innerHTML =
    root.dataset.theme === "dark"
      ? '<i class="bi bi-sun"></i>'
      : '<i class="bi bi-moon-stars"></i>';

  // Initialize dashboard
  initChart();
  applyLanguage(lang);
})();