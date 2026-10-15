// عدّل هذه القائمة فقط لإضافة مشاريعك:
// image: ضع مسار صورة اللوحة (مثل "images/coffee.png") أو اتركه فارغًا
// highlights: نقاط الملخص المختصرة
const projects = [
  {
    title: "لوحة تحليل مبيعات القهوة",
    desc: "لوحة تفاعلية تعرض المبيعات حسب المنتج والفرع والوقت، مع مؤشرات تساعد على معرفة الأصناف الأكثر ربحًا.",
    highlights: [
      "تنظيف ودمج البيانات باستخدام Power Query",
      "مؤشرات أداء رئيسية: إجمالي المبيعات والأرباح",
      "تحليل زمني يوضح أوقات الذروة والمواسم",
      "أفضل 10 منتجات وأضعفها من حيث الأداء"
    ],
    tools: ["Power BI", "Excel", "Power Query"],
    image: "coffee.png",
    live: "",
    code: ""
  },
  {
    title: "عنوان المشروع الثاني",
    desc: "اكتب هنا سؤال العمل الذي أجاب عنه المشروع والنتيجة التي وصلت لها.",
    highlights: [
      "النقطة الأولى: ماذا فعلت؟",
      "النقطة الثانية: ماذا اكتشفت؟",
      "النقطة الثالثة: ما القرار الذي ساعد عليه؟"
    ],
    tools: ["Python", "Excel"],
    image: "aqar.png",
    live: "",
    code: ""
  },

{
  title: "اسم المشروع",
  desc: "سؤال العمل اللي أجاب عنه المشروع والنتيجة اللي وصلت لها.",
  highlights: [
    "النقطة الأولى",
    "النقطة الثانية",
    "النقطة الثالثة"
  ],
  tools: ["Power BI", "Excel"],
  image: "23sep.png",
  live: "",
  code: ""
}
  ];
/* ---------- عرض المشاريع ---------- */
const list = document.getElementById("list");

projects.forEach(p => {
  const el = document.createElement("article");
  el.className = "project";

  let thumb;
  if (p.image) {
    thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "thumb";
    thumb.setAttribute("aria-label", "تكبير صورة: " + p.title);
    const img = document.createElement("img");
    img.src = p.image; img.alt = p.title; img.loading = "lazy";
    const hint = document.createElement("span");
    hint.className = "zoom-hint"; hint.textContent = "اضغط للتكبير";
    thumb.append(img, hint);
    thumb.addEventListener("click", () => openLightbox(p.image, p.title, thumb));
  } else {
    thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.textContent = "صورة اللوحة";
  }

  const body = document.createElement("div");
  const h = document.createElement("h3"); h.textContent = p.title;
  const d = document.createElement("p"); d.textContent = p.desc;

  const ul = document.createElement("ul"); ul.className = "highlights";
  (p.highlights || []).forEach(t => {
    const li = document.createElement("li"); li.textContent = t; ul.appendChild(li);
  });

  const tags = document.createElement("div"); tags.className = "tags";
  p.tools.forEach(t => {
    const s = document.createElement("span"); s.className = "tag"; s.textContent = t; tags.appendChild(s);
  });

  const links = document.createElement("div"); links.className = "links";
  [["عرض المشروع", p.live], ["الكود", p.code]].forEach(([label, href]) => {
    if (!href) return;
    const a = document.createElement("a");
    a.href = href; a.textContent = label; a.target = "_blank"; a.rel = "noopener";
    links.appendChild(a);
  });

  body.append(h, d, ul, tags, links);
  el.append(thumb, body);
  list.appendChild(el);
});

/* ---------- نافذة التكبير ---------- */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbStage = document.getElementById("lbStage");
const lbCaption = document.getElementById("lbCaption");
let lastTrigger = null;

function openLightbox(src, title, trigger) {
  lastTrigger = trigger;
  lbImg.src = src;
  lbImg.alt = title;
  lbStage.classList.remove("full");
  lbCaption.textContent = title + " · اضغط على الصورة للتكبير الكامل";
  lb.showModal();
  lbStage.scrollTo(0, 0);
  document.documentElement.style.overflow = "hidden";
}

function closeLightbox() { if (lb.open) lb.close(); }

lb.addEventListener("close", () => {
  document.documentElement.style.overflow = "";
  lbImg.removeAttribute("src");
  if (lastTrigger) lastTrigger.focus();
});

document.getElementById("lbClose").addEventListener("click", closeLightbox);

// الضغط على الصورة يبدّل بين "ملائمة الشاشة" و"الحجم الكامل"
lbImg.addEventListener("click", e => {
  e.stopPropagation();
  lbStage.classList.toggle("full");
  lbStage.scrollTo(0, 0);
});

// الضغط على الخلفية يغلق النافذة
lbStage.addEventListener("click", e => { if (e.target === lbStage) closeLightbox(); });

document.getElementById("y").textContent = new Date().getFullYear();
