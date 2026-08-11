const DAY = 86400000;
const $ = selector => document.querySelector(selector);
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const pad = value => String(value).padStart(2, "0");
const dateKey = (date = new Date()) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const today = () => dateKey(new Date());
const parseDate = value => {
  const [year, month, day] = String(value).split("-").map(Number);
  return new Date(year, month - 1, day, 12);
};
const addDays = (value, amount) => {
  const date = parseDate(value);
  date.setDate(date.getDate() + amount);
  return dateKey(date);
};
const diffDays = (a, b) => {
  const first = parseDate(a), second = parseDate(b);
  return Math.round((Date.UTC(first.getFullYear(), first.getMonth(), first.getDate()) - Date.UTC(second.getFullYear(), second.getMonth(), second.getDate())) / DAY);
};
const monthDiff = (a, b) => {
  const first = parseDate(a), second = parseDate(b);
  return (first.getFullYear() - second.getFullYear()) * 12 + first.getMonth() - second.getMonth();
};
const keyFor = (id, date) => `${id}@${date}`;

const copy = {
  en: {greeting:"Good afternoon, Zora.",subtitle:"A calm home starts with one small thing.",todayTasks:"Today’s Tasks",schedule:"Schedule",upcomingSchedule:"Upcoming schedule",viewAll:"View all today’s tasks",addSchedule:"Add scheduled task",quickActions:"Quick Actions",makeItEasy:"Make it easy",dailyTask:"Daily task",everyDay:"Every day",scheduledTask:"Scheduled",chooseRepeat:"Choose a repeat",flexibleTask:"Flexible",wheneverReady:"Whenever you’re ready",dashboard:"Dashboard",tasks:"Tasks",settings:"Settings",addTask:"Add task",englishName:"English name",chineseName:"Chinese name",taskType:"Task type",startDate:"Start date",repeatEvery:"Repeat every",unit:"Unit",days:"Days",weeks:"Weeks",months:"Months",followUp:"Next-day follow-up (optional)",saveTask:"Save task",allTasks:"All tasks",language:"Language",languageHelp:"Switch between English and Chinese",weatherLocation:"Weather location",locate:"Locate",install:"Install Homebase",installHelp:"Add this dashboard to your Home Screen",installButton:"Install",reset:"Reset all local data",all:"All",today:"Today",overdue:"Overdue",noTasks:"Nothing waiting here.",deleteConfirm:"Delete this task?",resetConfirm:"Reset every task, completion record and saved weather location?",saved:"Task saved",weatherError:"Weather unavailable",locationDenied:"Location access was not available",installed:"Homebase is ready to install",installIos:"On iPhone, tap Share, then Add to Home Screen.",complete:"Complete",undo:"Mark incomplete",deleteTask:"Delete"},
  zh: {greeting:"下午好，左拉。",subtitle:"从一件小事开始，让家慢慢变得舒适。",todayTasks:"今日任务",schedule:"日程",upcomingSchedule:"未来日程",viewAll:"查看今日全部任务",addSchedule:"添加计划任务",quickActions:"快捷操作",makeItEasy:"让一切更简单",dailyTask:"每日任务",everyDay:"每天重复",scheduledTask:"计划任务",chooseRepeat:"选择循环周期",flexibleTask:"灵活任务",wheneverReady:"准备好时再开始",dashboard:"主页",tasks:"任务",settings:"设置",addTask:"添加任务",englishName:"英文名称",chineseName:"中文名称",taskType:"任务类型",startDate:"开始日期",repeatEvery:"每隔",unit:"单位",days:"天",weeks:"周",months:"月",followUp:"次日跟进（选填）",saveTask:"保存任务",allTasks:"全部任务",language:"语言",languageHelp:"切换中文或英文",weatherLocation:"天气地点",locate:"定位",install:"安装 Homebase",installHelp:"将工作台添加到手机主屏幕",installButton:"安装",reset:"清空本地数据",all:"全部",today:"今日",overdue:"已逾期",noTasks:"这里暂时没有任务。",deleteConfirm:"删除这项任务？",resetConfirm:"清空所有任务、完成记录和天气地点？",saved:"任务已保存",weatherError:"暂时无法获取天气",locationDenied:"无法使用当前位置",installed:"Homebase 已可以安装",installIos:"iPhone 请点击分享，再选择“添加到主屏幕”。",complete:"完成",undo:"标记为未完成",deleteTask:"删除"}
};

function makeDefaults() {
  const start = today();
  return [
    {id:uid(),zh:"洗碗",en:"Wash dishes",type:"daily"},
    {id:uid(),zh:"洗猫碗",en:"Wash Meatball’s bowls",type:"daily"},
    {id:uid(),zh:"铲猫砂",en:"Scoop litter",type:"daily"},
    {id:uid(),zh:"扫地",en:"Sweep floors",type:"daily"},
    {id:uid(),zh:"擦餐桌",en:"Wipe dining table",type:"scheduled",unit:"days",every:3,start},
    {id:uid(),zh:"吸地毯",en:"Vacuum carpets",type:"scheduled",unit:"days",every:3,start},
    {id:uid(),zh:"清理厨房",en:"Clean kitchen",type:"scheduled",unit:"weeks",every:1,start},
    {id:uid(),zh:"清理浴室",en:"Clean bathroom",type:"scheduled",unit:"weeks",every:2,start},
    {id:uid(),zh:"洗衣服",en:"Do laundry",type:"flexible",followupZh:"收衣服",followupEn:"Put clothes away"}
  ];
}

function loadState() {
  const raw = localStorage.getItem("cleaningState");
  if (!raw) return {tasks:makeDefaults(),done:{},deferred:{},generated:[],activeTab:"today"};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.tasks)) throw new Error("Invalid state");
    return parsed;
  } catch (error) {
    localStorage.setItem("cleaningStateBackup", raw);
    return {tasks:makeDefaults(),done:{},deferred:{},generated:[],activeTab:"today",recovered:true};
  }
}

let state = loadState();
state.tasks = Array.isArray(state.tasks) ? state.tasks : makeDefaults();
state.done = state.done && typeof state.done === "object" ? state.done : {};
state.deferred = state.deferred && typeof state.deferred === "object" ? state.deferred : {};
state.generated = Array.isArray(state.generated) ? state.generated : [];
state.lang = state.lang || localStorage.getItem("homebaseLang") || "en";
let taskFilter = "all";

const save = () => {
  try {
    localStorage.setItem("cleaningState", JSON.stringify(state));
    localStorage.setItem("homebaseLang", state.lang);
  } catch (error) {
    console.warn("Homebase could not save local data", error);
  }
};
const t = key => copy[state.lang][key] || key;
const taskName = task => state.lang === "zh" ? (task.zh || task.en) : (task.en || task.zh);

function due(task, date) {
  if (task.type === "daily") return true;
  if (task.type !== "scheduled") return false;
  const start = task.start || today();
  const elapsed = diffDays(date, start);
  if (elapsed < 0) return false;
  const every = Math.max(1, Number(task.every) || 1);
  if (task.unit === "days") return elapsed % every === 0;
  if (task.unit === "weeks") return elapsed % (7 * every) === 0;
  if (task.unit === "months") {
    const months = monthDiff(date, start);
    if (months < 0 || months % every !== 0) return false;
    const target = parseDate(date), origin = parseDate(start);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    return target.getDate() === Math.min(origin.getDate(), lastDay);
  }
  return false;
}

function autoDefer() {
  const current = today();
  const previous = addDays(current, -1);
  let changed = false;
  Object.keys(state.deferred).forEach(key => {
    const id = key.split("@")[0];
    const task = state.tasks.find(item => item.id === id);
    if (!task || task.type === "daily" || state.done[key]) {
      delete state.deferred[key];
      changed = true;
    } else if (state.deferred[key] !== current) {
      state.deferred[key] = current;
      changed = true;
    }
  });

  const earliestAllowed = addDays(current, -366);
  const firstDay = state.lastProcessedDate ? addDays(state.lastProcessedDate, 1) : earliestAllowed;
  if (firstDay <= previous) {
    state.tasks.filter(task => task.type === "scheduled").forEach(task => {
      let cursor = task.start && task.start > firstDay ? task.start : firstDay;
      while (cursor <= previous) {
        if (due(task, cursor)) {
          const key = keyFor(task.id, cursor);
          if (!state.done[key] && !state.deferred[key]) {
            state.deferred[key] = current;
            changed = true;
          }
        }
        cursor = addDays(cursor, 1);
      }
    });
    state.lastProcessedDate = previous;
    changed = true;
  }
  if (changed) save();
}

function instances(date) {
  const grouped = new Map();
  state.tasks.filter(task => due(task, date)).forEach(task => {
    const key = keyFor(task.id, date);
    grouped.set(task.id, {...task,date,key,sourceKeys:[key],overdue:false});
  });

  state.generated.forEach(task => {
    const key = keyFor(task.id, task.date);
    if (task.date === date || (task.date < date && !state.done[key])) {
      grouped.set(task.id, {...task,key,sourceKeys:[key],overdue:task.date < date});
    }
  });

  Object.entries(state.deferred).forEach(([key, deferredTo]) => {
    if (deferredTo !== date || state.done[key]) return;
    const id = key.split("@")[0];
    const task = state.tasks.find(item => item.id === id);
    if (!task || task.type !== "scheduled") return;
    const existing = grouped.get(id);
    if (existing) {
      if (!existing.sourceKeys.includes(key)) existing.sourceKeys.push(key);
      existing.overdue = true;
    } else {
      grouped.set(id, {...task,date,key,sourceKeys:[key],overdue:true});
    }
  });
  return [...grouped.values()];
}

function itemDone(item) {
  const keys = item.sourceKeys || [item.key || keyFor(item.id, item.date || today())];
  return keys.every(key => Boolean(state.done[key]));
}

function toggleDone(item) {
  const keys = item.sourceKeys || [item.key || keyFor(item.id, item.date || today())];
  const wasDone = keys.every(key => Boolean(state.done[key]));
  keys.forEach(key => {
    if (wasDone) delete state.done[key];
    else {
      state.done[key] = new Date().toISOString();
      delete state.deferred[key];
    }
  });
  if (!wasDone && item.type === "flexible" && (item.followupEn || item.followupZh) && !state.generated.some(task => task.parentKey === keys[0])) {
    state.generated.push({id:uid(),en:item.followupEn || item.followupZh,zh:item.followupZh || item.followupEn,type:"generated",date:addDays(item.date || today(),1),parentKey:keys[0]});
  }
  save();
  render();
}

function typeLabel(task) {
  if (task.overdue) return t("overdue");
  if (task.type === "daily") return t("dailyTask");
  if (task.type === "flexible") return t("flexibleTask");
  if (task.type === "generated") return t("followUp");
  return `${t("scheduledTask")} · ${task.every || 1} ${t(task.unit || "days").toLowerCase()}`;
}

function taskRow(item, library = false) {
  const row = document.createElement("div");
  const key = item.key || keyFor(item.id, today());
  const viewItem = {...item,key,date:item.date || today(),sourceKeys:item.sourceKeys || [key]};
  const done = itemDone(viewItem);
  row.className = `task-item${done ? " done" : ""}`;
  row.innerHTML = `<button class="check" type="button"></button><div><div class="task-name"></div><div class="task-meta"></div></div>${library ? '<button class="delete-task" type="button">×</button>' : ""}`;
  row.querySelector(".check").textContent = done ? "✓" : "";
  row.querySelector(".check").setAttribute("aria-label", `${done ? t("undo") : t("complete")}: ${taskName(item)}`);
  row.querySelector(".task-name").textContent = taskName(item);
  row.querySelector(".task-meta").textContent = typeLabel(item);
  row.querySelector(".check").onclick = () => toggleDone(viewItem);
  if (library) {
    const remove = row.querySelector(".delete-task");
    remove.setAttribute("aria-label", `${t("deleteTask")}: ${taskName(item)}`);
    remove.onclick = () => removeTask(item.id);
  }
  return row;
}

function removeTask(id) {
  if (!confirm(t("deleteConfirm"))) return;
  state.tasks = state.tasks.filter(task => task.id !== id);
  state.generated = state.generated.filter(task => task.id !== id);
  Object.keys(state.done).filter(key => key.startsWith(`${id}@`)).forEach(key => delete state.done[key]);
  Object.keys(state.deferred).filter(key => key.startsWith(`${id}@`)).forEach(key => delete state.deferred[key]);
  save();
  render();
}

function renderToday() {
  const items = instances(today());
  const main = $("#todayList"), full = $("#fullTodayList");
  main.innerHTML = "";
  full.innerHTML = "";
  items.slice(0, 5).forEach(item => main.appendChild(taskRow(item)));
  items.forEach(item => full.appendChild(taskRow(item)));
  if (!items.length) {
    main.innerHTML = `<div class="empty">${t("noTasks")}</div>`;
    full.innerHTML = `<div class="empty">${t("noTasks")}</div>`;
  }
  $("#todayCount").textContent = `${items.filter(itemDone).length} / ${items.length}`;
}

function nextScheduled(limit = 3, horizon = 370) {
  const output = [];
  for (let offset = 0; offset < horizon && output.length < limit; offset += 1) {
    const date = addDays(today(), offset);
    state.tasks.filter(task => task.type === "scheduled" && due(task, date)).forEach(task => output.push({...task,date}));
  }
  return output.slice(0, limit);
}

function scheduleRow(item) {
  const date = parseDate(item.date), row = document.createElement("div");
  row.className = "schedule-item";
  row.innerHTML = `<div class="date-badge"><strong>${date.getDate()}</strong><small></small></div><div><h3></h3><p></p></div>`;
  row.querySelector("small").textContent = new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en-NZ", {month:"short"}).format(date);
  row.querySelector("h3").textContent = taskName(item);
  row.querySelector("p").textContent = new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en-NZ", {weekday:"long",year:"numeric",month:"short",day:"numeric"}).format(date);
  return row;
}

function renderSchedule() {
  const compact = $("#scheduleList"), full = $("#fullScheduleList");
  compact.innerHTML = "";
  full.innerHTML = "";
  nextScheduled(3).forEach(item => compact.appendChild(scheduleRow(item)));
  nextScheduled(30).forEach(item => full.appendChild(scheduleRow(item)));
  if (!compact.children.length) compact.innerHTML = `<div class="empty">${t("noTasks")}</div>`;
  if (!full.children.length) full.innerHTML = `<div class="empty">${t("noTasks")}</div>`;
}

function renderLibrary() {
  const labels = ["all","dailyTask","scheduledTask","flexibleTask"], values = ["all","daily","scheduled","flexible"];
  const filters = $("#taskFilters");
  filters.innerHTML = "";
  labels.forEach((label, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${taskFilter === values[index] ? " active" : ""}`;
    button.textContent = t(label);
    button.onclick = () => {taskFilter = values[index]; renderLibrary();};
    filters.appendChild(button);
  });
  const list = $("#allTasksList");
  list.innerHTML = "";
  state.tasks.filter(task => taskFilter === "all" || task.type === taskFilter).forEach(item => list.appendChild(taskRow(item, true)));
  if (!list.children.length) list.innerHTML = `<div class="empty">${t("noTasks")}</div>`;
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach(element => {element.textContent = t(element.dataset.i18n);});
  $("#languageBtn").textContent = state.lang === "en" ? "中" : "EN";
  $("#settingsLanguageBtn").textContent = state.lang === "en" ? "中文" : "English";
  const hour = new Date().getHours();
  if (state.lang === "en") $("[data-i18n=greeting]").textContent = `Good ${hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening"}, Zora.`;
  $("#dateLine").textContent = new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en-NZ", {weekday:"long",day:"numeric",month:"long"}).format(new Date());
}

function render() {
  autoDefer();
  applyLanguage();
  renderToday();
  renderSchedule();
  renderLibrary();
}

function openModal(id) {
  const modal = $("#" + id);
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal(id) {
  const modal = $("#" + id);
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
function closeAllModals() {document.querySelectorAll(".modal.show").forEach(modal => closeModal(modal.id));}
function toggleTaskFields() {
  const type = $("#taskType").value;
  $("#scheduledFields").hidden = type !== "scheduled";
  $("#startDate").required = type === "scheduled";
  $("#flexFields").hidden = type !== "flexible";
}
function openTask(type = "daily") {
  $("#taskForm").reset();
  $("#repeatEvery").value = 1;
  $("#startDate").value = today();
  $("#startDate").min = today();
  $("#taskType").value = type;
  toggleTaskFields();
  openModal("taskModal");
  setTimeout(() => $("#nameEn").focus(), 120);
}
function switchLanguage() {state.lang = state.lang === "en" ? "zh" : "en"; save(); render();}
function toast(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(element.timer);
  element.timer = setTimeout(() => element.classList.remove("show"), 2400);
}

const weatherCodes = {0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",48:"🌫️",51:"🌦️",53:"🌦️",55:"🌧️",61:"🌧️",63:"🌧️",65:"🌧️",71:"🌨️",73:"🌨️",75:"❄️",80:"🌦️",81:"🌧️",82:"⛈️",95:"⛈️"};
async function getWeather(lat = -43.5321, lon = 172.6362, label = "Christchurch") {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`);
    if (!response.ok) throw new Error("Weather request failed");
    const data = await response.json();
    $("#weatherTemp").textContent = `${Math.round(data.current.temperature_2m)}°`;
    $("#weatherIcon").textContent = weatherCodes[data.current.weather_code] || "☁️";
    $("#weatherPlace").textContent = label;
    localStorage.setItem("homebaseWeather", JSON.stringify({lat,lon,label}));
  } catch (error) {toast(t("weatherError"));}
}
function savedWeather() {
  try {return JSON.parse(localStorage.getItem("homebaseWeather") || "null");}
  catch (error) {localStorage.removeItem("homebaseWeather"); return null;}
}
function useLocation() {
  if (!navigator.geolocation) return toast(t("locationDenied"));
  navigator.geolocation.getCurrentPosition(position => {
    getWeather(position.coords.latitude, position.coords.longitude, state.lang === "zh" ? "当前位置" : "My location");
    closeModal("settingsModal");
  }, () => toast(t("locationDenied")), {timeout:8000});
}

$("#languageBtn").onclick = switchLanguage;
$("#settingsLanguageBtn").onclick = switchLanguage;
$("#settingsBtn").onclick = () => openModal("settingsModal");
$("#addBtn").onclick = () => openTask();
$("#viewTasksBtn").onclick = () => openModal("todayModal");
$("#addScheduleBtn").onclick = () => openTask("scheduled");
$("#scheduleModalAddBtn").onclick = () => openTask("scheduled");
$("#taskType").onchange = toggleTaskFields;
$("#weatherBtn").onclick = () => {const saved = savedWeather(); saved ? getWeather(saved.lat, saved.lon, saved.label) : getWeather();};
$("#locationBtn").onclick = useLocation;
document.querySelectorAll("[data-add-type]").forEach(button => {button.onclick = () => openTask(button.dataset.addType);});
document.querySelectorAll("[data-close]").forEach(button => {button.onclick = () => closeModal(button.dataset.close);});
document.querySelectorAll(".modal").forEach(modal => {modal.onclick = event => {if (event.target === modal) closeModal(modal.id);};});
document.addEventListener("keydown", event => {if (event.key === "Escape") closeAllModals();});
document.querySelectorAll(".nav-item").forEach(button => {
  button.onclick = () => {
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const view = button.dataset.view;
    if (view === "dashboard") closeAllModals();
    if (view === "tasks") openModal("tasksModal");
    if (view === "schedule") openModal("scheduleModal");
    if (view === "settings") openModal("settingsModal");
  };
});

$("#taskForm").onsubmit = event => {
  event.preventDefault();
  const type = $("#taskType").value;
  const item = {id:uid(),en:$("#nameEn").value.trim(),zh:$("#nameZh").value.trim(),type};
  if (type === "scheduled") Object.assign(item, {unit:$("#repeatUnit").value,every:Math.max(1, Number($("#repeatEvery").value) || 1),start:$("#startDate").value || today()});
  if (type === "flexible") Object.assign(item, {followupEn:$("#followupEn").value.trim(),followupZh:$("#followupZh").value.trim()});
  state.tasks.push(item);
  save();
  closeModal("taskModal");
  toast(t("saved"));
  render();
};

$("#resetBtn").onclick = () => {
  if (!confirm(t("resetConfirm"))) return;
  ["cleaningState","cleaningStateBackup","homebaseLang","homebaseWeather"].forEach(key => localStorage.removeItem(key));
  location.reload();
};

let installPrompt = null;
window.addEventListener("beforeinstallprompt", event => {event.preventDefault(); installPrompt = event; toast(t("installed"));});
$("#installBtn").onclick = async () => {
  if (!installPrompt) return toast(t("installIos"));
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
};

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
const weather = savedWeather();
weather ? getWeather(weather.lat, weather.lon, weather.label) : getWeather();
render();
