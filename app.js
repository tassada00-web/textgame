const STAT_DEFS = [
  { key: "hp", label: "체력", cap: 30, tone: "#b83f51" },
  { key: "stamina", label: "스테미나", cap: 30, tone: "#368362" },
  { key: "strength", label: "힘", cap: 12, tone: "#b88632" },
  { key: "vitality", label: "건강", cap: 12, tone: "#368362" },
  { key: "speed", label: "속도", cap: 12, tone: "#35a6bd" },
  { key: "precision", label: "정밀", cap: 12, tone: "#5b518f" },
  { key: "intelligence", label: "지능", cap: 12, tone: "#267f86" },
  { key: "wisdom", label: "지혜", cap: 12, tone: "#5b518f" },
  { key: "charm", label: "매력", cap: 12, tone: "#b83f51" },
  { key: "damage", label: "데미지", cap: 12, tone: "#b83f51" },
  { key: "offhandDamage", label: "데미지(보조)", cap: 10, tone: "#b88632" },
  { key: "armor", label: "방어력", cap: 10, tone: "#172027" },
];

const PRIMARY_KEYS = ["strength", "vitality", "speed", "precision", "intelligence", "wisdom", "charm"];
const STAT_LABELS = Object.fromEntries(STAT_DEFS.map((stat) => [stat.key, stat.label]));
const SAVE_KEY = "trpg-rpg-core:data:v1";
const GAME_SYSTEM_SYNC_MESSAGE = "trpg-core:party-state";
const GAME_SYSTEM_COMBAT_START_REQUEST = "trpg-core:request-combat-start";
const GAME_SYSTEM_UNIT_STATUS_MESSAGE = "trpg-core:unit-status";
const GAME_SYSTEM_FRAME_ID = "gameSystemFrame";
const GAME_SYSTEM_STAT_KEYS = {
  strength: "str",
  vitality: "con",
  speed: "spd",
  precision: "pre",
  intelligence: "int",
  wisdom: "wis",
  charm: "cha",
};
const BAG_CATEGORIES = [
  { key: "equipment", label: "장비" },
  { key: "consumables", label: "소모품" },
  { key: "materials", label: "재료" },
  { key: "quest", label: "특수" },
];

const SHORT_TO_FULL = {
  str: "strength",
  con: "vitality",
  spd: "speed",
  pre: "precision",
  int: "intelligence",
  wis: "wisdom",
  cha: "charm",
  hp: "hp",
  stamina: "stamina",
  damage: "damage",
};

const SKILL_IMPORT_STOP_LABELS = new Set(["직업", "상태", "장비효과"]);
const SHEET_STAT_LABELS = {
  체력: "hp",
  스테미나: "stamina",
  스태미나: "stamina",
  힘: "str",
  건강: "con",
  속도: "spd",
  정밀: "pre",
  지능: "int",
  지혜: "wis",
  매력: "cha",
  데미지: "damage",
};

const RIA_BAG = {
  money: 0,
  equipment: [
    { name: "가죽 주머니", note: "무언가 담을 수 있다.", tags: ["가방"] },
    { name: "고블린 대장 몽둥이(부실해지기시작)", note: "+3데미지\n기습하는 경우 기절" },
    { name: "가죽 손목 보호대", note: "낡았지만 튼튼한 가죽 보호대. 착용 시 방어력 소폭 상승" },
    { name: "여성용 경량 가죽 갑옷", note: "가슴과 복부를 보호하는 가죽 갑옷. 찢어진 부분이 있지만 수선하면 사용할 수 있습니다." },
    { name: "모험가 부츠", note: "튼튼한 가죽 부츠." },
    { name: "소드 오프 샷건", note: "근접사격 2발 소모. 힘다이스 25% 이하 시 넘어짐 자신에게 부여" },
  ],
  consumables: [
    { name: "밧줄", note: "무언가 묶을 수 있다." },
    { name: "정체불명의 열쇠", note: "녹슬었지만 튼튼해 보임(폐광)" },
    { name: "소형 마나 포션", quantity: 1, note: "푸른색 액체가 담긴 작은 유리병. MP 15 회복" },
    { name: "여행자용 건빵", note: "딱딱하게 굳은 건빵 두 조각. 비상 식량" },
    { name: "야수 각성 주사기", quantity: 2, note: "사용 시 일시적으로 힘과 민첩이 폭발적으로 상승하지만, 4턴 후 고통 및 탈진 부여" },
    { name: "미완성 주문서(환각 쾌락 강화 - 사용 불가)" },
    { name: "조악한 환각 최음제", quantity: 1 },
  ],
  materials: [
    { name: "거친 가죽 조각", quantity: 2, note: "재봉 기초 재료" },
    { name: "열쇠 꾸러미", note: "최면술사에서 획득" },
    { name: "화염 탄알", quantity: 10, note: "6데미지+지속화염" },
    { name: "강철 탄알", quantity: 35, note: "10데미지" },
    { name: "녹슨 탄알", quantity: 4, note: "6데미지" },
    { name: "은반지", note: "단순한 디자인의 은반지. 안쪽에 이니셜 'J & M'이 새겨져 있습니다. 상점 판매가 약 40페니 예상" },
    { name: "고블린의 보물 지도 조각 A", note: "다른 조각들과 합치면 고블린 소굴 깊은 곳에 숨겨진 무언가의 위치를 알 수 있습니다." },
  ],
  quest: [],
};

const HAYUL_BAG = {
  money: 97,
  equipment: [{ name: "낡은 고블린 단검", note: "무기, 힘 2" }],
  consumables: [
    { name: "붕대", quantity: 2, note: "출혈 상태이상 해제/감소 가능" },
    { name: "조잡한 회복약", quantity: 1, note: "사용 시 체력 5 회복, 단 20% 확률로 구역질 상태이상" },
    { name: "하급 해독제", quantity: 2 },
    { name: "시원한 과일수", quantity: 3, tags: ["현재 보급"] },
    { name: "질 좋은 횃불", quantity: 3, tags: ["현재 보급"] },
    { name: "가벼운 붕대", quantity: 3, tags: ["현재 보급"] },
  ],
  materials: [{ name: "마력석 조각", quantity: 1 }],
  quest: [{ name: "맑은 액체 유리병", quantity: 1, note: "정체 불명 - 감별 필요" }],
};

const BASE_CHARACTERS = [
  {
    id: "ria",
    name: "리아",
    sigil: "리",
    image: "./assets/ria.png",
    role: "총사",
    tendency: "냉정함",
    bases: {
      hp: 30,
      stamina: 30,
      strength: 6,
      vitality: 6,
      speed: 8,
      precision: 7,
      intelligence: 6,
      wisdom: 6,
      charm: 6,
      damage: 0,
      offhandDamage: 0,
      armor: 0,
    },
    baseLabels: { damage: "x", offhandDamage: "x", armor: "x" },
    skillBonuses: {},
    initialState: { hp: { decrease: 0 }, stamina: { decrease: 9 } },
    equipment: [
      { slot: "머리", name: "", stats: {}, durability: null },
      { slot: "외투", name: "탐험가의 망토", stats: { speed: 1 }, durability: { max: 10, current: null } },
      { slot: "상의", name: "징 박힌 가죽 갑옷", stats: { speed: -1, armor: 4 }, durability: { max: 32, current: 32 } },
      { slot: "하의", name: "팬티 스타킹", stats: {}, durability: { max: 5, current: 5 } },
      { slot: "신발", name: "강화된 가죽 부츠", stats: { speed: 1, armor: 1 }, durability: { max: 30, current: 30 } },
      { slot: "장갑", name: "가죽 장갑", stats: { precision: 1 }, durability: { max: 10, current: 10 } },
      { slot: "반지", name: "신속의 반지", stats: { speed: 2 }, durability: null },
      { slot: "목걸이", name: "", stats: {}, durability: null },
      { slot: "귀걸이", name: "", stats: {}, durability: null },
      { slot: "팔찌", name: "", stats: {}, durability: null },
      { slot: "주무기", name: "개량형 강선 머스킷 (40/40)", stats: { speed: -1, damage: 8 }, durability: { max: 40, current: 40 } },
      { slot: "보조무기", name: "날이 잘 선 손도끼 (20/15)", stats: { offhandDamage: 3 }, durability: { max: 20, current: 15 } },
    ],
    bag: { ...RIA_BAG },
    skills: [
      { name: "총사", body: "힘다이스 없이 탄알효과만 발동", tags: ["직업"], stat: "precision" },
      { name: "개머리판 공격 1t", body: "힘 50% 값만큼 피해, 힘 값 2배 차이경우 넉백", tags: ["공격"], stat: "strength" },
      { name: "소매치기", body: "후퇴 판정 전투 종료 후 일부분 보상 획득", tags: ["탐색"], stat: "precision" },
      { name: "지형 활용 (1회 판정)", body: "주변 환경 활용 시 회피 판정 +2", tags: ["회피", "+2"], stat: "speed" },
      { name: "방해 사격", body: "(정밀 vs 건강, SP 2 소모) 적 1체의 다음 2턴까지 행동에 -2", tags: ["SP 2", "디버프"], stat: "precision" },
      { name: "더블탭", body: "(SP 2 소모) 두번 공격. 명중률 -2", tags: ["SP 2", "공격"], stat: "precision" },
      { name: "탄알", body: "철제 탄알 31 / 8데미지", tags: ["소모품", "31"], stat: "precision" },
    ],
  },
  {
    id: "luna",
    name: "루나",
    sigil: "루",
    image: "./assets/luna.png",
    role: "마나볼",
    tendency: "미입력",
    bases: {
      hp: 30,
      stamina: 30,
      strength: 6,
      vitality: 6,
      speed: 6,
      precision: 6,
      intelligence: 8,
      wisdom: 6,
      charm: 9,
      damage: 0,
      offhandDamage: 0,
      armor: 0,
    },
    baseLabels: { damage: "x", offhandDamage: "x", armor: "x" },
    skillBonuses: { vitality: 4, speed: -3 },
    initialState: { hp: { decrease: 0 }, stamina: { decrease: 0 } },
    equipment: [
      { slot: "머리", name: "", stats: {}, durability: null },
      { slot: "외투", name: "", stats: {}, durability: null },
      { slot: "상의", name: "로브", stats: {}, durability: null },
      { slot: "하의", name: "", stats: {}, durability: null },
      { slot: "신발", name: "", stats: {}, durability: null },
      { slot: "장갑", name: "", stats: {}, durability: null },
      { slot: "반지", name: "", stats: {}, durability: null },
      { slot: "목걸이", name: "", stats: {}, durability: null },
      { slot: "귀걸이", name: "", stats: {}, durability: null },
      { slot: "팔찌", name: "", stats: {}, durability: null },
      { slot: "주무기", name: "완드", stats: { damage: 1 }, durability: null },
      { slot: "보조무기", name: "", stats: {}, durability: null },
    ],
    bag: { money: 0, equipment: [], consumables: [], materials: [], quest: [] },
    skills: [
      { name: "마나볼", body: "지능 결과값 +4", tags: ["마법 1", "공격"], stat: "intelligence" },
      { name: "올라타기", body: "민첩 다이스 1", tags: ["SP 2", "이동"], stat: "speed" },
      { name: "늑대 리듬 동조", body: "동조 성공 시 매턴마다 1 SP 회복.", tags: ["회복", "동조"], stat: "charm" },
      { name: "야수의 정수(패시브)", body: "건강 +4, 속도 -3", tags: ["패시브", "능력치"], stat: "vitality" },
    ],
  },
  {
    id: "bom-hayul",
    name: "봄하율",
    sigil: "봄",
    image: "./assets/bom-hayul.png",
    role: "회복 마법사",
    tendency: "외유내강",
    bases: {
      hp: 30,
      stamina: 30,
      strength: 6,
      vitality: 6,
      speed: 6,
      precision: 6,
      intelligence: 6,
      wisdom: 6,
      charm: 6,
      damage: 0,
      offhandDamage: 0,
      armor: 0,
    },
    baseLabels: { damage: "x", offhandDamage: "x", armor: "x" },
    skillBonuses: {},
    initialState: { hp: { decrease: 5 }, stamina: { decrease: 0 } },
    equipment: [
      { slot: "머리", name: "", stats: {}, durability: null },
      { slot: "외투", name: "", stats: {}, durability: null },
      { slot: "상의", name: "프릴드레스", stats: {}, durability: { max: 15, current: 15 } },
      { slot: "하의", name: "", stats: {}, durability: null },
      { slot: "신발", name: "", stats: {}, durability: null },
      { slot: "장갑", name: "", stats: {}, durability: null },
      { slot: "반지", name: "", stats: {}, durability: null },
      { slot: "목걸이", name: "", stats: {}, durability: null },
      { slot: "귀걸이", name: "", stats: {}, durability: null },
      { slot: "팔찌", name: "", stats: {}, durability: null },
      { slot: "주무기", name: "거울 니샤 +1 (붉은 박쥐 마석 인첸트)", stats: { damage: 1 }, durability: null },
      { slot: "보조무기", name: "", stats: {}, durability: null },
    ],
    bag: { ...HAYUL_BAG },
    skills: [
      { name: "여우비lv2", body: "주문횟수 1 소모. 지능다이스로 아군 회복 및 적 전체 피해 +2.", tags: ["마법 1"], stat: "intelligence" },
      { name: "거울 파편 장벽", body: "주문횟수 1 소모. 아군 전체가 공격받을 때 지능결과 /2 만큼 1회 차단.", tags: ["마법 1"], stat: "intelligence" },
      { name: "수호의 빛", body: "패시브. 아군 치명타 피격 시 전투당 1회 장벽 자동 발동.", tags: ["패시브"], stat: "wisdom" },
      { name: "거울 니샤 효과", body: "회복 마법 효과량 +2. 매 턴 시작 시 본인 체력 1 자동 회복.", tags: ["장비 효과"], stat: "wisdom" },
      { name: "거울 니샤 효과", body: "인접 아군이 출혈 상태일 경우 회복 마법으로 출혈 1스택을 추가 제거.", tags: ["장비 효과"], stat: "wisdom" },
    ],
  },
];

let game = loadGame() || createNewGame();
let activeTab = "overview";
let activeBagCategory = BAG_CATEGORIES[0].key;
let selectedCombatantId = null;
let selectedTargetId = null;
let attackStat = "precision";
let defendStat = "speed";
let activePartyPreviewIndex = 0;
let temporaryUnitStatus = null;
let pendingConfirmAction = null;

function createNewGame() {
  const characters = Object.fromEntries(
    BASE_CHARACTERS.map((character) => {
      const clone = cloneData(character);
      clone.state = createState(clone.initialState);
      clone.partySlots = [null, null, null];
      return [clone.id, clone];
    }),
  );

  return {
    activeCharacterId: BASE_CHARACTERS[0].id,
    mode: "profile",
    exploration: {
      cols: 10,
      rows: 8,
      partyX: 1,
      partyY: 4,
      obstacles: ["4,1", "6,2", "2,6", "7,5", "5,4"],
    },
    characters,
    combat: null,
    logs: ["새 RPG 병합 앱을 시작했습니다."],
  };
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function createState(initial = {}) {
  return Object.fromEntries(
    STAT_DEFS.map((stat) => [
      stat.key,
      {
        increase: Number(initial[stat.key]?.increase || 0),
        decrease: Number(initial[stat.key]?.decrease || 0),
      },
    ]),
  );
}

function loadGame() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
    if (!parsed?.characters) return null;
    parsed.exploration ??= {
      cols: 10,
      rows: 8,
      partyX: 1,
      partyY: 4,
      obstacles: ["4,1", "6,2", "2,6", "7,5", "5,4"],
    };
    parsed.exploration.cols ??= 10;
    parsed.exploration.rows ??= 8;
    parsed.exploration.partyX ??= 1;
    parsed.exploration.partyY ??= 4;
    parsed.exploration.obstacles ??= ["4,1", "6,2", "2,6", "7,5", "5,4"];
    BASE_CHARACTERS.forEach((base) => {
      if (!parsed.characters[base.id]) {
        const clone = cloneData(base);
        clone.state = createState(clone.initialState);
        clone.partySlots = [null, null, null];
        parsed.characters[base.id] = clone;
      }
      parsed.characters[base.id].partySlots ??= [null, null, null];
    });
    return parsed;
  } catch {
    return null;
  }
}

function saveGame(silent = false) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
  if (!silent) addLog("저장했습니다.");
}

function getActiveCharacter() {
  return game.characters[game.activeCharacterId];
}

function sumStats(items = []) {
  return items.reduce((totals, item) => {
    Object.entries(item.stats || {}).forEach(([key, value]) => {
      totals[key] = (totals[key] || 0) + Number(value || 0);
    });
    return totals;
  }, {});
}

function getStatState(entity, key) {
  entity.state ??= createState();
  entity.state[key] ??= { increase: 0, decrease: 0 };
  return entity.state[key];
}

function getBaseTotal(entity, key, includeDecrease = true) {
  const base = Number(entity.bases?.[key] || 0);
  const gear = sumStats(entity.equipment)[key] || 0;
  const skill = Number(entity.skillBonuses?.[key] || 0);
  const modifier = getStatState(entity, key);
  return base + gear + skill + Number(modifier.increase || 0) - (includeDecrease ? Number(modifier.decrease || 0) : 0);
}

function getTotal(entity, key) {
  return getBaseTotal(entity, key, true);
}

function getResourceMax(entity, key) {
  return Math.max(1, getBaseTotal(entity, key, false));
}

function getResourceCurrent(entity, key) {
  return clamp(getTotal(entity, key), 0, getResourceMax(entity, key));
}

function getCombatStats(entity) {
  const stats = Object.fromEntries(STAT_DEFS.map((stat) => [stat.key, Math.max(0, Math.round(getTotal(entity, stat.key)))]));
  stats.maxHp = getResourceMax(entity, "hp");
  stats.maxStamina = getResourceMax(entity, "stamina");
  stats.hp = getResourceCurrent(entity, "hp");
  stats.stamina = getResourceCurrent(entity, "stamina");
  return stats;
}

function getGameSystemPrimaryStats(stats) {
  return Object.fromEntries(
    Object.entries(GAME_SYSTEM_STAT_KEYS).map(([sourceKey, boardKey]) => [
      boardKey,
      Math.max(0, Math.round(Number(stats[sourceKey] || 0))),
    ]),
  );
}

function getGameSystemSkillStat(stat) {
  return GAME_SYSTEM_STAT_KEYS[stat] || stat || "str";
}

function getGameSystemSkills(skills = []) {
  return skills.map((skill) => ({
    id: skill.id || crypto.randomUUID(),
    name: skill.name || "",
    stat: getGameSystemSkillStat(skill.stat),
    desc: skill.body || skill.desc || "",
  }));
}

function getPartyBattlePlacements() {
  const { partyX, partyY, cols, rows } = game.exploration;
  return [
    { x: partyX, y: partyY },
    { x: partyX, y: partyY + 1 },
    { x: partyX + 1, y: partyY },
    { x: partyX, y: partyY - 1 },
  ].map((spot) => ({
    x: clamp(spot.x, 0, cols - 1),
    y: clamp(spot.y, 0, rows - 1),
  }));
}

function makeGameSystemEntityPayload(entity, type, options = {}) {
  const stats = getCombatStats(entity);
  return {
    id: options.id || entity.id || crypto.randomUUID(),
    type,
    side: type === "enemy" ? "enemy" : "party",
    source: options.source || type,
    characterId: options.characterId ?? null,
    partySlotIndex: options.partySlotIndex ?? null,
    label: options.label || "",
    name: entity.name || options.label || "",
    x: options.x ?? 0,
    y: options.y ?? 0,
    hp: stats.hp,
    maxHp: stats.maxHp,
    stamina: stats.stamina,
    maxStamina: stats.maxStamina,
    speed: stats.speed,
    damage: stats.damage || 0,
    armor: stats.armor || 0,
    primary: getGameSystemPrimaryStats(stats),
    bonus: { str: 0, con: 0, spd: 0, pre: 0, int: 0, wis: 0, cha: 0 },
    skills: getGameSystemSkills(entity.skills || []),
    initiative: options.initiative || null,
  };
}

function makeGameSystemCombatantPayload(combatant) {
  const type = combatant.side === "enemy" ? "enemy" : combatant.source === "main" ? "player" : "ally";
  return {
    id: combatant.id,
    type,
    side: combatant.side,
    source: combatant.source,
    characterId: combatant.characterId ?? null,
    partySlotIndex: combatant.partySlotIndex ?? null,
    label: getCombatantLabel(combatant),
    name: combatant.name,
    x: combatant.x,
    y: combatant.y,
    hp: combatant.hp,
    maxHp: combatant.maxHp,
    stamina: combatant.stamina,
    maxStamina: combatant.maxStamina,
    speed: combatant.stats.speed,
    damage: combatant.stats.damage || 0,
    armor: combatant.stats.armor || 0,
    primary: getGameSystemPrimaryStats(combatant.stats),
    bonus: { str: 0, con: 0, spd: 0, pre: 0, int: 0, wis: 0, cha: 0 },
    skills: getGameSystemSkills(combatant.skills || []),
    initiative: combatant.initiative || null,
  };
}

function buildGameSystemPartyPayload() {
  const character = getActiveCharacter();
  character.partySlots ??= [null, null, null];
  const placements = getPartyBattlePlacements();
  return [
    makeGameSystemEntityPayload(character, "player", {
      source: "main",
      characterId: character.id,
      label: "P",
      x: placements[0].x,
      y: placements[0].y,
    }),
    ...character.partySlots
      .map((member, index) => member && member.active !== false
        ? makeGameSystemEntityPayload(member, "ally", {
          source: "party",
          partySlotIndex: index,
          label: String(index + 1),
          x: placements[index + 1]?.x ?? placements[0].x,
          y: placements[index + 1]?.y ?? placements[0].y,
        })
        : null)
      .filter(Boolean),
  ];
}

function buildGameSystemSyncPayload(openBattle = false, reason = "sync") {
  return {
    schemaVersion: 1,
    reason,
    openBattle,
    mode: game.mode,
    activeCharacterId: game.activeCharacterId,
    exploration: {
      cols: game.exploration.cols,
      rows: game.exploration.rows,
      partyX: game.exploration.partyX,
      partyY: game.exploration.partyY,
      obstacles: [...game.exploration.obstacles],
    },
    party: buildGameSystemPartyPayload(),
    combat: game.combat
      ? {
        round: game.combat.round,
        turnIndex: game.combat.turnIndex,
        cols: game.exploration.cols,
        rows: game.exploration.rows,
        order: [...game.combat.order],
        combatants: game.combat.combatants.map(makeGameSystemCombatantPayload),
      }
      : null,
  };
}

function postGameSystemState({ openBattle = false, reason = "sync" } = {}) {
  const frame = document.getElementById(GAME_SYSTEM_FRAME_ID);
  if (!frame?.contentWindow) return;

  const targetOrigin = window.location.protocol === "file:" ? "*" : window.location.origin;
  frame.contentWindow.postMessage({
    type: GAME_SYSTEM_SYNC_MESSAGE,
    payload: buildGameSystemSyncPayload(openBattle, reason),
  }, targetOrigin);
}

function syncGameSystemFrame(options = {}) {
  requestAnimationFrame(() => postGameSystemState(options));
}

function handleGameSystemMessage(event) {
  const frame = document.getElementById(GAME_SYSTEM_FRAME_ID);
  if (!frame?.contentWindow || event.source !== frame.contentWindow) return;
  if (event.data?.type === GAME_SYSTEM_UNIT_STATUS_MESSAGE) {
    temporaryUnitStatus = normalizeTemporaryUnitStatus(event.data.payload);
    renderSheet();
    return;
  }

  if (event.data?.type !== GAME_SYSTEM_COMBAT_START_REQUEST) return;

  if (!game.combat) {
    startCombat();
    return;
  }

  syncGameSystemFrame({ openBattle: true, reason: "combat-start-request" });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatSigned(value) {
  const number = Number(value || 0);
  if (!number) return "0";
  return number > 0 ? `+${number}` : `${number}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function addLog(message) {
  game.logs.unshift(message);
  game.logs = game.logs.slice(0, 40);
  renderLogs();
}

function setMode(mode) {
  if (mode === "combat" && !game.combat) {
    startCombat();
    return;
  }
  game.mode = mode;
  renderAll();
  syncGameSystemFrame({ openBattle: mode === "combat" && Boolean(game.combat), reason: `mode:${mode}` });
}

function renderAll() {
  renderTopbar();
  renderHeroCard();
  renderPartySlots();
  renderLogs();
  renderMode();
  renderBoard();
  renderTurnList();
  renderSheet();
  renderCombatPanel();
}

function renderTopbar() {
  const active = getActiveCharacter();
  document.getElementById("activeSigil").textContent = active.sigil;
  document.getElementById("activeName").textContent = `${active.name} 이야기`;
}

function renderHeroCard() {
  const character = getActiveCharacter();
  const hp = getResourceCurrent(character, "hp");
  const maxHp = getResourceMax(character, "hp");
  const stamina = getResourceCurrent(character, "stamina");
  const maxStamina = getResourceMax(character, "stamina");
  document.getElementById("heroCard").innerHTML = `
    <div class="hero-image">
      <img src="${escapeHtml(character.image)}" alt="${escapeHtml(character.name)} 프로필" />
    </div>
    <div class="hero-body">
      <div class="title-lockup">
        <span class="sigil">${escapeHtml(character.sigil)}</span>
        <div>
          <p class="eyebrow">${escapeHtml(character.role)}</p>
          <h2>${escapeHtml(character.name)}</h2>
          <p class="small-muted">${escapeHtml(character.tendency)}</p>
        </div>
      </div>
      <div class="resource-stack">
        ${resourceLine("체력", hp, maxHp, "#b83f51")}
        ${resourceLine("스테미나", stamina, maxStamina, "#368362")}
      </div>
    </div>
  `;
}

function resourceLine(label, value, max, tone) {
  const percent = clamp((value / Math.max(1, max)) * 100, 0, 100);
  return `
    <div class="resource-line" style="--meter:${percent}%; --tone:${tone}">
      <div class="resource-top">
        <span>${label}</span>
        <strong>${value} / ${max}</strong>
      </div>
      <div class="meter" aria-hidden="true"><span></span></div>
    </div>
  `;
}

function renderPartySlots() {
  const character = getActiveCharacter();
  character.partySlots ??= [null, null, null];
  document.getElementById("partySlots").innerHTML = character.partySlots
    .map((member, index) => renderPartySlot(member, index))
    .join("");
}

function renderPartySlot(member, index) {
  if (!member) {
    return `
      <article class="party-slot">
        <div class="slot-top">
          <div class="slot-name">
            <span class="tiny-label">Slot ${index + 1}</span>
            <strong>비어 있음</strong>
            <p class="slot-meta">엑셀 파일로 동료를 유지할 수 있습니다.</p>
          </div>
        </div>
        <div class="slot-actions">
          <label class="file-label">
            엑셀 가져오기
            <input type="file" accept=".xlsx,.xls" data-party-import="${index}" />
          </label>
        </div>
      </article>
    `;
  }

  const stats = getCombatStats(member);
  return `
    <article class="party-slot ${member.active === false ? "slot-off" : ""} ${activePartyPreviewIndex === index ? "is-previewed" : ""}">
      <div class="slot-top">
        <div class="slot-name">
          <span class="tiny-label">Slot ${index + 1}</span>
          <strong>${escapeHtml(member.name)}</strong>
          <p class="slot-meta">HP ${stats.hp}/${stats.maxHp} · SP ${stats.stamina}/${stats.maxStamina} · 속도 ${stats.speed}</p>
        </div>
      </div>
      <div class="slot-actions">
        <button class="mini-button" type="button" data-party-preview="${index}">미니 상태창</button>
        <button class="mini-button" type="button" data-party-active="${index}">${member.active === false ? "전투 참가" : "전투 제외"}</button>
        <label class="file-label">
          교체
          <input type="file" accept=".xlsx,.xls" data-party-import="${index}" />
        </label>
        <button class="mini-button" type="button" data-party-clear="${index}">비우기</button>
      </div>
    </article>
  `;
}

function renderLogs() {
  document.getElementById("logList").innerHTML = game.logs.length
    ? game.logs.map((log) => `<p class="log-entry">${escapeHtml(log)}</p>`).join("")
    : `<p class="log-entry">기록 없음</p>`;
}

function renderMode() {
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === game.mode);
  });
  const inCombat = game.mode === "combat" && game.combat;
  document.getElementById("startCombatButton").hidden = Boolean(inCombat);
  document.getElementById("endCombatButton").hidden = !inCombat;
  document.getElementById("rerollInitiativeButton").hidden = !inCombat;
  document.getElementById("turnPanel").hidden = !inCombat;
  document.getElementById("combatControl").hidden = !inCombat;
}

function renderBoard() {
  const board = document.getElementById("board");
  const { cols, rows } = game.exploration;
  const isProfile = game.mode === "profile";
  const inCombat = game.mode === "combat" && game.combat;
  const boardZone = document.querySelector(".board-zone");
  const playPanel = document.querySelector(".play-panel");
  const embeddedFrame = document.querySelector(".embedded-game-frame");
  const statusMainBoard = document.getElementById("statusMainBoard");
  const boardFrame = board.closest(".board-frame");

  playPanel?.classList.toggle("is-profile-mode", isProfile);
  playPanel?.classList.toggle("is-explore-mode", game.mode === "explore");
  playPanel?.classList.toggle("is-combat-mode", game.mode === "combat");
  boardZone?.classList.toggle("is-status-board", isProfile);
  boardZone?.classList.toggle("is-explore-board", game.mode === "explore");
  boardZone?.classList.toggle("is-combat-board", game.mode === "combat");
  if (embeddedFrame) embeddedFrame.hidden = isProfile;
  if (statusMainBoard) statusMainBoard.hidden = !isProfile;

  if (isProfile) {
    document.getElementById("boardKicker").textContent = "Status";
    document.getElementById("boardTitle").textContent = "메인 캐릭터 목록";
    document.getElementById("boardMeta").innerHTML = `<span>${Object.keys(game.characters).length}명</span>`;
    if (statusMainBoard) statusMainBoard.innerHTML = renderStatusMainBoard();
    return;
  }

  board.style.setProperty("--cols", cols);
  board.style.setProperty("--rows", rows);
  board.style.gridTemplateColumns = `repeat(${cols}, var(--cell))`;
  board.style.gridTemplateRows = `repeat(${rows}, var(--cell))`;
  board.className = `board ${inCombat ? "battle-board" : "exploration-board"}`;
  boardFrame?.classList.toggle("combat-frame", inCombat);
  boardFrame?.classList.toggle("explore-frame", !inCombat);
  board.innerHTML = "";

  document.getElementById("boardKicker").textContent = inCombat ? "Battle Map" : "Explore Map";
  document.getElementById("boardTitle").textContent = inCombat ? "전술 배틀맵" : "파티 탐험맵";
  document.getElementById("boardMeta").innerHTML = inCombat
    ? `<span>Round ${game.combat?.round || 1}</span><span>${cols} x ${rows}</span>`
    : `<span>Party (${game.exploration.partyX + 1}, ${game.exploration.partyY + 1})</span><span>${cols} x ${rows}</span>`;

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);
      if (isObstacle(x, y)) cell.classList.add("terrain-blocked");
      board.append(cell);
    }
  }

  renderObstaclePieces();

  if (inCombat) {
    renderCombatBoardPieces();
  } else {
    renderExploreBoardPiece();
  }
  renderBoardStatusPanel();
}

function renderStatusMainBoard() {
  const characters = Object.values(game.characters);
  return `
    <section class="status-board-intro">
      <div>
        <p class="section-kicker">Main Characters</p>
        <h2>메인 캐릭터</h2>
      </div>
      <p>상태창에서 볼 메인 캐릭터를 선택하세요. 각 캐릭터는 자기 이야기, 저장 데이터, 파티 슬롯을 따로 유지합니다.</p>
    </section>
    <section class="main-character-list">
      ${characters.map((character) => renderMainCharacterCard(character)).join("")}
    </section>
  `;
}

function renderMainCharacterCard(character) {
  const active = character.id === game.activeCharacterId;
  const hp = getResourceCurrent(character, "hp");
  const maxHp = getResourceMax(character, "hp");
  const stamina = getResourceCurrent(character, "stamina");
  const maxStamina = getResourceMax(character, "stamina");
  const activeMembers = (character.partySlots || []).filter((member) => member && member.active !== false).length;
  return `
    <button class="main-character-card ${active ? "is-active" : ""}" type="button" data-character="${character.id}">
      <span class="main-character-image">
        <img src="${escapeHtml(character.image)}" alt="${escapeHtml(character.name)} 프로필" />
      </span>
      <span class="main-character-body">
        <span class="tiny-label">${escapeHtml(character.role)}</span>
        <strong>${escapeHtml(character.name)}</strong>
        <small>${escapeHtml(character.tendency || "")}</small>
        <span class="main-character-stats">
          <b>HP ${hp}/${maxHp}</b>
          <b>SP ${stamina}/${maxStamina}</b>
          <b>파티 ${activeMembers}/3</b>
        </span>
      </span>
    </button>
  `;
}

function isObstacle(x, y) {
  return game.exploration.obstacles.includes(`${x},${y}`);
}

function getCell(x, y) {
  return document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
}

function renderObstaclePieces() {
  game.exploration.obstacles.forEach((value) => {
    const [x, y] = value.split(",").map(Number);
    const cell = getCell(x, y);
    if (!cell) return;
    cell.insertAdjacentHTML("beforeend", `<span class="piece obstacle" title="장애물">×</span>`);
  });
}

function renderExploreBoardPiece() {
  const { partyX, partyY } = game.exploration;
  const cell = getCell(partyX, partyY);
  if (cell) {
    const activeMembers = getActiveCharacter().partySlots.filter((member) => member && member.active !== false).length;
    cell.insertAdjacentHTML("beforeend", `<span class="piece player" title="파티 전체 이동 말">P</span>`);
    if (activeMembers) cell.insertAdjacentHTML("beforeend", `<span class="party-count" title="참가 파티원">${activeMembers}</span>`);
  }
  getAdjacentCells(partyX, partyY)
    .filter(({ x, y }) => !isObstacle(x, y))
    .forEach(({ x, y }) => getCell(x, y)?.classList.add("target"));
}

function renderCombatBoardPieces() {
  const current = getCurrentActor();
  game.combat.combatants.forEach((combatant) => {
    const cell = getCell(combatant.x, combatant.y);
    if (!cell) return;
    const label = getCombatantLabel(combatant);
    const classes = [
      "piece",
      combatant.side === "enemy" ? "enemy" : combatant.source === "main" ? "player" : "ally",
      combatant.id === selectedCombatantId ? "selected" : "",
      combatant.hp <= 0 ? "defeated" : "",
    ].filter(Boolean).join(" ");
    cell.insertAdjacentHTML("beforeend", `
      <button class="${classes}" type="button" data-combatant="${combatant.id}" title="${escapeHtml(combatant.name)} | HP ${combatant.hp}/${combatant.maxHp}">${escapeHtml(label)}</button>
    `);
  });

  if (current) {
    getAdjacentCells(current.x, current.y)
      .filter(({ x, y }) => !isObstacle(x, y) && !getCombatantAt(x, y))
      .forEach(({ x, y }) => getCell(x, y)?.classList.add("target"));
  }
  game.combat.combatants
    .filter((combatant) => combatant.side !== current?.side && combatant.hp > 0)
    .forEach((combatant) => getCell(combatant.x, combatant.y)?.classList.add("attack-target"));
}

function getCombatantLabel(combatant) {
  if (combatant.label) return combatant.label;
  if (combatant.side === "enemy") {
    const enemies = game.combat?.combatants.filter((unit) => unit.side === "enemy") || [];
    return String(enemies.findIndex((unit) => unit.id === combatant.id) + 1 || "E");
  }
  if (combatant.source === "main") return "P";
  if (Number.isInteger(combatant.partySlotIndex)) return String(combatant.partySlotIndex + 1);
  return "A";
}

function renderBoardStatusPanel() {
  const panel = document.getElementById("boardStatusPanel");
  if (!panel) return;
  const current = getCurrentActor();
  const selected = getCombatant(selectedCombatantId) || current;
  const character = getActiveCharacter();
  const activeMembers = character.partySlots.filter((member) => member && member.active !== false);
  const legend = `
    <div class="legend" aria-label="말 종류">
      <span><i class="dot player"></i>플레이어/파티</span>
      <span><i class="dot ally"></i>아군</span>
      <span><i class="dot enemy"></i>적군</span>
      <span><i class="box obstacle"></i>장애물</span>
    </div>
  `;

  if (!game.combat) {
    panel.innerHTML = `
      ${legend}
      <article class="board-info-card">
        <span class="tiny-label">탐험 말</span>
        <strong>${escapeHtml(character.name)} 파티</strong>
        <p>참가 파티원 ${activeMembers.length}/3 · 장애물 ${game.exploration.obstacles.length}개</p>
      </article>
      <div class="board-log"><span>◆</span><p>인접 칸을 선택하면 파티 전체가 이동합니다.</p></div>
    `;
    return;
  }

  panel.innerHTML = `
    ${legend}
    <article class="board-info-card">
      <span class="tiny-label">현재 턴</span>
      <strong>${escapeHtml(current?.name || "대기")}</strong>
      <p>${current ? `HP ${current.hp}/${current.maxHp} · SP ${current.stamina}/${current.maxStamina} · 속도 ${current.stats.speed}` : "전투원이 없습니다."}</p>
    </article>
    <article class="board-info-card">
      <span class="tiny-label">선택 말</span>
      <strong>${escapeHtml(selected?.name || "선택 없음")}</strong>
      <p>${selected ? `${selected.side === "enemy" ? "적군" : "아군"} · ${getCombatantLabel(selected)} · 데미지 ${selected.stats.damage || 0} · 방어 ${selected.stats.armor || 0}` : "말을 선택하세요."}</p>
    </article>
    <div class="board-log"><span>⚔</span><p>주황 칸은 이동 가능, 붉은 칸은 공격 대상입니다.</p></div>
  `;
}

function getAdjacentCells(x, y) {
  return [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ].filter((cell) => cell.x >= 0 && cell.y >= 0 && cell.x < game.exploration.cols && cell.y < game.exploration.rows);
}

function movePartyTo(x, y) {
  if (!getAdjacentCells(game.exploration.partyX, game.exploration.partyY).some((cell) => cell.x === x && cell.y === y)) return;
  if (isObstacle(x, y)) return;
  game.exploration.partyX = x;
  game.exploration.partyY = y;
  addLog(`파티 이동: (${x + 1}, ${y + 1})`);
  saveGame(true);
  renderAll();
  syncGameSystemFrame({ openBattle: false, reason: "explore-move" });
}

function getCombatantAt(x, y) {
  return game.combat?.combatants.find((combatant) => combatant.x === x && combatant.y === y && combatant.hp > 0);
}

function startCombat() {
  const character = getActiveCharacter();
  const { partyX, partyY, cols, rows } = game.exploration;
  const placements = getPartyBattlePlacements();

  const party = [
    makeCombatantFromEntity(character, "party", { source: "main", characterId: character.id, label: "P", x: placements[0].x, y: placements[0].y }),
    ...character.partySlots
      .map((member, index) => member && member.active !== false
        ? makeCombatantFromEntity(member, "party", { source: "party", partySlotIndex: index, label: String(index + 1), x: placements[index + 1]?.x ?? partyX, y: placements[index + 1]?.y ?? partyY })
        : null)
      .filter(Boolean),
  ];

  const enemyX = clamp(partyX + 5, 0, cols - 1);
  const enemies = [
    makeEnemy("적군 1", enemyX, clamp(partyY - 1, 0, rows - 1), 1),
    makeEnemy("적군 2", enemyX, clamp(partyY + 1, 0, rows - 1), 2),
  ];

  game.combat = {
    round: 1,
    turnIndex: 0,
    combatants: [...party, ...enemies],
    order: [],
  };
  rebuildInitiative("전투 시작");
  game.mode = "combat";
  selectedCombatantId = getCurrentActor()?.id ?? null;
  selectedTargetId = getFirstTargetId();
  addLog("전투가 시작되었습니다. 속도 동률은 각자의 속도 주사위로 순서를 고정합니다.");
  saveGame(true);
  renderAll();
  syncGameSystemFrame({ openBattle: true, reason: "combat-start" });
}

function makeCombatantFromEntity(entity, side, options) {
  const stats = getCombatStats(entity);
  return {
    id: crypto.randomUUID(),
    side,
    source: options.source,
    characterId: options.characterId ?? null,
    partySlotIndex: options.partySlotIndex ?? null,
    label: options.label ?? null,
    name: entity.name,
    x: options.x,
    y: options.y,
    hp: stats.hp,
    maxHp: stats.maxHp,
    stamina: stats.stamina,
    maxStamina: stats.maxStamina,
    stats,
    skills: cloneData(entity.skills || []),
    initiative: { speed: stats.speed, tieRoll: 0 },
  };
}

function makeEnemy(name, x, y, index) {
  const entity = {
    name,
    bases: {
      hp: 16 + index * 3,
      stamina: 10,
      strength: 5 + index,
      vitality: 5,
      speed: 5 + index,
      precision: 5,
      intelligence: 3,
      wisdom: 4,
      charm: 2,
      damage: 2 + index,
      offhandDamage: 0,
      armor: index,
    },
    state: createState(),
    skills: [{ name: "난폭한 공격", body: "힘으로 공격합니다.", tags: ["공격"], stat: "strength" }],
  };
  return makeCombatantFromEntity(entity, "enemy", { source: "sample", label: String(index), x, y });
}

function rebuildInitiative(reason = "속도 재계산") {
  if (!game.combat) return;
  const alive = game.combat.combatants.filter((combatant) => combatant.hp > 0);
  const speedGroups = groupBy(alive, (combatant) => String(Math.max(1, combatant.stats.speed)));
  Object.values(speedGroups).forEach((group) => {
    const used = new Set();
    group.forEach((combatant) => {
      let roll = 0;
      let attempts = 0;
      do {
        roll = rollDie(Math.max(1, combatant.stats.speed));
        attempts += 1;
      } while (used.has(roll) && attempts < 30);
      used.add(roll);
      combatant.initiative = { speed: combatant.stats.speed, tieRoll: group.length > 1 ? roll : 0 };
    });
  });

  game.combat.order = alive
    .slice()
    .sort((a, b) => {
      if (b.initiative.speed !== a.initiative.speed) return b.initiative.speed - a.initiative.speed;
      if (b.initiative.tieRoll !== a.initiative.tieRoll) return b.initiative.tieRoll - a.initiative.tieRoll;
      return a.name.localeCompare(b.name, "ko-KR");
    })
    .map((combatant) => combatant.id);
  game.combat.turnIndex = 0;
  selectedCombatantId = getCurrentActor()?.id ?? selectedCombatantId;
  selectedTargetId = getFirstTargetId();
  addLog(`${reason}: 턴 순서를 확정했습니다.`);
}

function groupBy(items, keyFn) {
  return items.reduce((result, item) => {
    const key = keyFn(item);
    result[key] ??= [];
    result[key].push(item);
    return result;
  }, {});
}

function getCurrentActor() {
  if (!game.combat?.order.length) return null;
  const currentId = game.combat.order[game.combat.turnIndex];
  return game.combat.combatants.find((combatant) => combatant.id === currentId && combatant.hp > 0) || null;
}

function getCombatant(id) {
  return game.combat?.combatants.find((combatant) => combatant.id === id) || null;
}

function getFirstTargetId() {
  const current = getCurrentActor();
  return game.combat?.combatants.find((combatant) => combatant.side !== current?.side && combatant.hp > 0)?.id ?? null;
}

function renderTurnList() {
  const target = document.getElementById("turnList");
  if (!game.combat) {
    target.innerHTML = `<p class="small-muted">전투가 시작되면 속도 순서가 표시됩니다.</p>`;
    return;
  }
  const current = getCurrentActor();
  target.innerHTML = game.combat.order
    .map((id) => getCombatant(id))
    .filter(Boolean)
    .map((combatant) => `
      <article class="turn-chip ${combatant.id === current?.id ? "is-current" : ""} ${combatant.side === "enemy" ? "enemy-side" : ""}">
        <strong>${escapeHtml(combatant.name)}</strong>
        <span>속도 ${combatant.initiative.speed}${combatant.initiative.tieRoll ? ` · d${combatant.initiative.speed}=${combatant.initiative.tieRoll}` : ""}</span>
      </article>
    `)
    .join("");
}

function renderSheet() {
  document.querySelectorAll(".sheet-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === activeTab);
  });
  if (temporaryUnitStatus) {
    document.getElementById("sheetContent").innerHTML = renderTemporaryUnitStatus(temporaryUnitStatus);
    return;
  }

  const character = getActiveCharacter();
  const renderers = {
    overview: () => renderOverview(character),
    equipment: () => renderEquipment(character),
    skills: () => renderSkills(character),
    bag: () => renderBag(character),
    party: () => renderPartySheet(character),
  };
  document.getElementById("sheetContent").innerHTML = (renderers[activeTab] || renderers.overview)();
}

function normalizeTemporaryUnitStatus(payload = {}) {
  const primary = payload.primary && typeof payload.primary === "object" ? payload.primary : {};
  const bonus = payload.bonus && typeof payload.bonus === "object" ? payload.bonus : {};
  const skills = Array.isArray(payload.skills) ? payload.skills : [];
  const core = payload.core && typeof payload.core === "object" ? payload.core : null;
  const partySlotIndex = Number(core?.partySlotIndex);
  const numberValue = (value, fallback = 0) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  };

  return {
    id: String(payload.id || ""),
    type: payload.type || "ally",
    label: String(payload.label || ""),
    name: String(payload.name || payload.label || "이름 없는 유닛"),
    hp: numberValue(payload.hp),
    maxHp: Math.max(1, numberValue(payload.maxHp, payload.hp || 1)),
    stamina: numberValue(payload.stamina),
    maxStamina: Math.max(0, numberValue(payload.maxStamina, payload.stamina || 0)),
    damage: numberValue(payload.damage),
    armor: numberValue(payload.armor),
    primary: Object.fromEntries(Object.keys(SHORT_TO_FULL).map((key) => [key, numberValue(primary[key])])),
    bonus: Object.fromEntries(Object.keys(SHORT_TO_FULL).map((key) => [key, numberValue(bonus[key])])),
    core: core
      ? {
        source: core.source || "",
        characterId: core.characterId ?? null,
        partySlotIndex: Number.isInteger(partySlotIndex) ? partySlotIndex : null,
      }
      : null,
    skills: skills.map((skill) => ({
      name: String(skill.name || "이름 없는 스킬"),
      stat: skill.stat || "",
      desc: String(skill.desc || skill.body || ""),
    })),
  };
}

function getTemporaryUnitTypeLabel(type) {
  return {
    player: "플레이어",
    ally: "아군",
    enemy: "적군",
    obstacle: "장애물",
  }[type] || "유닛";
}

function getTemporaryUnitStatLabel(shortKey) {
  return STAT_LABELS[SHORT_TO_FULL[shortKey] || shortKey] || shortKey;
}

function getTemporaryUnitStatTotal(unit, shortKey) {
  return Number(unit.primary?.[shortKey] || 0) + Number(unit.bonus?.[shortKey] || 0);
}

function getTemporaryUnitBackingEntity(unit) {
  const core = unit.core || {};
  if (core.source === "main" && core.characterId) return game.characters[core.characterId] || null;
  if (core.source === "party" && Number.isInteger(core.partySlotIndex)) {
    return getActiveCharacter().partySlots?.[core.partySlotIndex] || null;
  }
  return null;
}

function applyTemporaryResourcesToEntity(entity, unit) {
  const maxHp = getResourceMax(entity, "hp");
  const maxStamina = getResourceMax(entity, "stamina");
  const hp = clamp(Math.round(Number(unit.hp) || 0), 0, maxHp);
  const stamina = clamp(Math.round(Number(unit.stamina) || 0), 0, maxStamina);

  getStatState(entity, "hp").decrease = clamp(maxHp - hp, 0, maxHp);
  getStatState(entity, "stamina").decrease = clamp(maxStamina - stamina, 0, maxStamina);
}

function commitTemporaryUnitStatus(unit) {
  let updated = false;
  const combatant = game.combat?.combatants.find((entry) => entry.id === unit.id);

  if (combatant) {
    combatant.hp = clamp(Math.round(Number(unit.hp) || 0), 0, combatant.maxHp);
    combatant.stamina = clamp(Math.round(Number(unit.stamina) || 0), 0, combatant.maxStamina);
    syncCombatantToBacking(combatant);
    updated = true;
  } else {
    const entity = getTemporaryUnitBackingEntity(unit);
    if (entity) {
      applyTemporaryResourcesToEntity(entity, unit);
      updated = true;
    }
  }

  if (updated) addLog(`${unit.name} 임시 상태창의 HP/SP를 본 상태창에 반영했습니다.`);
  return updated;
}

function closeTemporaryUnitStatus({ commit = true, rerender = true } = {}) {
  if (!temporaryUnitStatus) return false;

  const updated = commit ? commitTemporaryUnitStatus(temporaryUnitStatus) : false;
  temporaryUnitStatus = null;

  if (updated) {
    saveGame(true);
    syncGameSystemFrame({ openBattle: Boolean(game.combat), reason: "temporary-status-close" });
  }

  if (rerender) {
    if (updated) renderAll();
    else renderSheet();
  }

  return updated;
}

function renderTemporaryUnitStatus(unit) {
  const statKeys = ["str", "con", "spd", "pre", "int", "wis", "cha"];
  const speed = getTemporaryUnitStatTotal(unit, "spd");
  return `
    <section class="temporary-unit-sheet">
      <article class="party-mini-page temporary-unit-page">
        <div class="mini-page-head">
          <div>
            <span class="tiny-label">임시 상태창</span>
            <h2>${escapeHtml(unit.name)}</h2>
            <p>${escapeHtml(getTemporaryUnitTypeLabel(unit.type))}${unit.label ? ` · ${escapeHtml(unit.label)}` : ""}</p>
          </div>
          <div class="mini-page-actions">
            <button class="mini-button" type="button" data-close-temp-status>닫기</button>
          </div>
        </div>

        <section class="mini-metrics temp-unit-metrics">
          <article><span>HP</span><strong>${unit.hp}/${unit.maxHp}</strong></article>
          <article><span>SP</span><strong>${unit.stamina}/${unit.maxStamina}</strong></article>
          <article><span>속도</span><strong>${speed}</strong></article>
          <article><span>데미지</span><strong>${unit.damage}</strong></article>
          <article><span>방어</span><strong>${unit.armor}</strong></article>
        </section>

        <section class="stat-table mini-stat-table">
          <div class="stat-row is-head">
            <span>능력치</span><span class="number">기본</span><span class="number">보너스</span><span class="number">결과</span>
          </div>
          ${statKeys.map((key) => `
            <div class="stat-row temp-unit-stat-row">
              <span class="stat-name">${escapeHtml(getTemporaryUnitStatLabel(key))}</span>
              <span class="number">${unit.primary[key] || 0}</span>
              <span class="number">${formatSigned(unit.bonus[key] || 0)}</span>
              <span class="number">${getTemporaryUnitStatTotal(unit, key)}</span>
            </div>
          `).join("")}
        </section>

        <section class="mini-skill-list">
          <div class="card-head">
            <h3>스킬</h3>
            <span class="small-muted">${unit.skills.length}</span>
          </div>
          ${unit.skills.length ? unit.skills.map((skill) => `
            <article class="mini-skill-card">
              <strong>${escapeHtml(skill.name)}</strong>
              <span>${escapeHtml(getTemporaryUnitStatLabel(skill.stat))}</span>
              ${skill.desc ? `<p>${escapeHtml(skill.desc)}</p>` : ""}
            </article>
          `).join("") : `<p class="small-muted">등록된 스킬이 없습니다.</p>`}
        </section>
      </article>
    </section>
  `;
}

function renderOverview(character) {
  const summary = [
    ["체력", `${getResourceCurrent(character, "hp")} / ${getResourceMax(character, "hp")}`],
    ["스테미나", `${getResourceCurrent(character, "stamina")} / ${getResourceMax(character, "stamina")}`],
    ["주무기", getTotal(character, "damage")],
    ["방어력", getTotal(character, "armor")],
  ];
  return `
    <section class="summary-grid">
      ${summary.map(([label, value]) => `<article class="metric"><span>${label}</span><strong>${value}</strong></article>`).join("")}
    </section>
    <section class="detail-card">
      <h2>상태 조정</h2>
      <div class="resource-editor" style="margin-top:10px">
        <label>받은 피해<input type="number" min="0" data-state-edit="hp" value="${getStatState(character, "hp").decrease}" /></label>
        <label>SP 소모<input type="number" min="0" data-state-edit="stamina" value="${getStatState(character, "stamina").decrease}" /></label>
        <button class="mini-button" type="button" data-heal-main>회복</button>
      </div>
    </section>
    <section class="stat-table">
      <div class="stat-row is-head">
        <span>능력치</span><span class="number">기본</span><span class="number">장비</span><span class="number">상태</span><span class="number">결과</span>
      </div>
      ${STAT_DEFS.map((stat) => {
        const gear = sumStats(character.equipment)[stat.key] || 0;
        const modifier = getStatState(character, stat.key);
        const stateValue = Number(modifier.increase || 0) - Number(modifier.decrease || 0);
        return `
          <div class="stat-row">
            <span class="stat-name">${stat.label}</span>
            <span class="number">${character.baseLabels?.[stat.key] || character.bases[stat.key]}</span>
            <span class="number">${formatSigned(gear)}</span>
            <span class="number">${formatSigned(stateValue)}</span>
            <span class="number">${getTotal(character, stat.key)}</span>
          </div>
        `;
      }).join("")}
    </section>
  `;
}

function renderEquipment(character) {
  return `
    <section class="gear-grid">
      ${character.equipment.map((item) => {
        const bonuses = Object.entries(item.stats || {});
        return `
          <article class="gear-card">
            <div class="card-head">
              <div>
                <span class="tiny-label">${escapeHtml(item.slot || "장비")}</span>
                <h3>${escapeHtml(item.name || "비어 있음")}</h3>
              </div>
              <span class="small-muted">${item.durability ? `${item.durability.current ?? "?"}/${item.durability.max}` : ""}</span>
            </div>
            <div class="bonus-list">
              ${bonuses.length ? bonuses.map(([key, value]) => `<span class="bonus ${value < 0 ? "penalty" : ""}">${STAT_LABELS[key]} ${formatSigned(value)}</span>`).join("") : `<span class="bonus">보정 없음</span>`}
            </div>
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function renderSkills(character) {
  return `
    <section class="skill-grid">
      ${character.skills.map((skill) => `
        <article class="skill-card">
          <div class="card-head">
            <h3>${escapeHtml(skill.name)}</h3>
            <span class="small-muted">${STAT_LABELS[skill.stat] || "판정"}</span>
          </div>
          <p class="skill-body">${escapeHtml(skill.body || "")}</p>
          <div class="tag-list">${(skill.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderBag(character) {
  const bag = normalizeBag(character.bag);
  const activeCategory = BAG_CATEGORIES.find((category) => category.key === activeBagCategory) || BAG_CATEGORIES[0];
  return `
    <section class="detail-card">
      <div class="card-head">
        <div>
          <span class="tiny-label">Money</span>
          <h2>${new Intl.NumberFormat("ko-KR").format(bag.money)} 페니</h2>
        </div>
      </div>
    </section>
    <nav class="bag-toolbar" aria-label="가방 분류">
      ${BAG_CATEGORIES.map((category) => `
        <button class="bag-category ${category.key === activeCategory.key ? "is-active" : ""}" type="button" data-bag-category="${category.key}">
          ${category.label} ${bag[category.key].length}
        </button>
      `).join("")}
    </nav>
    <section class="bag-grid">
      ${bag[activeCategory.key].length ? bag[activeCategory.key].map((item) => `
        <article class="bag-card">
          <div class="card-head">
            <h3>${escapeHtml(item.name || "이름 없는 물품")}</h3>
            ${item.quantity && item.quantity !== 1 ? `<span class="tag">x${item.quantity}</span>` : ""}
          </div>
          ${item.note ? `<p class="bag-note">${escapeHtml(item.note)}</p>` : ""}
          <div class="tag-list">${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </article>
      `).join("") : `<article class="detail-card"><strong>등록된 물품 없음</strong></article>`}
    </section>
  `;
}

function normalizeBag(bag = {}) {
  return {
    money: Math.max(0, Number(bag.money || 0)),
    ...Object.fromEntries(
      BAG_CATEGORIES.map((category) => [
        category.key,
        Array.isArray(bag[category.key])
          ? bag[category.key].map((item) => ({
            name: item.name || "",
            note: item.note || item.body || "",
            quantity: Math.max(1, Number(item.quantity || 1)),
            tags: Array.isArray(item.tags) ? item.tags : [],
          }))
          : [],
      ]),
    ),
  };
}

function renderPartySheet(character) {
  character.partySlots ??= [null, null, null];
  const firstFilledIndex = character.partySlots.findIndex(Boolean);
  if (!character.partySlots[activePartyPreviewIndex] && firstFilledIndex >= 0) activePartyPreviewIndex = firstFilledIndex;
  const selectedMember = character.partySlots[activePartyPreviewIndex] || null;
  return `
    <section class="detail-card">
      <h2>${escapeHtml(character.name)}의 파티 슬롯</h2>
      <p class="skill-body">탐험 중에는 파티가 한 묶음으로 움직이고, 전투 시작 시 참가 중인 슬롯이 개별 유닛으로 펼쳐집니다.</p>
    </section>
    <section class="party-mini-layout">
      <div class="party-mini-nav">
        ${character.partySlots.map((member, index) => `
          <button class="party-mini-tab ${activePartyPreviewIndex === index ? "is-active" : ""}" type="button" data-party-preview="${index}">
            <span>Slot ${index + 1}</span>
            <strong>${escapeHtml(member?.name || "비어 있음")}</strong>
          </button>
        `).join("")}
      </div>
      ${renderPartyMiniPage(selectedMember, activePartyPreviewIndex)}
    </section>
    <section class="party-sheet-slots">
      ${character.partySlots.map((member, index) => renderPartySlot(member, index)).join("")}
    </section>
  `;
}

function renderPartyMiniPage(member, index) {
  if (!member) {
    return `
      <article class="party-mini-page is-empty">
        <span class="tiny-label">Slot ${index + 1}</span>
        <h2>등록된 파티원이 없습니다</h2>
        <p class="skill-body">엑셀 파일을 가져오면 이 영역에 체력, 스테미나, 주능력치, 전투 능력치, 스킬이 미니 상태창으로 출력됩니다.</p>
        <label class="file-label">
          엑셀 가져오기
          <input type="file" accept=".xlsx,.xls" data-party-import="${index}" />
        </label>
      </article>
    `;
  }

  const stats = getCombatStats(member);
  return `
    <article class="party-mini-page">
      <div class="mini-page-head">
        <div>
          <span class="tiny-label">Slot ${index + 1} · ${member.active === false ? "전투 제외" : "전투 참가"}</span>
          <h2>${escapeHtml(member.name)}</h2>
          <p>${escapeHtml(member.tendency || member.role || "파티원")}</p>
        </div>
        <div class="mini-page-actions">
          <button class="mini-button" type="button" data-party-active="${index}">${member.active === false ? "전투 참가" : "전투 제외"}</button>
          <label class="file-label">
            교체
            <input type="file" accept=".xlsx,.xls" data-party-import="${index}" />
          </label>
        </div>
      </div>
      <section class="mini-metrics">
        <article><span>HP</span><strong>${stats.hp}/${stats.maxHp}</strong></article>
        <article><span>SP</span><strong>${stats.stamina}/${stats.maxStamina}</strong></article>
        <article><span>속도</span><strong>${stats.speed}</strong></article>
        <article><span>데미지</span><strong>${stats.damage || 0}</strong></article>
        <article><span>방어</span><strong>${stats.armor || 0}</strong></article>
      </section>
      ${renderEntityStatTable(member)}
      <section class="mini-skill-list">
        <div class="card-head">
          <h3>스킬</h3>
          <span class="small-muted">${member.skills?.length || 0}</span>
        </div>
        ${(member.skills || []).length ? member.skills.map((skill) => `
          <article class="mini-skill-card">
            <strong>${escapeHtml(skill.name)}</strong>
            <span>${escapeHtml(STAT_LABELS[skill.stat] || "판정")}</span>
            ${skill.body ? `<p>${escapeHtml(skill.body)}</p>` : ""}
          </article>
        `).join("") : `<p class="small-muted">가져온 스킬이 없습니다.</p>`}
      </section>
    </article>
  `;
}

function renderEntityStatTable(entity) {
  const gearBonuses = sumStats(entity.equipment);
  return `
    <section class="stat-table mini-stat-table">
      <div class="stat-row is-head">
        <span>능력치</span><span class="number">기본</span><span class="number">장비</span><span class="number">상태</span><span class="number">결과</span>
      </div>
      ${STAT_DEFS.map((stat) => {
        const base = entity.baseLabels?.[stat.key] || entity.bases?.[stat.key] || 0;
        const gear = gearBonuses[stat.key] || 0;
        const modifier = getStatState(entity, stat.key);
        const stateValue = Number(modifier.increase || 0) - Number(modifier.decrease || 0);
        return `
          <div class="stat-row">
            <span class="stat-name">${stat.label}</span>
            <span class="number">${base}</span>
            <span class="number">${formatSigned(gear)}</span>
            <span class="number">${formatSigned(stateValue)}</span>
            <span class="number">${getTotal(entity, stat.key)}</span>
          </div>
        `;
      }).join("")}
    </section>
  `;
}

function renderCombatPanel() {
  const panel = document.getElementById("combatActionPanel");
  if (!game.combat) {
    panel.innerHTML = "";
    return;
  }
  const actor = getCurrentActor();
  const targets = game.combat.combatants.filter((combatant) => combatant.side !== actor?.side && combatant.hp > 0);
  if (!actor) {
    panel.innerHTML = `<p class="small-muted">행동할 전투원이 없습니다.</p>`;
    return;
  }
  if (!selectedTargetId || !targets.some((target) => target.id === selectedTargetId)) selectedTargetId = targets[0]?.id ?? null;
  panel.innerHTML = `
    <div class="action-grid">
      <article class="detail-card">
        <span class="tiny-label">현재 턴</span>
        <h3>${escapeHtml(actor.name)}</h3>
        <p class="small-muted">HP ${actor.hp}/${actor.maxHp} · SP ${actor.stamina}/${actor.maxStamina} · 속도 ${actor.stats.speed}</p>
      </article>

      <label class="small-muted">
        대상
        <select id="targetSelect">
          ${targets.map((target) => `<option value="${target.id}" ${target.id === selectedTargetId ? "selected" : ""}>${escapeHtml(target.name)} HP ${target.hp}/${target.maxHp}</option>`).join("")}
        </select>
      </label>

      <div>
        <p class="tiny-label">공격 판정</p>
        <div class="stat-actions">
          ${PRIMARY_KEYS.map((key) => `<button class="stat-action ${attackStat === key ? "is-active" : ""}" type="button" data-attack-stat="${key}">${STAT_LABELS[key]}</button>`).join("")}
        </div>
      </div>

      <div>
        <p class="tiny-label">방어 판정</p>
        <div class="stat-actions">
          ${PRIMARY_KEYS.map((key) => `<button class="stat-action ${defendStat === key ? "is-active" : ""}" type="button" data-defend-stat="${key}">${STAT_LABELS[key]}</button>`).join("")}
        </div>
      </div>

      ${actor.skills?.length ? `
        <div>
          <p class="tiny-label">스킬 판정</p>
          <div class="stat-actions">
            ${actor.skills.slice(0, 8).map((skill, index) => `<button class="stat-action" type="button" data-skill-action="${index}">${escapeHtml(skill.name)}</button>`).join("")}
          </div>
        </div>
      ` : ""}

      <div class="action-row">
        <button class="solid-button" type="button" data-roll-attack ${selectedTargetId ? "" : "disabled"}>판정 굴리기</button>
        <button class="ghost-button" type="button" data-end-turn>대기 / 턴 종료</button>
      </div>

      <div class="import-row">
        <label class="small-muted">
          엑셀 전투원 진영
          <select id="combatImportSide">
            <option value="enemy">적군</option>
            <option value="party">아군</option>
          </select>
        </label>
        <label class="file-label">
          엑셀 전투원 추가
          <input type="file" accept=".xlsx,.xls" data-combat-import />
        </label>
      </div>
    </div>
  `;
}

function rollAttack() {
  const actor = getCurrentActor();
  const target = getCombatant(selectedTargetId);
  if (!actor || !target || target.hp <= 0) return;

  const attackSides = Math.max(1, actor.stats[attackStat] || 1);
  const defendSides = Math.max(1, target.stats[defendStat] || 1);
  const attackRoll = rollDie(attackSides);
  const defendRoll = rollDie(defendSides);
  const attackTotal = attackRoll;
  const defendTotal = defendRoll;
  const diff = attackTotal - defendTotal;

  if (diff > 0) {
    const rawDamage = attackTotal + Math.max(0, actor.stats.damage || 0);
    const amount = Math.max(0, rawDamage - Math.max(0, target.stats.armor || 0));
    applyDamage(target, amount);
    addLog(`${actor.name} ${STAT_LABELS[attackStat]} d${attackSides}=${attackRoll} / ${target.name} ${STAT_LABELS[defendStat]} d${defendSides}=${defendRoll}. ${amount} 피해.`);
  } else {
    addLog(`${actor.name} ${STAT_LABELS[attackStat]} d${attackSides}=${attackRoll} / ${target.name} ${STAT_LABELS[defendStat]} d${defendSides}=${defendRoll}. 피해 없음.`);
  }

  advanceTurn();
  saveGame(true);
  renderAll();
  syncGameSystemFrame({ openBattle: true, reason: "combat-roll" });
}

function applyDamage(combatant, amount) {
  combatant.hp = clamp(combatant.hp - amount, 0, combatant.maxHp);
  syncCombatantToBacking(combatant);
  if (combatant.hp <= 0) addLog(`${combatant.name} 전투불능.`);
}

function syncCombatantToBacking(combatant) {
  const active = getActiveCharacter();
  let entity = null;
  if (combatant.source === "main" && combatant.characterId) entity = game.characters[combatant.characterId];
  if (combatant.source === "party" && Number.isInteger(combatant.partySlotIndex)) entity = active.partySlots[combatant.partySlotIndex];
  if (!entity) return;
  getStatState(entity, "hp").decrease = clamp(combatant.maxHp - combatant.hp, 0, combatant.maxHp);
  getStatState(entity, "stamina").decrease = clamp(combatant.maxStamina - combatant.stamina, 0, combatant.maxStamina);
}

function advanceTurn() {
  if (!game.combat?.order.length) return;
  checkCombatEnd();
  const maxSteps = game.combat.order.length + 1;
  for (let step = 0; step < maxSteps; step += 1) {
    game.combat.turnIndex += 1;
    if (game.combat.turnIndex >= game.combat.order.length) {
      game.combat.turnIndex = 0;
      game.combat.round += 1;
      addLog(`라운드 ${game.combat.round} 시작.`);
    }
    const actor = getCurrentActor();
    if (actor?.hp > 0) {
      selectedCombatantId = actor.id;
      selectedTargetId = getFirstTargetId();
      return;
    }
  }
}

function checkCombatEnd() {
  if (!game.combat) return false;
  const partyAlive = game.combat.combatants.some((combatant) => combatant.side === "party" && combatant.hp > 0);
  const enemyAlive = game.combat.combatants.some((combatant) => combatant.side === "enemy" && combatant.hp > 0);
  if (!partyAlive || !enemyAlive) {
    addLog(enemyAlive ? "파티가 전투불능입니다." : "적을 모두 쓰러뜨렸습니다.");
    return true;
  }
  return false;
}

function endCombat() {
  if (!game.combat) return;
  game.combat.combatants.forEach(syncCombatantToBacking);
  game.combat = null;
  game.mode = "explore";
  selectedCombatantId = null;
  selectedTargetId = null;
  addLog("전투를 종료하고 탐험 모드로 돌아왔습니다.");
  saveGame(true);
  renderAll();
  syncGameSystemFrame({ openBattle: false, reason: "combat-end" });
}

function rollDie(sides) {
  return Math.floor(Math.random() * Math.max(1, Number(sides) || 1)) + 1;
}

function moveCurrentActorTo(x, y) {
  const actor = getCurrentActor();
  if (!actor || isObstacle(x, y) || getCombatantAt(x, y)) return;
  if (!getAdjacentCells(actor.x, actor.y).some((cell) => cell.x === x && cell.y === y)) return;
  actor.x = x;
  actor.y = y;
  selectedCombatantId = actor.id;
  addLog(`${actor.name} 이동: (${x + 1}, ${y + 1})`);
  saveGame(true);
  renderAll();
  syncGameSystemFrame({ openBattle: true, reason: "combat-move" });
}

function selectCombatant(id) {
  const combatant = getCombatant(id);
  if (!combatant) return;
  selectedCombatantId = id;
  const actor = getCurrentActor();
  if (actor && combatant.side !== actor.side) selectedTargetId = id;
  renderBoard();
  renderCombatPanel();
}

function addImportedCombatant(entity, side) {
  if (!game.combat) return;
  const spot = findCombatSpawn(side);
  const sideCount = game.combat.combatants.filter((combatant) => combatant.side === side).length + 1;
  const combatant = makeCombatantFromEntity(entity, side, { source: "excel", label: side === "enemy" ? String(sideCount) : `A${sideCount}`, x: spot.x, y: spot.y });
  game.combat.combatants.push(combatant);
  rebuildInitiative(`${entity.name} 전투 참가`);
  addLog(`${entity.name}을 ${side === "enemy" ? "적군" : "아군"} 전투원으로 추가했습니다.`);
  saveGame(true);
  renderAll();
  syncGameSystemFrame({ openBattle: true, reason: "combatant-import" });
}

function findCombatSpawn(side) {
  const preferRight = side === "enemy";
  const xRange = [...Array(game.exploration.cols).keys()];
  if (preferRight) xRange.reverse();
  for (const x of xRange) {
    for (let y = 0; y < game.exploration.rows; y += 1) {
      if (!isObstacle(x, y) && !getCombatantAt(x, y)) return { x, y };
    }
  }
  return { x: 0, y: 0 };
}

async function importPartyMember(file, index) {
  const parsed = await parseExcelFile(file);
  if (!parsed) return;
  const member = buildEntityFromImport(parsed, { role: "파티원" });
  getActiveCharacter().partySlots[index] = member;
  activePartyPreviewIndex = index;
  activeTab = "party";
  addLog(`${member.name}을 파티 슬롯 ${index + 1}에 등록했습니다.`);
  saveGame(true);
  renderAll();
  syncGameSystemFrame({ openBattle: Boolean(game.combat), reason: "party-import" });
}

async function importCombatant(file) {
  const parsed = await parseExcelFile(file);
  if (!parsed) return;
  const side = document.getElementById("combatImportSide")?.value || "enemy";
  addImportedCombatant(buildEntityFromImport(parsed, { role: side === "enemy" ? "적군" : "아군" }), side);
}

function buildEntityFromImport(parsed, { role }) {
  const totals = parsed.totals || {};
  const bases = {
    hp: readTotal(totals, "hp", 20),
    stamina: readTotal(totals, "stamina", 10),
    strength: readTotal(totals, "str", 6),
    vitality: readTotal(totals, "con", 6),
    speed: readTotal(totals, "spd", 6),
    precision: readTotal(totals, "pre", 6),
    intelligence: readTotal(totals, "int", 6),
    wisdom: readTotal(totals, "wis", 6),
    charm: readTotal(totals, "cha", 6),
    damage: readTotal(totals, "damage", 0),
    offhandDamage: 0,
    armor: 0,
  };
  return {
    id: crypto.randomUUID(),
    name: parsed.name || role,
    sigil: (parsed.name || role).slice(0, 1),
    role,
    tendency: "엑셀 가져오기",
    bases,
    baseLabels: {},
    skillBonuses: {},
    equipment: [],
    bag: { money: 0, equipment: [], consumables: [], materials: [], quest: [] },
    state: createState(),
    active: true,
    skills: (parsed.skills || []).map((skill) => ({
      name: skill.name || "이름 없는 스킬",
      body: skill.desc || "",
      tags: ["엑셀"],
      stat: SHORT_TO_FULL[skill.stat] || "strength",
    })),
  };
}

function readTotal(totals, key, fallback) {
  const value = totals[key];
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : fallback;
}

async function parseExcelFile(file) {
  if (!file) return null;
  if (!window.XLSX) {
    addLog("엑셀 읽기 도구를 불러오지 못했습니다. 인터넷 연결 후 새로고침해 주세요.");
    return null;
  }
  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array", cellFormula: true, cellDates: false });
    const parsed = extractTotalsFromWorkbook(workbook);
    if (!Object.keys(parsed.totals).length && !parsed.skills.length) {
      addLog("엑셀에서 합계 능력치나 스킬 값을 찾지 못했습니다.");
      return null;
    }
    return parsed;
  } catch {
    addLog("엑셀 파일을 읽지 못했습니다.");
    return null;
  }
}

function normalizeSheetText(value) {
  return String(value ?? "").replace(/\s+/g, "").trim();
}

function readCell(sheet, row, col) {
  const address = XLSX.utils.encode_cell({ r: row, c: col });
  return sheet[address]?.v ?? sheet[address]?.w ?? null;
}

function cleanSheetText(value) {
  return String(value ?? "").trim();
}

function findCharacterName(sheet, range) {
  for (let row = range.s.r; row <= range.e.r; row += 1) {
    for (let col = range.s.c; col <= range.e.c; col += 1) {
      if (normalizeSheetText(readCell(sheet, row, col)) === "이름") {
        const name = readCell(sheet, row, col + 1);
        if (name) return String(name).trim();
      }
    }
  }
  return "";
}

function findSkillColumns(sheet, range) {
  for (let row = range.s.r; row <= range.e.r; row += 1) {
    for (let col = range.s.c; col <= range.e.c; col += 1) {
      if (normalizeSheetText(readCell(sheet, row, col)) !== "스킬이름") continue;
      let contentCol = col + 1;
      for (let searchCol = col + 1; searchCol <= range.e.c; searchCol += 1) {
        if (normalizeSheetText(readCell(sheet, row, searchCol)) === "내용") {
          contentCol = searchCol;
          break;
        }
      }
      return { headerRow: row, nameCol: col, contentCol };
    }
  }
  return null;
}

function extractSkillsFromSheet(sheet, range) {
  const columns = findSkillColumns(sheet, range);
  if (!columns) return [];
  const skills = [];
  for (let row = columns.headerRow + 1; row <= range.e.r; row += 1) {
    const name = cleanSheetText(readCell(sheet, row, columns.nameCol));
    const desc = cleanSheetText(readCell(sheet, row, columns.contentCol));
    if (SKILL_IMPORT_STOP_LABELS.has(normalizeSheetText(name))) break;
    if (!name && !desc && skills.length) break;
    if (!name && !desc) continue;
    skills.push({ id: crypto.randomUUID(), name: name || "이름 없는 스킬", stat: "str", desc });
  }
  return skills;
}

function findTotalLabelColumn(sheet, range, headerRow, totalCol) {
  for (let offset = 1; offset <= 3; offset += 1) {
    const col = totalCol - offset;
    if (col < range.s.c) break;
    if (normalizeSheetText(readCell(sheet, headerRow, col)) === "능력치") return col;
  }
  return totalCol - 1;
}

function totalTableHasCharacterName(sheet, range, headerRow, labelCol, totalCol, characterName) {
  const targetName = normalizeSheetText(characterName);
  if (!targetName) return false;
  const minRow = Math.max(range.s.r, headerRow - 4);
  const maxRow = headerRow - 1;
  const minCol = Math.max(range.s.c, labelCol - 1);
  const maxCol = Math.min(range.e.c, totalCol + 1);
  for (let row = minRow; row <= maxRow; row += 1) {
    for (let col = minCol; col <= maxCol; col += 1) {
      if (normalizeSheetText(readCell(sheet, row, col)) === targetName) return true;
    }
  }
  return false;
}

function buildTotalCandidate(sheet, range, headerRow, totalCol, characterName) {
  const labelCol = findTotalLabelColumn(sheet, range, headerRow, totalCol);
  const totals = {};
  let count = 0;
  for (let row = headerRow + 1; row <= Math.min(range.e.r, headerRow + 24); row += 1) {
    const label = normalizeSheetText(readCell(sheet, row, labelCol));
    const key = SHEET_STAT_LABELS[label];
    const value = Number(readCell(sheet, row, totalCol));
    if (!key || !Number.isFinite(value)) continue;
    totals[key] = value;
    count += 1;
  }
  return {
    totals,
    count,
    hasCharacterName: totalTableHasCharacterName(sheet, range, headerRow, labelCol, totalCol, characterName),
  };
}

function extractTotalsFromWorkbook(workbook) {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const range = XLSX.utils.decode_range(sheet["!ref"] || "A1:A1");
  const name = findCharacterName(sheet, range);
  const totalCandidates = [];
  for (let row = range.s.r; row <= range.e.r; row += 1) {
    for (let col = range.s.c; col <= range.e.c; col += 1) {
      if (normalizeSheetText(readCell(sheet, row, col)) !== "합계") continue;
      const candidate = buildTotalCandidate(sheet, range, row, col, name);
      if (candidate.count) totalCandidates.push(candidate);
    }
  }
  totalCandidates.sort((a, b) => {
    if (a.hasCharacterName !== b.hasCharacterName) return a.hasCharacterName ? -1 : 1;
    return b.count - a.count;
  });
  return {
    name,
    totals: totalCandidates[0]?.totals ?? {},
    skills: extractSkillsFromSheet(sheet, range),
  };
}

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-temp-status]")) {
    closeTemporaryUnitStatus();
    return;
  }

  const characterButton = event.target.closest("[data-character]");
  if (characterButton) {
    closeTemporaryUnitStatus({ rerender: false });
    game.activeCharacterId = characterButton.dataset.character;
    activeTab = "overview";
    game.mode = "profile";
    selectedCombatantId = null;
    selectedTargetId = null;
    addLog(`${getActiveCharacter().name} 이야기를 선택했습니다.`);
    saveGame(true);
    renderAll();
    syncGameSystemFrame({ openBattle: false, reason: "character-switch" });
    return;
  }

  const modeButton = event.target.closest("[data-mode]");
  if (modeButton) {
    closeTemporaryUnitStatus({ rerender: false });
    setMode(modeButton.dataset.mode);
    return;
  }

  const tab = event.target.closest("[data-tab]");
  if (tab) {
    closeTemporaryUnitStatus({ rerender: false });
    activeTab = tab.dataset.tab;
    renderSheet();
    return;
  }

  const bagCategory = event.target.closest("[data-bag-category]");
  if (bagCategory) {
    activeBagCategory = bagCategory.dataset.bagCategory;
    renderSheet();
    return;
  }

  if (event.target.closest("#saveButton")) {
    saveGame();
    renderAll();
    return;
  }

  if (event.target.closest("#resetButton")) {
    openConfirm("초기화", "새 병합 앱의 저장 데이터를 초기화할까요? 원본 폴더는 건드리지 않습니다.", () => {
      localStorage.removeItem(SAVE_KEY);
      game = createNewGame();
      activeTab = "overview";
      activeBagCategory = BAG_CATEGORIES[0].key;
      closeTemporaryUnitStatus({ commit: false, rerender: false });
      addLog("저장 데이터를 초기화했습니다.");
      renderAll();
      syncGameSystemFrame({ openBattle: false, reason: "reset" });
    });
    return;
  }

  if (event.target.closest("#startCombatButton")) {
    startCombat();
    return;
  }

  if (event.target.closest("#endCombatButton")) {
    endCombat();
    return;
  }

  if (event.target.closest("#rerollInitiativeButton")) {
    rebuildInitiative("속도 변화 반영");
    saveGame(true);
    renderAll();
    syncGameSystemFrame({ openBattle: true, reason: "initiative-reroll" });
    return;
  }

  const partyPreview = event.target.closest("[data-party-preview]");
  if (partyPreview) {
    activePartyPreviewIndex = Number(partyPreview.dataset.partyPreview);
    activeTab = "party";
    renderAll();
    return;
  }

  const partyActive = event.target.closest("[data-party-active]");
  if (partyActive) {
    const index = Number(partyActive.dataset.partyActive);
    const member = getActiveCharacter().partySlots[index];
    if (member) member.active = member.active === false;
    saveGame(true);
    renderAll();
    syncGameSystemFrame({ openBattle: Boolean(game.combat), reason: "party-active-toggle" });
    return;
  }

  const partyClear = event.target.closest("[data-party-clear]");
  if (partyClear) {
    const index = Number(partyClear.dataset.partyClear);
    getActiveCharacter().partySlots[index] = null;
    if (activePartyPreviewIndex === index) activePartyPreviewIndex = 0;
    addLog(`파티 슬롯 ${index + 1}을 비웠습니다.`);
    saveGame(true);
    renderAll();
    syncGameSystemFrame({ openBattle: Boolean(game.combat), reason: "party-clear" });
    return;
  }

  if (event.target.closest("[data-heal-main]")) {
    const character = getActiveCharacter();
    getStatState(character, "hp").decrease = 0;
    getStatState(character, "stamina").decrease = 0;
    addLog(`${character.name}의 체력과 스테미나를 회복했습니다.`);
    saveGame(true);
    renderAll();
    return;
  }

  const combatantButton = event.target.closest("[data-combatant]");
  if (combatantButton) {
    selectCombatant(combatantButton.dataset.combatant);
    return;
  }

  const cell = event.target.closest(".cell");
  if (cell) {
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    if (game.mode === "combat" && game.combat) moveCurrentActorTo(x, y);
    else movePartyTo(x, y);
    return;
  }

  const attackButton = event.target.closest("[data-attack-stat]");
  if (attackButton) {
    attackStat = attackButton.dataset.attackStat;
    renderCombatPanel();
    return;
  }

  const defendButton = event.target.closest("[data-defend-stat]");
  if (defendButton) {
    defendStat = defendButton.dataset.defendStat;
    renderCombatPanel();
    return;
  }

  const skillButton = event.target.closest("[data-skill-action]");
  if (skillButton) {
    const actor = getCurrentActor();
    const skill = actor?.skills?.[Number(skillButton.dataset.skillAction)];
    if (skill?.stat) {
      attackStat = skill.stat;
      addLog(`${actor.name} 스킬 선택: ${skill.name} (${STAT_LABELS[attackStat] || "판정"})`);
      renderCombatPanel();
    }
    return;
  }

  if (event.target.closest("[data-roll-attack]")) {
    rollAttack();
    return;
  }

  if (event.target.closest("[data-end-turn]")) {
    const actor = getCurrentActor();
    if (actor) addLog(`${actor.name} 대기.`);
    advanceTurn();
    saveGame(true);
    renderAll();
    syncGameSystemFrame({ openBattle: true, reason: "turn-end" });
  }
});

document.addEventListener("input", (event) => {
  const stateInput = event.target.closest("[data-state-edit]");
  if (!stateInput) return;
  const character = getActiveCharacter();
  const key = stateInput.dataset.stateEdit;
  getStatState(character, key).decrease = clamp(Number(stateInput.value || 0), 0, getResourceMax(character, key));
  saveGame(true);
  renderHeroCard();
  renderSheet();
  syncGameSystemFrame({ openBattle: Boolean(game.combat), reason: "state-edit" });
});

document.addEventListener("change", async (event) => {
  const targetSelect = event.target.closest("#targetSelect");
  if (targetSelect) {
    selectedTargetId = targetSelect.value;
    renderBoard();
    return;
  }

  const partyImport = event.target.closest("[data-party-import]");
  if (partyImport) {
    await importPartyMember(partyImport.files?.[0], Number(partyImport.dataset.partyImport));
    partyImport.value = "";
    return;
  }

  const combatImport = event.target.closest("[data-combat-import]");
  if (combatImport) {
    await importCombatant(combatImport.files?.[0]);
    combatImport.value = "";
  }
});

function openConfirm(title, message, action) {
  pendingConfirmAction = action;
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmMessage").textContent = message;
  document.getElementById("confirmModal").hidden = false;
}

function closeConfirm() {
  pendingConfirmAction = null;
  document.getElementById("confirmModal").hidden = true;
}

document.getElementById("confirmNo").addEventListener("click", closeConfirm);
document.getElementById("confirmForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const action = pendingConfirmAction;
  closeConfirm();
  action?.();
});

document.getElementById(GAME_SYSTEM_FRAME_ID)?.addEventListener("load", () => {
  syncGameSystemFrame({ openBattle: game.mode === "combat" && Boolean(game.combat), reason: "frame-load" });
});
window.addEventListener("message", handleGameSystemMessage);

renderAll();
syncGameSystemFrame({ openBattle: game.mode === "combat" && Boolean(game.combat), reason: "initial" });
