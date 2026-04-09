// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// import { Calendar, User, ArrowLeft } from "lucide-react";
// import { useEffect, useState } from "react";
// import { GetPostDetailAPI } from "@/util/api";
// import BlogClientDetails from "@/components/BlogClientDetails";
// type Post = {
//   id: number;
//   title: string;
//   slug: string;
//   excerpt: string;
//   content: string;
//   published_at: string;
//   author_name: string;
//   category: Category;
//   thumbnail: string;
// };
// type Category = {
//   id: number;
//   name: string;
// };
// export default async function BlogPostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   // Vì params ở Next.js 15+ là một Promise, cần await nó
//   const { slug } = await params;

//   const [posts, setPosts] = useState<Post | null>(null);
//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const res = await GetPostDetailAPI(slug);
//         setPosts(res.data);
//       } catch (error) {
//         console.error("Lỗi khi lấy bài viết:", error);
//       }
//     };
//     getPosts();
//   }, [slug]);

//   // Nếu nhập sai link bài viết, chuyển hướng về trang 404
//   if (!posts) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <BlogClientDetails posts={posts} />
//     </div>
//   );
// }
import BlogClientDetails from "@/components/BlogClientDetails";
import { GetPostDetailAPI } from "@/util/api";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const res = await GetPostDetailAPI(slug);

  return <BlogClientDetails posts={res.data} />;
}
