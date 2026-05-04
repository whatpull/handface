// Session 33 drawflow PoC: 4 region node + 3 cascade edge (region 단위, 보존).
// Session 34 추가: 52 neuron 단위 + weight gradient 색.
// Session 39: 사용자 노드 위치 — saved positions (드래그 후 저장된) 영역 우선.
import { getNodePosition } from '../state.js';

// Region 단위 (4 노드, 보존).
export const REGION_NODES = [
  { id: 'INPUT', label: 'INPUT', color: '#f5b842', total: 8,  x: 80,  y: 200 },
  { id: 'V1',    label: 'V1',    color: '#4dd0e1', total: 20, x: 320, y: 200 },
  { id: 'V2',    label: 'V2',    color: '#b794f4', total: 20, x: 560, y: 200 },
  { id: 'OUT',   label: 'OUT',   color: '#5eead4', total: 4,  x: 800, y: 200 },
];

export const CASCADE_EDGES = [
  { from: 'INPUT', to: 'V1',  label: 'INPUT->V1 L4_E (w=64)',     stage: 0 },
  { from: 'V1',    to: 'V2',  label: 'V1 L23_E->V2 L4_E (w=160)', stage: 2 },
  { from: 'V2',    to: 'OUT', label: 'V2 L5_E->OUT (w=64)',       stage: 4 },
];

// Neuron 단위 layout (4 region column + SOURCE column, 좌→우. region 내부 population sub-column).
// Session 36: SOURCE column 신규 (Camera + Gesture 영역 input 전 영역).
export const REGION_X = {
  SOURCE_CAMERA:  80,
  SOURCE_GESTURE: 240,
  INPUT:          440,
  V1_L4_E:        740,
  V1_L4_I:        940,
  V1_L23_E:      1140,
  V1_L1_I:        680,    // P44: V1 L1 (sparse interneurons), V1 옆 stack.
  V1_L6_E:        980,    // P44: V1 L6 (corticothalamic).
  V2_L4_E:       1440,
  V2_L23_E:      1640,
  V2_L5_E:       1840,
  V2_L1_I:       1380,    // P44: V2 L1.
  V2_L6_E:       1680,    // P44: V2 L6.
  // Session 42+ Phase 31: Ventral stream (V4 → IT) — V2 와 HIPPO 사이.
  V4_L4:         1900,
  V4_L5:         1940,
  IT_L4:         1980,
  IT_L5:         1990,
  V4_COLOR:      1920,    // Phase 55: V4 chromatic sub-region.
  // Session 42+ Phase 32: Dorsal stream (V3 → MT → PPC) — Ventral 위쪽 row 로 stack 분산.
  V3_REGION:     1900,    // V4 와 같은 X — Y stack 분리.
  MT_REGION:     1960,
  PPC_REGION:    2010,
  // Phase 45: Mirror Neuron System (F5 + IPL).
  IPL_REGION:    2050,
  F5_REGION:     2100,
  // Phase 46: TPJ (Temporo-Parietal Junction).
  TPJ_REGION:    2150,
  // Phase 54: FEF (Frontal Eye Field).
  FEF_REGION:    2120,
  // Phase 49: Language (Broca + Wernicke).
  WERN_REGION:    760,    // A2 옆 (auditory comprehension).
  BROCA_REGION:  2160,    // PFC L23 옆 (motor speech).
  // Session 42+ Phase 33: Auditory cortex — Audio user_in 옆에서 시작.
  A1_REGION:     560,     // INPUT(440) 과 V1_L4_E(740) 사이.
  A2_REGION:     660,
  // Phase 86 reorganization: 모든 region 의 X 좌표를 unique 하게 재정렬.
  // 충돌 제거 + functional cluster 별 column 배치.
  // 기존 canonical 좌표 (V1/V2/PFC/AMG/STR_D1/STR_D2/VTA/NAcc/HIPPO/OUT) 는 보존.
  // 새 region 들 (Phase 58-85) 만 unique X 로 이동.

  // ── Sensory input zone [440-740] ──
  S1_REGION:     500,        // P56: INPUT 옆.
  LGN_REGION:    640,        // P62: INPUT → LGN → V1.
  OT_REGION:     720,        // P79: Piriform 옆 (olfactory-reward).
  // ── Visual extra-striate zone [1700-1880] ──
  PUL_REGION:    1780,       // P60: thalamic attention relay (was 1820 → V2_L5 충돌 회피).
  CUN_REGION:    1820,       // P59: dorsal extra-striate (was 1840 → V2_L5 충돌).
  LIN_REGION:    1860,       // P59: ventral extra-striate (was 1860).
  // ── Cerebellar lobules zone [1290-1370] ──
  CB_VERM_REGION: 1310,      // P71.
  CB_HEMI_REGION: 1330,      // P71.
  CB_FLOC_REGION: 1350,      // P71.
  // ── HIPPO ext zone [1380-1500] ──
  DG_REGION:     1380,       // P84: pattern separation.
  CA2_REGION:    1395,       // P84: social memory.
  // Phase 136: V1 L2/3 split (L23a feedforward, L23b recurrent) — V1 L23_E (1140) 옆.
  V1_L23A:       1160,
  V1_L23B:       1180,
  // Phase 137: A1 tonotopic columns — A1 옆 (560) stack.
  A1C_REGION:     580,
  // Phase 142: V2 L2/3 split (L23a feedforward, L23b recurrent) — V2 L23_E (1640) 옆.
  V2_L23A:       1660,
  V2_L23B:       1680,
  // Phase 143: IT subdivision (TEO + TE) — IT 옆.
  TEO_REGION:    1985,
  TE_ANT_REGION: 2000,
  // Phase 151: S1 somatotopic finger map — S1 옆 stack.
  S1F_REGION:    520,
  // Phase 156: Auditory localization MSO/LSO (brainstem) — A1 직전.
  MSO_REGION:    540,
  LSO_REGION:    550,
  // Phase 163: V4 RGB columns — V4 영역 옆 stack.
  V4_RGB:       1900,
  // Phase 164: SC layered (sup/int/deep) — SC 옆 stack.
  SC_SUP:       2125,
  SC_INT:       2135,
  SC_DEEP:      2145,
  PHC_REGION:    1410,       // P76: scene gateway.
  SUBIC_REGION:  1430,       // P75: HIPPO output.
  MB_REGION:     1455,       // P68: Papez junction.
  ATN_REGION:    1490,       // P67: Papez relay.
  // ── MTL/Visual association zone [2030-2050] ──
  PRC_REGION:    2030,       // P77: object familiarity.
  // ── Cingulate cluster [2150-2200] ──
  RSC_REGION:    2155,       // P72: was 2180 → CEN/PCC 충돌 회피.
  DACC_REGION:   2175,       // P82: was 2350 → TAIL_STR 충돌 회피, ACC 근처로 이동.
  VACC_REGION:   2195,       // P82: was 2370 → NACC 충돌 회피.
  // ── AMG split cluster [2305-2330] (기존 AMG=2320 옆 stack) ──
  BLA_REGION:    2305,       // P83: was 2160 → BROCA/PFC_L23 충돌 회피.
  CEN_REGION:    2315,       // P83: was 2180 → RSC 충돌 회피.
  MED_REGION:    2325,       // P83: was 2200 → ACC/OFC 충돌 회피.
  // ── BNST [2335] (extended amygdala 옆) ──
  BNST_REGION:   2335,       // P80: was 2270 → STN 충돌 회피.
  // ── Insula split [2270-2295] (기존 INS=2280 옆 stack) ──
  AI_REGION:     2270,       // P78: was 2230 → 충돌 정리.
  PI_REGION:     2295,       // P78: was 2210.
  // ── OFC/PFC split cluster [2210-2270] ──
  OFC_REGION:    2215,       // P65: was 2200 → ACC 충돌 회피.
  DLPFC_REGION:  2255,       // P81: was 2380 → STR_D1 근처 충돌 회피.
  VMPFC_REGION:  2275,       // P81: was 2400 → STR_D1 충돌 회피.
  // ── Reward DA cluster [2340-2415] ──
  SNC_REGION:    2345,       // P66: was 2330 → VTA 충돌 회피.
  HB_REGION:     2415,       // P63: was 2360 → VACC 충돌 회피, NAcc 옆.
  // ── BG output zone [2440-2515] ──
  CAUD_REGION:   2440,       // P69: was 2240 → PFC_L5 충돌 회피.
  PUT_REGION:    2460,       // P69: was 2260.
  STN_REGION:    2495,       // P61: was 2280 → INS 충돌 회피.
  GPE_REGION:    2515,       // P70: was 2300.
  GPI_REGION:    2535,       // P70: was 2320 → AMG 충돌 회피.
  // ── Premotor + SMA + M1 zone [2550-2620] ──
  PMD_REGION:    2550,       // P74: was 2440.
  PMV_REGION:    2570,       // P74: was 2460.
  PRESMA_REGION: 2590,       // P73: was 2470.
  SMA_REGION:    2605,       // P73: was 2490.
  M1_REGION:     2620,       // P57: was 2510.
  // ── Attention/eye zone [2120-2140] ──
  SC_REGION:     2140,       // P64: FEF 옆 stack (Y stack OK).
  // Session 42+ Phase 37: Olfactory (OB + Piriform) — A2 옆 stack.
  OB_REGION:     560,
  PIR_REGION:    660,
  // Session 42+ Phase 34: Reward circuit (VTA + NAcc) — BG D1 옆에 배치.
  VTA_REGION:    2330,
  NACC_REGION:   2370,
  // Session 42+ Phase 35: Insula — AMG 옆 (PFC ↔ AMG ↔ INS triangle).
  INS_REGION:    2280,
  // Session 42+ Phase 36: ACC — PFC 옆 (conflict monitor).
  ACC_REGION:    2200,
  // Session 42+ Tier2-D: HIPPO 칼럼 (V2_L5_E 와 OUT 사이) — CA3 (recurrent) + CA1 (projection).
  HIPPO_CA3:     2000,
  HIPPO_CA1:     2080,
  HIPPO_DG:      1960,    // Phase 41: DG (CA3 input upstream).
  HIPPO_PLACE:   2020,    // Phase 53: place cells (CA1 sub-pop).
  HIPPO_GRID:    2040,    // Phase 53: grid cells (EC II sub-pop).
  // Phase 52: EC layers (gateway).
  EC_II:         1920,
  EC_III:        1940,
  EC_V:          1980,
  // Session 42+ Phase 20: PFC (L23 → L5 recurrent) + AMG (emotion modulator).
  PFC_L23:       2160,
  PFC_L5:        2240,
  AMG:           2320,
  // Session 42+ Phase 21: Basal Ganglia (D1 / D2) — OUT 직전.
  STR_D1:        2400,
  STR_D2:        2480,
  // Phase 47: Striatum tail (habit pathway).
  TAIL_STR:      2350,
  // Session 42+ Phase 27: Spinal motor pool (final common pathway) — M1(2620) 직후.
  SP_AMN:        2660,    // P86: was 2540 → M1 충돌 회피.
  SP_RC:         2690,    // P86: was 2580 → SP_AMN 옆.
  // Session 42+ Phase 22: Cerebellum (GRC → PC → DCN) — V1 fork → 다른 motor pathway.
  CRB_GRC:       1340,    // V1_L23 (1140) 옆에 mossy fiber 받음.
  CRB_PC:        2240,    // PFC_L5 옆 (different vertical row 으로 stack).
  CRB_DCN:       1370,    // P86: was 2500 → cerebellar lobule cluster 옆 (1310-1350) 로 이동, BG zone 충돌 제거.
  // Session 42+ Phase 23: Thalamus (TH relay + TRN gate) — V1 ↔ V2 사이 relay column.
  THAL_TH:       1240,    // V1_L23 (1140) 와 V2_L4 (1440) 사이.
  THAL_TRN:      1340,    // TH 옆 (TRN gate).
  OUT:           2740,    // P86: was 2620 → SP_AMN/RC 옆으로 push.
};

const ROW_HEIGHT = 110;     // 80 → 110 (vertical 영역 영역 영역)
const TOP_PAD = 80;

function gridPos(x, idx, count) {
  // Center column 영역 vertical alignment.
  // CANVAS_CENTER_Y = TOP_PAD + 5 * ROW_HEIGHT (max 10 row 영역 center 정합).
  const CANVAS_CENTER_Y = TOP_PAD + 5 * ROW_HEIGHT;
  const startY = CANVAS_CENTER_Y - ((count - 1) / 2) * ROW_HEIGHT;
  return { x, y: startY + idx * ROW_HEIGHT };
}

export const NEURON_NODES = [
  // SOURCE (Session 36: Camera + Gesture, INPUT 전 영역).
  {
    id: 'src_camera',
    label: 'Camera',
    region: 'SOURCE',
    population: 'camera',
    color: '#a78bfa',
    ...gridPos(REGION_X.SOURCE_CAMERA, 0, 1),
  },
  {
    id: 'src_gesture',
    label: 'Gesture',
    region: 'SOURCE',
    population: 'gesture',
    color: '#fbbf24',
    ...gridPos(REGION_X.SOURCE_GESTURE, 0, 1),
  },

  // INPUT (8 노드)
  ...['in_pinch', 'in_fist', 'in_palm', 'in_point', 'in_gaze', 'in_blink', 'in_thumbsup', 'in_victory']
    .map((name, i) => ({
      id: name,
      label: name.replace('in_', ''),
      region: 'INPUT',
      population: 'input',
      color: '#f5b842',
      ...gridPos(REGION_X.INPUT, i, 8),
    })),

  // V1 L4_E (10 노드)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `v1_L4_E_${i}`,
    label: `L4E_${i}`,
    region: 'V1',
    population: 'L4_E',
    color: '#4dd0e1',
    ...gridPos(REGION_X.V1_L4_E, i, 10),
  })),

  // V1 L4_I (4 노드, inhibitory)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `v1_L4_I_${i}`,
    label: `L4I_${i}`,
    region: 'V1',
    population: 'L4_I',
    color: '#e76f6f',
    ...gridPos(REGION_X.V1_L4_I, i, 4),
  })),

  // V1 L23_E (6 노드)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `v1_L23_E_${i}`,
    label: `L23E_${i}`,
    region: 'V1',
    population: 'L23_E',
    color: '#4dd0e1',
    ...gridPos(REGION_X.V1_L23_E, i, 6),
  })),

  // V2 L4_E (10 노드)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `v2_L4_E_${i}`,
    label: `L4E_${i}`,
    region: 'V2',
    population: 'L4_E',
    color: '#b794f4',
    ...gridPos(REGION_X.V2_L4_E, i, 10),
  })),

  // V2 L23_E (6 노드)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `v2_L23_E_${i}`,
    label: `L23E_${i}`,
    region: 'V2',
    population: 'L23_E',
    color: '#b794f4',
    ...gridPos(REGION_X.V2_L23_E, i, 6),
  })),

  // V2 L5_E (4 노드)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `v2_L5_E_${i}`,
    label: `L5E_${i}`,
    region: 'V2',
    population: 'L5_E',
    color: '#b794f4',
    ...gridPos(REGION_X.V2_L5_E, i, 4),
  })),

  // OUT (4 노드, decoded gesture label — Phase 4 OUT decode mapping).
  // OUT index → gesture mapping (HANDFACE_GESTURE_TO_INPUT 정합):
  //   out_0 = pointing  / out_1 = openpalm / out_2 = thumbsup / out_3 = victory.
  ...['Pointing', 'Open palm', 'Thumbs up', 'Victory'].map((label, i) => ({
    id: `out_${i}`,
    label,
    region: 'OUT',
    population: 'output',
    color: '#5eead4',
    ...gridPos(REGION_X.OUT, i, 4),
  })),
];

// SOURCE edges (Session 36): Camera → Gesture → 8 INPUT (handface input chain 정합).
// 본 영역 = backend synapse 영역 0 (frontend 영역 영역 영역 영역) — runtime fixed display.
export const SOURCE_EDGES = [
  { pre: 'src_camera',  post: 'src_gesture', weight: 50 }, // camera → gesture
  { pre: 'src_gesture', post: 'in_pinch',    weight: 50 },
  { pre: 'src_gesture', post: 'in_fist',     weight: 50 },
  { pre: 'src_gesture', post: 'in_palm',     weight: 50 },
  { pre: 'src_gesture', post: 'in_point',    weight: 50 },
  { pre: 'src_gesture', post: 'in_gaze',     weight: 50 },
  { pre: 'src_gesture', post: 'in_blink',    weight: 50 },
  { pre: 'src_gesture', post: 'in_thumbsup', weight: 50 },
  { pre: 'src_gesture', post: 'in_victory',  weight: 50 },
];

// Session 37 Phase 4: 직접 INPUT → OUT pathway (subcortical fast pathway 영역).
// neuronface backend D120 anchor 영역 4 직접 synapse 영역 (in_point→out_0 등, weight 30).
// 본 영역 frontend canvas 영역만 — backend 영역 영역 영역 영역.
export const DECODE_EDGES = [
  { pre: 'in_point',    post: 'out_0', weight: 30 }, // pointing → out_0
  { pre: 'in_palm',     post: 'out_1', weight: 30 }, // openpalm → out_1
  { pre: 'in_thumbsup', post: 'out_2', weight: 30 }, // thumbsup → out_2
  { pre: 'in_victory',  post: 'out_3', weight: 30 }, // victory → out_3
];

// Session 37 Phase 7 grown 뉴런 시각화 helper.
// preset population key → REGION_X 키 매핑.
const POP_TO_REGION_X_KEY = {
  'v1_L4_E':  'V1_L4_E',
  'v1_L4_I':  'V1_L4_I',
  'v1_L23_E': 'V1_L23_E',
  'v2_L4_E':  'V2_L4_E',
  'v2_L23_E': 'V2_L23_E',
  'v2_L5_E':  'V2_L5_E',
  // Phase 44: L1 (inhibitory) / L6 (excitatory).
  'v1_L1_I':  'V1_L1_I',
  'v1_L6_E':  'V1_L6_E',
  'v2_L1_I':  'V2_L1_I',
  'v2_L6_E':  'V2_L6_E',
};

// Session 42+ Tier2-D + Phase 20+21: HIPPO + PFC + AMG + BG 노드 매핑.
const HIPPO_PREFIX_TO_X_KEY = {
  'ca3_':     'HIPPO_CA3',
  'ca1_':     'HIPPO_CA1',
  'dg_':      'HIPPO_DG',
  'place_':   'HIPPO_PLACE',
  'grid_':    'HIPPO_GRID',
  'ec_ii_':   'EC_II',
  'ec_iii_':  'EC_III',
  'ec_v_':    'EC_V',
  'pfc_l23_': 'PFC_L23',
  'pfc_l5_':  'PFC_L5',
  'amg_':     'AMG',
  'str_d1_':  'STR_D1',
  'str_d2_':  'STR_D2',
  'tail_str_': 'TAIL_STR',
  'grc_':     'CRB_GRC',
  'pc_':      'CRB_PC',
  'dcn_':     'CRB_DCN',
  'io_':      'CRB_PC',  // IO 는 PC 옆에 stack (visually CF 1:1 가깝게).
  'th_':      'THAL_TH',
  'trn_':     'THAL_TRN',
  'amn_':     'SP_AMN',
  'rc_':      'SP_RC',
  // Phase 26: AST 는 region 종류와 무관하게 V1 옆에 stack (기준 region 별로 향후 분산 가능).
  'ast_':     'V1_L4_I',
  // Phase 28: LC broadcast neuron — V1_L4_I 옆 stack (위치 무관).
  'lc_':      'V1_L4_I',
  // Phase 29: BF (Basal Forebrain) broadcast — ACh source.
  'bf_':      'V1_L4_I',
  // Phase 30: Raphe Nuclei broadcast — 5-HT source.
  'raphe_':   'V1_L4_I',
  // Phase 38: Brainstem (PAG + Pons) — V1_L4_I 옆 stack.
  'pag_':     'V1_L4_I',
  'pons_':    'V1_L4_I',
  // Phase 40: Hypothalamus — V1_L4_I 옆 stack.
  'hyp_':     'V1_L4_I',
  // Phase 50: VLPO sleep promoter — V1_L4_I 옆 stack.
  'vlpo_':    'V1_L4_I',
  // Phase 51: Reticular Formation (RF) — V1_L4_I 옆 stack.
  'rf_':      'V1_L4_I',
  // Phase 39: DMN (mPFC + PCC + AG) — PFC 옆.
  'mpfc_':    'PFC_L5',
  'pcc_':     'PFC_L5',
  'ag_':      'PFC_L5',
  // Phase 42: SN (AI + dACC) — INS 옆.
  'ai_':      'INS_REGION',
  'dacc_':    'INS_REGION',
  // Phase 31: Ventral stream V4/IT.
  'v4_l4_':   'V4_L4',
  'v4_l5_':   'V4_L5',
  'it_l4_':   'IT_L4',
  'it_l5_':   'IT_L5',
  'v4_color_': 'V4_COLOR',
  'v3_':      'V3_REGION',
  'mt_':      'MT_REGION',
  'ppc_':     'PPC_REGION',
  'ipl_':     'IPL_REGION',
  'f5_':      'F5_REGION',
  'tpj_':     'TPJ_REGION',
  'fef_':     'FEF_REGION',
  'wern_':    'WERN_REGION',
  'broca_':   'BROCA_REGION',
  'a1_':      'A1_REGION',
  'a2_':      'A2_REGION',
  's1_':      'S1_REGION',
  'm1_':      'M1_REGION',
  'cun_':     'CUN_REGION',
  'lin_':     'LIN_REGION',
  'lgn_':     'LGN_REGION',
  'pul_':     'PUL_REGION',
  'stn_':     'STN_REGION',
  'hb_':      'HB_REGION',
  'sc_':      'SC_REGION',
  'ofc_':     'OFC_REGION',
  'snc_':     'SNC_REGION',
  'atn_':     'ATN_REGION',
  'mb_':      'MB_REGION',
  'caud_':    'CAUD_REGION',
  'put_':     'PUT_REGION',
  'gpe_':     'GPE_REGION',
  'gpi_':     'GPI_REGION',
  'cbverm_':  'CB_VERM_REGION',
  'cbhemi_':  'CB_HEMI_REGION',
  'cbfloc_':  'CB_FLOC_REGION',
  'rsc_':     'RSC_REGION',
  'presma_':  'PRESMA_REGION',
  'sma_':     'SMA_REGION',
  'pmd_':     'PMD_REGION',
  'pmv_':     'PMV_REGION',
  'subic_':   'SUBIC_REGION',
  'phc_':     'PHC_REGION',
  'prc_':     'PRC_REGION',
  'ai_':      'AI_REGION',
  'pi_':      'PI_REGION',
  'ot_':      'OT_REGION',
  'bnst_':    'BNST_REGION',
  'dlpfc_':   'DLPFC_REGION',
  'vmpfc_':   'VMPFC_REGION',
  'dacc_':    'DACC_REGION',
  'vacc_':    'VACC_REGION',
  'bla_':     'BLA_REGION',
  'cen_':     'CEN_REGION',
  'amgmed_':  'MED_REGION',
  'dg_':      'DG_REGION',
  'ca2_':     'CA2_REGION',
  'v1_L23a_': 'V1_L23A',
  'v1_L23b_': 'V1_L23B',
  'a1c_':     'A1C_REGION',
  'v2_L23a_': 'V2_L23A',
  'v2_L23b_': 'V2_L23B',
  'teo_':     'TEO_REGION',
  'te_anterior_': 'TE_ANT_REGION',
  's1f_':     'S1F_REGION',
  'mso_':     'MSO_REGION',
  'lso_':     'LSO_REGION',
  'v4rgb_':   'V4_RGB',
  'scs_':     'SC_SUP',
  'sci_':     'SC_INT',
  'scd_':     'SC_DEEP',
  'ob_':      'OB_REGION',
  'pir_':     'PIR_REGION',
  'vta_':     'VTA_REGION',
  'nacc_':    'NACC_REGION',
  'ins_':     'INS_REGION',
  'acc_':     'ACC_REGION',
};

/**
 * grown neuron 객체 (backend snapshot)을 NEURON_NODES와 동일 형식 노드로 변환.
 * 이름 형식 "v1_L4_E_10" 식으로 region/population/index 추출.
 * @param {object} n - { name, region, population } 등 backend neuron.
 * @param {number} stackOffset - 같은 column에서 grown 뉴런 stack 오프셋 (cell index).
 * @returns {object|null} { id, label, region, population, color, x, y }
 */
export function buildGrownNeuronNode(n, stackOffset = 0) {
  const name = n.name || '';
  // Session 42+ Tier2-D + Phase 20: HIPPO/PFC/AMG 노드 우선 처리.
  for (const prefix of Object.keys(HIPPO_PREFIX_TO_X_KEY)) {
    if (name.startsWith(prefix)) {
      const xKey = HIPPO_PREFIX_TO_X_KEY[prefix];
      const baseX = REGION_X[xKey];
      const idx = parseInt(name.slice(prefix.length), 10) || 0;
      const ROW_GAP = 70;
      const baseY = 200;
      let x = baseX;
      let y = baseY + idx * ROW_GAP;
      const saved = getNodePosition(name);
      if (saved && typeof saved.x === 'number' && typeof saved.y === 'number') {
        x = saved.x; y = saved.y;
      }
      // region/color 결정.
      let region, population, color;
      if (prefix === 'ca3_')      { region = 'HIPPO'; population = 'CA3_E';     color = '#fcd34d'; }
      else if (prefix === 'ca1_') { region = 'HIPPO'; population = 'CA1_E';     color = '#fb923c'; }
      else if (prefix === 'dg_')  { region = 'HIPPO'; population = 'DG_E';      color = '#fef08a'; }  // pale yellow (DG sparse)
      else if (prefix === 'place_'){ region = 'HIPPO'; population = 'PLACE_E';  color = '#34d399'; }  // mint (place cells)
      else if (prefix === 'grid_') { region = 'HIPPO'; population = 'GRID_E';   color = '#10b981'; }  // emerald (grid cells)
      else if (prefix === 'ec_ii_')  { region = 'EC'; population = 'EC_II_E';   color = '#fde68a'; }  // pale yellow (EC II)
      else if (prefix === 'ec_iii_') { region = 'EC'; population = 'EC_III_E';  color = '#fcd34d'; }  // amber (EC III)
      else if (prefix === 'ec_v_')   { region = 'EC'; population = 'EC_V_E';    color = '#f59e0b'; }  // dark amber (EC V)
      else if (prefix === 'pfc_l23_') { region = 'PFC'; population = 'PFC_L23_E'; color = '#a78bfa'; }
      else if (prefix === 'pfc_l5_')  { region = 'PFC'; population = 'PFC_L5_E';  color = '#7c3aed'; }
      else if (prefix === 'amg_')     { region = 'AMG'; population = 'AMG_E';     color = '#ef4444'; }
      else if (prefix === 'str_d1_')  { region = 'BG';  population = 'STR_D1_E';  color = '#22d3ee'; }  // cyan = Go
      else if (prefix === 'str_d2_')  { region = 'BG';  population = 'STR_D2_E';  color = '#fb7185'; }  // pink = NoGo
      else if (prefix === 'tail_str_'){ region = 'BG_TAIL'; population = 'TAIL_STR_E'; color = '#0ea5e9'; }  // sky blue (habit)
      else if (prefix === 'grc_')     { region = 'CRB'; population = 'GRC_E';     color = '#86efac'; }  // light green
      else if (prefix === 'pc_')      { region = 'CRB'; population = 'PC_I';      color = '#22c55e'; }  // green (Purkinje)
      else if (prefix === 'dcn_')     { region = 'CRB'; population = 'DCN_E';     color = '#15803d'; }  // dark green
      else if (prefix === 'io_')      { region = 'CRB'; population = 'IO_E';      color = '#f97316'; }  // orange (climbing fiber)
      else if (prefix === 'th_')      { region = 'THAL'; population = 'TH_E';     color = '#60a5fa'; }  // sky blue (TH relay)
      else if (prefix === 'trn_')     { region = 'THAL'; population = 'TRN_I';    color = '#1e40af'; }  // deep blue (TRN gate)
      else if (prefix === 'ast_')     { region = 'GLIA'; population = 'AST_GLIA'; color = '#a3a3a3'; }  // gray (astrocyte)
      else if (prefix === 'amn_')     { region = 'SPINAL'; population = 'AMN_E';  color = '#facc15'; }  // gold (alpha motor)
      else if (prefix === 'rc_')      { region = 'SPINAL'; population = 'RC_I';   color = '#ca8a04'; }  // dark gold (Renshaw)
      else if (prefix === 'lc_')      { region = 'LC';     population = 'LC_E';   color = '#c084fc'; }  // purple (Locus Coeruleus)
      else if (prefix === 'bf_')      { region = 'BF';     population = 'BF_E';   color = '#fbbf24'; }  // amber (Basal Forebrain)
      else if (prefix === 'raphe_')   { region = 'RAPHE';  population = 'RAPHE_E'; color = '#f472b6'; }  // pink (Raphe / 5-HT)
      else if (prefix === 'pag_')     { region = 'STEM';   population = 'PAG_E';   color = '#dc2626'; }  // red (PAG defensive)
      else if (prefix === 'pons_')    { region = 'STEM';   population = 'PONS_E';  color = '#9ca3af'; }  // gray (Pons relay)
      else if (prefix === 'hyp_')     { region = 'HYP';    population = 'HYP_E';   color = '#fb7185'; }  // rose (Hypothalamus)
      else if (prefix === 'vlpo_')    { region = 'SLEEP';  population = 'VLPO_I';  color = '#1e3a8a'; }  // navy (VLPO sleep)
      else if (prefix === 'rf_')      { region = 'RF';     population = 'RF_E';    color = '#525252'; }  // dark gray (Reticular Formation)
      else if (prefix === 'mpfc_')    { region = 'DMN';    population = 'mPFC_E';  color = '#fde68a'; }  // pale yellow (mPFC DMN)
      else if (prefix === 'pcc_')     { region = 'DMN';    population = 'PCC_E';   color = '#fbbf24'; }  // amber (PCC DMN)
      else if (prefix === 'ag_')      { region = 'DMN';    population = 'AG_E';    color = '#f59e0b'; }  // dark amber (AG DMN)
      else if (prefix === 'ai_')      { region = 'SN';     population = 'AI_E';    color = '#fdba74'; }  // light orange (AI)
      else if (prefix === 'dacc_')    { region = 'SN';     population = 'dACC_E';  color = '#fb923c'; }  // dark orange (dACC)
      else if (prefix === 'v4_l4_')   { region = 'V4';     population = 'V4_L4_E'; color = '#06b6d4'; }  // cyan (V4 L4)
      else if (prefix === 'v4_l5_')   { region = 'V4';     population = 'V4_L5_E'; color = '#0891b2'; }  // dark cyan (V4 L5)
      else if (prefix === 'it_l4_')   { region = 'IT';     population = 'IT_L4_E'; color = '#a855f7'; }  // purple (IT L4)
      else if (prefix === 'it_l5_')   { region = 'IT';     population = 'IT_L5_E'; color = '#7e22ce'; }  // dark purple (IT L5)
      else if (prefix === 'v4_color_'){ region = 'V4';     population = 'V4_COLOR_E'; color = '#f43f5e'; }  // crimson (chromatic)
      else if (prefix === 'v3_')      { region = 'V3';     population = 'V3_E';    color = '#34d399'; }  // mint green (V3)
      else if (prefix === 'mt_')      { region = 'MT';     population = 'MT_E';    color = '#10b981'; }  // emerald (MT/V5)
      else if (prefix === 'ppc_')     { region = 'PPC';    population = 'PPC_E';   color = '#059669'; }  // dark emerald (PPC)
      else if (prefix === 'ipl_')     { region = 'MNS';    population = 'IPL_E';   color = '#a3e635'; }  // lime (IPL)
      else if (prefix === 'f5_')      { region = 'MNS';    population = 'F5_E';    color = '#65a30d'; }  // dark lime (F5)
      else if (prefix === 'tpj_')     { region = 'TPJ';    population = 'TPJ_E';   color = '#fb7185'; }  // rose pink (TPJ)
      else if (prefix === 'fef_')     { region = 'FEF';    population = 'FEF_E';   color = '#a78bfa'; }  // violet (FEF)
      else if (prefix === 'wern_')    { region = 'LANG';   population = 'WERN_E';  color = '#0891b2'; }  // dark cyan (Wernicke)
      else if (prefix === 'broca_')   { region = 'LANG';   population = 'BROCA_E'; color = '#06b6d4'; }  // cyan (Broca)
      else if (prefix === 'a1_')      { region = 'AUD';    population = 'A1_E';    color = '#fde68a'; }  // pale yellow (A1)
      else if (prefix === 'a2_')      { region = 'AUD';    population = 'A2_E';    color = '#fbbf24'; }  // amber (A2)
      else if (prefix === 's1_')      { region = 'S1';     population = 'S1_E';    color = '#f0abfc'; }  // pink-purple (S1)
      else if (prefix === 'm1_')      { region = 'M1';     population = 'M1_E';    color = '#dc2626'; }  // red (M1)
      else if (prefix === 'cun_')     { region = 'CUNEUS'; population = 'CUN_E';   color = '#7dd3fc'; }  // sky blue (Cuneus, dorsal)
      else if (prefix === 'lin_')     { region = 'LINGUAL';population = 'LIN_E';   color = '#fdba74'; }  // peach (Lingual, ventral)
      else if (prefix === 'lgn_')     { region = 'LGN';    population = 'LGN_E';   color = '#facc15'; }  // gold yellow (LGN, retinal relay)
      else if (prefix === 'pul_')     { region = 'PULVINAR';population= 'PUL_E';   color = '#a78bfa'; }  // light violet (Pulvinar, attention)
      else if (prefix === 'stn_')     { region = 'STN';    population = 'STN_E';   color = '#f43f5e'; }  // crimson (STN, NoGo hyperdirect)
      else if (prefix === 'hb_')      { region = 'HABENULA';population= 'HB_E';    color = '#71717a'; }  // dark gray (Habenula, anti-reward)
      else if (prefix === 'sc_')      { region = 'SC';     population = 'SC_E';    color = '#f97316'; }  // orange (Superior Colliculus)
      else if (prefix === 'ofc_')     { region = 'OFC';    population = 'OFC_E';   color = '#fde68a'; }  // pale gold (OFC, value)
      else if (prefix === 'snc_')     { region = 'SNc';    population = 'SNc_DA';  color = '#be185d'; }  // dark pink-red (SNc, nigrostriatal DA)
      else if (prefix === 'atn_')     { region = 'ATN';    population = 'ATN_E';   color = '#f0fdf4'; }  // pale green (ATN, Papez relay)
      else if (prefix === 'mb_')      { region = 'MB';     population = 'MB_E';    color = '#bbf7d0'; }  // mint (MB, Papez circuit)
      else if (prefix === 'caud_')    { region = 'CAUD';   population = 'CAUD_E';  color = '#fef08a'; }  // pale yellow (Caudate, cognitive)
      else if (prefix === 'put_')     { region = 'PUT';    population = 'PUT_E';   color = '#fcd34d'; }  // amber (Putamen, motor)
      else if (prefix === 'gpe_')     { region = 'GPe';    population = 'GPe_I';   color = '#737373'; }  // gray (GPe, indirect)
      else if (prefix === 'gpi_')     { region = 'GPi';    population = 'GPi_I';   color = '#525252'; }  // dark gray (GPi, BG output)
      else if (prefix === 'cbverm_')  { region = 'CRB_VERM';population= 'VERM_E';  color = '#f97316'; }  // orange (Vermis)
      else if (prefix === 'cbhemi_')  { region = 'CRB_HEMI';population= 'HEMI_E';  color = '#fb923c'; }  // light orange (Hemisphere)
      else if (prefix === 'cbfloc_')  { region = 'CRB_FLOC';population= 'FLOC_E';  color = '#fdba74'; }  // peach (Flocculus)
      else if (prefix === 'rsc_')     { region = 'RSC';    population = 'RSC_E';   color = '#5eead4'; }  // teal (RSC, spatial DMN)
      else if (prefix === 'presma_')  { region = 'preSMA'; population = 'preSMA_E';color = '#fda4af'; }  // light coral (preSMA)
      else if (prefix === 'sma_')     { region = 'SMA';    population = 'SMA_E';   color = '#fb7185'; }  // rose (SMA)
      else if (prefix === 'pmd_')     { region = 'PMd';    population = 'PMd_E';   color = '#fcd34d'; }  // gold (PMd dorsal)
      else if (prefix === 'pmv_')     { region = 'PMv';    population = 'PMv_E';   color = '#fbbf24'; }  // amber (PMv ventral)
      else if (prefix === 'subic_')   { region = 'SUBIC';  population = 'SUBIC_E'; color = '#86efac'; }  // light green (Subiculum)
      else if (prefix === 'phc_')     { region = 'PHC';    population = 'PHC_E';   color = '#a3e635'; }  // lime green (Parahippocampal)
      else if (prefix === 'prc_')     { region = 'PRC';    population = 'PRC_E';   color = '#65a30d'; }  // olive (Perirhinal)
      else if (prefix === 'ai_')      { region = 'AI';     population = 'AI_E';    color = '#c084fc'; }  // light purple (Anterior Insula)
      else if (prefix === 'pi_')      { region = 'PI';     population = 'PI_E';    color = '#a855f7'; }  // dark purple (Posterior Insula)
      else if (prefix === 'ot_')      { region = 'OT';     population = 'OT_E';    color = '#e9d5ff'; }  // pale lilac (Olfactory Tubercle)
      else if (prefix === 'bnst_')    { region = 'BNST';   population = 'BNST_E';  color = '#9d174d'; }  // wine (BNST extended amygdala)
      else if (prefix === 'dlpfc_')   { region = 'dlPFC';  population = 'dlPFC_E'; color = '#fef3c7'; }  // pale beige (dlPFC cognitive)
      else if (prefix === 'vmpfc_')   { region = 'vmPFC';  population = 'vmPFC_E'; color = '#fed7aa'; }  // peach orange (vmPFC valuation)
      else if (prefix === 'dacc_')    { region = 'dACC';   population = 'dACC_E';  color = '#bef264'; }  // lime (dACC cognitive)
      else if (prefix === 'vacc_')    { region = 'vACC';   population = 'vACC_E';  color = '#fdba74'; }  // soft orange (vACC affective)
      else if (prefix === 'bla_')     { region = 'AMG_BLA';population = 'BLA_E';   color = '#fb923c'; }  // orange (BLA, sensory association)
      else if (prefix === 'cen_')     { region = 'AMG_CEN';population = 'CEN_E';   color = '#ea580c'; }  // dark orange (CEN, autonomic output)
      else if (prefix === 'amgmed_')  { region = 'AMG_MED';population = 'MED_E';   color = '#fdba74'; }  // peach (Medial AMG, social)
      else if (prefix === 'dg_')      { region = 'HIPPO';  population = 'DG_E';    color = '#22c55e'; }  // green (DG, pattern separation)
      else if (prefix === 'ca2_')     { region = 'HIPPO';  population = 'CA2_E';   color = '#16a34a'; }  // dark green (CA2, social memory)
      else if (prefix === 'v1_L23a_') { region = 'V1';     population = 'L23a_E';  color = '#22d3ee'; }  // bright cyan (V1 L2/3a feedforward)
      else if (prefix === 'v1_L23b_') { region = 'V1';     population = 'L23b_E';  color = '#0891b2'; }  // dark cyan (V1 L2/3b recurrent)
      else if (prefix === 'a1c_')     { region = 'A1';     population = 'A1_C';    color = '#facc15'; }  // gold (A1 tonotopic columns)
      else if (prefix === 'v2_L23a_') { region = 'V2';     population = 'L23a_E';  color = '#c4b5fd'; }  // light violet (V2 L23a FF)
      else if (prefix === 'v2_L23b_') { region = 'V2';     population = 'L23b_E';  color = '#7c3aed'; }  // dark violet (V2 L23b recur)
      else if (prefix === 'teo_')     { region = 'IT';     population = 'TEO_E';   color = '#0e7490'; }  // teal (TEO posterior)
      else if (prefix === 'te_anterior_') { region = 'IT'; population = 'TE_E';    color = '#0891b2'; }  // dark teal (TE anterior)
      else if (prefix === 's1f_')     { region = 'S1';     population = 'S1_F';    color = '#e879f9'; }  // fuchsia pink (S1 finger map)
      else if (prefix === 'mso_')     { region = 'STEM';   population = 'MSO_ITD'; color = '#fef9c3'; }  // pale yellow (MSO ITD)
      else if (prefix === 'lso_')     { region = 'STEM';   population = 'LSO_ILD'; color = '#fde047'; }  // yellow (LSO ILD)
      else if (prefix === 'v4rgb_R_') { region = 'V4';     population = 'V4_R';    color = '#ef4444'; }  // red
      else if (prefix === 'v4rgb_G_') { region = 'V4';     population = 'V4_G';    color = '#22c55e'; }  // green
      else if (prefix === 'v4rgb_B_') { region = 'V4';     population = 'V4_B';    color = '#3b82f6'; }  // blue
      else if (prefix === 'v4rgb_')   { region = 'V4';     population = 'V4_RGB';  color = '#a855f7'; }  // fallback
      else if (prefix === 'scs_')     { region = 'SC';     population = 'SC_sup';  color = '#fbbf24'; }  // amber (SC superficial)
      else if (prefix === 'sci_')     { region = 'SC';     population = 'SC_int';  color = '#f97316'; }  // orange (SC intermediate)
      else if (prefix === 'scd_')     { region = 'SC';     population = 'SC_deep'; color = '#dc2626'; }  // red (SC deep)
      else if (prefix === 'ob_')      { region = 'OLF';    population = 'OB_E';    color = '#bef264'; }  // lime (OB)
      else if (prefix === 'pir_')     { region = 'OLF';    population = 'PIR_E';   color = '#84cc16'; }  // dark lime (Piriform)
      else if (prefix === 'vta_')     { region = 'REWARD'; population = 'VTA_DA';  color = '#ec4899'; }  // hot pink (VTA DA)
      else if (prefix === 'nacc_')    { region = 'REWARD'; population = 'NACC_E';  color = '#db2777'; }  // dark pink (NAcc)
      else if (prefix === 'ins_')     { region = 'INS';    population = 'INS_E';   color = '#fb923c'; }  // orange (Insula)
      else if (prefix === 'acc_')     { region = 'ACC';    population = 'ACC_E';   color = '#e879f9'; }  // fuchsia (ACC)
      else continue;
      return { id: name, label: name, region, population, color, x, y };
    }
  }
  // 이름 prefix 매칭.
  let popKey = null;
  for (const k of Object.keys(POP_TO_REGION_X_KEY)) {
    if (name.startsWith(k + '_')) { popKey = k; break; }
  }
  if (!popKey) return null;
  const xKey = POP_TO_REGION_X_KEY[popKey];
  const baseX = REGION_X[xKey];
  if (baseX === undefined) return null;
  // 2D grid layout: per_col=8 (column당 최대 8 행), 그 다음 옆 column으로 wrap.
  // x: base_x + col * 90 (column 간격), y: base_y + row * 90 (row 간격).
  const PER_COL = 8;
  const COL_GAP = 90;
  const ROW_GAP = 90;
  const baseY = 1080;
  const col = Math.floor(stackOffset / PER_COL);
  const row = stackOffset % PER_COL;
  let x = baseX + col * COL_GAP;
  let y = baseY + row * ROW_GAP;
  // Session 39: 저장된 위치 우선.
  const saved = getNodePosition(name);
  if (saved && typeof saved.x === 'number' && typeof saved.y === 'number') {
    x = saved.x; y = saved.y;
  }
  const colorMap = { V1: '#4dd0e1', V2: '#b794f4' };
  return {
    id: name,
    label: name.replace(/^v\d+_/, '').replace(/_/g, ''),
    region: n.region || 'V1',
    population: popKey.split('_').slice(1).join('_'),
    color: colorMap[n.region] || '#94a3b8',
    x,
    y,
  };
}

// Synapse weight gradient color mapping (3A spec).
//   inhibitory (w<0): red       — V1 L4_I → V1 L4_E (w=-48)
//   weak (0~50):      cyan      — V1 L4_E → V1 L23_E (w=40)
//   mid (50~100):     yellow    — INPUT→V1 (w=64), V2 L4_E→L23_E (w=80), V2 L23_E→L5_E (w=80), V2 L5_E→OUT (w=64)
//   strong (>=100):   purple    — V1 L23_E → V2 L4_E (w=160)
export function weightColor(weight) {
  if (weight < 0)   return '#e76f6f';
  if (weight < 50)  return '#4dd0e1';
  if (weight < 100) return '#f5b842';
  return '#b794f4';
}
