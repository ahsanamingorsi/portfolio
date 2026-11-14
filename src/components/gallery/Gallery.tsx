import { useMemo, useState } from 'react';
import { gallery, galleryCategories } from '../../data/gallery';
import type { GalleryCategory } from '../../data/types';
import { FilterChips } from '../ui/Chips';
import { Img } from '../ui/Img';
import { Lightbox } from '../ui/Lightbox';
import { Section } from '../ui/Section';

type Filter = 'All' | GalleryCategory;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(() => gallery.filter((g) => filter === 'All' || g.category === filter), [filter]);
  const items = useMemo(() => visible.map((g) => ({ image: g.image, caption: g.caption })), [visible]);
  const options = useMemo(
    () => ['All', ...galleryCategories.filter((c) => gallery.some((g) => g.category === c))] as Filter[], [],
  );

  return (
    <Section id="gallery" title="Gallery" lead="Events, awards, design work and the desk it all happens at. Use the arrow keys inside the viewer." tone="raised">
      <div className="toolbar">
        <FilterChips label="Gallery category" options={options} value={filter} onChange={(f) => { setFilter(f); setOpen(null); }} />
      </div>
      <p className="sr-only" role="status">{visible.length} images shown</p>
      <ul className="masonry">
        {visible.map((g, i) => (
          <li key={g.id}>
            <button className="tile" onClick={() => setOpen(i)} aria-label={`View image: ${g.caption}`}>
              <Img image={g.image} alt="" sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 370px" />
              <span className="tile__caption">{g.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={open} onIndex={setOpen} />
    </Section>
  );
}
