export type IconName =
  | 'github' | 'linkedin' | 'instagram' | 'youtube' | 'tiktok' | 'whatsapp' | 'mail' | 'globe'
  | 'arrowRight' | 'arrowUpRight' | 'arrowUp' | 'arrowDown' | 'download' | 'search' | 'sun' | 'moon'
  | 'menu' | 'x' | 'copy' | 'check' | 'code' | 'server' | 'database' | 'layout' | 'palette'
  | 'video' | 'rocket' | 'wrench' | 'flask' | 'file' | 'play' | 'award' | 'calendar' | 'mapPin'
  | 'star' | 'chevronLeft' | 'chevronRight' | 'command' | 'users' | 'camera' | 'send' | 'alert'
  | 'eye' | 'graduation' | 'briefcase' | 'home' | 'image' | 'contrast';

/** A responsive image. `original` is the untouched asset path from the previous site. */
export interface ImageAsset {
  /** Original file, path relative to the site root, exactly as on the old site. */
  original: string;
  /** Slug of the WebP derivatives in /images/optimized (written by scripts/optimize-images.mjs). */
  slug?: string;
  /** Available derivative widths, ascending. */
  widths?: number[];
  width: number;
  height: number;
  alt: string;
}

export interface SocialLink {
  id: 'github' | 'linkedin' | 'instagram' | 'youtube' | 'tiktok' | 'whatsapp';
  label: string;
  handle: string;
  url: string;
  icon: IconName;
  /** Platforms where content is published; shown in Creator Studio. */
  creator?: boolean;
}

export type ProjectCategory = 'Web Development' | 'Backend' | 'Startups' | 'Personal Tools' | 'Experiments';

export type ProjectStatus = 'mvp' | 'archived' | 'completed' | 'experiment' | 'concept';

export interface ArchitectureNode {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One line shown on cards and in search. */
  summary: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  /** Free-text status note shown next to the badge on the detail page. */
  statusNote: string;
  stack: string[];
  /** Year work started. Leave undefined when not verified. */
  year?: number;
  liveUrl?: string;
  liveLabel?: string;
  repoUrl?: string;
  cover?: ImageAsset;
  /** Shown in the case study gallery. Missing files fall back gracefully. */
  screenshots: ImageAsset[];
  /** Order on the home page under the default sort. */
  order: number;
  caseStudy: {
    overview: string[];
    problem: string;
    audience: string[];
    role: string;
    features: string[];
    /** Rendered left-to-right as a simple flow diagram. */
    architecture?: { caption: string; nodes: ArchitectureNode[] };
    challenges: string[];
    lessons: string[];
  };
}

export type SkillCategory = 'Backend' | 'Frontend' | 'Database' | 'Architecture and Tools' | 'Creative';
export type SkillLevel = 'using' | 'learning';

export interface Skill {
  name: string;
  /** One to three characters shown on the tile. */
  symbol: string;
  category: SkillCategory;
  level: SkillLevel;
  note: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  organisation: string;
  summary: string;
  points?: string[];
  kind: 'experience' | 'education';
}

export type AchievementKind = 'Award' | 'Certificate' | 'Event' | 'Hackathon';

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: string;
  kind: AchievementKind;
  description: string;
  image?: ImageAsset;
  /** Listed under certifications and awards in the Resume section. */
  resume?: boolean;
}

export type GalleryCategory = 'Portraits' | 'Events' | 'Awards and certificates' | 'Design work' | 'Workspace';

export interface GalleryItem {
  id: string;
  image: ImageAsset;
  caption: string;
  category: GalleryCategory;
}

export type VideoPlatform = 'youtube' | 'instagram' | 'tiktok';

export interface VideoItem {
  id: string;
  title: string;
  platform: VideoPlatform;
  /** Public URL of the video, reel or short. */
  url: string;
  /** YouTube video id; enables the in-page preview player. */
  youtubeId?: string;
  thumbnail?: ImageAsset;
  category: string;
}

export interface CreativeWork {
  id: string;
  title: string;
  context: string;
  role: string;
  image: ImageAsset;
}

export type InquiryId = 'software' | 'collaboration' | 'content' | 'events';

export interface Inquiry {
  id: InquiryId;
  label: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: IconName;
  inquiry: InquiryId;
}
