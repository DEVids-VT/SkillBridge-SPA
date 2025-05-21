import { Outlet } from 'react-router-dom';
import { colors } from '@/lib/design-system';

/**
 * WelcomeLayout - A full-screen layout without header or footer
 * used specifically for the onboarding process
 */
export function WelcomeLayout() {
  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`,
      }}
    >
      <main className="w-full h-full min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default WelcomeLayout;
