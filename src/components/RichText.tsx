import React from 'react'

type TextNode = {
  type: 'text'
  text: string
  format?: number
}

const renderTextNode = (node: TextNode, key: number) => {
  let element: React.ReactNode = node.text

  // Lexical node formats are bitwise flags:
  // 1 = Bold
  // 2 = Italic
  // 4 = Strikethrough
  // 8 = Underline
  // 16 = Code
  const format = node.format ?? 0
  const isBold = format & 1
  const isItalic = format & 2
  const isStrikethrough = format & 4
  const isUnderline = format & 8
  const isCode = format & 16

  if (isBold) element = <strong key={key}>{element}</strong>
  if (isItalic) element = <em key={key}>{element}</em>
  if (isUnderline) element = <u key={key}>{element}</u>
  if (isStrikethrough) element = <del key={key}>{element}</del>
  if (isCode) element = <code key={key}>{element}</code>

  return <React.Fragment key={key}>{element}</React.Fragment>
}

const renderNode = (node: any, key: number): React.ReactNode => {
  if (!node) return null

  if (node.type === 'text') {
    return renderTextNode(node, key)
  }

  const children = node.children
    ? node.children.map((child: any, idx: number) => renderNode(child, idx))
    : null

  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{children}</p>
    case 'heading':
      // Map Lexical's heading level (tag: 'h1', 'h2', etc.)
      const Tag = node.tag || 'h2'
      return React.createElement(Tag, { key, className: `heading-${Tag}` }, children)
    case 'list':
      if (node.listType === 'bullet') {
        return <ul key={key}>{children}</ul>
      }
      return <ol key={key}>{children}</ol>
    case 'listitem':
      return <li key={key}>{children}</li>
    case 'quote':
      return <blockquote key={key}>{children}</blockquote>
    default:
      return <div key={key}>{children}</div>
  }
}

export const RichText: React.FC<{ content: any }> = ({ content }) => {
  if (!content) return null

  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  if (content.root && content.root.children) {
    return (
      <div className="rich-text-content">
        {content.root.children.map((node: any, idx: number) => renderNode(node, idx))}
      </div>
    )
  }

  return null
}
