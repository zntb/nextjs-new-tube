import { CategoriesSection } from '../sections/categories-section';
import { HomeVideosSection } from '../sections/home-videos-section';

interface HomeViewProps {
  categoryId?: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className='max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6'>
      <h1 className='text-3xl font-bold text-center mb-6'>
        Welcome to NewTube - Your Video Discovery Platform
      </h1>
      <CategoriesSection categoryId={categoryId} />
      <HomeVideosSection categoryId={categoryId} />
    </div>
  );
};
