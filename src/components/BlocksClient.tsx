"use client";
import Image from "next/image";
import Link from "next/link";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

export default function BlocksClient({ content }: { content: BlocksContent }) {
  return (
    <div className="prose prose-invert max-w-none">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <p>{children}</p>,
          heading: ({ children, level }) => {
            const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
            return <Tag className="scroll-mt-24">{children}</Tag>;
          },
          image: ({ image }) => (
            <Image
              src={image.url}
              alt={image.alternativeText ?? ""}
              width={image.width ?? 1200}
              height={image.height ?? 800}
              className="rounded-xl"
            />
          ),
          code: ({ plainText }) => (
            <pre className="bg-black/40 rounded-xl p-4 overflow-x-auto">
              <code>{plainText}</code>
            </pre>
          ),
          link: ({ children, url }) => (
            <Link href={url} className="underline underline-offset-2">
              {children}
            </Link>
          ),
          list: ({ children, format }) =>
            format === "ordered" ? <ol>{children}</ol> : <ul>{children}</ul>,
          quote: ({ children }) => (
            <blockquote className="border-l-2 pl-4 italic">{children}</blockquote>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <em>{children}</em>,
          underline: ({ children }) => <span className="underline">{children}</span>,
          strikethrough: ({ children }) => <span className="line-through">{children}</span>,
          code: ({ children }) => <code className="px-1 py-0.5">{children}</code>,
        }}
      />
    </div>
  );
}
