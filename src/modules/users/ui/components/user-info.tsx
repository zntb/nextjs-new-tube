import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const userInfoVariants = cva('flex items-center gap-1', {
  variants: {
    size: {
      default: '[&_p]:text-sm [&_svg]:size-4',
      lg: '[&_p]:text-base [&_p]:font-medium [&_p]:text-black [&_svg]:size-5',
      sm: '[&_p]:text-xs [&_svg]:size-3.5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
  name: string;
  className?: string;
}

export const UserInfo = ({ name, size, className }: UserInfoProps) => {
  return (
    <div className={cn(userInfoVariants({ size, className }))}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className='user-name hover:text-gray-800 line-clamp-1'>{name}</p>
        </TooltipTrigger>
        <TooltipContent align='center' className='user-name-tooltip'>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
