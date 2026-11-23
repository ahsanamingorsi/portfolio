import type { ImageAsset } from './types';

/**
 * Every image the site uses. `original` paths are the exact relative paths
 * from the previous portfolio (public/source/images) and have not been renamed.
 */
export const images = {
  profile: {
    original: 'source/images/Profile img.png', slug: 'profile', widths: [480, 960],
    width: 960, height: 960, alt: 'Portrait of Ahsan Amin Gorsi in a navy blazer',
  },
  workspace1: {
    original: 'source/images/Hero img.jpg', slug: 'workspace-1', widths: [640, 1280],
    width: 1280, height: 1580, alt: 'Ahsan working at a laptop',
  },
  workspace2: {
    original: 'source/images/Hero img 2.jpg', slug: 'workspace-2', widths: [640, 1280],
    width: 1280, height: 1707, alt: 'Ahsan typing on a laptop at a wooden desk',
  },
  eicAward: {
    original: 'source/images/Award.jpeg', slug: 'eic25-award', widths: [640, 1280],
    width: 1280, height: 1280, alt: 'Recognition award presented to Ahsan Amin Gorsi by the University of Kotli AJK',
  },
  eicAwardStage: {
    original: 'source/images/eic-award-stage.jpg', slug: 'eic25-award-stage', widths: [480],
    width: 480, height: 320, alt: 'Ahsan receiving the recognition award on stage at EIC 25',
  },
  egalaStage: {
    original: 'source/images/E-Gala 2026.jpeg', slug: 'egala-2026-stage', widths: [640, 1280],
    width: 1280, height: 854, alt: 'Ahsan standing in front of the Acadivo screen graphic at E-Gala 2026',
  },
  egalaCertificate: {
    original: 'source/images/E-Gala 2026 {Apprication Certificate ).jpeg', slug: 'egala-2026-certificate', widths: [640, 1280],
    width: 1280, height: 854, alt: 'Ahsan receiving a certificate of appreciation at E-Gala 2026',
  },
  eicGraphicsTeam: {
    original: 'source/images/EIC-25 Team Graphics.jpg', slug: 'eic25-graphics-team', widths: [640, 1024],
    width: 1024, height: 1148, alt: 'The EIC 2025 graphics team at the University of Kotli',
  },
  secMediaTeam: {
    original: 'source/images/SEC MEDIA TEAM 2024.jpg', slug: 'sec-2024-media-team', widths: [640, 1040],
    width: 1040, height: 893, alt: 'Team Media poster for the 2nd Startup and Entrepreneurship Conference 2024',
  },
  resumePreview: {
    original: 'images/optimized/resume-preview-1100.webp',
    width: 1100, height: 1556, alt: 'Preview of the one-page CV of Ahsan Amin',
  },
} satisfies Record<string, ImageAsset>;
