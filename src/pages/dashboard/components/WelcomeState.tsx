import { Lightbulb } from 'lucide-react';
import { colors } from '@/lib/design-system';

export const WelcomeState = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center max-w-md">
        {/* Illustration Container */}
        <div className="relative mb-8">
          <div 
            className="w-32 h-32 mx-auto rounded-full flex items-center justify-center shadow-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.yellow} 100%)` 
            }}
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.blue }}
            >
              <Lightbulb size={32} style={{ color: colors.white }} />
            </div>
          </div>
          
          {/* Decorative dots around the circle */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-8 w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: colors.blue }}></div>
            <div className="absolute top-12 right-4 w-1.5 h-1.5 rounded-full opacity-40" style={{ backgroundColor: colors.orange }}></div>
            <div className="absolute bottom-8 left-4 w-1 h-1 rounded-full opacity-60" style={{ backgroundColor: colors.yellow }}></div>
            <div className="absolute bottom-4 right-8 w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: colors.blue }}></div>
            <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full opacity-45" style={{ backgroundColor: colors.orange }}></div>
            <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full opacity-55" style={{ backgroundColor: colors.yellow }}></div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Welcome to SkillBridge 🏠
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Select a project or app to open it here
        </p>
        
        {/* Optional CTA */}
        <div className="mt-8">
          <button 
            className="px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-200 border-2"
            style={{ 
              backgroundColor: colors.orange,
              color: colors.blueDark,
              borderColor: colors.orange
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.yellow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.orange;
            }}
          >
            Browse Projects
          </button>
        </div>
      </div>
    </div>
  );
}; 