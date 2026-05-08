import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TopicClusterSection } from "@/components/seo/TopicClusterSection";
import { TOPIC_CLUSTERS } from "@/data/topic-clusters";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "旅遊主題攻略",
  description:
    "依日本自由行、換匯預算、簽證入境、行李打包、旅遊保險與目的地速查整理出國工具與攻略文章。",
  keywords: ["旅遊主題攻略", "自由行準備", "出國工具", "旅遊 SEO topic cluster"],
  path: "/topics",
});

export default function TopicsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "旅遊主題攻略" }]} />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mb-3">
          旅遊主題攻略
        </h1>
        <p className="max-w-3xl text-brand-700 leading-relaxed">
          不只用單一工具查答案，也可以依照出國前的真實任務來規劃：
          先確認簽證與預算，再處理行李、保險、目的地細節與延伸攻略。
        </p>
      </header>

      <TopicClusterSection
        title="選一個出國任務開始"
        description="每個主題都串起相關工具、文章與國家速查頁，讓搜尋引擎與使用者都能理解本站的內容脈絡。"
        clusters={TOPIC_CLUSTERS}
      />
    </div>
  );
}
