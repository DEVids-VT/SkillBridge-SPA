import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { colors } from '@/lib/design-system';

interface NotificationProps {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  type = 'info',
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); // Allow time for fade-out animation
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Allow time for fade-out animation
    }
  };

  // Determine colors based on type using design system
  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: colors.blueDark,
          borderColor: colors.yellow,
          iconBgColor: colors.yellow,
          textColor: colors.white,
          iconColor: colors.dark,
        };
      case 'error':
        return {
          bgColor: colors.blueDark,
          borderColor: '#ef4444', // red-500
          iconBgColor: '#ef4444',
          textColor: colors.white,
          iconColor: colors.white,
        };
      default: // info
        return {
          bgColor: colors.blueDark,
          borderColor: colors.orange,
          iconBgColor: colors.orange,
          textColor: colors.white,
          iconColor: colors.dark,
        };
    }
  };

  const colorScheme = getColors();

  const Icon = () => {
    if (type === 'success') {
      return (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
    } else if (type === 'error') {
      return (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
    } else {
      return (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 rounded-lg border-2 transition-all duration-300 ease-in-out transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
      } max-w-md shadow-lg`}
      style={{
        backgroundColor: colorScheme.bgColor,
        borderColor: colorScheme.borderColor,
      }}
      role="alert"
    >
      <div
        className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
        style={{
          backgroundColor: colorScheme.iconBgColor,
          color: colorScheme.iconColor,
        }}
      >
        <Icon />
      </div>
      <div className="ms-3 text-sm font-normal">
        <span className="mb-1 text-sm font-semibold block" style={{ color: colorScheme.textColor }}>
          {title}
        </span>
        <div className="text-sm font-normal" style={{ color: colorScheme.textColor }}>
          {message}
        </div>
      </div>
      <button
        type="button"
        onClick={handleClose}
        className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-orange-400 p-1.5 hover:opacity-80 inline-flex items-center justify-center h-8 w-8 transition-opacity"
        style={{
          color: colorScheme.textColor,
        }}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Notification;
