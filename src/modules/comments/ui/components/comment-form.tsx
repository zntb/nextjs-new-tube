import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/trpc/client';
import { useUser, useClerk } from '@clerk/nextjs';
import { commentInsertSchema } from '@/db/schema';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserAvatar } from '@/components/user-avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

interface CommentFormProps {
  videoId: string;
  onSuccess?: () => void;
}

// interface CommentFormValues {
//   videoId: string;
//   value: string;
// }

export const CommentForm = ({ videoId, onSuccess }: CommentFormProps) => {
  const { user } = useUser();
  const clerk = useClerk();

  const utils = trpc.useUtils();

  const create = trpc.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId });
      form.reset();
      toast.success('Comment added');

      onSuccess?.();
    },

    onError: error => {
      toast.error('Something went wrong');

      if (error.data?.code === 'UNAUTHORIZED') {
        clerk.openSignIn();
      }
    },
  });

  const form = useForm<z.infer<typeof commentInsertSchema>>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resolver: zodResolver(commentInsertSchema.omit({ userId: true })),
    defaultValues: {
      videoId: videoId,
      value: '',
    },
  });

  //   const form = useForm<CommentFormValues>({
  //     resolver: zodResolver(commentInsertSchema.omit({ userId: true })),
  //     defaultValues: {
  //       videoId,
  //       value: '',
  //     },
  //   });

  const handleSubmit = (values: z.infer<typeof commentInsertSchema>) => {
    create.mutate(values);
  };

  //   const handleSubmit = (values: CommentFormValues) => {
  //     create.mutate(values);
  //   };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex gap-4 group'
      >
        <UserAvatar
          size='lg'
          imageUrl={user?.imageUrl ?? '/user-placeholder.svg'}
          name={user?.username ?? 'User'}
        />
        <div className='flex-1'>
          <FormField
            name='value'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Add a comment...'
                    className='resize-none bg-transparent overflow-hidden min-h-0'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-2 mt-2'>
            <Button type='submit' size='sm' disabled={create.isPending}>
              Comment
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
