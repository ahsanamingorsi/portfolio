import { useCallback, useEffect } from 'react';
import type { ImageAsset } from '../../data/types';
import { asset, largeSrc } from '../../lib/site';
import { Dialog } from './Dialog';
import { Icon } from './Icon';

export interface LightboxItem { image: ImageAsset; caption: string }

interface Props {
  items: LightboxItem[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onIndex: (i: number | null) => void;
}

/** Full-size image viewer. Left and right arrow keys move between images; Escape closes. */
export function Lightbox({ items, index, onIndex }: Props) {
  const open = index !== null && index < items.length;
  const step = useCallback((d: number) => {
    if (index === null) return;
    onIndex((index + d + items.length) % items.length);
  }, [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  const item = open ? items[index!] : null;
  return (
    <Dialog open={open} onClose={() => onIndex(null)} label="Image viewer" className="lightbox">
      {item && (
        <div className="lightbox__inner">
          <div className="lightbox__bar">
            <span className="lightbox__count" aria-live="polite">{index! + 1} / {items.length}</span>
            <a className="icon-btn" href={asset(item.image.original)} target="_blank" rel="noopener" aria-label="Open original image in a new tab">
              <Icon name="arrowUpRight" />
            </a>
            <button className="icon-btn" onClick={() => onIndex(null)} aria-label="Close image viewer" autoFocus>
              <Icon name="x" />
            </button>
          </div>
          <figure className="lightbox__figure">
            <img key={item.image.original} src={largeSrc(item.image)} alt={item.image.alt} width={item.image.width} height={item.image.height} />
            <figcaption>{item.caption}</figcaption>
          </figure>
          {items.length > 1 && (
            <>
              <button className="icon-btn lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous image"><Icon name="chevronLeft" size={22} /></button>
              <button className="icon-btn lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next image"><Icon name="chevronRight" size={22} /></button>
            </>
          )}
        </div>
      )}
    </Dialog>
  );
}
