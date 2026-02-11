
import React from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
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
      <div className="good-stuff-top">
        <div className="good-stuff-pill fade-in">THE GOOD STUFF</div>
        <h2 className="good-stuff-heading fade-in fade-in-stagger-1">
          The Good Stuff is where we dig into how AI is changing the way we work,
          build businesses, and shape the broader economy.
        </h2>

        <p className="good-stuff-subpara fade-in fade-in-stagger-2">
          We publish essays, stories, and conversations about the way humans and
          AI work together — and what that means for small businesses. If you
          want to understand how we think, this is the best place to start.
        </p>

        <div className="good-stuff-cta fade-in fade-in-stagger-3">
          <EmailCaptureForm
            variant="inline"
            placeholder="Enter your email"
            buttonText="Join the Good Stuff"
          />
        </div>
      </div>

      <div className="good-stuff-bottom">
        <div className="good-stuff-row">
          <div className="good-stuff-column">
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

          <div className="good-stuff-column">
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

          <div className="good-stuff-column">
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
