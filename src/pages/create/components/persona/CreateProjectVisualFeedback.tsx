import React from 'react';
import { colors } from '@/lib/design-system';
import { VisualFeedbackData } from '../../types';

interface CreateProjectVisualFeedbackProps {
  progress: number;
  formData: VisualFeedbackData;
}

const CreateProjectVisualFeedback: React.FC<CreateProjectVisualFeedbackProps> = ({
  progress,
  formData,
}) => {
  // Helper function to get seniority level color
  const getSeniorityColor = () => {
    switch (formData.seniorityLevel) {
      case 'junior':
        return colors.blue; // Lighter dark blue
      case 'mid':
        return colors.blueDark; // Deep blue
      case 'senior':
        return colors.dark; // Main dark
      case 'lead':
        return colors.orange; // Orange accent
      case 'principal':
        return colors.yellow; // Yellow accent
      default:
        return colors.blue; // Default to lighter dark blue
    }
  };
  
  // Determine if we should show the profile visualization (at least 25% progress)
  const showProfile = progress >= 25;
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Decorative elements */}
      <div 
        className="absolute top-[-10px] right-[-60px] w-20 h-20 rounded-full opacity-60 z-0"
        style={{ backgroundColor: colors.blue }}
      ></div>
      <div 
        className="absolute bottom-[20px] right-[-40px] w-14 h-14 rounded-full opacity-50 z-0"
        style={{ backgroundColor: colors.orange }}
      ></div>
      <div 
        className="absolute bottom-[-10px] left-[-30px] w-16 h-16 rounded-full opacity-40 z-0"
        style={{ backgroundColor: colors.blueDark }}
      ></div>

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
          backgroundColor: colors.blueDark,
          boxShadow: progress >= 25 ? `0 10px 25px -5px ${colors.blue}80` : 'none',
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
            backgroundColor: progress >= 30 ? getSeniorityColor() : colors.blue,
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
            backgroundColor: progress >= 40 ? getSeniorityColor() : colors.blue,
            opacity: progress >= 40 ? 0.7 : 0.3,
            transform: `scale(${progress >= 40 ? 1 : 0.8})`,
            borderRadius: '40% 40% 0 0',
          }}
        />
        
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
              <div 
                className="px-2 py-1 rounded text-xs font-medium"
                style={{ backgroundColor: colors.blueDark, color: colors.white }}
              >
                {formData.seniorityLevel || 'Level'}
              </div>
            </div>

            <div 
              className="rounded p-2"
              style={{ backgroundColor: colors.blue }}
            >
              <div className="text-xs font-medium mb-1" style={{ color: colors.white }}>
                Experience
              </div>
              <div 
                className="h-1 w-full rounded-full overflow-hidden"
                style={{ backgroundColor: colors.blueDark }}
              >
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
              className="p-2 rounded border text-xs"
              style={{
                borderColor: colors.blue,
                borderLeftColor: getSeniorityColor(),
                borderLeftWidth: '3px',
                backgroundColor: colors.blueDark,
              }}
            >
              <div className="font-medium opacity-75 mb-1" style={{ color: colors.white }}>
                Key skills
              </div>
              <div className="font-medium" style={{ color: colors.white }}>
                {formData.requiredSkills ? formData.requiredSkills.split(',')[0] : 'Skill'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectVisualFeedback; 