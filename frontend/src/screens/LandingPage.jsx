import { motion } from 'framer-motion';
import { Button, Card, StatCard } from '../components/common';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="animated-gradient grid-pattern min-h-screen relative overflow-hidden">
        {/* Glowing orbs */}
        <motion.div
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -z-10"
        />
        <motion.div
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-10"
        />

        <div className="max-w-7xl mx-auto px-6 h-screen flex items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 items-center w-full"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-saffron/30 rounded-full px-4 py-2 w-fit"
              >
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-saffron"
                />
                <span className="text-sm font-mono font-bold text-saffron-300 uppercase tracking-wider">
                  India Innovates 2026
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                Apni{' '}
                <span className="inline-block text-saffron">
                  Shikayat
                </span>
                <br />
                Register Karo,<br />
                <span className="text-green-300">Hal Dekho</span> 🇮🇳
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg text-white/75 leading-relaxed max-w-md"
              >
                Smart Political CRM — AI-powered complaint management for faster, transparent civic
                governance. Hindi, English, aur Hinglish mein complaint karo.
              </motion.p>

              {/* Buttons */}
              <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
                <Button variant="primary" size="lg" icon="📝">
                  Shikayat Darj Karo
                </Button>
                <Button variant="secondary" size="lg" icon="📍">
                  Status Track Karo
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div variants={itemVariants} className="border-t border-white/10 pt-8 space-y-4">
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { value: '2.4K', label: 'Complaints Resolved', unit: 'K' },
                    { value: '48', label: 'Avg Resolution Time', unit: 'hr' },
                    { value: '94', label: 'Citizen Satisfaction', unit: '%' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <div className="text-3xl font-bold text-white">
                        {stat.value.split(stat.unit)[0]}
                        <span className="text-saffron text-xl ml-1">{stat.unit}</span>
                      </div>
                      <p className="text-xs text-white/60 font-mono uppercase tracking-wider mt-2">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Glassmorphism Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="hidden lg:block"
            >
              <div className="glass glass-card p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔴</span>
                    <span className="text-white font-bold">Live Complaints</span>
                  </div>
                  <span className="text-xs font-mono bg-red-500/20 text-red-300 px-2 py-1 rounded">
                    3 URGENT
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { emoji: '🚰', title: 'Paani Nahi Aa Raha', sub: 'Sector 7 · 3 din se', color: 'border-red-400' },
                    { emoji: '🛣️', title: 'Road Broken', sub: 'Main Market · 1 din se', color: 'border-yellow-400' },
                    { emoji: '💡', title: 'Street Light Band', sub: 'Resolved ✅', color: 'border-green-400' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className={`flex items-center gap-3 bg-white/5 border-l-4 ${item.color} p-3 rounded-lg`}
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <div className="flex-1">
                        <p className="text-white text-sm font-bold">{item.title}</p>
                        <p className="text-white/60 text-xs font-mono">{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-white/10 mt-6 pt-4 grid grid-cols-3 text-center">
                  {[
                    { num: 12, label: 'PENDING', color: 'text-red-300' },
                    { num: 8, label: 'IN PROGRESS', color: 'text-yellow-300' },
                    { num: 47, label: 'RESOLVED', color: 'text-green-300' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.num}</div>
                      <p className="text-xs text-white/60 font-mono mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-navy-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-navy mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed for transparency, speed, and citizen satisfaction
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Categorization',
                desc: 'FastText + mBERT se complaint auto-categorize hoti hai',
              },
              {
                icon: '📸',
                title: 'Photo Evidence System',
                desc: 'Before & After photos se transparency ensure hoti hai',
              },
              {
                icon: '🔔',
                title: 'Real-Time Notifications',
                desc: 'Har status change pe citizen ko update milti hai',
              },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card hover>
                  <div className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-saffron-50 flex items-center justify-center text-4xl mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-navy mb-4">Shuro Karo Aaj Hi</h2>
          <p className="text-gray-600 mb-8">Register karke apni pehli shikayat darj karo</p>
          <Button size="lg" icon="📝">
            Shikayat Darj Karo
          </Button>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default LandingPage;
