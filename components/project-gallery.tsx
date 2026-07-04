"use client";

import * as React from "react";
import AutoHeight from "embla-carousel-auto-height";

import type { ProjectMedia } from "@/lib/content";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

/** Frontmatter alt text when present, else "helpdesk-polish.mp4" -> "helpdesk polish". */
function mediaLabel(media: ProjectMedia): string {
  if (media.alt) return media.alt;
  const file = media.src.split("/").pop() ?? media.src;
  return file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
}

function GalleryMedia({
  media,
  label,
  className,
  onSize,
}: {
  media: ProjectMedia;
  label: string;
  className?: string;
  /** Fires once the media knows its intrinsic size (metadata/load). */
  onSize?: () => void;
}) {
  if (media.type === "video") {
    return (
      <video
        className={className}
        src={media.src}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onLoadedMetadata={onSize}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export serves pre-optimized files; next/image adds nothing here
    <img
      className={className}
      src={media.src}
      alt={label}
      loading="lazy"
      onLoad={onSize}
    />
  );
}

/**
 * Thumbnail grid for a project's remaining media. Clicking a thumbnail opens
 * a lightbox (Dialog + Carousel) starting at that item, with arrow-key
 * navigation. Looping clips autoplay in both the grid and the lightbox.
 */
export function ProjectGallery({
  items,
  projectTitle,
}: {
  items: ProjectMedia[];
  projectTitle: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (items.length === 0) return null;

  const openAt = (index: number) => {
    setStartIndex(index);
    setCurrent(index);
    setOpen(true);
  };

  // The dialog content holds focus, so route arrow keys to the carousel here
  // instead of relying on the carousel's own (descendant) key handler.
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((media, index) => (
          <button
            key={media.src}
            type="button"
            onClick={() => openAt(index)}
            aria-label={`Open ${mediaLabel(media)} in lightbox`}
            className="group relative aspect-video overflow-hidden rounded-lg border border-border/60 bg-muted/40 transition duration-200 hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <GalleryMedia
              media={media}
              label={mediaLabel(media)}
              className="absolute inset-0 size-full object-cover transition duration-200 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          onKeyDown={handleKeyDown}
          className="max-w-[calc(100%-2rem)] gap-2 p-2 sm:max-w-4xl"
        >
          <DialogTitle className="sr-only">
            {projectTitle} media gallery
          </DialogTitle>
          <Carousel
            setApi={setApi}
            opts={{ startIndex, loop: true }}
            plugins={[AutoHeight()]}
          >
            {/* items-start lets each slide keep its own content height so
                AutoHeight can shrink the dialog to fit the current media. */}
            <CarouselContent className="items-start transition-[height] duration-300">
              {items.map((media) => (
                <CarouselItem key={media.src}>
                  <div className="flex justify-center">
                    <GalleryMedia
                      media={media}
                      label={mediaLabel(media)}
                      className="max-h-[80vh] w-auto max-w-full rounded-md object-contain"
                      // AutoHeight measures slides once at init, and embla's
                      // resize observer only watches the scroll axis (width),
                      // so a slide growing taller after its media loads never
                      // re-measures on its own. reInit re-runs the plugin.
                      onSize={() => api?.reInit()}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {items.length > 1 && (
              <>
                <CarouselPrevious className="-left-2 sm:left-2" />
                <CarouselNext className="-right-2 sm:right-2" />
              </>
            )}
          </Carousel>
          {items.length > 1 && (
            <p className="pb-1 text-center text-xs text-muted-foreground">
              {current + 1} / {items.length}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
