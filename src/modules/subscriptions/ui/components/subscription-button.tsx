import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';

interface SubscriptionButtonProps {
  onClick: ButtonProps['onClick'];
  disabled: boolean;
  isSubscribed: boolean;
  className?: string;
  size?: ButtonProps['size'];
}

export const SubscriptionButton = ({
  onClick,
  disabled,
  isSubscribed,
  className,
  size = 'default',
}: SubscriptionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={isSubscribed ? 'secondary' : 'default'}
      className={cn('rounded-full', className)}
      size={size}
    >
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </Button>
  );
};
