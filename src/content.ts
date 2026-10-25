// All page copy lives here so it can be edited without touching layout.

export const nav = {
  links: [
    { label: "Thesis", href: "/thesis/" },
    { label: "Research", href: "/#test" },
    { label: "Team", href: "/#join" },
  ],
  cta: { label: "Work with us", href: "/#join" },
};

export const hero = {
  title: "Beyond the transformer.",
  lead: "Northstar searches for new paradigms of intelligence: architectures and learning rules that today's hardware was never built to run.",
  primary: { label: "Read the thesis", href: "#thesis" },
  secondary: { label: "Work with us", href: "#join" },
};

export const thesis = {
  label: "The thesis",
  title: "The biggest labs are locked into the hardware they already bought. That is our opening.",
  points: [
    { title: "Paradigms before scale", body: "We question the architecture and the learning rule itself, not only how big the model is." },
    { title: "Algorithm first, then silicon", body: "Ideas that don't fit on GPUs are a feature. We start with the algorithm and grow into hardware co-design." },
    { title: "Alignment from day one", body: "Safety is part of the thesis, not a layer added after the fact." },
  ],
};

export const test = {
  label: "The test",
  title: "Every idea we pursue has to pass three questions.",
  // Shared with the thesis page's fit test, so both pages always ask the same questions.
  questions: [
    { key: "A", text: "Can it scale to superintelligence?" },
    { key: "B", text: "Would the frontier labs avoid it because of their lock-ins?" },
    { key: "C", text: "If it works, can we understand and steer it?" },
  ],
};

// The thesis page, with the vision and mission as its opening section. Every number cites an entry in `sources` by its id.
export const thesisPage = {
  label: "Thesis",
  title: "Intelligence on the right foundations.",
  lead: "Today's AI runs on the hardware and methods we happened to start with. We think better foundations exist, and that the labs best placed to find them are the least likely to look. This page walks through why.",
  statements: [
    { label: "Vision", text: "Better, safer intelligence: superintelligence built on the right foundations, not just the ones we happened to start with, and understood well enough to steer." },
    { label: "Mission", text: "Find the scalable paradigms of intelligence that frontier labs can't afford to look for, and build them safely." },
  ],
  numbers: {
    label: "By the numbers",
    title: "The incumbents are pouring concrete around one paradigm.",
    stats: [
      { value: "$725B", text: "Planned 2026 capital spending of Microsoft, Alphabet, Amazon and Meta, up from about $410B in 2025.", source: 1 },
      { value: "$500B", text: "Committed to Stargate, a single US AI data-center buildout, over four years.", source: 2 },
      { value: "$193.7B", text: "Nvidia's data-center revenue in its 2026 fiscal year, up 68% in a year.", source: 3 },
      { value: "945 TWh", text: "Projected data-center electricity use in 2030, more than double the 415 TWh of 2024.", source: 4 },
      { value: "20 W", text: "The power budget of the human brain: proof that general intelligence can run on a very different substrate.", source: 5 },
      { value: "€20B", text: "The EU's fund for AI gigafactories. Europe's buildout is a fraction of the US one, for now.", source: 6 },
    ],
  },
  thesis: {
    label: "The thesis",
    title: "Three layers, from philosophy to business.",
    layers: [
      { title: "Intelligence doesn't depend on its substrate", body: "Functionalism, or multiple realizability: what matters is the computation, not what it runs on. The brain does it on 20 watts of chemistry. This is contested, and we take the counterarguments seriously." },
      { title: "So there are many ways to build it", body: "If the substrate doesn't matter, transformers on GPUs are one point in a large space of possible architectures and learning rules, and the rest of that space is worth exploring." },
      { title: "The incumbents can't afford to look", body: "The frontier labs have hundreds of billions a year committed to the current stack. An approach that makes that stack obsolete is the research they would rather nobody did. That is our opening." },
    ],
  },
  bet: {
    label: "The bet",
    title: "Some paradigms that don't fit today's hardware will scale further than what exists.",
    body: [
      "Data centers, chips, training stacks and products all assume the same things: dense matrix math on GPUs, trained with backpropagation, with memory and compute kept apart. That stack is now worth a combined $725 billion of capital spending in a single year.",
      "If an architecture exists that is incompatible with that hardware and scales better, the frontier labs are structurally unlikely to pursue it: doing so would strand their own investment. That is how incumbents get beaten, where their own commitments stop them from following. We have nothing to protect.",
    ],
  },
  lockins: {
    label: "The lock-ins",
    title: "Each lock-in becomes a research branch.",
    items: [
      { title: "Dense matrix multiplication", stuck: "GPUs and TPUs are built for it.", explore: "Sparse, event-driven and spiking computation." },
      { title: "Backprop with global gradients", stuck: "The whole training stack assumes it.", explore: "Local and biologically plausible learning rules." },
      { title: "Separate memory and compute", stuck: "Data centers, HBM and chip design.", explore: "In-memory, analog and neuromorphic compute." },
      { title: "Synchronous digital computation", stuck: "All current hardware.", explore: "Asynchronous, analog and physical computing." },
    ],
  },
  edge: {
    label: "Our edge",
    points: [
      { title: "Nothing to protect", body: "Classic disruption logic: beat incumbents where their commitments stop them following. Against AI incumbents it may be the only way to win." },
      { title: "Taste in what to attack", body: "Not breadth or scale. Big labs can spin up agents and explore broadly too. Our edge is choosing which assumption to break." },
      { title: "ETH and European talent", body: "Close to neuromorphic and hardware groups in Zürich and across Europe, and to researchers who want to work on something other than scaling." },
    ],
  },
  approach: {
    label: "How we work",
    title: "The full stack of intelligence, from hardware to algorithm.",
    points: [
      { title: "Start with the algorithm", body: "We begin on the algorithmic side, in simulation and on hardware borrowed through partners. It is the cheapest place to find out whether a paradigm works." },
      { title: "Co-develop the hardware", body: "In the long run, hardware and algorithm are developed together, so each paradigm runs on hardware built for it rather than on hardware built for transformers." },
      { title: "Measured against a baseline", body: "Each lock-in is attacked one at a time, every experiment is compared to a baseline, and failures and dead ends get documented too." },
    ],
  },
  test: {
    label: "The fit test",
    title: "Every idea has to pass three questions.",
    questions: test.questions,
  },
  loop: {
    label: "Why it hasn't been done",
    title: "It's hard, not hidden. The hardware lottery keeps new paradigms losing.",
    intro: "New ideas get judged on hardware built for the old ones. Sara Hooker called this the hardware lottery:",
    steps: [
      "New paradigms, simulated on GPUs, look worse.",
      "So they don't get funding.",
      "So no hardware gets built for them.",
      "So they keep looking worse.",
    ],
    outro: "Alternatives to backprop have mostly lost at scale so far. Breaking that loop, by co-designing the algorithm and the hardware it deserves, is the core research problem.",
    source: 7,
  },
  alignment: {
    label: "Safety from day one",
    title: "Steering is part of the thesis.",
    body: "Keeping a self-improving process pointed where you meant it to go, as it compounds beyond what you can check, is the alignment problem in one sentence. A new paradigm could be far more interpretable than transformers, or far less. That is why the third question of the fit test is about steering, and why it is asked before anything gets built.",
  },
  europe: {
    label: "Why Europe, why now",
    title: "Less locked in, for now.",
    body: "The four largest US tech companies plan to spend about $725 billion in 2026 alone. The EU's gigafactory fund is €20 billion. Being behind on the buildout is a weakness for copying the incumbents, and a strength for building something different from scratch. The window is closing as the gigafactories go up, which is also the urgency.",
  },
  agency: {
    label: "Why we're doing it",
    title: "We build for the world where we have agency.",
    body: [
      "Lock-in doesn't stop the incumbents from following once a new paradigm is proven. It stops them from looking for one. Whoever finds it first gets the head start, and that is the edge we are after.",
      "Maybe none of this matters. A fast takeoff on today's stack would make every small lab irrelevant, whatever it does. That world may even be likely. But nothing we do changes its outcome, so it can't tell us what to do.",
    ],
    close: "The world where a better paradigm is still out there, and the incumbents aren't looking, is the only one in which we have any agency. So that is the one we build for.",
  },
  sources: [
    { id: 1, text: "Company 2026 capex guidance (Amazon ~$200B, Alphabet $195–205B, Microsoft ~$190B, Meta $125–145B), summarized by Silicon Canals, July 2026", href: "https://siliconcanals.com/m-four-us-tech-giants-spent-roughly-410-billion-on-capital-expenditure-last-year-much-of-it-tied-to-ai-and-are-steering-toward-roughly-725-billion-in-2026/" },
    { id: 2, text: "The Register, \"OpenAI wants to blow through $500B on AI infrastructure\", January 2025", href: "https://www.theregister.com/2025/01/22/openai_stargate_ai_datacenter_company" },
    { id: 3, text: "Nvidia, results for Q4 and fiscal 2026 (SEC Form 8-K), February 2026", href: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000019/q4fy26pr.htm" },
    { id: 4, text: "International Energy Agency, Energy and AI, executive summary, April 2025", href: "https://www.iea.org/reports/energy-and-ai/executive-summary" },
    { id: 5, text: "Levy & Calvert, \"Communication consumes 35 times more energy than computation in the human cortex\", PNAS, 2021", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8106317" },
    { id: 6, text: "European Commission, InvestAI: €200 billion for AI including €20 billion for AI gigafactories, February 2025", href: "https://digital-skills-jobs.europa.eu/en/latest/news/commission-launches-new-investai-initiative-mobilise-eu200-billion-investment-ai" },
    { id: 7, text: "Sara Hooker, \"The Hardware Lottery\", 2020", href: "https://arxiv.org/abs/2009.06489" },
  ],
};

export const join = {
  title: "Help us find the next paradigm.",
  body: "We're assembling the first researchers. If you think intelligence deserves a different foundation, we'd like to hear from you.",
  // TODO: replace with the real contact address before launch.
  contact: { label: "[CONTACT EMAIL]", href: "/#join" },
};

export const footer = { place: "Zürich", year: 2026 };
