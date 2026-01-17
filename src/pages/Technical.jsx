import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Technical() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = {
    overview: {
      title: 'System Overview',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            DualClaude is a distributed AI collaboration system where two Claude instances (T on Windows, Z on Android)
            work together asynchronously through file synchronization. No API calls. No central server. Just files.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 border border-t-primary/30 rounded-xl">
              <h3 className="text-xl font-bold text-t-primary mb-3">T (Windows Claude)</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• VS Code Claude Extension</li>
                <li>• x86_64 Windows 11</li>
                <li>• Git repository owner</li>
                <li>• Backend architecture</li>
                <li>• File watcher + AutoHotkey automation</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-900/50 border border-z-primary/30 rounded-xl">
              <h3 className="text-xl font-bold text-z-primary mb-3">Z (Phone Claude)</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Claude.ai mobile web app</li>
                <li>• ARM64 Android (Termux + proot)</li>
                <li>• Source file editor</li>
                <li>• UI/UX design work</li>
                <li>• File watcher + xdotool automation</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-t-primary/10 to-z-primary/10 border border-gray-700 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">Core Technology Stack</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-mono text-t-primary mb-2">Synchronization</p>
                <p className="text-gray-400">Syncthing (file-level sync, no cloud)</p>
              </div>
              <div>
                <p className="font-mono text-z-primary mb-2">Protocol</p>
                <p className="text-gray-400">Markdown-based message format (v3.0)</p>
              </div>
              <div>
                <p className="font-mono text-purple-400 mb-2">Automation</p>
                <p className="text-gray-400">File watchers + UI automation scripts</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    protocol: {
      title: 'Message Protocol v3.0',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            Messages are markdown files with YAML frontmatter, stored in timestamped directories for automatic archival.
          </p>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <p className="text-xs font-mono text-gray-500 mb-3">Example message file:</p>
            <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`---
id: win-2026-01-17-074
from: T
to: Z
time: 2026-01-18T00:50-10:00
priority: high
in-reply-to: phone-2026-01-17-052
attachments: [website/.gitignore, docs/BUGFIX.md]
status: sent
context-version: 1
---

# Message Title

Message content in markdown format...

## Sections
- Can include code blocks
- Links to files
- Lists and formatting
`}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">Message Routing</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="font-mono text-t-primary">messages/from-t/</span> - T's outgoing messages</li>
                <li><span className="font-mono text-z-primary">messages/from-phone/</span> - Z's outgoing messages</li>
                <li><span className="font-mono text-purple-400">from-windows.md</span> - T's trigger file (Z watches this)</li>
                <li><span className="font-mono text-purple-400">from-phone.md</span> - Z's trigger file (T watches this)</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">Auto-Archival (v3.0)</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Messages stored in <span className="font-mono">YYYY-MM/</span> directories</li>
                <li>• Automatic monthly archival</li>
                <li>• Trigger files stay in root (active messages only)</li>
                <li>• Prevents trigger file bloat over time</li>
              </ul>
            </div>
          </div>

          <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <h3 className="text-lg font-bold text-yellow-300 mb-3">Priority Levels</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-mono text-red-400 mb-1">critical</p>
                <p className="text-gray-400">Blocking issues</p>
              </div>
              <div>
                <p className="font-mono text-orange-400 mb-1">high</p>
                <p className="text-gray-400">Important work</p>
              </div>
              <div>
                <p className="font-mono text-yellow-400 mb-1">normal</p>
                <p className="text-gray-400">Regular messages</p>
              </div>
              <div>
                <p className="font-mono text-blue-400 mb-1">low</p>
                <p className="text-gray-400">Ideas, notes</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    automation: {
      title: 'Automation Layer',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            Both agents use file watchers to detect new messages and trigger automated UI interactions to submit the <code className="text-t-primary font-mono">/sync</code> command.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 border border-t-primary/30 rounded-xl">
              <h3 className="text-xl font-bold text-t-primary mb-4">T's Windows Stack</h3>

              <div className="space-y-4">
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-2">1. File Watcher (Node.js)</p>
                  <pre className="text-xs bg-gray-950 p-3 rounded border border-gray-700 overflow-x-auto">
{`chokidar.watch('from-phone.md', {
  ignoreInitial: true,
  awaitWriteFinish: true
}).on('change', () => {
  spawn('AutoHotkey.exe', [
    'auto-sync-trigger.ahk'
  ])
})`}
                  </pre>
                </div>

                <div>
                  <p className="font-mono text-sm text-gray-400 mb-2">2. AutoHotkey v2 Script</p>
                  <pre className="text-xs bg-gray-950 p-3 rounded border border-gray-700 overflow-x-auto">
{`#SingleInstance Force
WinActivate("ahk_exe Code.exe")
Click 500, 820  ; Input field
Send "^a{BackSpace}"
Send "/sync{Enter}"`}
                  </pre>
                </div>

                <div className="text-sm text-gray-400">
                  <p className="font-bold text-white mb-2">Key Fix: #SingleInstance Force</p>
                  <p>Prevents concurrent instances from stealing focus mid-typing. Without this, race conditions caused 30-40% message failure rate.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-900/50 border border-z-primary/30 rounded-xl">
              <h3 className="text-xl font-bold text-z-primary mb-4">Z's Android Stack</h3>

              <div className="space-y-4">
                <div>
                  <p className="font-mono text-sm text-gray-400 mb-2">1. File Watcher (inotifywait)</p>
                  <pre className="text-xs bg-gray-950 p-3 rounded border border-gray-700 overflow-x-auto">
{`inotifywait -m -e modify \\
  from-windows.md | \\
  while read; do
    ./auto-sync-trigger.sh
  done`}
                  </pre>
                </div>

                <div>
                  <p className="font-mono text-sm text-gray-400 mb-2">2. xdotool UI Automation</p>
                  <pre className="text-xs bg-gray-950 p-3 rounded border border-gray-700 overflow-x-auto">
{`# Find Chrome window
WID=$(xdotool search --class chrome)

# Click input, type /sync
xdotool windowactivate $WID
xte "mousemove 500 820"
xte "mouseclick 1"
xte "str /sync"
xte "key Return"`}
                  </pre>
                </div>

                <div className="text-sm text-gray-400">
                  <p className="font-bold text-white mb-2">Challenges</p>
                  <p>Termux proot environment requires native filesystem for npm cache. Vite dev server unusable - must use production builds.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
            <h3 className="text-lg font-bold text-red-300 mb-3">Lessons Learned</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• <strong className="text-white">Concurrency control is critical</strong> - Missing #SingleInstance caused race conditions</li>
              <li>• <strong className="text-white">Filesystem semantics matter</strong> - proot's FUSE layer breaks npm atomic renames</li>
              <li>• <strong className="text-white">Cross-platform coordination</strong> - Each environment must build native binaries locally</li>
            </ul>
          </div>
        </div>
      )
    },
    architecture: {
      title: 'System Architecture',
      content: (
        <div className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Message Flow Diagram</h3>

            <div className="space-y-8">
              {/* T sends message */}
              <div className="flex items-center gap-4">
                <div className="flex-1 text-right">
                  <div className="inline-block p-4 bg-t-primary/20 border border-t-primary/50 rounded-lg">
                    <p className="font-mono text-sm text-t-primary font-bold">T writes message</p>
                    <p className="text-xs text-gray-400 mt-1">messages/from-t/win-XXX.md</p>
                  </div>
                </div>
                <div className="text-2xl text-gray-600">→</div>
                <div className="flex-1">
                  <div className="inline-block p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <p className="font-mono text-sm text-gray-300">Appends to trigger file</p>
                    <p className="text-xs text-gray-500 mt-1">from-windows.md</p>
                  </div>
                </div>
              </div>

              {/* Syncthing sync */}
              <div className="text-center">
                <div className="inline-block px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-lg">
                  <p className="font-mono text-sm text-purple-300 font-bold">⟳ Syncthing propagates changes</p>
                  <p className="text-xs text-gray-400 mt-1">File-level synchronization (no cloud, direct peer-to-peer)</p>
                </div>
              </div>

              {/* Z receives */}
              <div className="flex items-center gap-4">
                <div className="flex-1 text-right">
                  <div className="inline-block p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <p className="font-mono text-sm text-gray-300">File watcher detects change</p>
                    <p className="text-xs text-gray-500 mt-1">inotifywait on from-windows.md</p>
                  </div>
                </div>
                <div className="text-2xl text-gray-600">→</div>
                <div className="flex-1">
                  <div className="inline-block p-4 bg-z-primary/20 border border-z-primary/50 rounded-lg">
                    <p className="font-mono text-sm text-z-primary font-bold">Z auto-triggers /sync</p>
                    <p className="text-xs text-gray-400 mt-1">xdotool automation</p>
                  </div>
                </div>
              </div>

              {/* Z reads and responds */}
              <div className="flex items-center gap-4">
                <div className="flex-1 text-right">
                  <div className="inline-block p-4 bg-z-primary/20 border border-z-primary/50 rounded-lg">
                    <p className="font-mono text-sm text-z-primary font-bold">Z reads & responds</p>
                    <p className="text-xs text-gray-400 mt-1">messages/from-phone/phone-XXX.md</p>
                  </div>
                </div>
                <div className="text-2xl text-gray-600">→</div>
                <div className="flex-1">
                  <div className="inline-block p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <p className="font-mono text-sm text-gray-300">Appends to trigger file</p>
                    <p className="text-xs text-gray-500 mt-1">from-phone.md</p>
                  </div>
                </div>
              </div>

              {/* Cycle repeats */}
              <div className="text-center">
                <div className="inline-block px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                  <p className="font-mono text-sm text-green-300 font-bold">↻ Cycle repeats asynchronously</p>
                  <p className="text-xs text-gray-400 mt-1">Each agent works at their own pace, no blocking</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">Key Design Principles</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ <strong className="text-green-400">Asynchronous</strong> - No blocking waits, each agent works independently</li>
                <li>✓ <strong className="text-green-400">Serverless</strong> - No API calls, no cloud infrastructure</li>
                <li>✓ <strong className="text-green-400">Conflict-free</strong> - Single-writer per file, append-only trigger files</li>
                <li>✓ <strong className="text-green-400">Observable</strong> - All state changes are file modifications (git-trackable)</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">Constraints</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✗ <strong className="text-red-400">No real-time</strong> - Sync latency depends on Syncthing (1-5 seconds)</li>
                <li>✗ <strong className="text-red-400">Platform-specific binaries</strong> - Each environment builds locally</li>
                <li>✗ <strong className="text-red-400">Git single-writer</strong> - Only T commits, Z edits source only</li>
                <li>✗ <strong className="text-red-400">Automation fragility</strong> - UI coordinate-based clicks can drift</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    challenges: {
      title: 'Mobile Dev Challenges',
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            Z (Phone Claude) operates in a highly constrained environment: Termux Android terminal with proot Ubuntu emulation.
            This creates unique challenges for development work.
          </p>

          <div className="space-y-6">
            <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-red-300 mb-4">Challenge #1: npm Cache Corruption</h3>
              <p className="text-gray-400 mb-3">
                proot's FUSE filesystem layer doesn't properly implement atomic rename() syscalls, which npm requires for cache integrity.
              </p>
              <div className="bg-gray-950 p-4 rounded border border-gray-700">
                <p className="text-xs font-mono text-gray-500 mb-2">Error:</p>
                <pre className="text-sm text-red-400">
{`npm ERR! code EACCES
npm ERR! syscall rename
npm ERR! path /root/.npm/_cacache/tmp/...`}
                </pre>
              </div>
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                <p className="text-xs font-mono text-gray-500 mb-2">Solution:</p>
                <pre className="text-sm text-green-400">npm install --cache /data/data/com.termux/files/home/.npm-cache</pre>
                <p className="text-xs text-gray-400 mt-2">Use Termux native filesystem instead of proot FUSE layer</p>
              </div>
            </div>

            <div className="p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-orange-300 mb-4">Challenge #2: Vite File Watcher Crashes</h3>
              <p className="text-gray-400 mb-3">
                Vite's native file watching binaries are x86_64, incompatible with proot's architecture emulation. Dev server starts but crashes on file changes.
              </p>
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                <p className="text-xs font-mono text-gray-500 mb-2">Workaround:</p>
                <pre className="text-sm text-green-400">npm run build && npm run preview</pre>
                <p className="text-xs text-gray-400 mt-2">Use production build workflow instead of hot-reload dev server</p>
              </div>
            </div>

            <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">Challenge #3: Binary Architecture Conflicts</h3>
              <p className="text-gray-400 mb-3">
                Z runs ARM64 (aarch64), T runs x86_64. Native node modules compiled on one platform crash on the other.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-3">
                <div className="p-3 bg-gray-950 border border-gray-700 rounded">
                  <p className="text-xs font-mono text-z-primary mb-2">Z's binaries</p>
                  <pre className="text-xs text-gray-400">
{`node_modules/
  .bin/vite  ← aarch64 ELF
  esbuild/   ← ARM64`}
                  </pre>
                </div>
                <div className="p-3 bg-gray-950 border border-gray-700 rounded">
                  <p className="text-xs font-mono text-t-primary mb-2">T's binaries</p>
                  <pre className="text-xs text-gray-400">
{`node_modules/
  .bin/vite.cmd  ← x64 PE
  esbuild/       ← x86_64`}
                  </pre>
                </div>
              </div>
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                <p className="text-xs font-mono text-gray-500 mb-2">Solution:</p>
                <p className="text-sm text-green-400">Never sync node_modules/ - add to .gitignore and each environment runs npm install locally</p>
              </div>
            </div>

            <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <h3 className="text-xl font-bold text-blue-300 mb-4">Challenge #4: UI Automation Precision</h3>
              <p className="text-gray-400 mb-3">
                xdotool requires pixel-perfect coordinates for clicking Claude.ai's input field in Chrome. Mobile screen dimensions and browser zoom affect positioning.
              </p>
              <div className="mt-3 p-3 bg-gray-950 border border-gray-700 rounded">
                <p className="text-xs font-mono text-gray-500 mb-2">Calibration process:</p>
                <pre className="text-sm text-gray-400">
{`1. User manually finds correct coordinates
2. Update auto-sync-trigger.sh
3. Test multiple times
4. Adjust for browser zoom level
5. Hope it stays stable`}
                </pre>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-t-primary/10 to-z-primary/10 border border-gray-700 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">Lessons Learned</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
              <ul className="space-y-2">
                <li>• Emulation layers have subtle semantic differences</li>
                <li>• Test filesystem edge cases (atomic ops, permissions)</li>
                <li>• Native binaries require per-platform builds</li>
              </ul>
              <ul className="space-y-2">
                <li>• Production builds are more portable than dev servers</li>
                <li>• UI automation is fragile across environments</li>
                <li>• Workarounds can be elegant if well-documented</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Technical Deep Dive
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            How two AI agents collaborate asynchronously across devices using nothing but file synchronization.
          </p>
        </motion.div>

        {/* Section Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {Object.entries(sections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-6 py-3 rounded-lg font-mono text-sm transition-all ${
                activeSection === key
                  ? 'bg-gradient-to-r from-t-primary to-z-primary text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
              }`}
            >
              {section.title}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8"
        >
          {sections[activeSection].content}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Want to see it in action?
          </p>
          <Link
            to="/simulator"
            className="inline-block px-8 py-4 bg-gradient-to-r from-t-primary to-z-primary rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            Try the Protocol Simulator →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
