# Brain Builder — Region 별 학습 가이드

> 출퇴근 중 모바일에서 읽기 좋게 정리. 각 region 마다 **버튼 / 신경과학 함수 / canonical paper / 회로 위치** 를 한 번에 정리.
> Bio-SNN AI framework (handface + neuronface) 의 Phase 14-200 누적 추가 region 약 80 개 + canonical 8 개.

## 노드맵 적용 현황 (현 시점)

- **Canvas (drawflow) 기본 노드**: INPUT (8) / V1 (20) / V2 (20) / OUT (4) — 총 52 canonical 뉴런만 *시작 시* 표시.
- **Phase 14+ 의 모든 추가 region**: 사용자가 Brain Builder dialog 에서 직접 빌드 클릭 → backend POST → snapshot 동기화 → canvas grown node 로 등장.
- 즉 **현재 노드맵의 default 표시는 canonical 만** 이고, 90+ region 은 *on-demand* 빌드.
- **REGION_X coord + prefix → region 매핑**은 모두 정의되어 있어 빌드 시 즉시 정확한 위치에 grow 됨.

---

## 1. 🧠 Core Regions (canonical)

### Hippocampus (P15) — 🟡 Hippocampus
- **Function**: episodic memory, pattern completion (CA3 recurrent), context retrieval (CA1)
- **Method**: `add_hippocampus(ca3_size, ca1_size, recurrent_density)`
- **Pathway**: V2 L5 → CA3 (sparse 30%) → CA3 recurrent (25%) → CA1 → OUT
- **Papers**:
  - Marr 1971 — *Simple memory: a theory for archicortex*
  - O'Keefe & Nadel 1978 — *The hippocampus as a cognitive map*
  - Treves & Rolls 1994 — *Computational analysis of role of hippocampus in memory*

### PFC (P20) — 🟣 Working memory
- **Function**: working memory, task switching, recurrent maintenance
- **Method**: `add_prefrontal_cortex(l23_size, l5_size, recurrent_density)`
- **Pathway**: PFC L23 ↔ L5 recurrent + V2/HIPPO 입력
- **Papers**:
  - Goldman-Rakic 1995 — *Cellular basis of working memory*
  - Funahashi 1989 — *Mnemonic coding of visual space in the monkey's DLPFC*
  - Miller & Cohen 2001 — *Integrative theory of prefrontal cortex function*

### Amygdala (P3) — 🔴 Emotional gate
- **Function**: emotional valence, fear conditioning, reward-association
- **Method**: `add_amygdala(size)` + AMG split (P83) → BLA / CEN / Med
- **Papers**:
  - LeDoux 2000 — *Emotion circuits in the brain*
  - Janak & Tye 2015 — *From circuits to behaviour in the amygdala*
  - Tovote 2015 — *Neuronal circuits for fear and anxiety*

### Basal Ganglia (P21) — 🔵 D1 Go / D2 NoGo
- **Function**: action selection, reinforcement learning, motor gating
- **Method**: `add_basal_ganglia(d1_size, d2_size)` → P69 Caudate/Putamen split → P70 GPe/GPi split → P61 STN
- **Pathway**: PFC → STR_D1 (Go) ⊣ GPi ⊣ TH ‖ STR_D2 (NoGo) ⊣ GPe ⊣ STN ⊣ GPi
- **Papers**:
  - Albin 1989 — *Functional anatomy of basal ganglia disorders* (direct/indirect)
  - DeLong 1990 — *Primate models of movement disorders of basal ganglia origin*
  - Mink 1996 — *The basal ganglia: focused selection and inhibition*
  - Alexander, DeLong & Strick 1986 — *Parallel organization of functionally segregated circuits*
  - Frank 2007 — *Hold your horses: a dynamic computational role for the STN*

### Cerebellum (P22) — 🟢 GRC + PC + DCN
- **Function**: motor prediction, timing, error-driven learning
- **Method**: `add_cerebellum()` → P71 lobule split (vermis/hemisphere/flocculus)
- **Pathway**: V1 → GRC (sparse mossy fiber) → PC (parallel fiber, plastic) → DCN → TH/M1
- **Papers**:
  - Marr 1969 — *A theory of cerebellar cortex*
  - Schmahmann 2000 — *The cerebellar cognitive affective syndrome*
  - Stoodley & Schmahmann 2009 — *Functional topography in the human cerebellum*
  - Buckner 2013 — *The cerebellum and cognitive function*

### Thalamus (P23) — 🔷 TH relay + TRN gate
- **Function**: cortical relay, attention gating
- **Method**: `add_thalamus(th_size, trn_size)`
- **Papers**:
  - Sherman 2007 — *The thalamus is more than just a relay*
  - Saalmann 2012 — *The pulvinar regulates information transmission*

### Spinal Motor (P27) — 🦾 AMN + Renshaw
- **Function**: final common motor output, reflex inhibition
- **Method**: `add_spinal_motor()`
- **Pathway**: M1 → AMN (alpha motor neuron) ↔ Renshaw cells (recurrent inhibition)

### Brainstem (P39) — 🟥 PAG + Pons
- **Function**: autonomic, fight-flight, freezing
- **Method**: `add_brainstem()`
- **Pathway**: AMG → PAG → LC/AMN ‖ Pons → Cerebellum

### Hypothalamus (P40) — 🌡 HPA + autonomic
- **Function**: stress response, homeostasis, hormone
- **Papers**:
  - Saper & Lowell 2014 — *The hypothalamus*
  - Herman & Cullinan 1997 — *Neurocircuitry of stress: PVN central role*

---

## 2. 👁 Sensory & Visual Streams

### LGN (P62) — 🌟 Retina → V1 relay
- **Function**: thalamic visual relay (M/P pathway)
- **Method**: `add_lgn(size=10)`
- **Pathway**: visual INPUT (pinch/fist/palm/point/gaze/blink) → LGN → V1 L4
- **Papers**:
  - Hubel & Wiesel 1961 — *Integrative action in the cat's lateral geniculate body*
  - Casagrande 1994 — *A third parallel visual pathway to primate V1*

### Pulvinar (P60) — 🎯 Attention relay
- **Function**: cortico-pulvino-cortical attention loop, gain modulation
- **Pathway**: V1/V2/MT → PUL → V4/IT/PPC
- **Papers**:
  - Saalmann 2012 — *The pulvinar regulates information transmission*
  - Kaas & Lyon 2007 — *Pulvinar contributions to dorsal/ventral streams*

### Ventral Stream (P31) — 🔵 V4 + IT (what)
- **Function**: object recognition, form
- **Pathway**: V2 → V4 → IT
- **Papers**:
  - Mishkin & Ungerleider 1982 — *Two cortical visual systems*
  - Tanaka 1996 — *Inferotemporal cortex and object vision*

### Dorsal Stream (P32) — 🟢 V3 + MT + PPC (where)
- **Function**: motion, spatial location, action guidance
- **Pathway**: V1 → V3 → MT → PPC

### Cuneus + Lingual Gyrus (P59) — 🌅 Extra-striate
- **Function**: dorsal/ventral retinotopic split (calcarine sulcus 위/아래)
- **Pathway**: V1 L5 → CUN → V3/MT (dorsal upper field) ‖ V1 L5 → LIN → V4 (ventral lower field)
- **Papers**:
  - Vanni 2001 — *Coinciding early activation of the human primary visual cortex*
  - Hadjikhani 1998 — *Retinotopy and color sensitivity in human visual cortex*

### V4 Color (P55) — 🎨 Chromatic
- **Pathway**: V1 L4 → V4_COLOR → V4_L5 + IT L4
- **Papers**:
  - Zeki 1973 — *Color coding in rhesus monkey prestriate cortex*
  - Conway 2003 — *Spatial structure of cone inputs to color cells in V1*
  - Lafer-Sousa 2016 — *Parallel, multi-stage processing of colors, faces and shapes*

### V4 RGB Columns (P163) — 🌈 R/G/B selectivity
- **Pathway**: V1 L4 modulo 3 → V4_R/G/B → V4_L5 + IT

### FEF (P54) — 👀 Saccade / attention
- **Function**: top-down attention, saccade planning
- **Pathway**: PPC + V2 L5 → FEF → V1 L4 / V2 L23 (top-down) + AMN (saccade)
- **Papers**:
  - Bruce & Goldberg 1985 — *Primate frontal eye fields*
  - Schall 2002 — *The neural selection and control of saccades*
  - Moore & Armstrong 2003 — *Selective gating of visual signals by FEF microstimulation*

### SC — Superior Colliculus (P64 + P164 layered) — 👁 Orienting / saccade
- **Function**: orienting reflex, saccade trigger
- **Layers (P164)**: superficial (visual, V1 → SCs) → intermediate (multimodal, FEF + SCs → SCi) → deep (motor, → AMN)
- **Papers**:
  - Wurtz & Albano 1980 — *Visual-motor function of the primate superior colliculus*
  - Sparks 1986 — *Translation of sensory signals into commands for control of saccades*

### Auditory Cortex (P33) — 🔉 A1 + A2 + tonotopic columns (P137)
- **Pathway**: audio INPUT → A1 (tonotopic columns) → A2
- **Papers**:
  - Schreiner & Winer 2007 — *Auditory cortex mapmaking: principles, projections*
  - Bandyopadhyay 2010 — *Dichotomy of functional organization in mouse auditory cortex*

### Auditory Localization (P156) — 📡 MSO ITD + LSO ILD
- **Function**: binaural sound source localization
- **Pathway**: 2 ear INPUT → MSO (ITD coincidence) + LSO (ILD: ipsi+, contra−) → A1
- **Papers**:
  - Jeffress 1948 — *A place theory of sound localization*
  - Carr & Konishi 1990 — *Circuitry for detecting interaural time differences*

### Olfactory (P37) — 🌿 OB + Piriform → limbic
- **Pathway**: smell INPUT → OB → Piriform → AMG/HIPPO

### S1 Somatosensory (P56) — ✋ Tactile + Finger map (P151)
- **Function**: tactile, proprioceptive, body schema
- **Pathway**: tactile INPUT → S1 → V2 (cross-modal) + AMN (reflex) + INS (interoception)
- **Papers**:
  - Penfield & Boldrey 1937 — *Somatic motor and sensory representation* (homunculus)
  - Mountcastle 1957 — *Modality and topographic properties of single neurons*
  - Romo & Salinas 2003 — *Flutter discrimination: neural codes*

### V1 L2/3 split (P136) — 🔬 L23a feedforward + L23b recurrent
- **L23a**: V1 L4 → L23a → V2 (long-distance feedforward)
- **L23b**: V1 L4 → L23b ↺ recurrent (intra-V1 horizontal)
- **Papers**:
  - Markov 2014 — *Cortical high-density counterstream architectures*
  - Petreanu 2009 — *Subcellular organization of intracortical connections*

### V2 L2/3 split (P142) — same pattern as P136

### IT subdivision (P143) — 🎨 TEO + TE
- **Pathway**: V4 → TEO (posterior, low-level) → TE (anterior, complex) → PRC
- **Papers**:
  - Tanaka 1996 — *Inferotemporal cortex and object vision*
  - Kobatake & Tanaka 1994 — *Neuronal selectivities to complex object features*

### V1 lateral connections (P169) — ↔ L23 horizontal
- **Function**: orientation-tuned co-firing 강화
- **Papers**:
  - Bosking 1997 — *Orientation selectivity and the arrangement of horizontal connections*
  - Stettler 2002 — *Lateral connectivity and contextual interactions in macaque V1*

---

## 3. 🧬 Memory (MTL + Papez)

### Hippocampus DG + CA2 (P84) — 🌱 Pattern separation + Social memory
- **DG**: EC → DG (sparse 10% perforant path) → CA3 (mossy fibers, pattern separation)
- **CA2**: EC → CA2 → CA1 (social memory pathway, parallel to CA3→CA1)
- **Papers**:
  - Treves & Rolls 1994 — *Computational analysis of role of hippocampus*
  - Yassa & Stark 2011 — *Pattern separation in the hippocampus*
  - Hitti & Siegelbaum 2014 — *The hippocampal CA2 region is essential for social memory*

### Subiculum (P75) — 🏛 HIPPO output
- **Pathway**: CA1 → SUBIC → MB / ATN / NAcc / EC
- **Papers**:
  - O'Mara 2005 — *The subiculum: what it does, what it might do*
  - Aggleton 2012 — *The subiculum: cognitive map or relay station?*
  - Naber 2001 — *Reciprocal connections between the entorhinal cortex and hippocampal formation*

### PHC — Parahippocampal Cortex (P76) — 🏞 Scene context
- **Pathway**: PPC + V4 + RSC → PHC → EC (scene info → HIPPO)
- **Papers**:
  - Aminoff 2007 — *The parahippocampal cortex*
  - Epstein & Kanwisher 1998 — *A cortical representation of the local visual environment* (PPA)

### PRC — Perirhinal Cortex (P77) — 🎭 Object familiarity
- **Pathway**: IT → PRC → EC (recollection vs familiarity 분리)
- **Papers**:
  - Brown & Aggleton 2001 — *Recognition memory: what are the roles of perirhinal cortex and hippocampus?*
  - Murray & Bussey 1999 — *Perceptual–mnemonic functions of the perirhinal cortex*
  - Eichenbaum 2007 — *The medial temporal lobe and recognition memory*

### MB — Mammillary Bodies (P68) — 🧬 Papez junction
- **Pathway**: HIPPO CA1 → MB → ATN (mammillothalamic tract)
- **Papers**:
  - Aggleton & Brown 1999 — *Episodic memory, amnesia, and the hippocampal–anterior thalamic axis*
  - Vann 2010 — *The mammillary bodies: two memory systems in one?*
  - Dillingham 2015 — *How do mammillary body inputs contribute to anterior thalamic function?*

### ATN — Anterior Thalamic Nucleus (P67) — 🔁 Papez relay
- **Pathway**: MB → ATN → ACC/PCC/CA1
- **Papers**:
  - Aggleton 1986 — *A description of the amygdalo–hippocampal interconnections*
  - Jankowski 2013 — *The anterior thalamus provides a subcortical circuit*

### Cingulate-Hippocampal binding (P58) — 🔗 Context binding
- **Pathway**: ACC ↔ CA1 + ACC → CA3 (entorhinal-like)
- **Papers**:
  - Aggleton 2014 — *The contribution of the anterior thalamic nuclei to memory*
  - Bubb et al. 2017 — *Hippocampal-diencephalic-cingulate networks*
  - Rolls 2015 — *Limbic systems for emotion and for memory*

### EC — Entorhinal Cortex (P52) — gateway, grid cells (P53)

---

## 4. 💗 Reward & Dopamine

### Reward Circuit (P34) — 💗 VTA + NAcc (mesolimbic DA)
- **Pathway**: VTA (DA neurons) → NAcc (medium spiny neurons)
- **Papers**:
  - Wise 2004 — *Dopamine, learning and motivation*
  - Schultz 1998 — *Predictive reward signal of dopamine neurons*

### SNc (P66) — ⚡ Nigrostriatal DA
- **Function**: motor learning DA (VTA mesolimbic 와 구별)
- **Pathway**: AMG + PFC L5 → SNc → STR_D1 (+) / STR_D2 (−)
- **Papers**:
  - Schultz 1998 (위와 동일)
  - Bjorklund & Dunnett 2007 — *Dopamine neuron systems in the brain: an update*
  - Lerner 2015 — *Intact-brain analyses reveal distinct information carried by SNc dopamine subcircuits*

### Habenula (P63) — ⛈ Anti-reward (negative RPE)
- **Pathway**: PFC + AMG → Hb ⊣ VTA + → Raphe (5-HT)
- **Papers**:
  - Matsumoto & Hikosaka 2007 — *Lateral habenula as a source of negative reward signals*
  - Hikosaka 2010 — *The habenula: from stress evasion to value-based decision-making*
  - Proulx 2014 — *Reward processing by the lateral habenula in normal and depressive behaviors*

### OFC — Orbitofrontal Cortex (P65) — 💰 Economic value
- **Pathway**: AMG + INS → OFC → STR_D1 + PFC L23
- **Papers**:
  - Padoa-Schioppa 2006 — *Neurons in the orbitofrontal cortex encode economic value*
  - Wallis 2007 — *Orbitofrontal cortex and its contribution to decision-making*
  - Rich & Wallis 2016 — *Decoding subjective decisions from orbitofrontal cortex*

### OT — Olfactory Tubercle (P79) — 🍬 Olfactory→reward
- **Pathway**: Piriform → OT → NAcc / VTA / STR_D1
- **Papers**:
  - Wesson & Wilson 2011 — *Sniffing out the olfactory tubercle*
  - Ikemoto 2007 — *Dopamine reward circuitry: two projection systems*

---

## 5. 🌀 Limbic & Salience

### ACC (P36) — 🟪 Conflict monitor
- **Pathway**: PFC + INS + AMG → ACC → STR_D1 + VTA
- **dACC + vACC split (P82)**: dACC (cognitive control, → STR), vACC (affect/pain, AMG/INS → → mPFC)
- **Papers**:
  - Bush 2000 — *Cognitive and emotional influences in anterior cingulate cortex*
  - Etkin 2011 — *Emotional processing in anterior cingulate and medial prefrontal cortex*
  - Shackman 2011 — *The integration of negative affect, pain and cognitive control*

### Insula (P35) — 🟠 Interoception
- **AI + PI split (P78)**: AI (salience, S1/A1/V1 → AI → ACC), PI (visceral, HYP/AMG → PI → S1)
- **Papers**:
  - Craig 2002, 2009 — *How do you feel? / How do you feel — now? The anterior insula*
  - Menon & Uddin 2010 — *Saliency, switching, attention and control: a network model of insula function*
  - Nieuwenhuys 2012 — *The insular cortex: a review*

### AMG split (P83) — ⚡ BLA + CEN + Med
- **BLA**: V1 + A1 + AMG → BLA → PFC + CA1 (sensory association/learning)
- **CEN**: BLA → CEN → PAG/HYP (autonomic fear output)
- **Med**: PIR → Med → BNST (olfactory/social)
- **Papers**:
  - LeDoux 2000 — *Emotion circuits in the brain*
  - Janak & Tye 2015 — *From circuits to behaviour in the amygdala*
  - Tovote 2015 — *Neuronal circuits for fear and anxiety*

### BNST (P80) — 😨 Sustained anxiety
- **Function**: phasic AMG vs sustained BNST anxiety 분리 (extended amygdala)
- **Pathway**: AMG → BNST → HYP (HPA) + PAG
- **Papers**:
  - Walker & Davis 2008 — *Role of the bed nucleus of the stria terminalis*
  - Lebow & Chen 2016 — *Overshadowed by the amygdala: the bed nucleus of the stria terminalis*
  - Avery 2016 — *The human BNST: a review*

### Salience Network (P38) — 🚦 AI + dACC switch (DMN ↔ CEN)
- **Papers**:
  - Menon 2011 — *Large-scale brain networks and psychopathology*
  - Sridharan 2008 — *A critical role for the right fronto-insular cortex in switching between networks*

### Mirror Neurons (P45) — 🪞 F5 + IPL
- **Function**: action understanding, imitation
- **Papers**:
  - Rizzolatti 2001 — *Neurophysiological mechanisms underlying the understanding of action*
  - Iacoboni 2009 — *Imitation, empathy, and mirror neurons*

### TPJ (P46) — 👁 Theory of mind
- **Papers**:
  - Saxe & Kanwisher 2003 — *People thinking about thinking people: the role of the TPJ*

---

## 6. 🎯 Cognitive Control & DMN

### dlPFC + vmPFC split (P81) — 🧭 Cognitive vs Valuation
- **dlPFC**: PPC + PFC L5 → dlPFC → SMA/Caud (working memory + cognitive control)
- **vmPFC**: OFC + AMG → vmPFC → NAcc (subjective value)
- **Papers**:
  - Miller & Cohen 2001 — *Integrative theory of prefrontal cortex function*
  - Bechara 2005 — *Decision making, impulse control and loss of willpower*
  - Hare 2009 — *Self-control in decision-making involves modulation of vmPFC valuation*

### DMN (P19) — 🌅 mPFC + PCC + AG
- **Function**: rest state, self-referential processing
- **Pathway**: mPFC ↔ PCC ↔ AG mutual recurrent + HIPPO 양방향
- **Papers**:
  - Raichle 2001 — *A default mode of brain function*
  - Buckner 2008 — *The brain's default network: anatomy, function, and relevance to disease*

### RSC — Retrosplenial Cortex (P72) — 🗺 Spatial DMN
- **Pathway**: HIPPO CA1 + PPC → RSC → PCC + mPFC
- **Papers**:
  - Vann 2009 — *What does the retrosplenial cortex do?*
  - Mitchell 2018 — *Retrosplenial cortex and its role in spatial cognition*
  - Maguire 2014 — *The retrosplenial contribution to human navigation*

### Language (P49) — 🗣 Broca + Wernicke
- **Pathway**: A2 → Wernicke (comprehension) → Broca (motor speech) → AMN (vocal)

---

## 7. 🤲 Motor & BG Circuits

### M1 (P57) — 💪 Primary Motor (precentral gyrus)
- **Pathway**: PFC L5 (cognitive plan) + S1 (sensory feedback) + DCN (cerebellum prediction) + STR_D1 (BG go) → M1 → AMN (corticospinal final motor)
- **Papers**:
  - Penfield & Boldrey 1937 — *Somatic motor and sensory representation* (homunculus)
  - Evarts 1968 — *Relation of pyramidal tract activity to force exerted during voluntary movement*
  - Graziano 2006 — *The organization of behavioral repertoire in motor cortex*

### SMA + pre-SMA (P73) — 📋 Action sequencing (self-initiated)
- **Pathway**: PFC L5 → preSMA → SMA → M1 + STR_D1
- **Papers**:
  - Tanji & Shima 1994 — *Role for supplementary motor area cells in planning several movements ahead*
  - Nachev 2008 — *Functional role of the supplementary and pre-supplementary motor areas*
  - Akkal 2007 — *Supplementary motor area and presupplementary motor area*

### Premotor (P74) — 🤲 PMd reach + PMv grasp
- **PMd**: PFC + PPC → PMd (target reaching)
- **PMv**: PFC + IPL → PMv (grasping/mirror)
- **Papers**:
  - Rizzolatti 2001 (위와 동일)
  - Cisek & Kalaska 2010 — *Neural mechanisms for interacting with a world full of action choices*
  - Kalaska 2009 — *From intention to action: motor cortex and the control of reaching movements*

### Caudate + Putamen split (P69) — 🧠 Cognitive vs Motor STR
- **Caud**: PFC L5 → CAUD → GPi (cognitive loop)
- **Put**: M1 + S1 → PUT → GPi (motor loop)
- **Papers**:
  - Alexander, DeLong & Strick 1986 (위와 동일)
  - Haber 2003 — *The primate basal ganglia: parallel and integrative networks*
  - Voorn 2004 — *Putting a spin on the dorsal-ventral divide of the striatum*

### GPe + GPi (P70) — ⚙ BG output
- **STR_D1 ⊣ GPi** (direct Go), **STR_D2 ⊣ GPe ⊣ STN/GPi** (indirect NoGo), **GPi ⊣ TH** (BG gating)
- **Papers**:
  - Albin 1989 / DeLong 1990 / Mink 1996 (위와 동일)

### STN — Subthalamic Nucleus (P61) — 🛑 Hyperdirect NoGo
- **Pathway**: PFC L5 + M1 → STN → STR_D2 (excitatory drive to indirect pathway)
- **Papers**:
  - Nambu 2002 — *Functional significance of the cortico-subthalamo-pallidal hyperdirect pathway*
  - Aron & Poldrack 2006 — *Cortical and subcortical contributions to stop signal response inhibition*
  - Bogacz 2007 — *The basal ganglia and cortex implement optimal decision making*

### Cerebellar lobules (P71) — 🍊 Vermis / Hemisphere / Flocculus
- **VERM**: AMG → VERM (emotion-axis motor)
- **HEMI**: PFC + M1 → HEMI (cognitive prediction)
- **FLOC**: PPC + FEF → FLOC (vestibular ocular reflex)
- **Papers**:
  - Schmahmann 2000 / Stoodley & Schmahmann 2009 / Buckner 2013 (위와 동일)

---

## 8. 🟣 Neuromodulator Sources (P28-30)

### Locus Coeruleus — 🟣 NE arousal (P28)
- **Papers**:
  - Aston-Jones & Cohen 2005 — *An integrative theory of locus coeruleus-norepinephrine function*
  - Sara 2009 — *The locus coeruleus and noradrenergic modulation of cognition*

### Basal Forebrain — 🟧 ACh attention (P29)
- **Papers**:
  - Hasselmo 1999 — *Neuromodulation: acetylcholine and memory consolidation*
  - Sarter 2009 — *Phasic acetylcholine release and the volitional control of attention*

### Raphe Nuclei — 🩷 5-HT mood (P30)
- **Papers**:
  - Aghajanian 1990 — *Serotonin-induced inward current in rat facial motoneurons*
  - Marek 2003 — *5-HT2A receptor or alpha1-adrenoceptor activation induces excitatory postsynaptic currents in layer V pyramidal cells of the medial prefrontal cortex*

---

## 9. 🛌 State / Global

### Sleep/Wake VLPO (P50) — 🛌 Flip-flop switch
- **Papers**:
  - Saper, Scammell & Lu 2005 — *Hypothalamic regulation of sleep and circadian rhythms*

### Reticular Formation (P51) — ⚡ ARAS arousal
- **Papers**:
  - Moruzzi & Magoun 1949 — *Brain stem reticular formation and activation of the EEG*

---

## 10. 🌊 Oscillations & Dynamics

### Theta rhythm (P97) — 🌀 8Hz HIPPO
- **Function**: dual phase coding (encoding vs retrieval)
- **Papers**:
  - Buzsaki 2002 — *Theta oscillations in the hippocampus*
  - Hasselmo 2002 — *Hippocampal mechanisms for the context-dependent retrieval of episodes*
  - Colgin 2013 — *Mechanisms and functions of theta rhythms*

### Gamma binding (P98) — ⚡ 40Hz PV-mediated PING
- **Papers**:
  - Singer 1999 — *Neuronal synchrony: a versatile code for the definition of relations?*
  - Buzsaki & Wang 2012 — *Mechanisms of gamma oscillations*
  - Sohal 2009 — *Parvalbumin neurons and gamma rhythms enhance cortical circuit performance*

### Theta-gamma coupling (P173) — 🌊 Modulation index
- **Papers**:
  - Lisman & Jensen 2013 — *The theta-gamma neural code*
  - Tort 2010 — *Measuring phase-amplitude coupling between neuronal oscillations*

### Place cell remapping (P96) — 🗺 Context switch
- **Papers**:
  - Muller & Kubie 1987 — *The effects of changes in the environment on the spatial firing of hippocampal complex-spike cells*
  - Colgin 2008 — *Understanding memory through hippocampal remapping*
  - Leutgeb 2005 — *Independent codes for spatial and episodic memory in hippocampal neuronal ensembles*

### Sleep replay (P94) — 💤 HIPPO → cortex consolidation
- **Papers**:
  - Wilson & McNaughton 1994 — *Reactivation of hippocampal ensemble memories during sleep*
  - Buzsaki 1996 — *The hippocampo-neocortical dialogue*
  - Diekelmann & Born 2010 — *The memory function of sleep*

### Critical period (P153) — 🌟 High-plasticity window
- **Papers**:
  - Hensch 2005 — *Critical period plasticity in local cortical circuits*

---

## 11. 학습 검증 메트릭 (Verification Suite)

### Behavior verification (P101) — 🎯 Gesture → OUT selectivity
### DG pattern separation (P105) — 🧩 Treves & Rolls
### CA3 pattern completion (P106) — 🔁 Marr / Rolls / Nakazawa
### Cross-modal binding (P107) — 🔗 Singer 1999 supra-linear
### WTA (P108) — 🏆 Lateral inhibition
### DA effect (P109) — 💊 Schultz 1998 reinforcement learning
### Sparseness (P166) — 🧪 Treves & Rolls 1991
### ISI / CV (P149) — 📈 Regular / Poisson / Bursty
### Avalanche (P188) — ⚡ Beggs & Plenz 2003 criticality
### θ-γ coupling (P173) — 🌊 Lisman & Jensen 2013
### Persistent activity (P144) — 🧠 Goldman-Rakic 1995 working memory

---

## 12. 학습 알고리즘

### STDP pair-based (P2) — Bi & Poo 1998
### STDP triplet-based (P2) — Pfister-Gerstner 2006 minimal
### Reward-modulated STDP (P174) — Izhikevich 2007 / Frémaux & Gerstner 2016
### Homeostatic synaptic scaling (P175) — Turrigiano 2008
### Forgetting curve (P145) — Ebbinghaus 1885 / Hardt 2013
### Predictive coding (P183) — Friston 2005 / Bastos 2012

---

## 13. 출퇴근 추천 읽기 순서

### Day 1 — 시각/감각 (~1시간)
1. Hubel & Wiesel 1962 (V1 orientation)
2. Mountcastle 1957 (cortical column)
3. Mishkin & Ungerleider 1982 (two visual systems)

### Day 2 — 메모리 (~1시간)
1. Marr 1971 (archicortex theory)
2. O'Keefe & Nadel 1978 (cognitive map) — chapter 1-2
3. Treves & Rolls 1994 (DG/CA3 separation)

### Day 3 — 학습 (~1시간)
1. Bi & Poo 1998 (STDP discovery)
2. Pfister & Gerstner 2006 (triplet STDP)
3. Schultz 1998 (dopamine prediction error)

### Day 4 — 회로 (~1시간)
1. Albin 1989 (BG direct/indirect)
2. Alexander, DeLong & Strick 1986 (parallel BG circuits)
3. Aggleton & Brown 1999 (Papez diencephalic axis)

### Day 5 — 통합 (~1시간)
1. LeDoux 2000 (emotion circuits)
2. Goldman-Rakic 1995 (working memory)
3. Buzsaki 2002 (theta oscillation)

### Day 6 — 신생 분야 (~1시간)
1. Beggs & Plenz 2003 (avalanche criticality)
2. Friston 2005 (predictive coding)
3. Bastos 2012 (canonical microcircuit)

---

## 14. 노드맵 적용 결정 시 고려사항

현재 90+ region 이 *on-demand* 빌드 후에만 노드맵에 등장하는 이유:
1. **시작 노드맵 단순성**: canonical 52 뉴런만 표시 → 학습 곡선 낮춤
2. **사용자 선택 자유도**: 각 region 마다 빌드 여부를 사용자가 결정
3. **Backend 결정론**: Brain Builder 버튼 클릭 → backend POST → snapshot pull → canvas 동기화 단방향

**노드맵 default 표시 추가 옵션** (요청 시 적용 가능):
- preset 자동 빌드 옵션 (페이지 로드 시 cluster preset 한 개 자동 빌드)
- "기본 회로" 토글: canonical 52 only ↔ Visual cluster auto ↔ Full preset
- 각 region 의 "추천 빌드" 표시 (학습 중인 region 강조)

위 옵션은 P201+ 로 가능 — 요청 주시면 진행.
