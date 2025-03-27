'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon, XIcon } from 'lucide-react';
import { APP_URL } from '@/constants';
import { Button } from '@/components/ui/button';

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const categoryId = searchParams.get('categoryId') || '';

  const [value, setValue] = useState(query);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = new URL('/search', APP_URL);
    const newQuery = value.trim();

    url.searchParams.set('query', encodeURIComponent(newQuery));

    if (categoryId) {
      url.searchParams.set('categoryId', categoryId);
    }

    if (newQuery === '') {
      url.searchParams.delete('query');
    }

    setValue(newQuery);

    router.push(url.toString());
  };

  return (
    <form className='flex w-full max-w-[600px]' onSubmit={handleSearch}>
      <div className='relative w-full'>
        <input
          type='text'
          placeholder='Search'
          className='w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        {value && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full'
            onClick={() => setValue('')}
            disabled={!value.trim()}
          >
            <XIcon className='text-gray-500' />
          </Button>
        )}
      </div>
      <button
        type='submit'
        className='px-5 py-2.5 bg-gray-100 border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        <SearchIcon className='size-5' />
      </button>
    </form>
  );
};

export default SearchInput;
