// components/detail/save-controls.tsx
"use client";

import * as React from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // if you don't have it, swap for a plain <textarea>
import { saveItem, unsaveItem } from "@/app/actions/saves";
import { upsertNote } from "@/app/actions/notes";

type Kind = "muscle" | "procedure" | "complication";

export function SaveHeart({
  kind,
  slug,
  initiallySaved,
}: {
  kind: Kind;
  slug: string;
  initiallySaved: boolean;
}) {
  const [saved, setSaved] = React.useState(initiallySaved);
  const [isPending, start] = useTransition();

  return (
    <Button
      type="button"
      variant={saved ? "default" : "outline"}
      aria-pressed={saved}
      disabled={isPending}
      onClick={() =>
        start(async () => {
          setSaved((s) => !s); // optimistic
          if (!saved) await saveItem(kind, slug);
          else await unsaveItem(kind, slug);
        })
      }
    >
      {saved ? "♥ Saved" : "♡ Save"}
    </Button>
  );
}

export function NoteBox({
  kind,
  slug,
  initialNote,
}: {
  kind: Kind;
  slug: string;
  initialNote?: string;
}) {
  const [note, setNote] = React.useState(initialNote ?? "");
  const [isPending, start] = useTransition();

  return (
    <form
      action={() =>
        start(async () => {
          await upsertNote(kind, slug, note);
        })
      }
      className="space-y-2"
    >
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        placeholder="Private note (visible only to you)…"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} variant="outline">
          {isPending ? "Saving…" : "Save note"}
        </Button>
      </div>
    </form>
  );
}
