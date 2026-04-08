"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

export default function Editor({
  title,
  setTitle,
  value,
  onChange,
  excerpt,
  setExcerpt,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Bắt đầu chia sẻ kiến thức trà của bạn...",
      }),
    ],
    content: value || "",
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  // sync external content -> editor (quan trọng khi load lại / reset)
  useEffect(() => {
    if (!editor) return;

    const html = value || "";
    if (editor.getHTML() !== html) {
      editor.commands.setContent(html, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* LABEL */}
      <div className="text-xs text-gray-500 font-bold">TIÊU ĐỀ BÀI VIẾT</div>

      {/* TITLE */}
      <input
        value={title}
        onChange={(e) => setTitle?.(e.target.value)}
        placeholder="Nhập tiêu đề bài viết của bạn..."
        className="text-4xl font-semibold outline-none bg-transparent"
      />

      {/* EXCERPT (optional nếu bạn dùng) */}
      <textarea
        value={excerpt}
        onChange={(e) => setExcerpt?.(e.target.value)}
        placeholder="Tóm tắt bài viết..."
        className="w-full p-3 border rounded outline-none"
      />

      {/* EDITOR BOX */}
      <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
        {/* TOOLBAR */}
        <div className="flex gap-3 p-2 border-b bg-gray-50">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            B
          </button>

          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            I
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            U
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            •
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            ❝
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            {"</>"}
          </button>
        </div>

        {/* CONTENT */}
        <EditorContent editor={editor} className="p-6 min-h-[400px]" />
      </div>
    </div>
  );
}
