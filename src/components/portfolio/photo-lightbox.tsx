"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Photo } from "@/content/profile";

/**
 * A thumbnail that opens the full photo in a native modal <dialog>, which
 * provides focus trapping, Escape-to-close and inert background for free.
 */
export function PhotoLightbox({ photo }: { photo: Photo }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="shrink-0 cursor-zoom-in rounded-2xl focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          placeholder="blur"
          sizes="(min-width: 768px) 288px, 100vw"
          className="aspect-4/3 w-full rounded-2xl border-2 border-indigo-900 object-cover shadow-2xl md:aspect-square md:size-72"
        />
        <span className="sr-only">Enlarge photo</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={photo.alt}
        // Clicks on the backdrop target the <dialog> element itself.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-w-[min(92vw,64rem)] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          sizes="92vw"
          className="max-h-[85dvh] w-auto rounded-xl border-4 border-gray-700 object-contain shadow-2xl"
        />
        <form method="dialog">
          <button
            type="submit"
            aria-label="Close photo"
            className="absolute -top-4 -right-4 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-xl text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
          >
            ×
          </button>
        </form>
      </dialog>
    </>
  );
}
