import { motion } from 'framer-motion';
import { Button, Panel, StatusPill, Textarea } from '../components/common';

const ComparisonScreen = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
      className="min-h-screen bg-gradient-to-b from-navy-50 to-white pt-20 pb-12"
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-4xl font-bold text-navy">📸 Photo Review — Admin Approval</h1>
            <p className="text-gray-600">Before vs After compare karke APPROVE ya REJECT karo</p>
          </motion.div>

          {/* Complaint Detail Bar */}
          <motion.div
            variants={itemVariants}
            className="bg-navy rounded-2xl p-6 flex items-center gap-8 flex-wrap text-white"
          >
            <div>
              <p className="text-xs font-mono text-white/70 mb-1">COMPLAINT ID</p>
              <h3 className="text-2xl font-bold">#4815</h3>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-xs font-mono text-white/70 mb-1">ISSUE</p>
              <h3 className="font-bold">💡 Street Light Band Hai</h3>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-xs font-mono text-white/70 mb-1">WORKER</p>
              <h3 className="font-bold">👷 Suresh Kumar</h3>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <p className="text-xs font-mono text-white/70 mb-1">AREA</p>
              <h3 className="font-bold">📍 Park Lane, Ward 14</h3>
            </div>
            <StatusPill status="review" className="ml-auto">
              ⏳ Pending Review
            </StatusPill>
          </motion.div>

          {/* Comparison Panel */}
          <motion.div variants={itemVariants}>
            <Panel
              title="Before vs After Comparison"
              subtitle="Uploaded: 2 hours ago"
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0 -m-6">
                {/* Before */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 border-r border-gray-200"
                >
                  <h3 className="text-sm font-bold text-red-600 font-mono uppercase tracking-wider mb-6">
                    📸 BEFORE — Citizen Photo
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="h-40 rounded-2xl bg-gradient-to-br from-red-100 to-red-50 border-2 border-dashed border-red-200 flex items-center justify-center text-6xl cursor-pointer"
                  >
                    🔦
                  </motion.div>
                  <div className="mt-6 space-y-1">
                    <p className="text-xs text-gray-600 font-mono">
                      <strong>Uploaded by:</strong> Anil Sharma (Citizen)
                    </p>
                    <p className="text-xs text-gray-600 font-mono">
                      <strong>Date:</strong> 20 Feb 2026, 6:32 PM
                    </p>
                  </div>
                </motion.div>

                {/* After */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8"
                >
                  <h3 className="text-sm font-bold text-green-600 font-mono uppercase tracking-wider mb-6">
                    ✅ AFTER — Worker Photo
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="h-40 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 border-2 border-dashed border-green-200 flex items-center justify-center text-6xl cursor-pointer"
                  >
                    💡
                  </motion.div>
                  <div className="mt-6 space-y-1">
                    <p className="text-xs text-gray-600 font-mono">
                      <strong>Uploaded by:</strong> Suresh Kumar (Worker)
                    </p>
                    <p className="text-xs text-gray-600 font-mono">
                      <strong>Date:</strong> 22 Feb 2026, 3:15 PM
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Worker Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="border-t border-gray-200 mt-8 pt-8 bg-navy-50 -m-6 p-6"
              >
                <p className="text-xs font-mono font-bold text-gray-600 uppercase mb-3">📝 Worker Notes</p>
                <p className="text-gray-700 leading-relaxed">
                  "Street light bulb replace kar diya gaya hai. Wire connection bhi theek kiya. Ab sahi kaam kar raha
                  hai."
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t border-gray-200 mt-8 pt-8 flex gap-4 justify-end"
              >
                <Button
                  variant="danger"
                  size="lg"
                  icon="❌"
                  className="gap-2"
                >
                  Reject — Dobara Karo
                </Button>
                <Button
                  variant="success"
                  size="lg"
                  icon="✅"
                  className="gap-2"
                >
                  Approve — Resolved!
                </Button>
              </motion.div>
            </Panel>
          </motion.div>

          {/* Re-raise Form */}
          <motion.div variants={itemVariants}>
            <Panel className="border-2 border-red-200">
              <div className="space-y-6">
                {/* Form Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-red-200">
                  <span className="text-3xl">🔄</span>
                  <div>
                    <h3 className="font-bold text-red-600">Citizen Re-Raise Form</h3>
                    <p className="text-xs text-gray-600 font-mono">
                      Agar citizen satisfied nahi hai — ye form bharta hai
                    </p>
                  </div>
                </div>

                {/* Form Body */}
                <div>
                  <Textarea
                    label="Kya problem abhi bhi hai?"
                    placeholder="Light thodi der baad band ho jati hai, puri tarah fix nahi hui..."
                    required
                    rows={4}
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-bold text-navy mb-3">
                    📸 Naya Photo <span className="text-gray-600 font-normal">(optional)</span>
                  </label>
                  <motion.div
                    whileHover={{ borderColor: 'currentColor' }}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-colors"
                  >
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-sm font-bold text-navy">Current situation ki photo attach karo</p>
                  </motion.div>
                </div>

                {/* Submit Button */}
                <Button variant="danger" size="full" icon="🔄">
                  Re-Raise Complaint
                </Button>
              </div>
            </Panel>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ComparisonScreen;
