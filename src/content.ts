// All page copy lives here so it can be edited without touching layout.

export const nav = {
  links: [
    { label: "Thesis", href: "#thesis" },
    { label: "Research", href: "#test" },
    { label: "Team", href: "#join" },
  ],
  cta: { label: "Work with us", href: "#join" },
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

export const join = {
  title: "Help us find the next paradigm.",
  body: "We're assembling the first researchers. If you think intelligence deserves a different foundation, we'd like to hear from you.",
  // TODO: replace with the real contact address before launch.
  contact: { label: "[CONTACT EMAIL]", href: "#join" },
};

export const footer = { place: "Zürich", year: 2026 };
