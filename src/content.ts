// All page copy lives here so it can be edited without touching layout.

export const hero = {
  title: "Beyond the transformer.",
  lead: "Northstar searches for new paradigms of intelligence: architectures and learning rules that today's hardware was never built to run.",
  primary: { label: "Read the thesis", href: "/thesis/" },
};

// The thesis page, with the vision and mission as its opening section. Every number cites an entry in `sources` by its id.
export const thesisPage = {
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
  // Cash purchases of property and equipment, in $B, from each company's SEC filings (calendar years; Microsoft's
  // fiscal quarters regrouped). 2026 is January to June. The 2026 plan is company guidance (source 1).
  buildout: {
    label: "The buildout",
    title: "Over $1.4 trillion poured into one paradigm since 2020.",
    total: "spent by Microsoft, Alphabet, Amazon and Meta on data centers, chips and other property and equipment, January 2020 to June 2026.",
    planTotal: "if their 2026 plans hold.",
    note: "Bars are cash capital spending reported in SEC filings. The 2026 plan is company guidance, which for some companies also counts finance leases, so it runs a little higher than the cash basis (2025 was about $410B on that basis).",
    companies: ["Microsoft", "Alphabet", "Amazon", "Meta"],
    years: [
      { year: "2020", values: [17.6, 22.3, 40.1, 15.2] },
      { year: "2021", values: [23.2, 24.6, 61.1, 18.7] },
      { year: "2022", values: [24.8, 31.5, 63.6, 31.2] },
      { year: "2023", values: [35.2, 32.3, 52.7, 27.0] },
      { year: "2024", values: [55.6, 52.5, 83.0, 37.3] },
      { year: "2025", values: [83.1, 91.4, 131.8, 69.7] },
      { year: "2026", values: [66.7, 80.6, 98.4, 49.1], partial: "Jan–Jun" },
    ],
    plan2026: 725,
    sources: [8, 9, 10, 11, 1],
  },
  thesis: {
    label: "The thesis",
    title: "Three layers, from philosophy to business.",
    layers: [
      { title: "Intelligence doesn't depend on its substrate", body: "Functionalism, or multiple realizability: what matters is the computation, not what it runs on. The brain does it on about 20 watts.", source: 12 },
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
    title: "Four lock-ins, all tied to the physical infrastructure.",
    intro: "A lock-in only counts if escaping it means writing off hardware, not just starting new training runs on the chips the incumbents already own. Each one becomes a research branch.",
    items: [
      { title: "Dense matrix multiplication", stuck: "GPUs and TPUs are built for it.", explore: "Sparse, event-driven and spiking computation." },
      { title: "Separate memory and compute", stuck: "Data centers, the HBM supply chain and chip design.", explore: "In-memory, analog and neuromorphic compute." },
      { title: "Synchronous digital computation", stuck: "All current hardware, fabs and toolchains.", explore: "Asynchronous, analog and physical computing." },
      { title: "Learning that fits the data center", stuck: "Backprop and frozen, copy-everywhere models grew up with GPU data centers.", explore: "Learning the current infrastructure can't run, like continual learning in place." },
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
    questions: [
      { key: "A", text: "Can it scale to superintelligence?" },
      { key: "B", text: "Would the frontier labs avoid it because of their lock-ins?" },
      { key: "C", text: "If it works, can we understand and steer it?" },
    ],
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
    title: "We think the future of AI is still up for grabs.",
    body: [
      "It can feel like it's already been decided: a few labs, trillion-dollar budgets, and everyone else watching. But those labs are locked into the bet they've made. They'll follow the moment something better is proven. Until then, they aren't looking for it.",
      "That leaves an opening. Whoever finds the next paradigm first gets a head start that money alone can't buy back. And it doesn't take a trillion dollars to find it. It takes people willing to look where the giants won't.",
    ],
    close: "If you've felt that AI is something being done to you, rather than something you get to shape, this is the other way. Come help us find what's next.",
  },
  sources: [
    { id: 1, text: "Company 2026 capex guidance (Amazon ~$200B, Alphabet $195–205B, Microsoft ~$190B, Meta $125–145B), summarized by Silicon Canals, July 2026", href: "https://siliconcanals.com/m-four-us-tech-giants-spent-roughly-410-billion-on-capital-expenditure-last-year-much-of-it-tied-to-ai-and-are-steering-toward-roughly-725-billion-in-2026/" },
    { id: 2, text: "The Register, \"OpenAI wants to blow through $500B on AI infrastructure\", January 2025", href: "https://www.theregister.com/2025/01/22/openai_stargate_ai_datacenter_company" },
    { id: 3, text: "Nvidia, results for Q4 and fiscal 2026 (SEC Form 8-K), February 2026", href: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000019/q4fy26pr.htm" },
    { id: 4, text: "International Energy Agency, Energy and AI, executive summary, April 2025", href: "https://www.iea.org/reports/energy-and-ai/executive-summary" },
    { id: 5, text: "Levy & Calvert, \"Communication consumes 35 times more energy than computation in the human cortex\", PNAS, 2021", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8106317" },
    { id: 6, text: "European Commission, InvestAI: €200 billion for AI including €20 billion for AI gigafactories, February 2025", href: "https://digital-skills-jobs.europa.eu/en/latest/news/commission-launches-new-investai-initiative-mobilise-eu200-billion-investment-ai" },
    { id: 7, text: "Sara Hooker, \"The Hardware Lottery\", 2020", href: "https://arxiv.org/abs/2009.06489" },
    { id: 8, text: "Microsoft, Forms 10-K and 10-Q, fiscal 2020–2026: additions to property and equipment, regrouped into calendar quarters", href: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000789019&type=10-&dateb=&owner=include&count=40" },
    { id: 9, text: "Alphabet, Forms 10-K 2022–2025 and 10-Q Q2 2026: purchases of property and equipment", href: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001652044&type=10-&dateb=&owner=include&count=40" },
    { id: 10, text: "Amazon, Forms 10-K 2022–2025 and 10-Q Q2 2026: purchases of property and equipment", href: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001018724&type=10-&dateb=&owner=include&count=40" },
    { id: 11, text: "Meta Platforms, Forms 10-K 2022–2025 and 10-Q Q2 2026: purchases of property and equipment (latest restated values)", href: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001326801&type=10-&dateb=&owner=include&count=40" },
    { id: 12, text: "Raichle & Gusnard, \"Appraising the brain's energy budget\", PNAS, 2002: the brain is about 2% of body weight and uses about 20% of the body's energy", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC124895" },
  ],
};

export const join = {
  title: "Help us find the next paradigm.",
  body: "We're assembling the first researchers. If you think intelligence deserves a different foundation, we'd like to hear from you.",
  contact: { label: "Contact", href: "mailto:tbollenbach@ethz.ch" },
};

export const footer = { place: "Zürich", year: 2026 };
