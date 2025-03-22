import { FormSection } from '../sections/form-section';

interface StudioVideoViewProps {
  videoId: string;
}

export const StudioVideoView = ({ videoId }: StudioVideoViewProps) => {
  return (
    <div className='px-4 pt-2.5 max-w-screen-lg'>
      <FormSection videoId={videoId} />
    </div>
  );
};
