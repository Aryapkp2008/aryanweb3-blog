'use client';

import React, { useState, useEffect } from 'react';
import { BlogEnhancer, contentQualityMetrics } from '@/utils/contentEnhancer';
import { 
  Wand2, 
  FileText, 
  Sparkles, 
  BarChart3, 
  BookOpen,
  Lightbulb,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface BlogEditorProps {
  initialContent?: string;
  onSave?: (content: string, metadata: any) => void;
}

export default function BlogEditor({ initialContent = '', onSave }: BlogEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'enhance'>('editor');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (content) {
      const analysis = BlogEnhancer.analyzeContent(content);
      const qualityMetrics = contentQualityMetrics(content);
      setMetrics({ ...analysis, ...qualityMetrics });
    }
  }, [content]);

  const handleGenerateHooks = () => {
    if (!topic) {
      alert('Please enter a topic first');
      return;
    }
    const hooks = BlogEnhancer.generateHooks(topic);
    setSuggestions(prev => [...prev, { type: 'hooks', data: hooks, timestamp: Date.now() }]);
  };

  const handleGenerateMetaphors = () => {
    if (!topic) {
      alert('Please enter a topic first');
      return;
    }
    const metaphors = BlogEnhancer.generateMetaphors(topic);
    setSuggestions(prev => [...prev, { type: 'metaphors', data: metaphors, timestamp: Date.now() }]);
  };

  const handleGenerateTitles = (style: 'informative' | 'clickbait' | 'technical' | 'narrative') => {
    if (!topic) {
      alert('Please enter a topic first');
      return;
    }
    const titles = BlogEnhancer.generateTitles(topic, style);
    setSuggestions(prev => [...prev, { type: 'titles', data: titles, style, timestamp: Date.now() }]);
  };

  const handleGenerateOutline = (depth: 'basic' | 'detailed' | 'comprehensive') => {
    if (!topic) {
      alert('Please enter a topic first');
      return;
    }
    const outline = BlogEnhancer.generateOutline(topic, depth);
    setContent(outline);
  };

  const handleApplyTemplate = () => {
    const templates = BlogEnhancer.getStructureTemplates();
    const template = templates.find(t => t.name === selectedTemplate);
    if (template) {
      const templateContent = template.sections
        .map(section => `## ${section.title}\n\n*${section.purpose}*\n\n${section.elements.map(el => `- ${el}`).join('\n')}\n\n(Target: ~${section.wordCount} words)`)
        .join('\n\n');
      setContent(templateContent);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItems(prev => new Set(prev).add(id));
    setTimeout(() => {
      setCopiedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b dark:border-gray-800 p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Blog Content Enhancer</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Enter main topic (e.g., 'DeFi', 'NFTs', 'Layer 2')..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-6 py-3 font-medium ${activeTab === 'editor' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Editor
              </button>
              <button
                onClick={() => setActiveTab('enhance')}
                className={`px-6 py-3 font-medium ${activeTab === 'enhance' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Sparkles className="inline-block w-4 h-4 mr-2" />
                Enhance
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-3 font-medium ${activeTab === 'preview' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <BookOpen className="inline-block w-4 h-4 mr-2" />
                Preview
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex">
            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === 'editor' && (
                <div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-[600px] p-4 border rounded-lg font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Start writing your blog post here..."
                  />
                </div>
              )}

              {activeTab === 'enhance' && (
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Wand2 className="w-5 h-5 mr-2" />
                      Quick Enhancements
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <button
                        onClick={handleGenerateHooks}
                        className="px-4 py-2 bg-white border border-purple-300 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        Generate Hooks
                      </button>
                      <button
                        onClick={handleGenerateMetaphors}
                        className="px-4 py-2 bg-white border border-purple-300 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        Create Metaphors
                      </button>
                      <button
                        onClick={() => handleGenerateTitles('informative')}
                        className="px-4 py-2 bg-white border border-purple-300 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        Title Ideas
                      </button>
                    </div>
                  </div>

                  {/* Structure Templates */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Article Structure Templates</h3>
                    <div className="flex gap-3">
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                      >
                        <option value="">Select a template...</option>
                        {BlogEnhancer.getStructureTemplates().map(template => (
                          <option key={template.name} value={template.name}>
                            {template.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleApplyTemplate}
                        disabled={!selectedTemplate}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply Template
                      </button>
                    </div>
                  </div>

                  {/* Outline Generator */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Outline Generator</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleGenerateOutline('basic')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Basic Outline
                      </button>
                      <button
                        onClick={() => handleGenerateOutline('detailed')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Detailed Outline
                      </button>
                      <button
                        onClick={() => handleGenerateOutline('comprehensive')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Comprehensive
                      </button>
                    </div>
                  </div>

                  {/* Suggestions Display */}
                  {suggestions.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Generated Suggestions</h3>
                      {suggestions.map((suggestion, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleSection(`suggestion-${idx}`)}
                          >
                            <h4 className="font-medium capitalize">{suggestion.type}</h4>
                            {expandedSections.has(`suggestion-${idx}`) ? 
                              <ChevronUp className="w-4 h-4" /> : 
                              <ChevronDown className="w-4 h-4" />
                            }
                          </div>
                          {expandedSections.has(`suggestion-${idx}`) && (
                            <div className="mt-3 space-y-2">
                              {Array.isArray(suggestion.data) ? (
                                suggestion.data.map((item: any, itemIdx: number) => {
                                  const itemId = `${idx}-${itemIdx}`;
                                  return (
                                    <div key={itemIdx} className="bg-white p-3 rounded border flex justify-between items-start">
                                      <p className="flex-1 text-sm">
                                        {typeof item === 'string' ? item : item.content}
                                      </p>
                                      <button
                                        onClick={() => copyToClipboard(typeof item === 'string' ? item : item.content, itemId)}
                                        className="ml-2 p-1 hover:bg-gray-100 rounded"
                                      >
                                        {copiedItems.has(itemId) ? 
                                          <Check className="w-4 h-4 text-green-600" /> : 
                                          <Copy className="w-4 h-4 text-gray-600" />
                                        }
                                      </button>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="bg-white p-3 rounded border">
                                  <pre className="whitespace-pre-wrap text-sm">{suggestion.data}</pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'preview' && (
                <div className="prose max-w-none">
                  <h1>{title || 'Untitled Post'}</h1>
                  <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
                </div>
              )}
            </div>

            {/* Sidebar with Metrics */}
            <div className="w-80 bg-gray-50 dark:bg-gray-800 p-6 border-l dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Content Metrics
              </h3>
              
              {metrics && (
                <div className="space-y-4">
                  {/* Quality Score */}
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Quality Score</span>
                      <span className={`text-2xl font-bold ${getQualityColor(metrics.score)}`}>
                        {metrics.score}/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metrics.score >= 80 ? 'bg-green-600' : 
                          metrics.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${metrics.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Word Count</span>
                      <span className="font-medium">{metrics.wordCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reading Time</span>
                      <span className="font-medium">{metrics.readingTime} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sentences</span>
                      <span className="font-medium">{metrics.sentenceCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Paragraphs</span>
                      <span className="font-medium">{metrics.paragraphCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Headers</span>
                      <span className="font-medium">{metrics.headerCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Code Blocks</span>
                      <span className="font-medium">{metrics.codeBlockCount}</span>
                    </div>
                  </div>

                  {/* Readability */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Readability
                    </h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Score</span>
                      <span className={`font-medium ${getQualityColor(metrics.readabilityScore)}`}>
                        {metrics.readabilityScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Suggestions */}
                  {(metrics.suggestions?.length > 0 || metrics.improvements?.length > 0) && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Suggestions
                      </h4>
                      <ul className="text-sm space-y-1">
                        {metrics.suggestions?.map((suggestion: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-yellow-600 mr-1">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                        {metrics.improvements?.map((improvement: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-orange-600 mr-1">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Power Words */}
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium mb-2">Power Words</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(BlogEnhancer.getPowerWords()).flat().slice(0, 8).map((word, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs cursor-pointer hover:bg-purple-200"
                          onClick={() => copyToClipboard(word, `power-${idx}`)}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t dark:border-gray-800 p-6 flex justify-between">
            <button
              onClick={() => setContent('')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const blob = new Blob([content], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${title || 'blog-post'}.md`;
                  a.click();
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Export as Markdown
              </button>
              <button
                onClick={() => onSave?.(content, { title, topic, metrics })}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}