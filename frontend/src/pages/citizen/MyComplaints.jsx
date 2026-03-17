import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import ComplaintCard from '../../components/ComplaintCard';

const MyComplaints = () => {
  const navigate = useNavigate();
  const [complaints] = useState([
    {
      id: 'CMP-001',
      category: 'Road Damage',
      address: '123 Main Street, Downtown',
      status: 'resolved',
      date: '2024-01-15',
      urgency: 'high',
      sentiment: 'positive',
    },
    {
      id: 'CMP-002',
      category: 'Water Supply',
      address: '456 Oak Ave, North Side',
      status: 'in_progress',
      date: '2024-01-20',
      urgency: 'medium',
      sentiment: 'negative',
    },
    {
      id: 'CMP-003',
      category: 'Street Light',
      address: '789 Elm Road, East Zone',
      status: 'submitted',
      date: '2024-01-22',
      urgency: 'low',
      sentiment: 'neutral',
    },
  ]);

  const handleSubmitNew = () => {
    navigate('/citizen/submit');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      <PageHeader
        title="My Complaints"
        subtitle="Track all your submitted complaints"
        actionButton={
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmitNew}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold"
          >
            + Submit New
          </motion.button>
        }
      />

      {complaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint, idx) => (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <ComplaintCard
                complaint={complaint}
                onClick={() => navigate(`/citizen/complaint/${complaint.id}`)}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-lg text-navy-400">Abhi koi complaint nahi hai</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyComplaints;
