"use client";

import { useState, useEffect } from "react";
import { getHomemadeFoodArticleContentFromFirestore } from "@/lib/data/homemade-food";
import type { HomemadeFoodArticle } from "@/types/homemade-food";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  slug: string;
  /** Fallback content from static data (empty string if stripped) */
  fallbackContent?: string;
}

export function HomemadeFoodArticleContent({ slug, fallbackContent }: Props) {
  const [content, setContent] = useState(fallbackContent || "");
  const [loading, setLoading] = useState(!fallbackContent);

  useEffect(() => {
    if (fallbackContent) return;

    let cancelled = false;
    async function fetchContent() {
      setLoading(true);
      const article = await getHomemadeFoodArticleContentFromFirestore(slug);
      if (!cancelled && article) {
        setContent(article.content);
      }
      if (!cancelled) setLoading(false);
    }
    fetchContent();
    return () => { cancelled = true; };
  }, [slug, fallbackContent]);

  if (loading) {
    return (
      <div className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="space-y-4 animate-pulse">
          <div className="h-6 w-3/4 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-6 w-2/3 rounded bg-muted mt-6" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="rounded-2xl border bg-card p-6 sm:p-8 text-center text-muted-foreground">
        <p>Recipe content is loading. Please check back shortly.</p>
      </div>
    );
  }

  return (
    <article className="rounded-2xl border bg-card p-6 sm:p-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 first:mt-0 border-l-4 border-primary pl-4 text-2xl font-semibold tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-xl font-semibold tracking-tight">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-4 text-base leading-8 text-foreground/90 sm:text-[1.05rem]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 space-y-2 rounded-xl bg-muted/40 p-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-7 marker:text-primary">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="inline-block mt-6 rounded-lg border-l-4 border-warning bg-warning/10 px-4 py-3 text-sm text-muted-foreground not-italic">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
