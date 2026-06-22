export const TOOL_CATEGORIES = {
  lyrics: {
    name: 'Lyrics Tools',
    icon: '🎵',
    color: 'from-purple-500 to-pink-500',
    description: 'Lyric editing & management suite',
  },
  pdf: {
    name: 'PDF Tools',
    icon: '📄',
    color: 'from-red-500 to-orange-500',
    description: 'PDF editing & conversion',
  },
  image: {
    name: 'Image Tools',
    icon: '🖼️',
    color: 'from-blue-500 to-cyan-500',
    description: 'Image processing & enhancement',
  },
  developer: {
    name: 'Developer Tools',
    icon: '💻',
    color: 'from-green-500 to-emerald-500',
    description: 'Coding utilities & converters',
  },
  ai: {
    name: 'AI Tools',
    icon: '✨',
    color: 'from-orange-500 to-yellow-500',
    description: 'Content & writing helpers',
  },
  seo: {
    name: 'SEO Tools',
    icon: '📊',
    color: 'from-indigo-500 to-blue-500',
    description: 'SEO & website optimization',
  },
  resume: {
    name: 'Career Tools',
    icon: '💼',
    color: 'from-cyan-500 to-blue-500',
    description: 'Resume & portfolio builders',
  },
  indian: {
    name: 'Indian Tools',
    icon: '🇮🇳',
    color: 'from-orange-500 via-white to-green-500',
    description: 'India-specific utilities',
  },
}

export const TOOLS = {
  // ===== LYRICS TOOLS (7) =====
  'lyrics-editor': {
    id: 'lyrics-editor',
    name: 'Lyric Text Editor',
    category: 'lyrics',
    path: '/tools/lyrics/editor',
    description: 'Advanced lyric editing with verse/chorus sections',
    status: 'building',
  },
  'lyrics-metadata': {
    id: 'lyrics-metadata',
    name: 'Metadata Manager',
    category: 'lyrics',
    path: '/tools/lyrics/metadata',
    description: 'Manage artist, album, genre info',
    status: 'building',
  },
  'lyrics-ai-helper': {
    id: 'lyrics-ai-helper',
    name: 'AI Lyric Helper',
    category: 'lyrics',
    path: '/tools/lyrics/ai-helper',
    description: 'Grammar, rhyme scheme, poetic enhancement',
    status: 'building',
  },
  'lyrics-version-control': {
    id: 'lyrics-version-control',
    name: 'Version Control',
    category: 'lyrics',
    path: '/tools/lyrics/versions',
    description: 'Draft management & comparison',
    status: 'building',
  },
  'lyrics-preview': {
    id: 'lyrics-preview',
    name: 'Preview & Sync',
    category: 'lyrics',
    path: '/tools/lyrics/preview',
    description: 'Real-time preview with music timing',
    status: 'building',
  },
  'lyrics-bulk-upload': {
    id: 'lyrics-bulk-upload',
    name: 'Bulk Upload',
    category: 'lyrics',
    path: '/tools/lyrics/bulk-upload',
    description: 'Import multiple songs via CSV/JSON',
    status: 'building',
  },
  'lyrics-quality-checker': {
    id: 'lyrics-quality-checker',
    name: 'Quality Checker',
    category: 'lyrics',
    path: '/tools/lyrics/quality-checker',
    description: 'Detect missing fields, duplicates',
    status: 'building',
  },

  // ===== PDF TOOLS (7) =====
  'pdf-editor': {
    id: 'pdf-editor',
    name: 'PDF Editor',
    category: 'pdf',
    path: '/tools/pdf/editor',
    description: 'Add text, draw, annotate, sign PDFs',
    status: 'building',
  },
  'pdf-converter': {
    id: 'pdf-converter',
    name: 'PDF Converter',
    category: 'pdf',
    path: '/tools/pdf/converter',
    description: 'Convert to Image, Word, Excel, PPT',
    status: 'building',
  },
  'pdf-merger': {
    id: 'pdf-merger',
    name: 'PDF Merger',
    category: 'pdf',
    path: '/tools/pdf/merger',
    description: 'Combine multiple PDFs',
    status: 'building',
  },
  'pdf-splitter': {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    category: 'pdf',
    path: '/tools/pdf/splitter',
    description: 'Extract pages from PDFs',
    status: 'building',
  },
  'pdf-compressor': {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    category: 'pdf',
    path: '/tools/pdf/compressor',
    description: 'Reduce file size',
    status: 'building',
  },
  'pdf-watermark': {
    id: 'pdf-watermark',
    name: 'PDF Watermark',
    category: 'pdf',
    path: '/tools/pdf/watermark',
    description: 'Add text/image watermark',
    status: 'building',
  },
  'pdf-text-extractor': {
    id: 'pdf-text-extractor',
    name: 'Text Extractor',
    category: 'pdf',
    path: '/tools/pdf/text-extractor',
    description: 'Extract text from PDFs',
    status: 'building',
  },

  // ===== IMAGE TOOLS (7) =====
  'image-resizer': {
    id: 'image-resizer',
    name: 'Image Size Reducer',
    category: 'image',
    path: '/tools/image/resizer',
    description: 'Compress & resize images',
    status: 'building',
  },
  'image-converter': {
    id: 'image-converter',
    name: 'Image Converter',
    category: 'image',
    path: '/tools/image/converter',
    description: 'Convert PNG, JPG, WebP, GIF',
    status: 'building',
  },
  'image-cropper': {
    id: 'image-cropper',
    name: 'Image Cropper',
    category: 'image',
    path: '/tools/image/cropper',
    description: 'Crop images to size',
    status: 'building',
  },
  'image-upscaler': {
    id: 'image-upscaler',
    name: 'Image Upscaler',
    category: 'image',
    path: '/tools/image/upscaler',
    description: 'AI enhance resolution',
    status: 'building',
  },
  'image-batch-processor': {
    id: 'image-batch-processor',
    name: 'Batch Processor',
    category: 'image',
    path: '/tools/image/batch',
    description: 'Bulk resize/convert',
    status: 'building',
  },
  'image-background-remover': {
    id: 'image-background-remover',
    name: 'Background Remover',
    category: 'image',
    path: '/tools/image/bg-remover',
    description: 'Remove background from images',
    status: 'building',
  },
  'image-metadata': {
    id: 'image-metadata',
    name: 'Metadata Viewer',
    category: 'image',
    path: '/tools/image/metadata',
    description: 'View/remove image metadata',
    status: 'building',
  },

  // ===== DEVELOPER TOOLS (8) =====
  'json-formatter': {
    id: 'json-formatter',
    name: 'JSON Formatter',
    category: 'developer',
    path: '/tools/developer/json-formatter',
    description: 'Format & validate JSON',
    status: 'building',
  },
  'qr-generator': {
    id: 'qr-generator',
    name: 'QR Code Generator',
    category: 'developer',
    path: '/tools/developer/qr-generator',
    description: 'Generate QR codes',
    status: 'building',
  },
  'color-picker': {
    id: 'color-picker',
    name: 'Color Picker',
    category: 'developer',
    path: '/tools/developer/color-picker',
    description: 'Pick & convert colors',
    status: 'building',
  },
  'regex-tester': {
    id: 'regex-tester',
    name: 'Regex Tester',
    category: 'developer',
    path: '/tools/developer/regex-tester',
    description: 'Test regular expressions',
    status: 'building',
  },
  'base64-encoder': {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    category: 'developer',
    path: '/tools/developer/base64',
    description: 'Encode/decode Base64',
    status: 'building',
  },
  'url-encoder': {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    category: 'developer',
    path: '/tools/developer/url-encoder',
    description: 'Encode/decode URLs',
    status: 'building',
  },
  'markdown-preview': {
    id: 'markdown-preview',
    name: 'Markdown Preview',
    category: 'developer',
    path: '/tools/developer/markdown',
    description: 'Write & preview Markdown',
    status: 'building',
  },
  'uuid-generator': {
    id: 'uuid-generator',
    name: 'UUID Generator',
    category: 'developer',
    path: '/tools/developer/uuid',
    description: 'Generate UUIDs',
    status: 'building',
  },

  // ===== AI TOOLS (4) =====
  'prompt-optimizer': {
    id: 'prompt-optimizer',
    name: 'Prompt Optimizer',
    category: 'ai',
    path: '/tools/ai/prompt-optimizer',
    description: 'Optimize ChatGPT prompts',
    status: 'building',
  },
  'text-summarizer': {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    category: 'ai',
    path: '/tools/ai/summarizer',
    description: 'Summarize long text',
    status: 'building',
  },
  'paraphrase-tool': {
    id: 'paraphrase-tool',
    name: 'Paraphrase Tool',
    category: 'ai',
    path: '/tools/ai/paraphrase',
    description: 'Rephrase text',
    status: 'building',
  },
  'grammar-checker': {
    id: 'grammar-checker',
    name: 'Grammar Checker',
    category: 'ai',
    path: '/tools/ai/grammar',
    description: 'Check & fix grammar',
    status: 'building',
  },

  // ===== SEO TOOLS (5) =====
  'meta-tag-generator': {
    id: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    category: 'seo',
    path: '/tools/seo/meta-tags',
    description: 'Generate SEO meta tags',
    status: 'building',
  },
  'sitemap-generator': {
    id: 'sitemap-generator',
    name: 'Sitemap Generator',
    category: 'seo',
    path: '/tools/seo/sitemap',
    description: 'Generate XML sitemaps',
    status: 'building',
  },
  'robots-txt-generator': {
    id: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    category: 'seo',
    path: '/tools/seo/robots',
    description: 'Create robots.txt',
    status: 'building',
  },
  'keyword-analyzer': {
    id: 'keyword-analyzer',
    name: 'Keyword Analyzer',
    category: 'seo',
    path: '/tools/seo/keywords',
    description: 'Analyze keywords',
    status: 'building',
  },
  'backlink-checker': {
    id: 'backlink-checker',
    name: 'Backlink Checker',
    category: 'seo',
    path: '/tools/seo/backlinks',
    description: 'Check backlinks',
    status: 'building',
  },

  // ===== CAREER/RESUME TOOLS (3) =====
  'resume-builder': {
    id: 'resume-builder',
    name: 'Resume Builder',
    category: 'resume',
    path: '/tools/resume/builder',
    description: 'Create professional resume',
    status: 'building',
  },
  'cover-letter-generator': {
    id: 'cover-letter-generator',
    name: 'Cover Letter Generator',
    category: 'resume',
    path: '/tools/resume/cover-letter',
    description: 'Generate cover letters',
    status: 'building',
  },
  'portfolio-showcase': {
    id: 'portfolio-showcase',
    name: 'Portfolio Showcase',
    category: 'resume',
    path: '/tools/resume/portfolio',
    description: 'Portfolio templates',
    status: 'building',
  },

  // ===== INDIAN TOOLS (5) =====
  'pan-validator': {
    id: 'pan-validator',
    name: 'PAN Validator',
    category: 'indian',
    path: '/tools/indian/pan-validator',
    description: 'Validate PAN numbers',
    status: 'building',
  },
  'aadhar-validator': {
    id: 'aadhar-validator',
    name: 'Aadhaar Validator',
    category: 'indian',
    path: '/tools/indian/aadhar-validator',
    description: 'Validate Aadhaar numbers',
    status: 'building',
  },
  'pincode-lookup': {
    id: 'pincode-lookup',
    name: 'Pin Code Lookup',
    category: 'indian',
    path: '/tools/indian/pincode',
    description: 'Find cities by pin code',
    status: 'building',
  },
  'train-seat-analyzer': {
    id: 'train-seat-analyzer',
    name: 'Train Seat Analyzer',
    category: 'indian',
    path: '/tools/indian/train-seats',
    description: 'Indian Railway seat layouts',
    status: 'building',
  },
  'ipl-stats': {
    id: 'ipl-stats',
    name: 'IPL Stats Calculator',
    category: 'indian',
    path: '/tools/indian/ipl-stats',
    description: 'IPL statistics & analysis',
    status: 'building',
  },
}

export const getToolsByCategory = (categoryId) => {
  return Object.values(TOOLS).filter(tool => tool.category === categoryId)
}

export const getAllCategories = () => {
  return Object.entries(TOOL_CATEGORIES).map(([id, data]) => ({
    id,
    ...data,
    toolCount: getToolsByCategory(id).length,
  }))
}

export const getToolById = (toolId) => {
  return TOOLS[toolId] || null
}

export const getCategoryById = (categoryId) => {
  return TOOL_CATEGORIES[categoryId] || null
}

export const getAllTools = () => {
  return Object.values(TOOLS)
}

export const getToolStats = () => {
  const allTools = getAllTools()
  const buildingTools = allTools.filter(t => t.status === 'building').length
  const plannedTools = allTools.filter(t => t.status === 'planned').length

  return {
    total: allTools.length,
    building: buildingTools,
    planned: plannedTools,
    byCategory: Object.keys(TOOL_CATEGORIES).reduce((acc, catId) => {
      acc[catId] = getToolsByCategory(catId).length
      return acc
    }, {}),
  }
}
