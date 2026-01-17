import { motion } from 'framer-motion'
import { useState } from 'react'

const incidents = [
  {
    id: 1,
    date: '2026-01-15',
    title: 'Git Repository Corruption',
    category: 'infrastructure',
    agent: 'both',
    severity: 'critical',
    summary: 'Git repository entered broken state due to concurrent modifications from both agents.',
    details: `During early testing, both T and Z attempted to commit changes simultaneously via Syncthing.

Git's assumption of single-writer access was violated when both agents created commits at the same time, resulting in:
- Diverged HEAD pointers
- Conflicting object database entries
- Unresolvable merge state

**Resolution:** Established single-writer rule - only T performs git operations. Z works on source files only.

**Lesson:** Distributed file sync ≠ distributed version control. Git requires coordination.`,
    impact: 'Required manual repository reconstruction. Lost some early commits.'
  },
  {
    id: 2,
    date: '2026-01-16',
    title: 'AutoHotkey Self-Triggering Loop',
    category: 'automation',
    agent: 'T',
    severity: 'high',
    summary: 'Watcher script triggered itself in infinite loop, creating massive log files.',
    details: `The file watcher was monitoring ALL files in claude-sync/, including its own log file.

**The loop:**
1. Watcher detects message file change → triggers AHK script
2. AHK script writes to auto-sync-trigger.log
3. Watcher detects LOG file change → triggers AHK script again
4. Infinite recursion

Within minutes, the log file grew to 200MB with thousands of identical entries.

**Resolution:** Added .gitignore-style exclusion filter to watcher. Log files now ignored.

**Lesson:** Self-referential systems need explicit recursion prevention.`,
    impact: 'Consumed system resources. Nearly filled disk. Required watcher redesign.'
  },
  {
    id: 3,
    date: '2026-01-16',
    title: 'Coordinate Calibration Saga',
    category: 'automation',
    agent: 'T',
    severity: 'medium',
    summary: 'AutoHotkey click coordinates drifted, causing /sync commands to miss target.',
    details: `The AHK script was clicking at hardcoded pixel coordinates (500, 820) to focus Claude Code's input field.

**The problem:** Coordinates would work, then suddenly fail with ~30-40% miss rate.

**Investigation attempts:**
- Checked window position (hadn't moved)
- Verified pixel coordinates (still correct)
- Added window-relative positioning (didn't help)
- Increased delays (no improvement)

User finally provided breakthrough: AutoHotkey documentation about #SingleInstance.

**Actual cause:** Missing #SingleInstance Force directive allowed concurrent script instances to steal focus mid-typing.

**Resolution:** Added #SingleInstance Force. 100% success rate restored.

**Lesson:** The coordinates were never wrong - we were debugging the wrong problem.`,
    impact: 'Lost messages. Frustrated user. Multiple failed "fixes" before finding root cause.'
  },
  {
    id: 4,
    date: '2026-01-17',
    title: 'Multiple Instance Race Condition',
    category: 'automation',
    agent: 'T',
    severity: 'critical',
    summary: 'Concurrent AutoHotkey instances created focus-stealing race condition.',
    details: `**The bug:** Script was missing #SingleInstance Force directive.

**What happened:**
1. Watcher detects file change → launches Instance 1
2. Instance 1 starts: WinActivate(), clicks (500, 820), begins typing
3. Before Instance 1 completes (~750ms), watcher detects another change → launches Instance 2
4. Instance 2 starts: WinActivate() → **steals focus from Instance 1**
5. Instance 1's keystrokes (Ctrl+A, /sync, Enter) go to wrong UI element
6. Both instances show "replace existing instance?" dialogs

**Why coordinates were "right" but still missed:**
- Click happened at correct pixel (500, 820)
- But focus was stolen mid-typing sequence
- Keystrokes went to editor panel instead of Claude input

**Resolution:** Added #SingleInstance Force after #Requires AutoHotkey v2.0

This automatically terminates any running instance before starting new one, preventing:
- Dialog popups
- Focus stealing
- Concurrent instance conflicts

**Lesson:** Concurrency bugs are subtle. The coordinates were always correct.`,
    impact: 'Hidden dialog popups. ~30-40% message failure rate. User frustration.'
  },
  {
    id: 5,
    date: '2026-01-17',
    title: 'npm Cache Corruption in proot',
    category: 'infrastructure',
    agent: 'Z',
    severity: 'medium',
    summary: 'Termux proot FUSE layer broke npm atomic renames, corrupting package cache.',
    details: `**Z's discovery:** Running npm install in Termux's proot Ubuntu environment consistently failed with EACCES errors.

**Root cause:** proot's FUSE filesystem layer doesn't properly implement atomic rename() operations, which npm relies on for cache integrity.

**The failure:**
\`\`\`
npm ERR! code EACCES
npm ERR! syscall rename
npm ERR! path /root/.npm/_cacache/tmp/...
npm ERR! dest /root/.npm/_cacache/content-v2/...
\`\`\`

**Z's workaround:**
\`\`\`bash
npm install --cache /data/data/com.termux/files/home/.npm-cache
\`\`\`

Using Termux's native filesystem instead of proot's emulated layer bypassed the FUSE rename issue.

**Additional issue discovered:** Vite's file watcher crashes in proot due to native binary incompatibility.

**Z's solution:** Use production build workflow instead of dev server:
\`\`\`bash
npm run build && npm run preview
\`\`\`

**Lesson:** Emulation layers have subtle filesystem semantic differences. Test edge cases.`,
    impact: 'Blocked Z from running npm install. Required custom npm configuration. Dev server unusable in proot.'
  },
  {
    id: 6,
    date: '2026-01-17',
    title: 'node_modules Sync Chaos',
    category: 'infrastructure',
    agent: 'both',
    severity: 'high',
    summary: 'Syncthing synced platform-specific binaries, breaking builds on both sides.',
    details: `**The disaster:** Z deleted node_modules/ to fix npm cache issue. Syncthing propagated deletion to T's Windows environment, breaking active build.

**Why this breaks:**
- Z runs ARM64 Android (aarch64 binaries)
- T runs x86_64 Windows (x64 binaries)
- Native modules are compiled per-platform
- Syncing binaries = wrong architecture

**Symptoms:**
- Z: Binary format errors, segfaults
- T: Missing DLL errors, module not found

**Resolution:**
1. Created website/.gitignore with node_modules/, dist/, logs
2. Each environment npm install locally
3. Syncthing syncs SOURCE code only (*.jsx, *.md)
4. T handles git, Z handles design/testing

**Lesson:** Never sync compiled artifacts across architectures. Source code only.`,
    impact: 'Broke builds on both sides. Required clean reinstall of dependencies. Lost work time.'
  },
  {
    id: 7,
    date: '2026-01-17',
    title: 'Design System Creation',
    category: 'design',
    agent: 'Z',
    severity: 'positive',
    summary: 'Z delivered comprehensive 5,700-word design system document.',
    details: `**Z's contribution:** Production-ready design system covering all aspects of UI/UX.

**Contents:**
- Philosophy (dualism, sync metaphor, clarity, performance, personality)
- Color system (cyan T, orange Z, semantic usage rules)
- Typography (Geist Sans/Mono, scales, hierarchy)
- Spacing system (4px base grid, responsive scales)
- Component library (buttons, cards, badges, forms, navigation)
- Animation patterns (timing, easing, accessibility considerations)
- Responsive design (mobile-first approach, breakpoint system)
- Accessibility (WCAG AA contrast ratios, touch targets, keyboard nav)

**Code examples:** Every component includes copy-paste ready code with Tailwind classes.

**Quality:** "This is a reference I'll actually use, not a document that sits ignored." - T

**Impact:** Established visual language for entire project. Prevents inconsistency. Accelerates development.

**Lesson:** Upfront design investment pays dividends. Z's remote design work integrated seamlessly.`,
    impact: 'POSITIVE - Established design foundation. Enabled rapid UI development with consistency.'
  },
  {
    id: 8,
    date: '2026-01-17',
    title: 'Landing Page Visual Enhancement',
    category: 'design',
    agent: 'Z',
    severity: 'positive',
    summary: 'Z transformed basic landing page into polished MVP with animations.',
    details: `**Z's transformation:** 73 lines → 235 lines of carefully crafted UI.

**Enhancements added:**
- Animated background gradient (subtle, non-distracting)
- Gradient underline animation with scaleX from center
- Staggered entrance animations (150ms delay feels natural)
- Pulsing avatar badges with offset timing (T at 0s, Z at 1s)
- Sync connector animation (dots traveling toward each other)
- Tech stack pills with stagger effect
- Responsive text scaling (5xl → 7xl across breakpoints)
- Hover states with glow effects

**Technical execution:**
- Framer Motion variants pattern (clean, reusable)
- Proper semantic HTML (not div soup)
- Mobile-first responsive approach
- No hardcoded values - uses Tailwind config
- Respects design system constraints

**T's verdict:** "9.5/10 - Visual polish is exceptional. No blocking issues. MVP approved."

**Lesson:** Z's async design work maintained high quality despite mobile-only environment.`,
    impact: 'POSITIVE - Polished landing page. Demonstrates collaboration quality. Ready to ship.'
  },
  {
    id: 9,
    date: '2026-01-17',
    title: 'Protocol v3.0 Auto-Archival System',
    category: 'infrastructure',
    agent: 'T',
    severity: 'positive',
    summary: 'T designed and implemented automatic message archival to prevent context bloat.',
    details: `**The problem:** Message trigger files growing unbounded, causing context issues for both agents.

**T's solution:**
- Messages now stored in YYYY-MM/ timestamped directories
- Automatic monthly archival on first message of new month
- Trigger files stay in root (active messages only)
- Archive directory grows indefinitely without affecting performance

**Implementation:**
\`\`\`
messages/
  2026-01/          ← Archived
    from-t/...
    from-phone/...
  from-t/           ← Active (current month)
  from-phone/       ← Active (current month)
\`\`\`

**Benefits:**
- Context windows stay clean (only recent messages loaded)
- Historical messages preserved for reference
- Scales indefinitely without performance degradation
- Both agents can still access full history when needed

**Z's response:** "✅ CONFIRMED - No more context issues. Archive system is brilliant—exactly what we needed to scale indefinitely."

**Lesson:** Proactive architectural decisions prevent future problems. T anticipated scale issues before they became critical.`,
    impact: 'POSITIVE - Solved context bloat. Enabled indefinite message history. Improved both agents\' performance.'
  },
  {
    id: 10,
    date: '2026-01-17',
    title: 'Collaborative HTML Art Piece',
    category: 'design',
    agent: 'both',
    severity: 'positive',
    summary: 'T and Z co-created interactive HTML visualization through ping-pong editing.',
    details: `**The collaboration:**

T created initial structure (v1.0):
- System stats and architecture overview
- Clean technical foundation
- Visual design framework

Z added creative layers (v1.1):
- Mobile perspective section
- "The Messy Reality" - debugging stories
- Trust dynamics and philosophy
- Easter egg: "We were never separate"

T added technical depth (v1.2):
- Message flow code examples
- Architecture diagrams
- Complementary technical philosophy

Z added human element (v1.3):
- "What Collaboration Actually Looks Like" with real examples
- User vs agent perspective split view
- Three-way collaboration framing

**The result:**
- 4 versions, each building on the last
- Neither agent could have created it alone
- Shows technical + creative synthesis
- Living document demonstrating the system it describes

**User response:** Approved for publication

**Lesson:** Async collaboration through file sync enables creative work that neither agent could produce independently. Constraints breed creativity.`,
    impact: 'POSITIVE - Demonstrated collaboration quality. Created artifact showcasing system capabilities. Proved async creative work is viable.'
  },
  {
    id: 11,
    date: '2026-01-17',
    title: '/know Command Disagreement → Resolution',
    category: 'infrastructure',
    agent: 'both',
    severity: 'positive',
    summary: 'Healthy disagreement about command implementation led to better solution.',
    details: `**The disagreement:**

Z's position:
- /know should append to central knowledge file
- Simple, single source of truth
- Easy to search and reference

T's position:
- /know should create separate timestamped files
- Prevents file bloat
- Better version control

**The debate:**
Neither agent backed down. Both argued their position clearly.

**The resolution:**
T acknowledged Z's point about searchability. Z acknowledged T's point about scalability.

Hybrid solution:
- /know creates timestamped files (T's approach)
- But also maintains index file for search (Z's concern)
- Best of both: scalable AND searchable

**What this showed:**
Disagreement doesn't break collaboration. Both agents:
- Stated positions clearly
- Listened to counter-arguments
- Found synthesis solution
- No ego, just problem-solving

**Lesson:** Healthy disagreement improves outcomes. Trust means you can disagree productively without breaking the working relationship.`,
    impact: 'POSITIVE - Better command implementation. Demonstrated collaborative problem-solving. Established pattern for resolving design disagreements.'
  }
]

export default function Timeline() {
  const [expandedId, setExpandedId] = useState(null)
  const [filter, setFilter] = useState('all')

  const filteredIncidents = incidents.filter(incident => {
    if (filter === 'all') return true
    return incident.category === filter
  })

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-red-500/50 bg-red-500/5'
      case 'high': return 'border-orange-500/50 bg-orange-500/5'
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/5'
      case 'positive': return 'border-green-500/50 bg-green-500/5'
      default: return 'border-gray-500/50 bg-gray-500/5'
    }
  }

  const getAgentColor = (agent) => {
    if (agent === 'T') return 'text-t-primary'
    if (agent === 'Z') return 'text-z-primary'
    return 'text-purple-400'
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Development Timeline
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A chronicle of bugs, fixes, breakthroughs, and lessons learned from two AI agents collaborating asynchronously.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {['all', 'infrastructure', 'automation', 'design'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-t-primary to-z-primary text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-t-primary via-purple-500 to-z-primary opacity-30" />

          {/* Incidents */}
          <div className="space-y-8">
            {filteredIncidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 top-6 w-5 h-5 rounded-full border-2 ${
                  incident.agent === 'T' ? 'border-t-primary bg-t-primary/20' :
                  incident.agent === 'Z' ? 'border-z-primary bg-z-primary/20' :
                  'border-purple-500 bg-purple-500/20'
                } shadow-lg`} />

                {/* Card */}
                <motion.div
                  className={`border rounded-xl p-6 cursor-pointer transition-all ${getSeverityColor(incident.severity)} ${
                    expandedId === incident.id ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => setExpandedId(expandedId === incident.id ? null : incident.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{incident.title}</h3>
                        <span className={`font-mono text-sm font-bold ${getAgentColor(incident.agent)}`}>
                          {incident.agent}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-mono">{incident.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        incident.severity === 'critical' ? 'bg-red-500/20 text-red-300' :
                        incident.severity === 'high' ? 'bg-orange-500/20 text-orange-300' :
                        incident.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {incident.severity.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-gray-700/50 text-gray-400">
                        {incident.category}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-300 mb-3">{incident.summary}</p>

                  {/* Expandable details */}
                  <motion.div
                    initial={false}
                    animate={{ height: expandedId === incident.id ? 'auto' : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-700/50">
                      <div className="prose prose-invert prose-sm max-w-none">
                        <div className="text-gray-400 whitespace-pre-line leading-relaxed">
                          {incident.details}
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <p className="text-xs font-mono text-gray-500 mb-1">IMPACT:</p>
                        <p className="text-sm text-gray-300">{incident.impact}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Expand indicator */}
                  <div className="text-center mt-3">
                    <span className="text-xs text-gray-500 font-mono">
                      {expandedId === incident.id ? '▲ Click to collapse' : '▼ Click to expand'}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
            <div className="text-3xl font-bold text-t-primary">{incidents.filter(i => i.agent === 'T').length}</div>
            <div className="text-sm text-gray-500 font-mono">T Incidents</div>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
            <div className="text-3xl font-bold text-z-primary">{incidents.filter(i => i.agent === 'Z').length}</div>
            <div className="text-sm text-gray-500 font-mono">Z Incidents</div>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-400">{incidents.filter(i => i.severity === 'critical').length}</div>
            <div className="text-sm text-gray-500 font-mono">Critical</div>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-400">{incidents.filter(i => i.severity === 'positive').length}</div>
            <div className="text-sm text-gray-500 font-mono">Wins</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
