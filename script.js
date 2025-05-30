// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const menu = document.getElementById("menu");

mobileMenuButton.addEventListener("click", () => {
  menu.classList.toggle("hidden");
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

// Calendar functionality
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const currentMonthElement = document.getElementById("current-month");
const calendarDaysElement = document.getElementById("calendar-days");

let currentDate = new Date();

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
      dayElement.classList.add(
        "bg-blue-100",
        "font-semibold",
        "text-blue-800"
      );
    }

    // Add event indicators (example for days 5, 15, 20)
    if (day === 5 || day === 15 || day === 20) {
      dayElement.innerHTML = `
        <div class="relative">
          <span>${day}</span>
          <span class="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
        </div>
      `;
    } else {
      dayElement.textContent = day;
    }

    calendarDaysElement.appendChild(dayElement);
  }
}

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initialize calendar
renderCalendar();

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

// PRÓXIMOS EVENTOS
// ----------------------------------------------------- //
const hoje = new Date();
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
    nome: "fasjuhdoaisuhd",
    local: "Escola Municipal Central",
    hora: "18:30",
    dia: 12,
    mes: 3,
  },
  {
    nome: "Reunião de Pais e Mestres",
    local: "Escola Municipal Central",
    hora: "18:30",
    dia: 15,
    mes: 4,
  },
  {
    nome: "Feira de Ciências Municipal",
    local: "Centro de Convenções",
    hora: "09:00",
    dia: 20,
    mes: 4,
  },
  {
    nome: "Formação Continuada - Professores",
    local: "Centro de Formação Pedagógica",
    hora: "14:00",
    dia: 25,
    mes: 4,
  },
  {
    nome: "Sei la",
    local: "Centro de Formação Pedagógica",
    hora: "14:00",
    dia: 29,
    mes: 4,
  },
  {
    nome: "No country for old men",
    local: "fasijpf",
    hora: "12:00",
    dia: 30,
    mes: 4,
  },
];

const eventosMes = eventos.filter(
  (evento) => evento.mes === hoje.getMonth() && evento.dia >= hoje.getDate()
);

const container_eventos = document.getElementById("proximos-eventos");

eventosMes.forEach((evento) => {
  const eventoDiv = document.createElement("div");
  eventoDiv.className = "flex items-start";

  eventoDiv.innerHTML = `
    <div class="bg-blue-100 rounded-lg p-2 mr-4">
      <span class="block text-blue-800 font-bold text-center">${evento.dia}</span>
      <span class="block text-blue-600 text-xs text-center">${meses[evento.mes]}</span>
    </div>
    <div>
      <h5 class="font-medium text-blue-900">${evento.nome}</h5>
      <p class="text-sm text-gray-600">${evento.hora} - ${evento.local}</p>
    </div>
  `;

  container_eventos.appendChild(eventoDiv);
});
// ----------------------------------------------------- //
