import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data"; // Import dữ liệu bài viết thật

export function BlogSection() {
  // Lấy 2 bài viết mới nhất từ danh sách để hiển thị ra trang chủ
  const recentPosts = blogPosts.slice(0, 2);

  return (
    <section className="py-12 md:py-20 border-b border-border bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Bài Viết Mới Nhất
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Khám phá những câu chuyện thú vị và kiến thức bổ ích về thế giới trà
            đạo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {recentPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group">
              <div className="flex flex-col gap-5 bg-background rounded-2xl p-4 border border-border hover:shadow-md transition-all h-full">
                {/* Ảnh bài viết */}
                <div className="h-64 rounded-xl overflow-hidden relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-white bg-secondary/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Nội dung tóm tắt */}
                <div className="flex flex-col gap-3 flex-1 px-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {post.date} • {post.author}
                  </p>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-base text-muted-foreground line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-secondary font-semibold text-sm group-hover:gap-3 transition-all mt-2 pt-4 border-t border-border/50">
                    <span>ĐỌC TIẾP</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Nút xem tất cả */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 border border-secondary text-secondary rounded-full font-medium hover:bg-secondary hover:text-white transition-colors"
          >
            Xem Tất Cả Bài Viết
          </Link>
        </div>
      </div>
    </section>
  );
}
