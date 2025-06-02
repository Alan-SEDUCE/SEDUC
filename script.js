// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const menu = document.getElementById("menu");

mobileMenuButton.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// JavaScript para o menu mobile
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("menu");

  mobileMenuButton.addEventListener("click", function () {
    menu.classList.toggle("mobile-active");
    menu.classList.toggle("hidden");

    // Posicionamento do menu mobile
    if (menu.classList.contains("mobile-active")) {
      menu.style.position = "absolute";
      menu.style.top = "100%";
      menu.style.left = "0";
      menu.style.right = "0";
      menu.style.backgroundColor = "#1e3a8a"; // bg-blue-900
      menu.style.flexDirection = "column";
      menu.style.padding = "1rem";
      menu.style.gap = "0.5rem";
      menu.style.zIndex = "50";
      menu.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
      menu.removeAttribute("style");
    }
  });

  // Fechar menu ao clicar em um link (para mobile)
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        menu.classList.remove("mobile-active");
        menu.classList.add("hidden");
      }
    });
  });

  // Fechar menu ao redimensionar para desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      menu.classList.remove("mobile-active", "hidden");
      menu.removeAttribute("style");
    }
  });
});
// Tab arrows
const scrollContainer = document.getElementById("tabs-scroll");
document.getElementById("scroll-left").addEventListener("click", () => {
  scrollContainer.scrollBy({ left: -150, behavior: "smooth" });
});
document.getElementById("scroll-right").addEventListener("click", () => {
  scrollContainer.scrollBy({ left: 150, behavior: "smooth" });
});

// Tab functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => {
      btn.classList.remove(
        "text-blue-900",
        "border-b-2",
        "border-blue-600",
        "bg-blue-50"
      );
      btn.classList.add("text-gray-600", "hover:text-blue-900");
    });

    tabContents.forEach((content) => {
      content.classList.remove("active");
    });

    // Add active class to clicked button and corresponding content
    button.classList.add(
      "text-blue-900",
      "border-b-2",
      "border-blue-600",
      "bg-blue-50"
    );
    button.classList.remove("text-gray-600", "hover:text-blue-900");
    document.getElementById(tabId).classList.add("active");
  });
});

// Accordion functionality
const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const icon = button.querySelector(".accordion-icon");
    const content = button.nextElementSibling;

    icon.classList.toggle("rotate-180");
    content.classList.toggle("active");
  });
});

// Back to top button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
    backToTopButton.classList.add("opacity-0", "invisible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (!menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
      }
    }
  });
});

// Calendar functionality
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const currentMonthElement = document.getElementById("current-month");
const calendarDaysElement = document.getElementById("calendar-days");
const container_eventos = document.getElementById("proximos-eventos");

let currentDate = new Date();

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const eventos = [
  {
    nome: "Reunião Secretarios",
    local: "Escola Municipal Central",
    hora: "18:30",
    dia: 12,
    mes: 4,
  },
  {
    nome: "Reunião de Pais e Mestres",
    local: "Escola Municipal Central",
    hora: "18:30",
    dia: 15,
    mes: 5,
  },
  {
    nome: "Feira de Ciências Municipal",
    local: "Centro de Convenções",
    hora: "09:00",
    dia: 20,
    mes: 5,
  },
  {
    nome: "Formação Continuada - Professores",
    local: "Centro de Formação Pedagógica",
    hora: "14:00",
    dia: 25,
    mes: 5,
  },
];

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Update month and year display
  currentMonthElement.textContent = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  // Get first day of month and total days in month
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Clear previous calendar days
  calendarDaysElement.innerHTML = "";

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("h-12");
    calendarDaysElement.appendChild(emptyDay);
  }

  // Get events for the current month being displayed
  const eventosDoMes = eventos.filter((evento) => evento.mes === month);

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add(
      "h-12",
      "flex",
      "items-center",
      "justify-center",
      "border",
      "border-gray-200"
    );

    // Highlight current day
    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayElement.classList.add("bg-blue-100", "font-semibold", "text-blue-800");
    }

    // Check if there are events on this day
    const temEvento = eventosDoMes.some((evento) => evento.dia === day);

    if (temEvento) {
      dayElement.innerHTML = `
        <div class="relative">
          <span>${day}</span>
          <span class="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
        </div>
      `;
    } else {
      dayElement.textContent = day;
    }

    calendarDaysElement.appendChild(dayElement);
  }

  // Update upcoming events section
  renderUpcomingEvents();
}

function renderUpcomingEvents() {
  // Clear previous events
  container_eventos.innerHTML = "";

  // Get today's date
  const hoje = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter events for the current month being displayed that are today or in the future
  const eventosMes = eventos.filter((evento) => {
    // For events in the current month being displayed
    if (evento.mes === currentMonth && currentYear === hoje.getFullYear()) {
      return true;
    }
    return false;
  });

  // Sort events by day
  eventosMes.sort((a, b) => a.dia - b.dia);

  // Display the events
  eventosMes.forEach((evento) => {
    const eventoDiv = document.createElement("div");
    eventoDiv.className = "flex items-start";

    eventoDiv.innerHTML = `
      <div class="bg-blue-100 rounded-lg p-2 mr-4">
        <span class="block text-blue-800 font-bold text-center">${
          evento.dia
        }</span>
        <span class="block text-blue-600 text-xs text-center">${
          meses[evento.mes]
        }</span>
      </div>
      <div>
        <h5 class="font-medium text-blue-900">${evento.nome}</h5>
        <p class="text-sm text-gray-600">${evento.hora} - ${evento.local}</p>
      </div>
    `;

    container_eventos.appendChild(eventoDiv);
  });
}

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initialize calendar and events
renderCalendar();
