// src/components/ReviewForm.tsx
import { useState } from 'react';
import * as styles from '../styles/review.css';

interface ReviewFormProps {
  onSubmit: (review: {
    name: string;
    rating: number;
    title: string;
    text: string;
    product: string;
  }) => void;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [product, setProduct] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, rating, title, text, product });
    
    // Reset form
    setName('');
    setRating(5);
    setTitle('');
    setText('');
    setProduct('');
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <h3 className={styles.formHeading}>Share Your Experience</h3>
      
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
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="product" className={styles.label}>Product Purchased *</label>
        <input
          id="product"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className={styles.input}
          required
          placeholder="e.g., 22-inch Brazilian Bundle"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Review Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
          placeholder="Sum up your experience"
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
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit Review
      </button>
    </form>
  );
}
