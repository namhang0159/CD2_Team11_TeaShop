import BlogClient from "@/components/blog/BlogClient";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  return <BlogClient slug={slug} />;
}
