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
  en: {greeting:"Good afternoon, Zora.",subtitle:"A calm home starts with one small thing.",todayTasks:"Today’s Tasks",schedule:"Schedule",upcomingSchedule:"Upcoming schedule",viewAll:"View all today’s tasks",addSchedule:"Add scheduled task",quickActions:"Quick Actions",makeItEasy:"Make it easy",dailyTask:"Daily task",everyDay:"Every day",scheduledTask:"Scheduled",chooseRepeat:"Choose a repeat",flexibleTask:"Flexible",wheneverReady:"Whenever you’re ready",dashboard:"Dashboard",tasks:"Tasks",health:"Health",settings:"Settings",addTask:"Add task",englishName:"English name",chineseName:"Chinese name",taskType:"Task type",startDate:"Start date",repeatEvery:"Repeat every",unit:"Unit",days:"Days",weeks:"Weeks",months:"Months",followUp:"Next-day follow-up (optional)",saveTask:"Save task",allTasks:"All tasks",language:"Language",languageHelp:"Switch between English and Chinese",weatherLocation:"Weather location",locate:"Locate",install:"Install Homebase",installHelp:"Add this dashboard to your Home Screen",installButton:"Install",reset:"Reset all local data",all:"All",today:"Today",overdue:"Overdue",noTasks:"Nothing waiting here.",deleteConfirm:"Delete this task?",resetConfirm:"Reset every task, personal and Meatball weight record, completion record and saved weather location?",saved:"Task saved",weatherError:"Weather unavailable",locationDenied:"Location access was not available",installed:"Homebase is ready to install",installIos:"On iPhone, tap Share, then Add to Home Screen.",complete:"Complete",undo:"Mark incomplete",deleteTask:"Delete",weightTracking:"Weight tracking",fastingTrend:"Fasting trend only",noWeightYet:"No fasting records yet",openHealth:"Open health record",healthIntro:"Record consistently to see a clearer long-term trend.",latestFasting:"Latest fasting",fastingChange:"Change",fastingEntries:"Fasting entries",needTwoFasting:"Add two fasting records to see your trend.",addWeight:"Add weight",weightHistory:"Weight history",allRecordsShown:"All records are shown below",weightKg:"Weight (kg)",recordDate:"Date",recordTime:"Time",fastingRecord:"Fasting measurement",fastingHelp:"Included in your trend chart",noteOptional:"Note (optional)",weightNotePlaceholder:"e.g. Before breakfast",saveWeight:"Save weight",weightSaved:"Weight saved",deleteWeight:"Delete weight record",deleteWeightConfirm:"Delete this weight record?",fasting:"Fasting",notFasting:"Not fasting",noWeightRecords:"No weight records yet.",fromFirst:"from first",latest:"latest",myWeight:"My weight",petWeight:"Meatball’s weight",petHealthIntro:"A separate record for monthly weight changes.",latestWeight:"Latest weight",weightChange:"Change",totalEntries:"Entries",petWeightTrend:"Weight trend",needTwoPetWeights:"Add two records to see Meatball’s trend.",addPetWeight:"Add Meatball’s weight",petWeightHistory:"Meatball’s weight history",historicalRecordsWelcome:"Past dates can be added",petHistoryHelp:"Choose any past date to add an older record.",petWeightNotePlaceholder:"e.g. Home scale",savePetWeight:"Save Meatball’s weight",petWeightSaved:"Meatball’s weight saved",deletePetWeight:"Delete Meatball’s weight record",deletePetWeightConfirm:"Delete this Meatball weight record?",noPetWeightRecords:"No Meatball weight records yet."},
  zh: {greeting:"下午好，左拉。",subtitle:"从一件小事开始，让家慢慢变得舒适。",todayTasks:"今日任务",schedule:"日程",upcomingSchedule:"未来日程",viewAll:"查看今日全部任务",addSchedule:"添加计划任务",quickActions:"快捷操作",makeItEasy:"让一切更简单",dailyTask:"每日任务",everyDay:"每天重复",scheduledTask:"计划任务",chooseRepeat:"选择循环周期",flexibleTask:"灵活任务",wheneverReady:"准备好时再开始",dashboard:"主页",tasks:"任务",health:"健康",settings:"设置",addTask:"添加任务",englishName:"英文名称",chineseName:"中文名称",taskType:"任务类型",startDate:"开始日期",repeatEvery:"每隔",unit:"单位",days:"天",weeks:"周",months:"月",followUp:"次日跟进（选填）",saveTask:"保存任务",allTasks:"全部任务",language:"语言",languageHelp:"切换中文或英文",weatherLocation:"天气地点",locate:"定位",install:"安装 Homebase",installHelp:"将工作台添加到手机主屏幕",installButton:"安装",reset:"清空本地数据",all:"全部",today:"今日",overdue:"已逾期",noTasks:"这里暂时没有任务。",deleteConfirm:"删除这项任务？",resetConfirm:"清空所有任务、我的体重、咪宝体重、完成记录和天气地点？",saved:"任务已保存",weatherError:"暂时无法获取天气",locationDenied:"无法使用当前位置",installed:"Homebase 已可以安装",installIos:"iPhone 请点击分享，再选择“添加到主屏幕”。",complete:"完成",undo:"标记为未完成",deleteTask:"删除",weightTracking:"体重记录",fastingTrend:"仅显示空腹趋势",noWeightYet:"还没有空腹记录",openHealth:"打开健康记录",healthIntro:"尽量保持相同时间与状态，长期趋势会更清楚。",latestFasting:"最近空腹体重",fastingChange:"体重变化",fastingEntries:"空腹记录",needTwoFasting:"添加两次空腹体重后即可查看趋势。",addWeight:"记录体重",weightHistory:"体重历史",allRecordsShown:"下方显示全部记录",weightKg:"体重（kg）",recordDate:"日期",recordTime:"时间",fastingRecord:"空腹测量",fastingHelp:"此记录会计入趋势图",noteOptional:"备注（选填）",weightNotePlaceholder:"例如：早餐前",saveWeight:"保存体重",weightSaved:"体重已保存",deleteWeight:"删除体重记录",deleteWeightConfirm:"删除这条体重记录？",fasting:"空腹",notFasting:"非空腹",noWeightRecords:"还没有体重记录。",fromFirst:"较首次",latest:"最近",myWeight:"我的体重",petWeight:"咪宝体重",petHealthIntro:"单独记录咪宝每月的体重变化。",latestWeight:"最近体重",weightChange:"体重变化",totalEntries:"记录次数",petWeightTrend:"体重趋势",needTwoPetWeights:"添加两次记录后即可查看咪宝的趋势。",addPetWeight:"记录咪宝体重",petWeightHistory:"咪宝体重历史",historicalRecordsWelcome:"可以补录过去日期",petHistoryHelp:"选择任意过去日期，即可补录以前的体重。",petWeightNotePlaceholder:"例如：家用体重秤",savePetWeight:"保存咪宝体重",petWeightSaved:"咪宝体重已保存",deletePetWeight:"删除咪宝体重记录",deletePetWeightConfirm:"删除这条咪宝体重记录？",noPetWeightRecords:"还没有咪宝的体重记录。"}
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

function loadWeightRecords() {
  const raw = localStorage.getItem("homebaseWeightRecords");
  if (!raw) return [];
  try {
    const records = JSON.parse(raw);
    if (!Array.isArray(records)) throw new Error("Invalid weight data");
    return records.filter(record => record && Number.isFinite(Number(record.weight)) && /^\d{4}-\d{2}-\d{2}$/.test(record.date));
  } catch (error) {
    localStorage.setItem("homebaseWeightRecordsBackup", raw);
    return [];
  }
}

let weightRecords = loadWeightRecords();
const weightTimestamp = record => `${record.date}T${record.time || "12:00"}`;
const sortedWeights = () => [...weightRecords].sort((a, b) => weightTimestamp(a).localeCompare(weightTimestamp(b)));
const fastingWeights = () => sortedWeights().filter(record => record.fasting);
const saveWeights = () => {
  try {localStorage.setItem("homebaseWeightRecords", JSON.stringify(weightRecords));}
  catch (error) {console.warn("Homebase could not save weight data", error);}
};

function loadPetWeightRecords() {
  const raw = localStorage.getItem("homebasePetWeightRecords");
  if (!raw) return [];
  try {
    const records = JSON.parse(raw);
    if (!Array.isArray(records)) throw new Error("Invalid pet weight data");
    return records.filter(record => record && Number.isFinite(Number(record.weight)) && /^\d{4}-\d{2}-\d{2}$/.test(record.date));
  } catch (error) {
    localStorage.setItem("homebasePetWeightRecordsBackup", raw);
    return [];
  }
}

let petWeightRecords = loadPetWeightRecords();
const sortedPetWeights = () => [...petWeightRecords].sort((a, b) => a.date.localeCompare(b.date) || String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
const savePetWeights = () => {
  try {localStorage.setItem("homebasePetWeightRecords", JSON.stringify(petWeightRecords));}
  catch (error) {console.warn("Homebase could not save pet weight data", error);}
};
let healthView = "personal";

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

function weightDateLabel(record, includeTime = false) {
  const date = parseDate(record.date);
  const formatted = new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en-NZ", {day:"numeric",month:"short",year:"numeric"}).format(date);
  return includeTime && record.time ? `${formatted} · ${record.time}` : formatted;
}

function weightDelta(records) {
  if (records.length < 2) return null;
  return Number(records[records.length - 1].weight) - Number(records[0].weight);
}

function formatDelta(value) {
  if (value === null || !Number.isFinite(value)) return "—";
  if (Math.abs(value) < 0.05) return "0.0 kg";
  return `${value > 0 ? "+" : ""}${value.toFixed(1)} kg`;
}
function formatPetDelta(value) {
  if (value === null || !Number.isFinite(value)) return "—";
  if (Math.abs(value) < .005) return "0.00 kg";
  return `${value > 0 ? "+" : ""}${value.toFixed(2)} kg`;
}

function prepareCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.max(1, window.devicePixelRatio || 1);
  const width = Math.max(280, Math.round(rect.width || canvas.parentElement.clientWidth || 320));
  const height = Math.max(100, Math.round(rect.height || canvas.parentElement.clientHeight || 160));
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const context = canvas.getContext("2d");
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  return {context,width,height};
}

function drawWeightChart(canvas, records, compact = false) {
  const {context,width,height} = prepareCanvas(canvas);
  context.clearRect(0, 0, width, height);
  if (records.length < 2) return;
  const values = records.map(record => Number(record.weight));
  const rawMin = Math.min(...values), rawMax = Math.max(...values);
  const spread = Math.max(1, rawMax - rawMin);
  const min = rawMin - spread * .25, max = rawMax + spread * .25;
  const padding = compact ? {left:5,right:5,top:12,bottom:8} : {left:40,right:14,top:16,bottom:27};
  const x = index => padding.left + index * (width - padding.left - padding.right) / (records.length - 1);
  const y = value => padding.top + (max - value) * (height - padding.top - padding.bottom) / (max - min);

  if (!compact) {
    context.font = "11px -apple-system, sans-serif";
    context.fillStyle = "rgba(46,40,35,.55)";
    context.strokeStyle = "rgba(96,76,60,.12)";
    context.lineWidth = 1;
    [0,.5,1].forEach(step => {
      const value = max - (max - min) * step;
      const lineY = padding.top + (height - padding.top - padding.bottom) * step;
      context.beginPath(); context.moveTo(padding.left,lineY); context.lineTo(width-padding.right,lineY); context.stroke();
      context.fillText(`${value.toFixed(1)}`, 3, lineY + 4);
    });
    const firstLabel = weightDateLabel(records[0]);
    const lastLabel = weightDateLabel(records[records.length - 1]);
    context.fillText(firstLabel, padding.left, height - 5);
    const lastWidth = context.measureText(lastLabel).width;
    context.fillText(lastLabel, width - padding.right - lastWidth, height - 5);
  }

  const gradient = context.createLinearGradient(0,padding.top,0,height-padding.bottom);
  gradient.addColorStop(0,"rgba(174,105,91,.30)"); gradient.addColorStop(1,"rgba(174,105,91,0)");
  context.beginPath();
  records.forEach((record,index) => index ? context.lineTo(x(index),y(Number(record.weight))) : context.moveTo(x(index),y(Number(record.weight))));
  context.lineTo(x(records.length - 1),height-padding.bottom); context.lineTo(x(0),height-padding.bottom); context.closePath();
  context.fillStyle = gradient; context.fill();
  context.beginPath();
  records.forEach((record,index) => index ? context.lineTo(x(index),y(Number(record.weight))) : context.moveTo(x(index),y(Number(record.weight))));
  context.strokeStyle = "#a9685b"; context.lineWidth = compact ? 2.5 : 3; context.lineJoin = "round"; context.lineCap = "round"; context.stroke();
  if (!compact) records.forEach((record,index) => {context.beginPath();context.arc(x(index),y(Number(record.weight)),3.5,0,Math.PI*2);context.fillStyle="#f7efe5";context.fill();context.strokeStyle="#a9685b";context.lineWidth=2;context.stroke();});
}

function weightHistoryRow(record) {
  const row = document.createElement("div");
  row.className = "weight-history-row";
  row.innerHTML = `<div><strong></strong><small></small></div><div class="weight-history-meta"><span></span><button type="button">×</button></div>`;
  row.querySelector("strong").textContent = `${Number(record.weight).toFixed(1)} kg`;
  row.querySelector("small").textContent = `${weightDateLabel(record, true)}${record.note ? ` · ${record.note}` : ""}`;
  const badge = row.querySelector("span");
  badge.textContent = record.fasting ? t("fasting") : t("notFasting");
  badge.className = record.fasting ? "fasting-badge" : "regular-badge";
  const remove = row.querySelector("button");
  remove.setAttribute("aria-label", `${t("deleteWeight")}: ${Number(record.weight).toFixed(1)} kg`);
  remove.onclick = () => {
    if (!confirm(t("deleteWeightConfirm"))) return;
    weightRecords = weightRecords.filter(item => item.id !== record.id);
    saveWeights();
    renderWeight();
  };
  return row;
}

function renderWeight() {
  const fasting = fastingWeights();
  const latest = fasting[fasting.length - 1];
  const delta = weightDelta(fasting);
  $("#latestWeight").textContent = latest ? Number(latest.weight).toFixed(1) : "—";
  $("#latestWeightDate").textContent = latest ? `${t("latestFasting")} · ${weightDateLabel(latest, true)}` : t("noWeightYet");
  const cardChange = $("#weightChange");
  cardChange.textContent = delta === null ? "—" : `${formatDelta(delta)} ${t("fromFirst")}`;
  cardChange.className = `weight-change ${delta === null || Math.abs(delta) < .05 ? "neutral" : delta < 0 ? "down" : "up"}`;
  $("#healthLatest").textContent = latest ? `${Number(latest.weight).toFixed(1)} kg` : "—";
  $("#healthChange").textContent = formatDelta(delta);
  $("#healthChange").className = delta === null || Math.abs(delta) < .05 ? "" : delta < 0 ? "trend-down" : "trend-up";
  $("#healthCount").textContent = String(fasting.length);
  $("#chartRange").textContent = fasting.length ? `${weightDateLabel(fasting[0])} – ${weightDateLabel(fasting[fasting.length - 1])}` : "";
  $("#chartEmpty").hidden = fasting.length >= 2;
  const history = $("#weightHistory");
  history.innerHTML = "";
  sortedWeights().reverse().forEach(record => history.appendChild(weightHistoryRow(record)));
  if (!history.children.length) history.innerHTML = `<div class="empty">${t("noWeightRecords")}</div>`;
  requestAnimationFrame(() => {
    drawWeightChart($("#miniWeightChart"), fasting.slice(-12), true);
    drawWeightChart($("#weightChart"), fasting, false);
  });
}

function petWeightHistoryRow(record) {
  const row = document.createElement("div");
  row.className = "weight-history-row pet-history-row";
  row.innerHTML = `<div><strong></strong><small></small></div><div class="weight-history-meta"><button type="button">×</button></div>`;
  row.querySelector("strong").textContent = `${Number(record.weight).toFixed(2)} kg`;
  row.querySelector("small").textContent = `${weightDateLabel(record)}${record.note ? ` · ${record.note}` : ""}`;
  const remove = row.querySelector("button");
  remove.setAttribute("aria-label", `${t("deletePetWeight")}: ${Number(record.weight).toFixed(2)} kg`);
  remove.onclick = () => {
    if (!confirm(t("deletePetWeightConfirm"))) return;
    petWeightRecords = petWeightRecords.filter(item => item.id !== record.id);
    savePetWeights();
    renderPetWeight();
  };
  return row;
}

function renderPetWeight() {
  const records = sortedPetWeights();
  const latest = records[records.length - 1];
  const delta = weightDelta(records);
  $("#petLatest").textContent = latest ? `${Number(latest.weight).toFixed(2)} kg` : "—";
  $("#petChange").textContent = formatPetDelta(delta);
  $("#petChange").className = delta === null || Math.abs(delta) < .005 ? "" : delta < 0 ? "trend-down" : "trend-up";
  $("#petCount").textContent = String(records.length);
  $("#petChartRange").textContent = records.length ? `${weightDateLabel(records[0])} – ${weightDateLabel(records[records.length - 1])}` : "";
  $("#petChartEmpty").hidden = records.length >= 2;
  const history = $("#petWeightHistory");
  history.innerHTML = "";
  [...records].reverse().forEach(record => history.appendChild(petWeightHistoryRow(record)));
  if (!history.children.length) history.innerHTML = `<div class="empty">${t("noPetWeightRecords")}</div>`;
  requestAnimationFrame(() => drawWeightChart($("#petWeightChart"), records, false));
}

function showHealthView(view) {
  healthView = view === "pet" ? "pet" : "personal";
  $("#personalHealthView").hidden = healthView !== "personal";
  $("#petHealthView").hidden = healthView !== "pet";
  document.querySelectorAll("[data-health-view]").forEach(button => {
    const active = button.dataset.healthView === healthView;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  setTimeout(() => healthView === "pet" ? renderPetWeight() : renderWeight(), 0);
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
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {element.placeholder = t(element.dataset.i18nPlaceholder);});
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
  renderWeight();
  renderPetWeight();
}

function openModal(id) {
  const modal = $("#" + id);
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  if (id === "healthModal") setTimeout(() => showHealthView(healthView), 0);
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
function openWeightForm() {
  $("#weightForm").reset();
  const now = new Date();
  $("#weightDate").value = today();
  $("#weightDate").max = today();
  $("#weightTime").value = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  $("#weightFasting").checked = true;
  openModal("weightFormModal");
  setTimeout(() => $("#weightValue").focus(), 120);
}
function openPetWeightForm() {
  $("#petWeightForm").reset();
  $("#petWeightDate").value = today();
  $("#petWeightDate").max = today();
  openModal("petWeightFormModal");
  setTimeout(() => $("#petWeightValue").focus(), 120);
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
$("#openHealthBtn").onclick = () => openModal("healthModal");
$("#addWeightBtn").onclick = openWeightForm;
$("#addPetWeightBtn").onclick = openPetWeightForm;
document.querySelectorAll("[data-health-view]").forEach(button => {button.onclick = () => showHealthView(button.dataset.healthView);});
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
    if (view === "health") openModal("healthModal");
    if (view === "schedule") openModal("scheduleModal");
    if (view === "settings") openModal("settingsModal");
  };
});

$("#weightForm").onsubmit = event => {
  event.preventDefault();
  const value = Number($("#weightValue").value);
  if (!Number.isFinite(value) || value < 20 || value > 400) return;
  weightRecords.push({
    id:uid(),
    weight:Number(value.toFixed(1)),
    date:$("#weightDate").value || today(),
    time:$("#weightTime").value || "12:00",
    fasting:$("#weightFasting").checked,
    note:$("#weightNote").value.trim(),
    createdAt:new Date().toISOString()
  });
  saveWeights();
  closeModal("weightFormModal");
  openModal("healthModal");
  toast(t("weightSaved"));
  renderWeight();
};

$("#petWeightForm").onsubmit = event => {
  event.preventDefault();
  const value = Number($("#petWeightValue").value);
  if (!Number.isFinite(value) || value < .2 || value > 30) return;
  petWeightRecords.push({
    id:uid(),
    weight:Number(value.toFixed(2)),
    date:$("#petWeightDate").value || today(),
    note:$("#petWeightNote").value.trim(),
    createdAt:new Date().toISOString()
  });
  savePetWeights();
  closeModal("petWeightFormModal");
  openModal("healthModal");
  showHealthView("pet");
  toast(t("petWeightSaved"));
  renderPetWeight();
};

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
  ["cleaningState","cleaningStateBackup","homebaseLang","homebaseWeather","homebaseWeightRecords","homebaseWeightRecordsBackup","homebasePetWeightRecords","homebasePetWeightRecordsBackup"].forEach(key => localStorage.removeItem(key));
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
window.addEventListener("resize", () => {renderWeight(); renderPetWeight();});
