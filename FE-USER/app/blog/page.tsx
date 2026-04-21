"use client";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import { Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { GetPostsAPI } from "@/util/api";

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
export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await GetPostsAPI();
        setPosts(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        {/* Hero Banner */}
        <div className="relative h-48 md:h-64 bg-primary overflow-hidden mb-8">
          <Image
            src="/tea-hero.jpg" // Mình dùng ảnh đồi trà cho hợp với không gian bài viết
            alt="Chuyện Của Trà Thiên An"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Chuyện Của Trà
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-base md:text-lg text-balance">
              Nơi lưu giữ những câu chuyện văn hóa, kiến thức bổ ích và cảm hứng
              bất tận từ những lá trà tinh hoa.
            </p>
          </div>
        </div>

        {/* Danh sách bài viết */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-background rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow group flex flex-col"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative h-64 overflow-hidden"
                >
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-secondary">
                    {post.category?.name}
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.published_at}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {post.author_name}
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-secondary hover:text-primary transition-colors mt-auto inline-flex items-center gap-1"
                  >
                    Đọc tiếp <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
