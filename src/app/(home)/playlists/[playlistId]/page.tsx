import { DEFAULT_LIMIT } from '@/constants';
import { VideosView } from '@/modules/playlists/ui/views/videos-view';
import { HydrateClient, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic';

interface PlaylistPageProps {
  params: Promise<{ playlistId: string }>;
}

const PlaylistPage = async ({ params }: PlaylistPageProps) => {
  const { playlistId } = await params;

  void trpc.playlists.getOne.prefetch({ id: playlistId });
  void trpc.playlists.getVideos.prefetchInfinite({
    playlistId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <VideosView playlistId={playlistId} />
    </HydrateClient>
  );
};

export default PlaylistPage;
