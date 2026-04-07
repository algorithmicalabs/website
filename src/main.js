// Scroll Reveal Animation with Intersection Observer
function initializeReveal() {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Trigger Agent Demo if the demo container is in view
        if (entry.target.classList.contains('agentic-demo-container')) {
          startAgentDemo();
        }

        // Trigger Diagnostic Simulation
        if (entry.target.classList.contains('diagnostic-container')) {
          startDiagnosticSim();
        }

        // Trigger Swarm Simulation
        if (entry.target.classList.contains('swarm-viz-container')) {
          startSwarmSim();
        }

        // Trigger Workflow Pulse
        if (entry.target.classList.contains('workflow-art-container')) {
          startWorkflowPulse();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Selector for all revealable elements
  const revealElements = document.querySelectorAll('.section-padding, .feature-card, .timeline-item, .reveal-on-scroll:not(.is-visible)');
  revealElements.forEach(el => {
    observer.observe(el);
  });
}

// Make it globally accessible for dynamic content
window.initializeReveal = initializeReveal;

document.addEventListener('DOMContentLoaded', () => {
  initializeReveal();

  // Active Nav Link Highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath || (currentPath === '/' && linkPath === '/index.html')) {
      link.classList.add('active');
    }
  });

  // Handle Navbar Background on Scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }
});

// --- Agentic Reasoning Demo Script ---
function startAgentDemo() {
  const log = document.getElementById('thought-log');
  if (!log) return;

  const scenarios = [
    {
      meta: "14:02:11 / MISSION_ID: EXPANSION_UPSERGE",
      title: "Query: Customer requested trial extension.",
      details: "Analyzing product usage signals and expansion potential.",
      tool: "UX_LAYER",
      nodes: ["node-customer", "node-agent"]
    },
    {
      meta: "14:02:14 / CROSS_REFERENCE: PAYMENTS",
      title: "Checking Stripe for account hygiene.",
      details: "User has 100% on-time payment history over 14 months.",
      tool: "STRIPE_API",
      nodes: ["node-agent", "node-stripe", "conn-2"]
    },
    {
      meta: "14:02:17 / CONTEXT_FETCH: ENGINEERING",
      title: "Reviewing Linear for feature engagement.",
      details: "User requested 'API_V4_KEY' in Linear dev-portal 3 days ago. High intent.",
      tool: "LINEAR_ENGINEERING",
      nodes: ["node-agent", "node-linear", "conn-2", "conn-3"]
    },
    {
      meta: "14:02:20 / EXECUTION: RESOLUTION",
      title: "Mission Resolved: Autonomously upgraded account.",
      details: "Extended trial by 14 days and pushed Pro-Tier discount code via Slack.",
      tool: "SUCCESS_NODE",
      nodes: ["node-customer", "node-agent", "conn-1"]
    }
  ];

  let currentStep = 0;

  function runStep() {
    if (currentStep >= scenarios.length) return;

    const s = scenarios[currentStep];
    
    // Create element
    const stepEl = document.createElement('div');
    stepEl.className = 'reasoning-step';
    stepEl.innerHTML = `
      <div class="step-meta"><span>${s.meta}</span></div>
      <div class="step-title">${s.title}</div>
      <div class="step-details">${s.details}</div>
      <div class="tool-badge">${s.tool}</div>
    `;

    log.appendChild(stepEl);

    // Visual sequence
    setTimeout(() => {
      stepEl.classList.add('visible');
      log.scrollTop = log.scrollHeight;
      
      // Update Viz Nodes
      document.querySelectorAll('.viz-node, .viz-connector').forEach(n => n.classList.remove('active'));
      s.nodes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
      });

      currentStep++;
      setTimeout(runStep, 3500);
    }, 100);
  }

  runStep();
}

// --- Diagnostic Simulation (Challenge Page) ---
function startDiagnosticSim() {
  const log = document.getElementById('diag-log');
  const latVal = document.getElementById('latency-val');
  if (!log || !latVal) return;

  const events = [
    { type: 'error', msg: '12:44:02 / API_TIMEOUT: Stripe secondary node unreachable.' },
    { type: 'warning', msg: '12:44:05 / MANUAL_TASK: Agent copying subscription data from Stripe to Zendesk.' },
    { type: 'error', msg: '12:44:11 / SLA_EXPIRED: Ticket #8221 pending for 72+ hours.' },
    { type: 'warning', msg: '12:44:15 / FRAGMENTATION: Linear ticket out of sync with customer Success Plan.' }
  ];

  let current = 0;
  function run() {
    if (current >= events.length) return;
    const e = events[current];
    const el = document.createElement('div');
    el.className = `log-entry ${e.type}`;
    el.textContent = e.msg;
    log.appendChild(el);
    
    // Simulate latency spikes
    const latencies = ["14h 22m", "15h 08m", "18h 44m", "22h 11m"];
    latVal.textContent = latencies[current];

    current++;
    setTimeout(run, 4000);
  }
  run();
}

// --- Swarm Simulation (Solution Page) ---
window.startSwarmSim = function(isManual = false) {
  const log = document.getElementById('swarm-log');
  if (!log) return;

  // Prevent double start on manual trigger
  if (isManual && log.getAttribute('data-running') === 'true') return;
  log.setAttribute('data-running', 'true');
  log.innerHTML = '';

  const agentSupport = document.getElementById('agent-support');
  const agentSuccess = document.getElementById('agent-success');
  const agentExpansion = document.getElementById('agent-expansion');

  const scenarios = [
    { 
      meta: "10:32:01 / SIGNAL_INGRESS",
      msg: "Anomaly Detected: User 'Alpha-7' usage spikes to 94%. Trial period expiring in 48h.",
      details: "Triggering Success Node for preventive conversion assessment.",
      agents: [agentSuccess],
      pulse: 0
    },
    { 
      meta: "10:32:04 / CONTEXT_ACQUISITION",
      msg: "Chargebee Check: Valid payment method present. Linear Check: 0 open technical blockers.",
      details: "Success Agent confirming account feasibility for immediate upgrade.",
      agents: [agentSuccess, agentSupport],
      pulse: 1
    },
    { 
      meta: "10:32:07 / COORDINATED_REASONING",
      msg: "Mission Handoff: Requesting bespoke expansion bundle from Expansion Agent.",
      details: "Mapping usage-to-tier correlation for automated discount proposal.",
      agents: [agentSuccess, agentExpansion],
      pulse: 1
    },
    { 
      meta: "10:32:11 / AUTONOMOUS_EXECUTION",
      msg: "Execution: High-intent conversion deal pushed to customer via Slack & Email.",
      details: "Resolution: Mission Successful. Account moved to Expansion Pipeline.",
      agents: [agentSupport, agentSuccess, agentExpansion],
      pulse: 2
    }
  ];

  let current = 0;
  function run() {
    if (current >= scenarios.length) {
      log.setAttribute('data-running', 'false');
      return;
    }
    const s = scenarios[current];
    
    // Create detailed log entry
    const el = document.createElement('div');
    el.className = 'reasoning-step visible'; // Uses the same style as home demo
    el.style.borderLeft = '1px solid #333';
    el.style.paddingLeft = '1.5rem';
    el.style.marginBottom = '2rem';
    
    el.innerHTML = `
      <div style="font-size: 0.65rem; color: #666; margin-bottom: 0.5rem;">${s.meta}</div>
      <div style="color: #fff; margin-bottom: 0.3rem;">${s.msg}</div>
      <div style="color: #888; font-size: 0.7rem;">${s.details}</div>
    `;

    log.appendChild(el);
    log.scrollTop = log.scrollHeight;

    // Pulse agents
    document.querySelectorAll('.agent-disk').forEach(a => {
        if (a) a.classList.remove('active');
    });
    s.agents.forEach(a => {
        if (a) a.classList.add('active');
    });

    // Trigger pulse on the map
    const pulses = [document.getElementById('pulse-1'), document.getElementById('pulse-2')];
    if (s.pulse !== undefined && pulses[s.pulse-1]) {
       // Manual pulse trigger logic could go here if we wanted to interrupt the loop
    }

    current++;
    setTimeout(run, 3500);
  }

  run();
}

// --- Workflow Map Pulse ---
function startWorkflowPulse() {
  const pulses = [document.getElementById('pulse-1'), document.getElementById('pulse-2')];
  if (!pulses[0]) return;

  function runPulse(el) {
    // Reset instantly
    el.style.transition = 'none';
    el.style.left = '0%';
    el.style.opacity = '1';
    
    // Trigger transition
    setTimeout(() => {
      el.style.transition = 'left 3s linear, opacity 3s var(--ease)';
      el.style.left = '100%';
      el.style.opacity = '0';
    }, 50);
  }

  // Initial
  runPulse(pulses[0]);
  setTimeout(() => runPulse(pulses[1]), 1500);

  // Interval
  setInterval(() => {
    runPulse(pulses[0]);
    setTimeout(() => runPulse(pulses[1]), 1500);
  }, 6000);
}


