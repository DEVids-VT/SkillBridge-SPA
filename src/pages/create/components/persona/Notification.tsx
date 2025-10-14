import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-card border-accent',
          icon: 'bg-accent text-accent-foreground',
          iconComponent: CheckCircle,
        };
      case 'error':
        return {
          container: 'bg-card border-destructive',
          icon: 'bg-destructive text-destructive-foreground',
          iconComponent: AlertCircle,
        };
      default: // info
        return {
          container: 'bg-card border-primary',
          icon: 'bg-primary text-primary-foreground',
          iconComponent: Info,
        };
    }
  };

  const typeClasses = getTypeClasses();
  const IconComponent = typeClasses.iconComponent;

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div
        className={cn(
          'border rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out',
          typeClasses.container,
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={cn('flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center', typeClasses.icon)}>
            <IconComponent className="w-4 h-4" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-card-foreground mb-1">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;