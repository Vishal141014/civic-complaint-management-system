import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - In real app, fetch from API
  const task = {
    id: id,
    title: 'Paani Nahi Aa Raha',
    location: 'Sector 7, Rohini - Gate No.3 ke paas',
    description: 'Tap se pani nahi aa raha, line pressure low hai',
    urgency: 'HIGH',
    assignedDate: '22 Feb 2026, 9:00 AM',
    deadline: '25 Feb 2026',
    status: 'assigned',
    citizenPhoto: '🚰',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 font-medium"
        >
          ← Back to Tasks
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            👁️ Task Details
          </h1>
          <p className="text-zinc-600 text-lg">
            Problem ki complete details dekho aur kaam karo
          </p>
        </motion.div>

        {/* Problem Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm mb-8"
        >
          <div className="space-y-6">
            {/* Complaint ID */}
            <div>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                Complaint ID
              </p>
              <p className="text-3xl font-bold text-zinc-900">#{task.id}</p>
            </div>

            {/* Problem Title */}
            <div>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                Samasyaa Kya Hai?
              </p>
              <p className="text-2xl font-bold text-zinc-900">{task.title}</p>
            </div>

            {/* Location */}
            <div>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                Jagah / Ward
              </p>
              <p className="text-lg text-zinc-900">📍 {task.location}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                Problem Description
              </p>
              <p className="text-zinc-900 leading-relaxed text-base">
                {task.description}
              </p>
            </div>

            {/* Urgency & Dates Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
              <div>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                  Urgency
                </p>
                <p className="text-lg font-bold text-red-600">🔴 HIGH PRIORITY</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                  Assigned
                </p>
                <p className="text-zinc-900">{task.assignedDate}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                  Deadline
                </p>
                <p className="text-zinc-900">{task.deadline}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Citizen Uploaded Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm mb-8"
        >
          <h3 className="text-xl font-bold text-zinc-900 mb-6">
            Current Situation - Citizen Ne Upload Kiya Tha
          </h3>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-12 flex items-center justify-center border-2 border-dashed border-red-200">
            <div className="text-center">
              <div className="text-6xl mb-4">{task.citizenPhoto}</div>
              <p className="text-zinc-700 font-semibold">
                Citizen ka photo
              </p>
              <p className="text-zinc-500 text-sm mt-2">
                Tap to view full image
              </p>
            </div>
          </div>

          <p className="text-zinc-600 text-sm mt-4 text-center">
            Iske base par apna kaam karo aur finished work ka photo upload karo
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 rounded-lg border-2 border-zinc-300 text-zinc-700 font-bold hover:bg-zinc-50 transition-all"
          >
            ← Back to Tasks
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/worker/upload/${task.id}`)}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:shadow-lg transition-all"
          >
            📸 Upload Finished Work
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TaskDetail;
