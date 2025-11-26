'use client';

import React from 'react';
import { Button } from './Button';
import './GoodStuff.css';

export function GoodStuff() {

  const articles = [
    {
      title: 'On the Business Model of AI',
      author: 'Pete Winn',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Article',
    },
    {
      title: 'Navigating the AI Value Trap',
      author: 'Pete Winn',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Article',
    },
    {
      title: 'Designing for Flow',
      author: 'Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Article',
    },
    {
      title: 'The Price of Intelligence',
      author: 'Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Article',
    },
    {
      title: 'Abundant Intelligence',
      author: 'Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Article',
    },
    {
      title: 'Optimal Human Placement™',
      author: 'Pete Winn, Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Article',
    },
  ];

  const podcasts = [
    {
      title: 'From Zero to Vibe Coder',
      hosts: 'Pete Winn, Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Podcast',
    },
    {
      title: 'The Human Way to Use AI',
      hosts: 'Pete Winn, Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Podcast',
    },
    {
      title: 'Lessons Learned From AI Agents',
      hosts: 'Pete Winn, Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Podcast',
    },
    {
      title: 'Claude Code For Everyday Tasks',
      hosts: 'Pete Winn, Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Podcast',
    },
    {
      title: 'Freedom Tech in Walled Gardens',
      hosts: 'Pete Winn, Andy David',
      image: 'https://placehold.co/800x450/1a1a1a/F0F0F0?text=Podcast',
    },
  ];

  const highlights = [
    {
      title: 'Managing Multiple AI Agents on a Mac Mini',
      hosts: 'Pete Winn, Andy David',
    },
    {
      title: 'Building Your First AI Workflow',
      hosts: 'Pete Winn, Andy David',
    },
    {
      title: 'When to Use AI vs When to Stay Human',
      hosts: 'Pete Winn, Andy David',
    },
  ];

  return (
    <section id="media" className="section good-stuff-section">
      <div className="section-container-wide">
        {/* Header */}
        <div className="good-stuff-header">
          <h3 className="section-eyebrow fade-in">THE GOOD STUFF</h3>
          <h2 className="fade-in fade-in-stagger-1">
            We share our experiences working with AI
          </h2>
          <p className="fade-in fade-in-stagger-2">
            How it's changing the rules of work and business, the economy,
            entrepreneurship, and human potential.
          </p>

          <div className="good-stuff-cta fade-in fade-in-stagger-3">
            <Button variant="primary">Join the Good Stuff</Button>
            <Button variant="secondary">Read More</Button>
          </div>
        </div>

        <div className="good-stuff-columns">
          <div className="good-stuff-column fade-in">
            <h4 className="good-stuff-column-title">Featured Articles</h4>
            <ul>
              {articles.map((article) => (
                <li key={article.title}>
                  <span className="item-title">{article.title}</span>
                  <span className="item-meta">{article.author}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="good-stuff-column fade-in fade-in-stagger-1">
            <h4 className="good-stuff-column-title">Recent Podcasts</h4>
            <ul>
              {podcasts.map((podcast) => (
                <li key={podcast.title}>
                  <span className="item-title">{podcast.title}</span>
                  <span className="item-meta">{podcast.hosts}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="good-stuff-column fade-in fade-in-stagger-2">
            <h4 className="good-stuff-column-title">Podcast Highlights</h4>
            <ul>
              {highlights.map((highlight) => (
                <li key={highlight.title}>
                  <span className="item-title">{highlight.title}</span>
                  <span className="item-meta">{highlight.hosts}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
