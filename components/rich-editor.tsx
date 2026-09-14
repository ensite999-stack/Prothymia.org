"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";

export function RichEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const editor = useRef<HTMLDivElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editor.current && document.activeElement !== editor.current && editor.current.innerHTML !== value) {
      editor.current.innerHTML = value;
    }
  }, [value]);

  function command(name: string, commandValue?: string) {
    editor.current?.focus();
    document.execCommand(name, false, commandValue);
    if (editor.current) onChange(editor.current.innerHTML);
  }

  function link() {
    const href = window.prompt("Link URL");
    if (href) command("createLink", href);
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body: data });
    const result = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
    setUploading(false);
    if (!response.ok || !result.url) {
      window.alert(result.error || "Image upload failed.");
      return;
    }
    editor.current?.focus();
    const safe = result.url.replace(/"/g, "&quot;");
    document.execCommand("insertHTML", false, `<img src="${safe}" alt="" />`);
    if (editor.current) onChange(editor.current.innerHTML);
  }

  return (
    <div className="editor-shell">
      <div className="editor-toolbar" aria-label="Formatting tools">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("bold")}>Bold</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("italic")}>Italic</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("formatBlock", "h2")}>H2</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("formatBlock", "blockquote")}>Quote</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("insertUnorderedList")}>List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={link}>Link</button>
        <label className="editor-upload">{uploading ? "Uploading…" : "Image"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={upload} disabled={uploading} /></label>
      </div>
      <div
        ref={editor}
        className="editor-area prose"
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
