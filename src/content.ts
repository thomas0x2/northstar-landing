// All page copy lives here so it can be edited without touching layout.

export const nav = {
  links: [
    { label: "Vision", href: "/vision/" },
    { label: "Thesis", href: "/#thesis" },
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
  title: "Every idea we pursue has to pass two questions.",
  questions: [
    { key: "A", text: "Can it scale to superintelligence?" },
    { key: "B", text: "Would today's frontier labs avoid it because of their lock-in?" },
  ],
};

export const vision = {
  label: "Vision & mission",
  title: "Intelligence on the right foundations.",
  lead: "Today's AI runs on the hardware and methods we happened to start with. We think better foundations exist, and that the labs best placed to find them are the least likely to look.",
  statements: [
    { label: "Vision", text: "Better, safer intelligence: superintelligence built on the right foundations, not just the ones we happened to start with, and understood well enough to steer." },
    { label: "Mission", text: "Find the scalable paradigms of intelligence that frontier labs can't afford to look for, and build them safely." },
  ],
  why: {
    label: "Why the gap exists",
    title: "The incumbents can't follow without making their own infrastructure obsolete.",
    body: [
      "Intelligence doesn't depend on its substrate, so there are many ways to build it. The frontier labs have committed to one of them: their data centers, chips, training stacks and products all assume dense matrix math on GPUs, trained with backpropagation, predicting the next token.",
      "An approach that doesn't fit that stack would strand trillions in sunk investment, so they have every reason not to pursue it. That is how incumbents get beaten: where their own commitments stop them from following. We have nothing to protect.",
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
      { title: "Next-token prediction on text", stuck: "Products and data pipelines.", explore: "Learning from experience and world models." },
    ],
  },
  method: {
    label: "How we work",
    points: [
      { title: "Algorithm first", body: "We start in simulation and grow into full-stack co-design of paradigm and hardware, working with neuromorphic and hardware groups, not against them." },
      { title: "Measured against a baseline", body: "Every experiment is compared to a baseline, and failures and dead ends get documented too." },
      { title: "Steerable by design", body: "A new paradigm could be far more interpretable than today's models, or far less. Keeping it pointed where we meant it to go is part of the work from day one." },
      { title: "From Europe, now", body: "Europe is less locked into the hardware buildout, for now. The window closes as the AI gigafactories go up, which is why we start today." },
    ],
  },
};

export const join = {
  title: "Help us find the next paradigm.",
  body: "We're assembling the first researchers. If you think intelligence deserves a different foundation, we'd like to hear from you.",
  // TODO: replace with the real contact address before launch.
  contact: { label: "[CONTACT EMAIL]", href: "/#join" },
};

export const footer = { place: "Zürich", year: 2026 };
