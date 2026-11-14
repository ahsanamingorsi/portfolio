import { images } from './images';
import type { CreativeWork, IconName, VideoItem } from './types';

export const contentCategories: { title: string; description: string; icon: IconName }[] = [
  { title: 'Programming tutorials', description: 'C#, .NET and web development, explained step by step.', icon: 'code' },
  { title: 'AI tools', description: 'Trying new tools and showing what they are good for.', icon: 'flask' },
  { title: 'Developer journey', description: 'What I am learning as a computer science student.', icon: 'graduation' },
  { title: 'Startup building', description: 'The process of building Acadivo.', icon: 'rocket' },
  { title: 'University and tech events', description: 'Coverage from conferences, galas and hackathons.', icon: 'camera' },
  { title: 'Product videos', description: 'Short videos that present a product.', icon: 'video' },
  { title: 'Graphic design and creative work', description: 'Posters, screen graphics and social visuals.', icon: 'palette' },
];

/*
 * Videos, reels and shorts. Only add real, published items.
 * The Creator Studio shows platform links and an empty state while this list is empty.
 *
 * Example:
 * {
 *   id: 'my-first-video',
 *   title: 'Title exactly as published',
 *   platform: 'youtube',
 *   url: 'https://www.youtube.com/watch?v=VIDEO_ID',
 *   youtubeId: 'VIDEO_ID',          // enables the in-page preview player
 *   category: 'Programming tutorials',
 * },
 */
export const videos: VideoItem[] = [];

/** Design and media work with real evidence in the asset folder. */
export const creativeWork: CreativeWork[] = [
  {
    id: 'egala-screen',
    title: 'E-Gala 2026 screen graphics',
    context: 'E-Gala 2026',
    role: 'Design and screen graphics, including the Acadivo stage visual',
    image: images.egalaStage,
  },
  {
    id: 'eic25-graphics',
    title: 'EIC 25 event graphics',
    context: 'Entrepreneurship Innovation Conference 2025, University of Kotli',
    role: 'Graphics team: posters, social media graphics and event visuals',
    image: images.eicGraphicsTeam,
  },
  {
    id: 'sec-2024-media',
    title: 'SEC 2024 media',
    context: '2nd Startup and Entrepreneurship Conference 2024, University of Kotli',
    role: 'Media team',
    image: images.secMediaTeam,
  },
];
