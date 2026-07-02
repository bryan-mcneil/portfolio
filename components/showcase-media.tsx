import type { ProjectMedia } from "@/lib/content";

/**
 * Renders a project's showcase media: a GIF-style looping video (muted,
 * autoplaying, with a poster frame) or a plain image. Size it from the
 * parent; videos letterbox with object-contain since clips vary in shape.
 */
export function ShowcaseMedia({
  media,
  alt,
  className,
}: {
  media: ProjectMedia;
  alt: string;
  className?: string;
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
        aria-label={alt}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export serves pre-optimized files; next/image adds nothing here
    <img className={className} src={media.src} alt={alt} loading="lazy" />
  );
}
