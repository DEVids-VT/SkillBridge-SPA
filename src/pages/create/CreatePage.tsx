import { useNavigate } from 'react-router-dom';
import { spacing, colors, layouts, typography, components } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CreatePage() {
  const navigate = useNavigate();

  const handlePersonaClick = () => {
    navigate('/create/persona');
  };

  const handleManualClick = () => {
    navigate('/create/manual');
  };

  return (
    <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
      {/* Background pattern */}
      <div 
        className="absolute top-8 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl -z-10"
        style={{ backgroundColor: colors.blue }}
      ></div>
      <div 
        className="absolute bottom-12 left-8 w-48 h-48 rounded-full opacity-20 blur-3xl -z-10"
        style={{ backgroundColor: colors.blueDark }}
      ></div>

      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <div className="text-center">
          <h1 className={cn('text-4xl font-bold mb-4', typography.heading[2])}>
            Create New Content
          </h1>
          <p className={cn('text-lg max-w-2xl mx-auto', typography.body.lg)}>
            Choose how you want to create your content. You can either describe a persona or manually input your requirements.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          
          {/* Persona Card */}
          <Card 
            className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:scale-105" 
            onClick={handlePersonaClick}
            style={{ 
              backgroundColor: colors.blueDark, 
              borderColor: colors.blue,
              transition: 'all 0.3s ease'
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.blue }}>
                <span className="text-2xl">👤</span>
              </div>
              <h3 className={cn('text-2xl font-semibold mb-4', typography.heading[3])}>Create via Persona</h3>
              <p className={cn('mb-6', typography.body.default)}>
                Describe a detailed persona profile including skills, experience, and requirements. 
                Perfect for role-based scenarios.
              </p>
              <Button 
                className="w-full"
                style={{ backgroundColor: colors.blue, color: colors.white }}
                onClick={handlePersonaClick}
              >
                Describe Persona
              </Button>
            </div>
          </Card>

          {/* Manual Card */}
          <Card 
            className="p-8 hover:shadow-lg transition-all cursor-pointer border-2 hover:scale-105" 
            onClick={handleManualClick}
            style={{ 
              backgroundColor: colors.blueDark, 
              borderColor: colors.blue,
              transition: 'all 0.3s ease'
            }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.orange }}>
                <span className="text-2xl">✏️</span>
              </div>
              <h3 className={cn('text-2xl font-semibold mb-4', typography.heading[3])}>Create Manually</h3>
              <p className={cn('mb-6', typography.body.default)}>
                Directly describe what you want to create. 
                Quick and flexible for specific requirements.
              </p>
              <Button 
                className="w-full"
                style={{ backgroundColor: colors.orange, color: colors.dark }}
                onClick={handleManualClick}
              >
                Manual Input
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 