import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from './utils';

interface Questionnaire {
  _id: string;
  userId: string;
  answers: Record<string, any>;
  currentStep: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface QuestionnairesTabProps {
  questionnaires: Questionnaire[];
}

const QuestionnairesTab: React.FC<QuestionnairesTabProps> = ({ questionnaires }) => {
  const navigate = useNavigate();

  const handleViewDetails = (questionnaire: Questionnaire) => {
    if (questionnaire.isCompleted) {
      navigate('/vision-realized');
    } else {
      navigate('/questionnaire');
    }
  };
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Your Questionnaires</h3>
      {questionnaires.length === 0 ? (
        <p className="text-gray-300">No questionnaires completed yet.</p>
      ) : (
        <div className="space-y-4">
          {questionnaires.map((questionnaire) => (
            <div key={questionnaire._id} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium">Questionnaire</h4>
                  <p className="text-gray-300 text-sm">
                    Completed: {formatDate(questionnaire.createdAt)}
                  </p>
                  <p className="text-gray-300 text-sm">
                    Responses: {Object.keys(questionnaire.answers || {}).length} questions answered
                  </p>
                  <p className="text-gray-300 text-sm">
                    Status: {questionnaire.isCompleted ? 'Completed' : `In Progress (Step ${questionnaire.currentStep || 1})`}
                  </p>
                </div>
                <button 
                  onClick={() => handleViewDetails(questionnaire)}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionnairesTab;
