import { images } from './images';
import type { GalleryCategory, GalleryItem } from './types';

export const galleryCategories: GalleryCategory[] = [
  'Portraits', 'Events', 'Awards and certificates', 'Design work', 'Workspace',
];

export const gallery: GalleryItem[] = [
  { id: 'portrait', image: images.profile, caption: 'Professional portrait', category: 'Portraits' },
  { id: 'egala-stage', image: images.egalaStage, caption: 'With the Acadivo screen graphic at E-Gala 2026', category: 'Events' },
  { id: 'workspace-1', image: images.workspace1, caption: 'At work', category: 'Workspace' },
  { id: 'eic-team', image: images.eicGraphicsTeam, caption: 'EIC 25 graphics team, University of Kotli', category: 'Events' },
  { id: 'eic-award', image: images.eicAward, caption: 'EIC 25 recognition award', category: 'Awards and certificates' },
  { id: 'egala-cert', image: images.egalaCertificate, caption: 'Receiving a certificate of appreciation, E-Gala 2026', category: 'Awards and certificates' },
  { id: 'sec-media', image: images.secMediaTeam, caption: 'Team Media poster, SEC 2024', category: 'Design work' },
  { id: 'workspace-2', image: images.workspace2, caption: 'Writing code', category: 'Workspace' },
  { id: 'eic-stage', image: images.eicAwardStage, caption: 'EIC 25 award ceremony', category: 'Awards and certificates' },
];
