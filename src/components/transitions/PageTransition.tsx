import { ReactNode, useRef } from 'react';
import { SwitchTransition, Transition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

// Transition durations
const TIMEOUT = {
  enter: 500,
  exit: 300,
};

// Transition styles for different states
const transitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0,
    transform: 'scale(0.98) translateY(10px)',
  },
  entered: {
    transition: `opacity ${TIMEOUT.enter}ms ease-in-out, transform ${TIMEOUT.enter}ms ease-in-out`,
    opacity: 1,
    transform: 'scale(1) translateY(0)',
  },
  exiting: {
    transition: `opacity ${TIMEOUT.exit}ms ease-in-out, transform ${TIMEOUT.exit}ms ease-in-out`,
    opacity: 0,
    transform: 'scale(0.98) translateY(10px)',
  },
  exited: {
    opacity: 0,
    transform: 'scale(0.98) translateY(10px)',
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <SwitchTransition mode="out-in">
      <Transition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={TIMEOUT}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div
            ref={nodeRef}
            style={{
              ...transitionStyles[state as keyof typeof transitionStyles],
              width: '100%',
            }}
          >
            {children}
          </div>
        )}
      </Transition>
    </SwitchTransition>
  );
}

export default PageTransition; 