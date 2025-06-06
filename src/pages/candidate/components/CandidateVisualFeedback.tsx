import React from 'react';

interface CandidateVisualFeedbackProps {
  progress: number;
  formData: {
    roleTitle: string;
    requiredSkills: string;
    seniorityLevel: string;
  };
}

const CandidateVisualFeedback: React.FC<CandidateVisualFeedbackProps> = ({
  progress,
  formData,
}) => {
  // Helper function to get seniority level color
  const getSeniorityColor = () => {
    switch (formData.seniorityLevel) {
      case 'junior':
        return '#60a5fa'; // Light blue
      case 'mid':
        return '#3b82f6'; // Blue
      case 'senior':
        return '#2563eb'; // Medium blue
      case 'lead':
        return '#1d4ed8'; // Dark blue
      case 'principal':
        return '#1e40af'; // Very dark blue
      default:
        return '#93c5fd'; // Default light blue
    }
  };
  // Determine if we should show the profile visualization (at least 25% progress)
  const showProfile = progress >= 25;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute top-[-10px] right-[-60px] w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-60 z-0"></div>
      <div className="absolute bottom-[20px] right-[-40px] w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/20 opacity-50 z-0"></div>
      <div className="absolute bottom-[-10px] left-[-30px] w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 opacity-40 z-0"></div>

      {/* Lines connecting elements */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" style={{ zIndex: 0 }}>
        <path
          d={`M 200 50 Q 300 150 320 200`}
          stroke={`${getSeniorityColor()}40`}
          strokeWidth="1"
          fill="none"
          strokeDasharray="4,4"
          className="transition-all duration-500"
          style={{ opacity: progress > 30 ? 0.8 : 0.2 }}
        />
        <path
          d={`M 200 350 Q 80 300 50 220`}
          stroke={`${getSeniorityColor()}40`}
          strokeWidth="1"
          fill="none"
          strokeDasharray="4,4"
          className="transition-all duration-500"
          style={{ opacity: progress > 40 ? 0.8 : 0.2 }}
        />
        <path
          d={`M 300 200 Q 280 270 200 300`}
          stroke={`${getSeniorityColor()}40`}
          strokeWidth="1"
          fill="none"
          strokeDasharray="4,4"
          className="transition-all duration-500"
          style={{ opacity: progress > 50 ? 0.8 : 0.2 }}
        />
      </svg>

      <div
        className="relative w-64 h-64 rounded-full transition-all duration-700 ease-out transform z-10"
        style={{
          backgroundColor: '#f3f4f6',
          boxShadow: progress >= 25 ? '0 10px 25px -5px rgba(59, 130, 246, 0.5)' : 'none',
          transform: `scale(${showProfile ? 1 : 0.8})`,
          opacity: showProfile ? 1 : 0.5,
        }}
      >
        {/* Profile shape */}
        <div
          className="absolute w-full h-full rounded-full overflow-hidden transition-all duration-500 ease-out"
          style={{
            clipPath: showProfile ? 'circle(50% at 50% 50%)' : 'circle(0% at 50% 50%)',
            background: `linear-gradient(135deg, ${getSeniorityColor()}40, ${getSeniorityColor()}20)`,
          }}
        />
        {/* Head shape */}
        <div
          className="absolute rounded-full transition-all duration-500 ease-out"
          style={{
            width: '30%',
            height: '30%',
            top: '20%',
            left: '35%',
            backgroundColor: progress >= 30 ? getSeniorityColor() : '#e5e7eb',
            opacity: progress >= 30 ? 0.8 : 0.3,
            transform: `scale(${progress >= 30 ? 1 : 0.8})`,
          }}
        />
        {/* Body shape */}
        <div
          className="absolute transition-all duration-500 ease-out"
          style={{
            width: '40%',
            height: '35%',
            top: '52%',
            left: '30%',
            backgroundColor: progress >= 40 ? getSeniorityColor() : '#e5e7eb',
            opacity: progress >= 40 ? 0.7 : 0.3,
            transform: `scale(${progress >= 40 ? 1 : 0.8})`,
            borderRadius: '40% 40% 0 0',
          }}
        />{' '}
        {/* Role title */}
        <div
          className="absolute w-full text-center transition-all duration-500 ease-out"
          style={{
            bottom: '15%',
            opacity: progress >= 60 ? 1 : 0,
            transform: `translateY(${progress >= 60 ? 0 : '10px'})`,
          }}
        >
          <span
            className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full"
            style={{ backgroundColor: getSeniorityColor() }}
          >
            {formData.roleTitle || 'Role Title'}
          </span>
        </div>
        {/* Skill indicators on the right */}
        <div
          className="absolute right-[-140px] top-[50%] transform translate-y-[-50%] transition-all duration-500 ease-out"
          style={{
            opacity: progress >= 70 ? 1 : 0,
            transform: `translate(${progress >= 70 ? '0' : '20px'}, -50%)`,
          }}
        >
          <div className="space-y-3 w-[120px]">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getSeniorityColor() }}
              ></div>
              <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium">
                {formData.seniorityLevel || 'Level'}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded p-2">
              <div className="text-xs font-medium mb-1">Experience</div>
              <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: getSeniorityColor(),
                  }}
                ></div>
              </div>
            </div>

            <div
              className="p-2 rounded border border-gray-200 dark:border-gray-700 text-xs"
              style={{
                borderLeftColor: getSeniorityColor(),
                borderLeftWidth: '3px',
              }}
            >
              <div className="font-medium opacity-75 mb-1">Key skills</div>
              <div className="font-medium">
                {formData.requiredSkills ? formData.requiredSkills.split(',')[0] : 'Skill'}
              </div>
            </div>
          </div>
        </div>
        {/* Progress indicator */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getSeniorityColor()}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-700 ease-out"
          />
        </svg>{' '}
        {/* Percentage at the top */}
        <div className="absolute top-[-40px] left-0 right-0 flex justify-center">
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getSeniorityColor() }}
            ></div>
            <span
              className="text-3xl font-bold transition-all duration-500"
              style={{ color: progress >= 50 ? getSeniorityColor() : '#6b7280' }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateVisualFeedback;
