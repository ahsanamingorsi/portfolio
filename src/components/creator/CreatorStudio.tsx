import { useMemo, useState } from 'react';
import { contentCategories, creativeWork, videos } from '../../data/creator-work';
import { socialLinks } from '../../data/social-links';
import type { VideoItem, VideoPlatform } from '../../data/types';
import { FilterChips } from '../ui/Chips';
import { Dialog } from '../ui/Dialog';
import { Icon } from '../ui/Icon';
import { Img } from '../ui/Img';
import { Lightbox } from '../ui/Lightbox';
import { Section } from '../ui/Section';

const platforms = socialLinks.filter((s) => s.creator);
type PlatformFilter = 'All' | 'YouTube' | 'Instagram' | 'TikTok';
const platformOf: Record<PlatformFilter, VideoPlatform | null> = { All: null, YouTube: 'youtube', Instagram: 'instagram', TikTok: 'tiktok' };

function VideoGrid() {
  const [filter, setFilter] = useState<PlatformFilter>('All');
  const [playing, setPlaying] = useState<VideoItem | null>(null);
  const visible = videos.filter((v) => !platformOf[filter] || v.platform === platformOf[filter]);

  if (videos.length === 0) {
    return (
      <div className="empty empty--left">
        <p><strong>No videos are listed here yet.</strong> New uploads appear on the channels above first.</p>
      </div>
    );
  }

  return (
    <>
      <FilterChips label="Platform" options={['All', 'YouTube', 'Instagram', 'TikTok'] as const} value={filter} onChange={setFilter} />
      {visible.length === 0 ? (
        <div className="empty empty--left"><p>Nothing from {filter} is listed yet.</p></div>
      ) : (
        <ul className="vgrid">
          {visible.map((v) => {
            const inner = (
              <>
                <span className="vcard__thumb">
                  {v.thumbnail
                    ? <Img image={v.thumbnail} alt="" sizes="(max-width: 700px) 92vw, 360px" />
                    : v.youtubeId
                      ? <img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
                      : null}
                  <span className="vcard__play" aria-hidden="true"><Icon name="play" /></span>
                </span>
                <span className="vcard__title">{v.title}</span>
                <span className="vcard__meta"><Icon name={v.platform} size={14} /> {v.category}</span>
              </>
            );
            return (
              <li key={v.id}>
                {v.youtubeId
                  ? <button className="vcard" onClick={() => setPlaying(v)} aria-label={`Play video: ${v.title}`}>{inner}</button>
                  : <a className="vcard" href={v.url} target="_blank" rel="noopener" aria-label={`${v.title}, opens on ${v.platform}`}>{inner}</a>}
              </li>
            );
          })}
        </ul>
      )}
      <Dialog open={!!playing} onClose={() => setPlaying(null)} label={playing?.title ?? 'Video'} className="vmodal">
        {playing && (
          <div className="vmodal__panel">
            <div className="vmodal__bar">
              <strong>{playing.title}</strong>
              <a className="icon-btn" href={playing.url} target="_blank" rel="noopener" aria-label="Open on YouTube"><Icon name="arrowUpRight" /></a>
              <button className="icon-btn" onClick={() => setPlaying(null)} aria-label="Close video" autoFocus><Icon name="x" /></button>
            </div>
            <div className="vmodal__frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${playing.youtubeId}?autoplay=1&rel=0`}
                title={playing.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen
              />
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}

export function CreatorStudio() {
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => creativeWork.map((w) => ({ image: w.image, caption: `${w.title}. ${w.context}` })), []);

  return (
    <Section id="creator" title="Creator Studio" lead="The other half of my work: design for university events and technology content about what I am learning and building.">
      <ul className="platforms">
        {platforms.map((p) => (
          <li key={p.id}>
            <a href={p.url} target="_blank" rel="noopener me" className="platform">
              <Icon name={p.icon} size={22} />
              <span><strong>{p.label}</strong><small>{p.handle}</small></span>
              <Icon name="arrowUpRight" size={16} className="platform__go" />
            </a>
          </li>
        ))}
      </ul>

      <div className="creator">
        <div>
          <h3 className="subhead">What I make</h3>
          <ul className="topics">
            {contentCategories.map((c) => (
              <li key={c.title}>
                <Icon name={c.icon} size={18} />
                <span><strong>{c.title}</strong>{c.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="subhead">Videos</h3>
          <VideoGrid />

          <h3 className="subhead subhead--spaced">Design and media work</h3>
          <ul className="works">
            {creativeWork.map((w, i) => (
              <li key={w.id}>
                <button className="work" onClick={() => setOpen(i)} aria-label={`View image: ${w.title}`}>
                  <Img image={w.image} alt="" sizes="(max-width: 700px) 92vw, 300px" />
                </button>
                <strong>{w.title}</strong>
                <span>{w.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Lightbox items={items} index={open} onIndex={setOpen} />
    </Section>
  );
}
