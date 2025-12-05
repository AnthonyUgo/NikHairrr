// src/components/ReviewForm.tsx
import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from '../contexts/AuthContext';
import * as styles from '../styles/review.css.ts';

interface ReviewFormProps {
  onSuccess?: () => void;
}

export default function ReviewForm({ onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [product, setProduct] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const { error: insertError } = await supabase
        .from('reviews')
        .insert({
          name,
          rating,
          text,
          product: product || null,
          status: 'pending', // Reviews need approval before showing
          verified: false,
          featured: false,
        });
      
      if (insertError) throw insertError;
      
      setSuccess(true);
      
      // Reset form
      setName('');
      setRating(5);
      setText('');
      setProduct('');
      
      // Call success callback
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err: any) {
      console.error('Failed to submit review:', err);
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{
        padding: '3rem',
        background: 'rgba(81, 207, 102, 0.1)',
        border: '1px solid rgba(81, 207, 102, 0.3)',
        textAlign: 'center',
        marginBottom: '2rem',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
        <h3 style={{ color: '#51cf66', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Thank you for your review!
        </h3>
        <p style={{ color: '#e5e5e5', fontSize: '1rem' }}>
          Your review has been submitted and will be published after verification.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <h3 className={styles.formHeading}>Share Your Experience</h3>
      
      {error && (
        <div style={{
          padding: '1rem',
          background: 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          color: '#ff6b6b',
          marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}
      
      {!user && (
        <div style={{
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#e5e5e5',
          marginBottom: '1rem',
          fontSize: '0.9rem',
        }}>
          ℹ️ You can submit a review without an account, but verified purchases require membership.
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Your Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
          placeholder="Enter your name"
          disabled={submitting}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Rating *</label>
        <div className={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`${styles.starButton} ${star <= (hoveredRating || rating) ? styles.starActive : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              disabled={submitting}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="product" className={styles.label}>Product Purchased</label>
        <input
          id="product"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className={styles.input}
          placeholder="e.g., 22-inch Brazilian Bundle (optional)"
          disabled={submitting}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="text" className={styles.label}>Your Review *</label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.textarea}
          required
          placeholder="Tell us about your experience with NikHairrr..."
          rows={5}
          disabled={submitting}
        />
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={submitting}
        style={{ opacity: submitting ? 0.6 : 1 }}
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
