import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, type FaqItem } from "@/lib/seo";

interface FaqSectionProps {
  title?: string;
  faqs: FaqItem[];
}

export function FaqSection({ title = "常見問題", faqs }: FaqSectionProps) {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <section className="mt-12 not-prose">
        <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mb-6">{title}</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group bg-white rounded-[16px] shadow-[0_1px_3px_rgba(8,51,68,0.06)] overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-brand-900 list-none">
                <span>{f.question}</span>
                <span className="text-brand-400 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-5 pb-5 text-brand-800 leading-relaxed">{f.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
