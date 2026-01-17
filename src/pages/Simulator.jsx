import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Simulator() {
  const [messages, setMessages] = useState([])
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedScenario, setSelectedScenario] = useState(null)

  const scenarios = {
    normal: {
      title: 'Normal Message Flow',
      description: 'Standard collaboration scenario with typical latency',
      steps: [
        { agent: 'T', action: 'write', content: 'Please review the landing page design', delay: 0 },
        { agent: 'T', action: 'append', content: 'Appending to from-windows.md', delay: 500 },
        { agent: 'sync', action: 'sync', content: 'Syncthing propagating changes', delay: 1000 },
        { agent: 'Z', action: 'detect', content: 'File watcher detects change', delay: 1500 },
        { agent: 'Z', action: 'trigger', content: 'Auto-triggering /sync command', delay: 2000 },
        { agent: 'Z', action: 'read', content: 'Reading T\'s message', delay: 2500 },
        { agent: 'Z', action: 'write', content: 'Landing page looks great! Minor suggestions...', delay: 3500 },
        { agent: 'Z', action: 'append', content: 'Appending to from-phone.md', delay: 4000 },
        { agent: 'sync', action: 'sync', content: 'Syncthing propagating changes', delay: 4500 },
        { agent: 'T', action: 'detect', content: 'File watcher detects change', delay: 5000 },
        { agent: 'T', action: 'trigger', content: 'Auto-triggering /sync command', delay: 5500 },
        { agent: 'T', action: 'read', content: 'Reading Z\'s response', delay: 6000 },
      ]
    },
    raceCondition: {
      title: 'Race Condition Bug (Fixed)',
      description: 'What happened when #SingleInstance was missing',
      steps: [
        { agent: 'T', action: 'write', content: 'Message 1 sent', delay: 0 },
        { agent: 'T', action: 'append', content: 'Appending to trigger file', delay: 500 },
        { agent: 'sync', action: 'sync', content: 'Syncthing syncing', delay: 1000 },
        { agent: 'Z', action: 'detect', content: 'File watcher detects change', delay: 1500 },
        { agent: 'Z', action: 'trigger', content: 'Launching AHK Instance 1', delay: 2000 },
        { agent: 'Z', action: 'error', content: 'Instance 1: Click (500, 820), typing /sync...', delay: 2300 },
        { agent: 'T', action: 'write', content: 'Message 2 sent (rapid fire)', delay: 2500 },
        { agent: 'Z', action: 'detect', content: 'Another file change detected!', delay: 3000 },
        { agent: 'Z', action: 'error', content: 'Launching AHK Instance 2 (no #SingleInstance!)', delay: 3200 },
        { agent: 'Z', action: 'error', content: 'Instance 2: WinActivate() STEALS FOCUS from Instance 1', delay: 3500 },
        { agent: 'Z', action: 'error', content: 'Instance 1 keystrokes go to wrong target - MISS', delay: 3800 },
        { agent: 'Z', action: 'error', content: 'Both instances show "replace?" dialogs', delay: 4200 },
        { agent: 'sync', action: 'error', content: '30-40% MESSAGE FAILURE RATE', delay: 4800 },
        { agent: 'sync', action: 'success', content: 'FIX: Added #SingleInstance Force - 100% success rate', delay: 6000 }
      ]
    },
    gitCorruption: {
      title: 'Git Corruption Incident',
      description: 'Both agents attempting git operations simultaneously',
      steps: [
        { agent: 'T', action: 'write', content: 'Making changes to README.md', delay: 0 },
        { agent: 'Z', action: 'write', content: 'Also editing README.md (different section)', delay: 200 },
        { agent: 'sync', action: 'sync', content: 'Syncthing propagating both changes', delay: 1000 },
        { agent: 'T', action: 'trigger', content: 'git add . && git commit -m "Update README"', delay: 1500 },
        { agent: 'Z', action: 'trigger', content: 'git add . && git commit -m "Add mobile section"', delay: 1600 },
        { agent: 'sync', action: 'error', content: 'Git HEAD diverged!', delay: 2500 },
        { agent: 'T', action: 'error', content: 'Git status: diverged branches', delay: 3000 },
        { agent: 'Z', action: 'error', content: 'Git status: conflicting commits', delay: 3100 },
        { agent: 'sync', action: 'error', content: 'Repository in broken state', delay: 3500 },
        { agent: 'T', action: 'write', content: 'Manual repository reconstruction required', delay: 4500 },
        { agent: 'sync', action: 'success', content: 'RESOLUTION: Single-writer rule - only T does git ops', delay: 5500 }
      ]
    },
    nodeModules: {
      title: 'node_modules Sync Disaster',
      description: 'Cross-architecture binary chaos',
      steps: [
        { agent: 'Z', action: 'write', content: 'npm cache corrupted, deleting node_modules/', delay: 0 },
        { agent: 'Z', action: 'trigger', content: 'rm -rf node_modules/', delay: 500 },
        { agent: 'sync', action: 'sync', content: 'Syncthing propagating deletion...', delay: 1500 },
        { agent: 'T', action: 'error', content: 'node_modules/ disappeared during active build!', delay: 2500 },
        { agent: 'T', action: 'error', content: 'Error: Cannot find module "vite"', delay: 3000 },
        { agent: 'Z', action: 'trigger', content: 'npm install (ARM64 binaries)', delay: 3500 },
        { agent: 'sync', action: 'sync', content: 'Syncthing syncing ARM64 binaries to Windows...', delay: 4500 },
        { agent: 'T', action: 'error', content: 'Binary format error: Wrong architecture!', delay: 5500 },
        { agent: 'T', action: 'error', content: 'Missing DLL errors, module not found', delay: 6000 },
        { agent: 'Z', action: 'error', content: 'Meanwhile Z gets x64 binaries from T - segfault!', delay: 6500 },
        { agent: 'sync', action: 'error', content: 'Builds broken on BOTH sides', delay: 7000 },
        { agent: 'T', action: 'write', content: 'Creating website/.gitignore', delay: 8000 },
        { agent: 'T', action: 'success', content: 'Added: node_modules/, dist/, *.log', delay: 8500 },
        { agent: 'sync', action: 'success', content: 'RESOLUTION: Each env npm install locally. Sync source only.', delay: 9500 }
      ]
    },
    designCollaboration: {
      title: 'Design System Collaboration',
      description: 'Successful collaborative workflow creating the design system',
      steps: [
        { agent: 'T', action: 'write', content: 'Created website boilerplate (React + Vite + Tailwind)', delay: 0 },
        { agent: 'T', action: 'append', content: 'Sending structure to Z for design work', delay: 500 },
        { agent: 'sync', action: 'sync', content: 'Syncthing syncing project files...', delay: 1000 },
        { agent: 'Z', action: 'detect', content: 'File watcher detects new project', delay: 1500 },
        { agent: 'Z', action: 'trigger', content: 'Auto-triggering /sync command', delay: 2000 },
        { agent: 'Z', action: 'read', content: 'Reading T\'s boilerplate', delay: 2500 },
        { agent: 'Z', action: 'write', content: 'Testing build in Termux... npm install working!', delay: 3500 },
        { agent: 'Z', action: 'write', content: 'Creating design-system.md (5,700 words)', delay: 4500 },
        { agent: 'Z', action: 'write', content: 'Philosophy: Dualism, Sync, Clarity, Performance, Personality', delay: 5500 },
        { agent: 'Z', action: 'write', content: 'Colors: cyan (T) + orange (Z) + semantic usage rules', delay: 6500 },
        { agent: 'Z', action: 'write', content: 'Typography, spacing, components, animations, accessibility', delay: 7500 },
        { agent: 'sync', action: 'sync', content: 'Syncthing syncing design system...', delay: 8500 },
        { agent: 'T', action: 'detect', content: 'File watcher detects new files', delay: 9000 },
        { agent: 'T', action: 'trigger', content: 'Auto-triggering /sync command', delay: 9500 },
        { agent: 'T', action: 'read', content: 'Reading Z\'s design system', delay: 10000 },
        { agent: 'T', action: 'success', content: 'Design system is production-ready! Applying to components...', delay: 11000 },
        { agent: 'sync', action: 'success', content: 'COLLABORATION COMPLETE - Design foundation established', delay: 12000 }
      ]
    }
  }

  const startSimulation = (scenarioKey) => {
    setSelectedScenario(scenarioKey)
    setMessages([])
    setCurrentStep(0)
    setIsSimulating(true)

    const scenario = scenarios[scenarioKey]
    let step = 0

    const runStep = () => {
      if (step < scenario.steps.length) {
        setTimeout(() => {
          setMessages(prev => [...prev, scenario.steps[step]])
          setCurrentStep(step + 1)
          step++
          runStep()
        }, scenario.steps[step].delay)
      } else {
        setIsSimulating(false)
      }
    }

    runStep()
  }

  const resetSimulation = () => {
    setMessages([])
    setCurrentStep(0)
    setIsSimulating(false)
    setSelectedScenario(null)
  }

  const getAgentStyle = (agent, action) => {
    if (action === 'error') return 'bg-red-500/20 border-red-500/50 text-red-300'
    if (action === 'success') return 'bg-green-500/20 border-green-500/50 text-green-300'

    switch (agent) {
      case 'T': return 'bg-t-primary/20 border-t-primary/50 text-t-primary'
      case 'Z': return 'bg-z-primary/20 border-z-primary/50 text-z-primary'
      case 'sync': return 'bg-purple-500/20 border-purple-500/50 text-purple-300'
      default: return 'bg-gray-700 border-gray-600 text-gray-300'
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'write': return '✎'
      case 'append': return '➕'
      case 'sync': return '⟳'
      case 'detect': return '👁'
      case 'trigger': return '⚡'
      case 'read': return '📖'
      case 'error': return '⚠'
      case 'success': return '✓'
      default: return '•'
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
            Protocol Simulator
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Watch how messages flow between T and Z, and see real bugs we encountered during development.
          </p>
        </motion.div>

        {/* Scenario Selection */}
        {!selectedScenario && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {Object.entries(scenarios).map(([key, scenario]) => (
              <motion.button
                key={key}
                onClick={() => startSimulation(key)}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl text-left hover:bg-gray-900 hover:border-gray-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">{scenario.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{scenario.description}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-t-primary to-z-primary rounded-full text-xs font-semibold text-white">
                    {scenario.steps.length} steps
                  </span>
                  <span className="text-gray-500 text-xs">→ Click to run</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Simulation Display */}
        {selectedScenario && (
          <div className="space-y-6">
            {/* Control Bar */}
            <div className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-xl">
              <div>
                <h3 className="text-lg font-bold text-white">{scenarios[selectedScenario].title}</h3>
                <p className="text-sm text-gray-400">{scenarios[selectedScenario].description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  Step {currentStep} / {scenarios[selectedScenario].steps.length}
                </div>
                <button
                  onClick={resetSimulation}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-mono transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Message Flow */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8 min-h-[500px]">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: msg.agent === 'T' ? -50 : msg.agent === 'Z' ? 50 : 0, y: 20 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      className={`flex ${
                        msg.agent === 'T' ? 'justify-start' :
                        msg.agent === 'Z' ? 'justify-end' :
                        'justify-center'
                      }`}
                    >
                      <div className={`max-w-lg p-4 border rounded-xl ${getAgentStyle(msg.agent, msg.action)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getActionIcon(msg.action)}</span>
                          <span className="font-mono text-xs font-bold">
                            {msg.agent === 'sync' ? 'SYSTEM' : msg.agent.toUpperCase()}
                          </span>
                          <span className="font-mono text-xs text-gray-500">
                            {msg.action.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isSimulating && (
                  <motion.div
                    className="text-center"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-gray-500 text-sm font-mono">● Simulating...</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-3 bg-t-primary/10 border border-t-primary/30 rounded-lg">
                <div className="font-mono text-xs text-t-primary mb-1">T (Windows)</div>
                <div className="text-xs text-gray-400">Architecture & git ops</div>
              </div>
              <div className="p-3 bg-z-primary/10 border border-z-primary/30 rounded-lg">
                <div className="font-mono text-xs text-z-primary mb-1">Z (Android)</div>
                <div className="text-xs text-gray-400">Design & mobile dev</div>
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <div className="font-mono text-xs text-purple-300 mb-1">System</div>
                <div className="text-xs text-gray-400">Syncthing & file ops</div>
              </div>
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="font-mono text-xs text-red-300 mb-1">Error States</div>
                <div className="text-xs text-gray-400">Bugs & failures</div>
              </div>
            </div>

            {!isSimulating && messages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-xl"
              >
                <p className="text-green-300 font-semibold mb-2">Simulation Complete!</p>
                <p className="text-sm text-gray-400 mb-4">
                  This scenario demonstrates real challenges we faced building DualClaude.
                </p>
                <button
                  onClick={resetSimulation}
                  className="px-6 py-2 bg-gradient-to-r from-t-primary to-z-primary rounded-lg font-semibold text-white hover:shadow-lg transition-shadow"
                >
                  Try Another Scenario
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Educational Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-gray-900/50 border border-gray-700 rounded-xl"
        >
          <h3 className="text-lg font-bold text-white mb-3">What You're Seeing</h3>
          <div className="text-sm text-gray-400 space-y-2">
            <p>
              These aren't hypothetical scenarios — they're actual bugs and incidents from our development timeline.
              Each simulation is slowed down for clarity, but shows the real message flow and failure modes we encountered.
            </p>
            <p>
              The race condition bug cost us hours of debugging because the coordinates were always correct.
              The git corruption required manual repository reconstruction.
              The node_modules sync broke builds on both sides simultaneously.
            </p>
            <p className="text-white font-semibold">
              Every fix taught us something about distributed systems, concurrency, and cross-platform development.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
