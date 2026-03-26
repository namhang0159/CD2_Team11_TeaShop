"use client";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

export default function Editor() {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder:
          "Bắt đầu chia sẻ kiến thức trà của bạn...",
      }),
    ],

    content: "",

    immediatelyRender: false,
  });

  if (!editor) return null;

  return (

    <div className="flex-1 flex flex-col gap-6">


      {/* label */}

      <div className="text-xs text-gray-500 font-bold">
        TIÊU ĐỀ BÀI VIẾT
      </div>


      {/* title */}

      <input
        placeholder="Nhập tiêu đề bài viết của bạn..."
        className="text-4xl font-semibold outline-none bg-transparent"
      />


      {/* editor */}

      <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">


        {/* toolbar */}

        <div className="flex gap-3 p-2 border-b bg-gray-50">

          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            B
          </button>

          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            I
          </button>

          <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
            U
          </button>

          <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
            •
          </button>

          <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            1
          </button>

          <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            ❝
          </button>

          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            {"</>"}
          </button>

        </div>


        <EditorContent
          editor={editor}
          className="p-6 min-h-[400px]"
        />

      </div>

    </div>

  );

}