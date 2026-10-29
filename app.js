// ===== 技能数据（示例，可替换为真实数据） =====
const SKILLS = [
  {
    id: "report-gen",
    name: "周报生成器",
    icon: "📝",
    color: "#4f6ef7",
    version: "1.2.0",
    category: "办公效率",
    description: "根据本周的任务记录，一键生成结构化周报，支持导出 Word 和 PDF。",
    tags: ["周报", "办公", "自动化"],
    author: "产品组",
    updated: "2026-10-20",
    size: "128 KB",
    downloads: 156,
    install: "将下载的 .zip 解压后，放入 TRAE 的 skills 目录即可使用。",
  },
  {
    id: "data-clean",
    name: "Excel 数据清洗",
    icon: "🧹",
    color: "#10b981",
    version: "2.0.1",
    category: "数据处理",
    description: "自动去重、格式化日期、统一编码，处理常见的 Excel 脏数据问题。",
    tags: ["Excel", "数据", "清洗"],
    author: "数据组",
    updated: "2026-10-25",
    size: "256 KB",
    downloads: 243,
    install: "解压后运行 install.bat，按提示选择 Excel 版本即可。",
  },
  {
    id: "img-compress",
    name: "图片批量压缩",
    icon: "🖼️",
    color: "#f59e0b",
    version: "1.0.3",
    category: "多媒体",
    description: "无损压缩 PNG/JPG，批量处理文件夹，支持自定义压缩质量。",
    tags: ["图片", "压缩", "批量"],
    author: "设计组",
    updated: "2026-10-18",
    size: "8.2 MB",
    downloads: 89,
    install: "绿色软件，解压后直接运行 ImageCompress.exe。",
  },
  {
    id: "meeting-notes",
    name: "会议纪要助手",
    icon: "🎙️",
    color: "#8b5cf6",
    version: "1.1.0",
    category: "办公效率",
    description: "上传会议录音或文字记录，自动提取待办事项、决策和责任人。",
    tags: ["会议", "纪要", "AI"],
    author: "AI 组",
    updated: "2026-10-27",
    size: "1.5 MB",
    downloads: 312,
    install: "需配置 API Key，详见解压后的 README.md。",
  },
  {
    id: "pdf-merge",
    name: "PDF 合并拆分",
    icon: "📄",
    color: "#ef4444",
    version: "1.3.2",
    category: "文档工具",
    description: "合并多个 PDF、按页码拆分、提取页面，本地处理不上传服务器。",
    tags: ["PDF", "合并", "拆分"],
    author: "IT 组",
    updated: "2026-10-15",
    size: "3.1 MB",
    downloads: 421,
    install: "解压即用，双击 PdfTool.exe 打开。",
  },
  {
    id: "translator",
    name: "文档翻译器",
    icon: "🌐",
    color: "#06b6d4",
    version: "0.9.5",
    category: "文档工具",
    description: "支持中英日韩互译，保留 Word/PPT 原有排版格式。",
    tags: ["翻译", "Word", "PPT"],
    author: "AI 组",
    updated: "2026-10-22",
    size: "2.8 MB",
    downloads: 178,
    install: "首次运行需联网下载语言包，约 200MB。",
  },
  {
    id: "expense",
    name: "报销单生成",
    icon: "💰",
    color: "#ec4899",
    version: "1.0.0",
    category: "办公效率",
    description: "按公司模板自动生成报销单，支持发票图片识别和金额汇总。",
    tags: ["报销", "财务", "OCR"],
    author: "财务组",
    updated: "2026-10-28",
    size: "512 KB",
    downloads: 67,
    install: "需安装 Node.js 18+，运行 npm install && npm start。",
  },
  {
    id: "color-picker",
    name: "配色方案生成器",
    icon: "🎨",
    color: "#14b8a6",
    version: "1.4.0",
    category: "设计工具",
    description: "输入主色，自动生成和谐配色方案，支持导出 CSS/SCSS 变量。",
    tags: ["配色", "设计", "CSS"],
    author: "设计组",
    updated: "2026-10-12",
    size: "64 KB",
    downloads: 134,
    install: "纯前端工具，打开 index.html 即可使用。",
  },
];

// ===== 工具函数 =====
const $ = (sel) => document.querySelector(sel);
const grid = $("#skillGrid");
const searchInput = $("#searchInput");
const categoryFilters = $("#categoryFilters");
const totalCount = $("#totalCount");
const emptyState = $("#emptyState");
const modal = $("#detailModal");
const modalBody = $("#modalBody");
const toast = $("#toast");

// ===== 渲染分类筛选 =====
function renderCategories() {
  const categories = [...new Set(SKILLS.map((s) => s.category))];
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.dataset.category = cat;
    btn.textContent = cat;
    categoryFilters.appendChild(btn);
  });
}

// ===== 渲染技能卡片 =====
function renderSkills(list) {
  grid.innerHTML = "";
  totalCount.textContent = `${list.length} 个技能`;

  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  list.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon" style="background:${skill.color}22;color:${skill.color}">${skill.icon}</div>
        <div>
          <div class="card-title">${skill.name}</div>
          <div class="card-version">v${skill.version}</div>
        </div>
      </div>
      <p class="card-desc">${skill.description}</p>
      <div class="card-tags">
        ${skill.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="card-footer">
        <span class="card-meta">${skill.author} · ${skill.downloads} 次下载</span>
        <button class="btn btn-primary" data-download="${skill.id}">
          ⬇ 下载
        </button>
      </div>
    `;
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-download]")) return;
      openDetail(skill);
    });
    grid.appendChild(card);
  });
}

// ===== 搜索 & 筛选 =====
let activeCategory = "all";
let searchKeyword = "";

function applyFilters() {
  const keyword = searchKeyword.toLowerCase();
  const filtered = SKILLS.filter((s) => {
    const matchCat = activeCategory === "all" || s.category === activeCategory;
    const matchSearch =
      !keyword ||
      s.name.toLowerCase().includes(keyword) ||
      s.description.toLowerCase().includes(keyword) ||
      s.tags.some((t) => t.toLowerCase().includes(keyword)) ||
      s.category.toLowerCase().includes(keyword);
    return matchCat && matchSearch;
  });
  renderSkills(filtered);
}

searchInput.addEventListener("input", (e) => {
  searchKeyword = e.target.value;
  applyFilters();
});

categoryFilters.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  categoryFilters.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");
  activeCategory = chip.dataset.category;
  applyFilters();
});

// ===== 详情弹窗 =====
function openDetail(skill) {
  modalBody.innerHTML = `
    <div class="detail-header">
      <div class="card-icon" style="background:${skill.color}22;color:${skill.color};width:56px;height:56px;font-size:26px">${skill.icon}</div>
      <div>
        <div class="detail-title">${skill.name}</div>
        <div class="card-version">v${skill.version} · ${skill.category}</div>
      </div>
    </div>
    <p class="detail-desc">${skill.description}</p>
    <div class="detail-section">
      <div class="detail-label">标签</div>
      <div class="detail-tags">
        ${skill.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-label">基本信息</div>
      <p style="font-size:14px;color:var(--text-2)">
        作者：${skill.author}　|　更新：${skill.updated}　|　大小：${skill.size}<br/>
        累计下载：${skill.downloads} 次
      </p>
    </div>
    <div class="detail-section">
      <div class="detail-label">安装说明</div>
      <p style="font-size:14px;color:var(--text-2)">${skill.install}</p>
    </div>
    <div class="detail-actions">
      <button class="btn btn-ghost" data-close>关闭</button>
      <button class="btn btn-primary" data-download="${skill.id}">⬇ 下载技能</button>
    </div>
  `;
  modal.hidden = false;
}

modal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close")) {
    modal.hidden = true;
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.hidden = true;
});

// ===== 下载功能（演示：生成一个技能信息文件供下载） =====
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-download]");
  if (!btn) return;
  const id = btn.dataset.download;
  const skill = SKILLS.find((s) => s.id === id);
  if (!skill) return;
  downloadSkill(skill);
});

function downloadSkill(skill) {
  // 演示用途：生成一个包含技能元数据的 JSON 文件
  // 真实场景下应替换为从服务器下载 .zip 包
  const payload = {
    name: skill.name,
    version: skill.version,
    category: skill.category,
    description: skill.description,
    tags: skill.tags,
    author: skill.author,
    install: skill.install,
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${skill.id}-v${skill.version}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`已开始下载：${skill.name}`);
  skill.downloads += 1;
  applyFilters();
}

// ===== Toast =====
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}

// ===== 反馈表单 =====
const REPO_URL = "https://github.com/Bincode1/skills-hub";
const feedbackModal = $("#feedbackModal");
let feedbackType = "bug";

$("#feedbackBtn").addEventListener("click", () => {
  feedbackModal.hidden = false;
});

feedbackModal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-close-feedback")) {
    feedbackModal.hidden = true;
  }
});

// 类型切换
feedbackModal.querySelectorAll(".type-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    feedbackModal.querySelectorAll(".type-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    feedbackType = btn.dataset.type;
  });
});

// 提交反馈 → 跳转 GitHub Issues（预填内容）
$("#fbSubmit").addEventListener("click", () => {
  const title = $("#fbTitle").value.trim();
  const desc = $("#fbDesc").value.trim();
  const contact = $("#fbContact").value.trim();

  if (!title) {
    showToast("请填写标题");
    $("#fbTitle").focus();
    return;
  }

  const typeLabel = { bug: "🐛 Bug", feature: "✨ 建议", other: "💭 其他" }[feedbackType];
  const typeTag = { bug: "bug", feature: "enhancement", other: "" }[feedbackType];

  const body = [
    `**类型**：${typeLabel}`,
    "",
    `**描述**：${desc || "（无）"}`,
    "",
    contact ? `**联系方式**：${contact}` : "",
    "",
    "---",
    `_来自技能中心反馈表单 · ${new Date().toLocaleString("zh-CN")}_`,
  ]
    .filter(Boolean)
    .join("\n");

  const labels = typeTag ? `&labels=${typeTag}` : "";
  const url = `${REPO_URL}/issues/new?title=${encodeURIComponent(`[${typeLabel.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, "").trim()}] ${title}`)}&body=${encodeURIComponent(body)}${labels}`;

  window.open(url, "_blank");
  feedbackModal.hidden = true;
  showToast("已打开 GitHub Issues，请确认后提交");
});

// ===== 初始化 =====
renderCategories();
applyFilters();
