import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published_at: string;
  author_name: string;
  category: Category;
  thumbnail: string;
};
type Category = {
  id: number;
  name: string;
};
const BlogClientDetails = ({ posts }: { posts: Post }) => {
  return (
    <main className="flex-1 bg-background pb-20">
      {/* Ảnh Hero của bài viết */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-muted">
        <Image
          src={posts.thumbnail}
          alt={posts.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Nội dung bài viết */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-3xl mx-auto bg-background rounded-2xl shadow-lg border border-border p-6 md:p-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Về danh sách bài viết
          </Link>

          <div className="mb-4 inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium">
            {posts.category?.name}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            {posts.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-10 pb-10 border-b border-border">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />{" "}
              {posts.published_at.split("T")[0]} {/* Chỉ lấy phần ngày tháng */}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> {posts.author_name}
            </span>
          </div>

          <div className="prose prose-lg max-w-none text-foreground/90">
            <p className="text-xl font-medium text-foreground mb-8 italic border-l-4 border-secondary pl-4">
              {posts.excerpt}
            </p>

            {/* Render từng đoạn văn bản */}
            <div
              className="space-y-6 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: posts.content }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogClientDetails;
