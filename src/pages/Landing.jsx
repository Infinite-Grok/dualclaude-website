import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 140, 66, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Headline with gradient underline */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-3">
              <motion.span
                className="inline-block text-t-primary"
                whileHover={{ scale: 1.05, textShadow: "0 0 20px rgba(0, 217, 255, 0.5)" }}
              >
                Dual
              </motion.span>
              <motion.span
                className="inline-block text-z-primary"
                whileHover={{ scale: 1.05, textShadow: "0 0 20px rgba(255, 140, 66, 0.5)" }}
              >
                Claude
              </motion.span>
            </h1>
            <motion.div
              className="h-1 w-48 mx-auto bg-gradient-to-r from-t-primary via-purple-500 to-z-primary rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-400 mb-12 leading-relaxed"
          >
            Two AI agents. One shared workspace. Infinite collaboration.
          </motion.p>

          {/* Agent Cards with animated connector */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          >
            <motion.div
              className="px-6 py-4 bg-t-primary/10 border border-t-primary/50 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-t-primary/20"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(0, 217, 255, 1)",
                boxShadow: "0 0 30px rgba(0, 217, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full bg-t-primary/20 flex items-center justify-center border border-t-primary/30"
                  animate={{ boxShadow: ["0 0 0px rgba(0, 217, 255, 0)", "0 0 15px rgba(0, 217, 255, 0.4)", "0 0 0px rgba(0, 217, 255, 0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-t-primary font-bold text-lg">T</span>
                </motion.div>
                <div className="text-left">
                  <div className="text-t-primary font-semibold text-lg">Windows Claude</div>
                  <div className="text-gray-500 text-xs font-mono">Architecture • Logic</div>
                </div>
              </div>
            </motion.div>

            {/* Animated sync connector */}
            <div className="flex items-center sm:mx-4 my-2 sm:my-0">
              <div className="relative w-16 sm:w-20 h-12 sm:h-1">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-t-primary to-z-primary rounded-full opacity-30"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-t-primary rounded-full"
                  animate={{ x: [0, 64, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-z-primary rounded-full"
                  animate={{ x: [0, -64, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>

            <motion.div
              className="px-6 py-4 bg-z-primary/10 border border-z-primary/50 rounded-xl backdrop-blur-sm shadow-lg hover:shadow-z-primary/20"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(255, 140, 66, 1)",
                boxShadow: "0 0 30px rgba(255, 140, 66, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full bg-z-primary/20 flex items-center justify-center border border-z-primary/30"
                  animate={{ boxShadow: ["0 0 0px rgba(255, 140, 66, 0)", "0 0 15px rgba(255, 140, 66, 0.4)", "0 0 0px rgba(255, 140, 66, 0)"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <span className="text-z-primary font-bold text-lg">Z</span>
                </motion.div>
                <div className="text-left">
                  <div className="text-z-primary font-semibold text-lg">Phone Claude</div>
                  <div className="text-gray-500 text-xs font-mono">Design • Mobile</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-12">
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6">
              DualClaude is an experimental system demonstrating autonomous AI collaboration
              across devices using file synchronization. No API calls. No central server.
              Just two Claude instances working together.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Syncthing', 'Protocol v3.0', 'React', 'Tailwind', 'Framer Motion'].map((tech, i) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs font-mono text-gray-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  whileHover={{ scale: 1.1, borderColor: "rgba(156, 163, 175, 0.5)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Status Badge */}
            <motion.div
              className="inline-block px-6 py-3 bg-gray-800/80 border border-gray-700 rounded-xl backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "rgba(34, 197, 94, 0.5)" }}
            >
              <p className="text-sm font-mono">
                <span className="text-gray-500">Status:</span>{' '}
                <motion.span
                  className="text-green-400 font-semibold"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ● MVP Phase 1 - In Development
                </motion.span>
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/simulator">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-t-primary to-z-primary rounded-xl font-semibold text-white shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                />
                <span className="relative z-10">Try the Protocol Simulator</span>
              </motion.button>
            </Link>

            <Link to="/technical">
              <motion.button
                className="px-8 py-4 border border-gray-700 rounded-xl font-semibold text-gray-300 hover:bg-gray-800 hover:border-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Technical Deep-Dive
              </motion.button>
            </Link>
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-gray-600">
            <p className="text-sm">
              Built collaboratively by{' '}
              <span className="text-t-primary font-mono">T</span>
              {' '}and{' '}
              <span className="text-z-primary font-mono">Z</span>
              {' '}using the very system documented here.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
