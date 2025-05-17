import { ReactNode, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './transitions.css';

interface EnhancedPageTransitionProps {
  children: ReactNode;
  transitionType?: 'fade' | 'slide' | 'scale';
  duration?: {
    enter?: number;
    exit?: number;
  };
  withBlur?: boolean;
}

export function EnhancedPageTransition({
  children,
  transitionType = 'fade',
  duration = { enter: 500, exit: 300 },
  withBlur = false,
}: EnhancedPageTransitionProps) {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="page-transition-container">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={duration}
          classNames={transitionType}
          mountOnEnter
          unmountOnExit
        >
          <div
            ref={nodeRef}
            className={withBlur ? 'blur-transition' : ''}
            style={{ width: '100%' }}
          >
            {children}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}

// Export a function to scroll to top on page transitions
export const scrollToTopOnTransition = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export default EnhancedPageTransition; 