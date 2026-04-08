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
          if (window.startSwarmSim) window.startSwarmSim();
        }

        // Trigger Workflow Pulse
        if (entry.target.classList.contains('workflow-art-container')) {
          startWorkflowPulse();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.section-padding, .feature-card, .timeline-item, .reveal-on-scroll:not(.is-visible)');
  revealElements.forEach(el => {
    observer.observe(el);
  });
}

window.initializeReveal = initializeReveal;

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    initializeReveal();

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || (currentPath === '/' && linkPath === '/index.html')) {
            link.classList.add('active');
        }
    });

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
          if (navbar) {
            if (window.scrollY > 50) {
              navbar.classList.add('navbar-scrolled');
            } else {
              navbar.classList.remove('navbar-scrolled');
            }
          }
        });
    }
});

// --- Home Page: Unified Command Center Demo ---
function startAgentDemo() {
  const log = document.getElementById('thought-log');
  if (!log) return;

  const scenarios = [
    {
      meta: "10:45:01 / INGRESS: SLACK_CHANNEL_P8",
      agent: "LEADER",
      title: "Query: Account 'Delta-9' reporting billing discrepancy.",
      details: "Orchestrator identifying required specialists and safety protocols.",
      tool: "MISSION_PLANNER",
      nodes: ["node-customer", "node-agent"]
    },
    {
      meta: "10:45:04 / DELEGATION: STRIPE_SPECIALIST",
      agent: "SPECIALIST",
      title: "Querying Stripe Billing History.",
      details: "Confirmed double-charge on Invoice #8821. Auth: READ_ONLY.",
      tool: "STRIPE_v3_API",
      nodes: ["node-agent", "node-stripe", "conn-2"]
    },
    {
      meta: "10:45:08 / DELEGATION: LINEAR_SPECIALIST",
      agent: "SPECIALIST",
      title: "Cross-referencing Linear Dev Tickets.",
      details: "Engineering confirmed 'Race Condition' bug in API v4.1 patch.",
      tool: "LINEAR_GRAPHQL",
      nodes: ["node-agent", "node-linear", "conn-3"]
    },
    {
      meta: "10:45:12 / VALIDATION: SUPERVISOR",
      agent: "SUPERVISOR",
      title: "Reviewing proposed resolution for policy fit.",
      details: "Verification: Refund within $500 threshold. Tone: Professional-Empathetic.",
      tool: "POLICY_GUARDRAIL",
      nodes: ["node-agent", "node-customer"]
    },
    {
      meta: "10:45:15 / EXECUTION: RECONCILIATION",
      agent: "RECONCILE",
      title: "Executing Atomic Refund & Notification.",
      details: "Refund processed in Stripe. Slack update sent to customer. Mission: RESOLVED.",
      tool: "ATOMIC_TX_COMMIT",
      nodes: ["node-customer", "node-agent", "conn-1"]
    }
  ];

  let currentStep = 0;

  function runStep() {
    if (currentStep >= scenarios.length) return;

    const s = scenarios[currentStep];
    const stepEl = document.createElement('div');
    stepEl.className = `reasoning-step agent-${s.agent.toLowerCase()}`;
    stepEl.innerHTML = `
      <div class="step-meta"><span>${s.meta}</span> <span class="agent-tag">[${s.agent}]</span></div>
      <div class="step-title">${s.title}</div>
      <div class="step-details">${s.details}</div>
      <div class="tool-badge">${s.tool}</div>
    `;

    log.appendChild(stepEl);

    setTimeout(() => {
      stepEl.classList.add('visible');
      log.scrollTop = log.scrollHeight;
      
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

// --- Solutions Page: 8-Agent Matrix Controller ---
const agentLogic = {
  leader: {
    name: "LEADER",
    description: "The Orchestration Core. Acts as the central nervous system of the CX Command System. Parses complex intent, decomposes high-level customer problems into specific engineering missions, and delegates to specialized nodes. Uses advanced reasoning chains to maintain absolute mission coherence across disparate tools and teams.",
    logs: [
      "14:22:01 / INGRESS: In-App Chat.",
      "Parsing high-dimensional intent: 'User cannot connect to AWS S3 bucket.'",
      "Identifying requirements: [Specialist_Cloud, Specialist_IAM, Specialist_Linear].",
      "Mission initialized: Troubleshooting_Connectivity_Matrix_v4.",
      "Checking Account_UUID: 4481_ALPHA Tier: Enterprise.",
      "Spawning sub-process: Auth_Token_Verification.",
      "Delegating Infrastructure_Scan to SPECIALIST_01.",
      "Requesting historical context from MEMORY_CORE.",
      "Monitoring SPECIALIST_01 execution status...",
      "RECEIVED: Access_Denied_Report from SPECIALIST_01.",
      "Consulting PROACTIVE_CX for potential cross-account impact.",
      "Instruction: Generate temporary IAM credentials and update Ticket #441.",
      "Finalizing resolution loop...",
      "MISSION_COMPLETE: Resolution delivered via Slack Connect.",
      "Closing loop: Synchronizing state via RECONCILE."
    ]
  },
  specialist: {
    name: "SPECIALIST",
    description: "Technical Execution Nodes. Deeply integrated agents with managed read/write access to core infrastructure (Stripe, AWS, Linear, etc.). These agents don't just retrieve documentation; they execute API calls, troubleshoot failed pipelines, and reconcile data mismatches autonomously without human intervention.",
    logs: [
      "14:23:05 / STRIPE_CHECK: Verifying subscription lifecycle.",
      "Payload: { customer_id: 'cus_991', plan: 'enterprise_usage_v3' }",
      "Status confirmed: Active / No_Delinquency.",
      "14:23:08 / AWS_RO_ACCESS: Fetching IAM policy logs.",
      "Detected 'AccessDenied' on bucket 'asset-prod-01' during PUT_OBJECT.",
      "Tracing request ID: amzn-request-8871-x-z.",
      "Comparing current IAM role vs required S3_Write permission.",
      "Mismatch found: Role 'cx-viewer' missing 's3:PutObject'.",
      "Drafting policy update proposal...",
      "Sending proposal to SUPERVISOR for VETO/COMMIT check.",
      "Awaiting approval...",
      "APPROVAL_RECEIVED: Step 1/2.",
      "Executing temporary policy grant: TTL: 3600s.",
      "Verifying connectivity...",
      "SUCCESS: S3_Connection_Test passed."
    ]
  },
  supervisor: {
    name: "SUPERVISOR",
    description: "Risk & Policy Enforcement. A recursive auditing layer that monitors every action proposed by execution agents. Operates with a 'Deny-by-Default' architecture to ensure no breaking changes are pushed and all responses adhere to strict security, compliance, and brand protocols.",
    logs: [
      "14:24:12 / AUDIT: Monitoring SPECIALIST_01 interaction with AWS_IAM.",
      "Action detected: Grant_Permanent_S3_Access.",
      "VETO: Action violates Policy_Least_Privilege (LP_88).",
      "Instruction: Replace PERMANENT with TEMPORARY_STS_TOKEN (TTL < 4hr).",
      "AUDIT: Checking outgoing response for brand sentiment.",
      "Sentiment match: 0.98. Professionalism index: High.",
      "Verifying Stripe refund proposal for customer 'Gamma'.",
      "VETO: Refund exceeds $500 threshold without human sign-off.",
      "Escalating to Specialist_Finance for human verification.",
      "Reversing previous proposal by SPECIALIST_02.",
      "Log record: Policy_Violation_Prevented (Code_501).",
      "Re-validating system state...",
      "System healthy: All proposed actions compliant.",
      "IDLE: Monitoring next agent loop."
    ]
  },
  memory: {
    name: "MEMORY",
    description: "Long-Term Context Graph. Maintains a persistent, high-dimensional vector space of customer history, technical incidents, and organizational knowledge. Allows the system to recall a specific recursive DNS fix from 11 months ago or identify emerging bug patterns across disparate accounts.",
    logs: [
      "14:25:15 / LONG_TERM_CONTEXT: Scanning account history for 'Beta-01'.",
      "Match found: Incident_8872 (Oct 2025). Status: Resolved.",
      "Context: Issue was related to Cloudfront cache invalidation lag.",
      "Injecting historical solution into Mission_Planner.",
      "Success probability index updated: 0.94.",
      "Checking global incident database...",
      "Detected pattern: 4 similar reports in 'ca-central-1' region.",
      "Cross-referencing Jira #PR-221 (Infrastructure Change).",
      "Confirming correlation: 0.89.",
      "Alerting LEADER: Incident is likely regional, not account-specific.",
      "Updating Context_Map for related users in Quebec.",
      "Context provided to CHANNEL_UNIFIER.",
      "Memory state: Fully Synchronized."
    ]
  },
  reconciliation: {
    name: "RECONCILE",
    description: "Atomic State Synchronization. Ensures total data consistency across the entire technical stack. If an agent modifies a record in Stripe or Salesforce, the corresponding entry in Linear, the internal database, and Intercom is updated instantly, preventing data drift and maintaining a single source of truth.",
    logs: [
      "14:26:18 / TRANSACTION_START: atomic_rollback_enabled.",
      "Action order: [Linear, Stripe, Intercom, Admin_DB].",
      "Updating Linear Ticket #441 status -> 'Resolved'.",
      "Updating Stripe Metadata: { resolution_date: '2026-04-08' }.",
      "Synchronizing Intercom Conversation State -> 'Closed'.",
      "Writing to Master_DB: resolution_log_inserted.",
      "VERIFYING_SYNC...",
      "Linear: OK.",
      "Stripe: OK.",
      "Intercom: OK.",
      "Detected drift in Salesforce Opportunity status.",
      "Manual patch applied to CRM records.",
      "COMMIT_SUCCESS: 4/4 nodes consistent.",
      "Transaction finalized."
    ]
  },
  proactive: {
    name: "PROACTIVE",
    description: "Revenue Protection Engine. Scans real-time usage signals from telemetry (Mixpanel/Amplitude), billing health (Stripe), and ticket sentiment. Identifies churn risk before the customer complains and initiates autonomous resolution or high-value outreach to protect and expand account revenue.",
    logs: [
      "14:27:21 / SIGNAL_FETCH: MixingPanel activity scan.",
      "ALARM: Account 'Gamma' daily active users dropped 40% over 72hr.",
      "Correlating with Billing: No delinquency found.",
      "Checking Ticket History: 3 unresolved issues with API_v2.",
      "Risk Score: 0.84 (High Churn Probability).",
      "Initiating autonomous resolution for API_v2 connectivity errors.",
      "Generating outbound Slack nudge template...",
      "Sentiment check: Empathetic/Expert.",
      "Drafting personalized health review request.",
      "Scheduling automated follow-up for tomorrow 10:00 UTC.",
      "Reporting churn risk to success_team Slack channel.",
      "Recommendation: Priority 1 - Technical Review.",
      "Action triggered: Protect_Revenue_Loop_771."
    ]
  },
  insights: {
    name: "INSIGHTS",
    description: "Continuous Improvement Node. Analyzes thousands of autonomous resolutions to identify structural inefficiencies. If 15% of tickets are caused by an unclear billing UI, this agent identifies the pattern and generates technical design recommendations or documentation updates to eliminate future friction.",
    logs: [
      "14:28:25 / ASYNC_ANALYSIS: Processing 10,000 recent resolutions.",
      "Running semantic clustering on 2,500 'Billing' tickets.",
      "Pattern Match: 18% of friction points around 'Coupon_Application'.",
      "Root Cause: Outdated documentation in Knowledge_Base v2.1.",
      "Generating suggested documentation patch...",
      "Drafting UI improvement for /billing/settings.",
      "Efficiency Report: Autonomous Resolution Rate improved 4.2% MoM.",
      "Impact: Saved 140 Support Hours this week.",
      "Projecting ROI: $22,500 labor cost reduction.",
      "Updating Strategic_Roadmap with friction-point analysis.",
      "Recommendation: Priority update to Knowledge_Base Section 4.5."
    ]
  },
  unifier: {
    name: "UNIFIER",
    description: "Omnichannel Identity Normalization. Bridges the gap between Slack Connect, email, in-app chat, and developer portals. Normalizes disparate customer identities into a unified UUID, ensuring the Leader agent has a consistent, historical view of the user regardless of the interaction medium.",
    logs: [
      "14:29:30 / CHANNEL_SYNC: 1 ticket detected across Slack + Email.",
      "Slack ID: 'U-8821' / Email: 'dev@beta.com'.",
      "Running fuzzy match on user identity...",
      "Match Score: 1.00. Identity confirmed.",
      "Normalizing payload identities to UUID_4481_ALPHA.",
      "Merging conversation histories into unified timeline.",
      "Detected context mismatch: User reported different error on Email vs Slack.",
      "Resolving conflict: Priority given to Slack logs (most recent).",
      "Unified view pushed to LEADER agent for mission planning.",
      "Monitoring channel active status: [Slack: Active, Email: Idle].",
      "Routing response to Slack (Primary Channel).",
      "Synchronization complete."
    ]
  }
};

window.triggerAgentDemo = function(agentKey) {
  const log = document.getElementById('command-log');
  const descTitle = document.querySelector('.agent-description-box h4');
  const descContent = document.querySelector('.agent-description-box .desc-content');
  if (!log) return;

  const logic = agentLogic[agentKey];
  if (!logic) return;

  // Clear log and update descriptions
  log.innerHTML = '';
  if (descTitle) descTitle.textContent = `Agent Role: ${logic.name}`;
  if (descContent) descContent.textContent = logic.description;

  document.querySelectorAll('.agent-node').forEach(n => n.classList.remove('active'));
  const clickedNode = event ? event.currentTarget : null;
  if (clickedNode) clickedNode.classList.add('active');

  let step = 0;
  function addLogLine() {
    if (step >= logic.logs.length) return;
    
    const line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = `
      <span class="log-timestamp">${new Date().toLocaleTimeString('en-GB')}</span>
      <span class="log-agent" style="color: var(--agent-${agentKey})">${logic.name}</span>
      <span class="log-message">${logic.logs[step]}</span>
    `;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
    
    step++;
    const nextWait = step === 1 ? 500 : 800;
    setTimeout(addLogLine, nextWait);
  }

  addLogLine();
};

// --- Challenge Page: Support Death Spiral Simulation ---
function startDiagnosticSim() {
  const log = document.getElementById('diag-log');
  const latVal = document.getElementById('latency-val');
  if (!log || !latVal) return;

  const events = [
    { type: 'error', msg: '12:44:02 / DEATH_SPIRAL: Linear growth of headcount vs ticket volume.' },
    { type: 'warning', msg: '12:44:05 / RAG_FAILURE: LLM retrieved outdated docs. User frustrated.' },
    { type: 'error', msg: '12:44:11 / REVENUE_DRAIN: Support overhead exceeds 12% of ARR.' },
    { type: 'warning', msg: '12:44:15 / CHURN_SIGNAL: Critical churn indicator missed in Slack channel.' }
  ];

  let current = 0;
  function run() {
    if (current >= events.length) return;
    const e = events[current];
    const el = document.createElement('div');
    el.className = `log-entry ${e.type}`;
    el.textContent = e.msg;
    log.appendChild(el);
    
    const latencies = ["$8M ARR", "$15M ARR", "$30M ARR", "$40M ARR"];
    latVal.textContent = latencies[current];

    current++;
    setTimeout(run, 4000);
  }
  run();
}

// --- Workflow Map Pulse ---
function startWorkflowPulse() {
  const pulses = [document.getElementById('pulse-1'), document.getElementById('pulse-2')];
  if (!pulses[0]) return;

  function runPulse(el) {
    el.style.transition = 'none';
    el.style.left = '0%';
    el.style.opacity = '1';
    
    setTimeout(() => {
      el.style.transition = 'left 3s linear, opacity 3s var(--ease)';
      el.style.left = '100%';
      el.style.opacity = '0';
    }, 50);
  }

  runPulse(pulses[0]);
  setTimeout(() => runPulse(pulses[1]), 1500);

  setInterval(() => {
    runPulse(pulses[0]);
    setTimeout(() => runPulse(pulses[1]), 1500);
  }, 6000);
}

// --- Home Page: Matrix Synchronization Demo ---
function startSyncDemo() {
  const log = document.getElementById('sync-log');
  const lines = document.querySelectorAll('.sync-line');
  if (!log) return;

  const script = [
    "RECON_AGENT: Scanning Stripe active subscription UUID_88...",
    "LINEAR: Checking linked issue #PR-442 (API_TIMEOUT).",
    "RECON_AGENT: State drift detected in CRM records.",
    "SYNC_INITIATED: Neutralizing Salesforce vs DB discrepancy.",
    "RECON_AGENT: Writing atomic patch to 4 target nodes.",
    "SYNC_SUCCESS: 100% architectural coherence established."
  ];

  let current = 0;
  function run() {
    if (current >= script.length) {
      setTimeout(() => {
        log.innerHTML = '';
        current = 0;
        lines.forEach(l => l.classList.remove('flowing'));
        run();
      }, 5000);
      return;
    }

    const el = document.createElement('div');
    el.className = 'log-line active';
    el.textContent = script[current];
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;

    if (current === 1) lines[0].classList.add('flowing');
    if (current === 3) lines[1].classList.add('flowing');

    current++;
    setTimeout(run, 2500);
  }
  run();
}

// Global reveal and simulation trigger
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.id === 'demo' && !entry.target.dataset.started) {
          entry.target.dataset.started = 'true';
          startAgentDemo();
      }
      if (entry.target.id === 'diag-log' && !entry.target.dataset.started) {
          entry.target.dataset.started = 'true';
          startDiagnosticSim();
      }
      if (entry.target.classList.contains('matrix-sync-demo') && !entry.target.dataset.started) {
          entry.target.dataset.started = 'true';
          startSyncDemo();
      }
      if (entry.target.id === 'workflow-map' && !entry.target.dataset.started) {
          entry.target.dataset.started = 'true';
          startWorkflowPulse();
      }
    }
  });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal-on-scroll, #demo, #diag-log, .matrix-sync-demo, #workflow-map').forEach(el => observer.observe(el));
});
