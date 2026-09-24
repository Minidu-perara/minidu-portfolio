"use client";

import Image from "next/image";
import { useRef } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
import type { Photo } from "@/content/profile";

/**
 * A thumbnail that opens the full photo in a native modal <dialog>, which
 * provides focus trapping, Escape-to-close and an inert background.
 */
export function PhotoLightbox({ photo, caption }: { photo: Photo; caption: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className="group flex cursor-zoom-in items-center gap-3 rounded-xl text-left focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:outline-none"
      >
        <span className="relative block overflow-hidden rounded-lg ring-1 ring-white/10">
          <Image
            src={photo.src}
            alt=""
            placeholder="blur"
            sizes="96px"
            className="aspect-4/3 w-24 object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <FiMaximize2 aria-hidden className="size-4 text-white" />
          </span>
        </span>
        <span className="text-xs text-slate-400 transition-colors group-hover:text-slate-200">{caption}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={photo.alt}
        // Clicks on the backdrop target the <dialog> element itself.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-w-[min(92vw,64rem)] overflow-visible bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          sizes="92vw"
          className="max-h-[85dvh] w-auto rounded-xl shadow-2xl ring-1 ring-white/10"
        />
        <form method="dialog">
          <button
            type="submit"
            aria-label="Close photo"
            className="absolute -top-4 -right-4 flex size-9 items-center justify-center rounded-full bg-slate-900 text-slate-100 ring-1 ring-white/20 transition hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:outline-none"
          >
            <FiX aria-hidden className="size-4" />
          </button>
        </form>
      </dialog>
    </>
  );
}
