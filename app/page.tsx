import { getAllPosts } from '@/lib/blog';
import { PortfolioShell } from '@/components/portfolio-shell';

export default function Home() {
  const posts = getAllPosts();
  return <PortfolioShell posts={posts} />;
}
