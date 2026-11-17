'use client';

import React, { useState, useEffect } from 'react';
import { getStoredArticles } from '../data/articlesData';
import { BookOpenIcon, BookmarkIcon, SearchIcon, XIcon, CopyIcon, CheckIcon, StarIcon } from './Icons';

export default function ArticlesReader() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Initial load
    setArticles(getStoredArticles());

    // Listen for admin updates
    const handleUpdate = (e) => {
      if (e.detail) {
        setArticles(e.detail);
      } else {
        setArticles(getStoredArticles());
      }
    };

    window.addEventListener('odcs_articles_updated', handleUpdate);
    return () => window.removeEventListener('odcs_articles_updated', handleUpdate);
  }, []);

  // Filter published articles only for public reader
  const publishedArticles = articles.filter(a => a.status !== 'draft');

  const categories = ['all', ...Array.from(new Set(publishedArticles.map(a => a.category)))];

  const filtered = publishedArticles.filter(a => {
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  const openReader = (article) => {
    setSelectedArticle(article);
    document.body.classList.add('menu-locked');
  };

  const closeReader = () => {
    setSelectedArticle(null);
    document.body.classList.remove('menu-locked');
  };

  const copyArticleLink = (id) => {
    const url = `${window.location.origin}/#article-${id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Simple Markdown renderer for article content
  const renderMarkdown = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer = [];
    const elements = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${index}`} style={{
              background: '#030712',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              borderRadius: '8px',
              padding: '1rem',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: '#38bdf8',
              margin: '1rem 0'
            }}>
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: '1.5rem 0 0.5rem 0' }}>
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} style={{ fontSize: '1.35rem', fontWeight: 800, color: '#00f0ff', margin: '1.25rem 0 0.5rem 0' }}>
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24', margin: '1rem 0 0.35rem 0' }}>
            {line.substring(4)}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} style={{
            borderLeft: '3px solid #00f0ff',
            paddingLeft: '1rem',
            margin: '1rem 0',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            background: 'rgba(0, 240, 255, 0.05)',
            padding: '0.75rem 1rem',
            borderRadius: '0 8px 8px 0'
          }}>
            {line.substring(2)}
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} style={{ marginLeft: '1.5rem', marginBottom: '0.35rem', color: 'var(--text-main)', fontSize: '0.92rem' }}>
            {line.substring(2)}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(
          <hr key={index} style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.1)', margin: '1.5rem 0' }} />
        );
      } else if (line.trim() !== '') {
        elements.push(
          <p key={index} style={{ fontSize: '0.94rem', lineHeight: 1.7, color: 'var(--text-main)', margin: '0.65rem 0' }}>
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <section id="articles-hub" style={{ marginBottom: '5rem', position: 'relative' }}>
      <div className="section-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-cyan">THOUGHT LEADERSHIP</span>
          <span className="badge badge-emerald">PEER REVIEWED ESSAYS</span>
        </div>
        <h2 className="section-title">
          📰 Architectural Essays &amp; Publications
        </h2>
        <p className="section-desc">
          Deep-dives into digital continuity, language compiler design, and zero-intent-loss mathematics
          by Lead Architect Anirudha Puthraya and ODCS standards authors.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 1.25rem'
        }}>
          <SearchIcon size={18} style={{ color: '#00f0ff' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, philosophy, or keywords (e.g. ZeroIntentLoss, Haven, Replay, WAL)..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: '0.92rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
          <span className="badge badge-cyan" style={{ whiteSpace: 'nowrap' }}>
            {filtered.length} Articles
          </span>
        </div>

        {/* Category Chips */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem',
          WebkitOverflowScrolling: 'touch'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedCategory === cat ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                color: selectedCategory === cat ? '#00f0ff' : 'var(--text-muted)',
                borderRadius: '9999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize'
              }}
            >
              {cat === 'all' ? 'All Publications' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '1.25rem'
      }}>
        {filtered.map(article => (
          <article
            key={article.id}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: article.is_pinned ? '1.5px solid rgba(251, 191, 36, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1rem, 2vw, 1.35rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: article.is_pinned ? '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              position: 'relative',
              minWidth: 0
            }}
          >
            <div style={{ minWidth: 0 }}>
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{article.category}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {article.is_pinned && (
                    <span style={{
                      background: 'rgba(251, 191, 36, 0.15)',
                      border: '1px solid rgba(251, 191, 36, 0.4)',
                      color: '#fbbf24',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      padding: '0.12rem 0.45rem',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <BookmarkIcon size={12} />
                      <span>PINNED</span>
                    </span>
                  )}
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {article.read_time}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.3,
                marginBottom: '0.4rem'
              }}>
                {article.title}
              </h3>

              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: '0.85rem'
              }}>
                {article.subtitle || article.summary}
              </p>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                  {article.tags.map(t => (
                    <span key={t} style={{
                      fontSize: '0.66rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      color: 'var(--text-dim)',
                      padding: '0.12rem 0.4rem',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Author and Action */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              flexWrap: 'wrap',
              gap: '0.65rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%)',
                  border: '1px solid rgba(0, 240, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}>
                  👨‍💻
                </div>
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#fff' }}>{article.author}</div>
                  <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>{article.date}</div>
                </div>
              </div>

              <button
                onClick={() => openReader(article)}
                className="btn btn-secondary btn-sm"
                style={{
                  borderColor: 'rgba(0, 240, 255, 0.4)',
                  color: '#00f0ff'
                }}
              >
                <span>Read Essay</span>
                <span style={{ fontSize: '0.9rem' }}>➔</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Full-Screen Immersive Reading Drawer / Modal */}
      {selectedArticle && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 7, 18, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(0.5rem, 2vw, 1.5rem)',
          boxSizing: 'border-box'
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.98)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.15)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(0.75rem, 2vw, 1.25rem)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span className="badge badge-cyan">{selectedArticle.category}</span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  {selectedArticle.read_time}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <button
                  onClick={() => copyArticleLink(selectedArticle.id)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    background: copiedLink ? '#10b981' : 'rgba(255, 255, 255, 0.06)',
                    borderColor: copiedLink ? '#10b981' : 'rgba(255, 255, 255, 0.15)',
                    color: copiedLink ? '#020617' : '#fff'
                  }}
                >
                  {copiedLink ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                  <span>{copiedLink ? 'LINK COPIED' : 'SHARE'}</span>
                </button>

                <button
                  onClick={closeReader}
                  style={{
                    background: 'rgba(244, 63, 94, 0.15)',
                    border: '1px solid rgba(244, 63, 94, 0.4)',
                    color: '#f43f5e',
                    borderRadius: '7px',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Close"
                >
                  <XIcon size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body / Article Content */}
            <div style={{
              padding: '2rem',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}>
              {/* Author Card Banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '0.85rem 1.25rem',
                marginBottom: '1.75rem'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%)',
                  border: '1.5px solid rgba(0, 240, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  👨‍💻
                </div>
                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#ffffff' }}>
                    {selectedArticle.author}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#00f0ff' }}>
                    {selectedArticle.role} · {selectedArticle.date}
                  </div>
                </div>
              </div>

              {/* Formatted Content */}
              <div>
                {renderMarkdown(selectedArticle.content)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
