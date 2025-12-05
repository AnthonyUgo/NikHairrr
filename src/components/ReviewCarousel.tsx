// src/components/ReviewCarousel.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import * as styles from '../styles/review.css.ts';

interface Review {
  id: string;
  name: string;
  rating: number;
  created_at: string;
  text: string;
  product: string;
  verified: boolean;
  featured: boolean;
}

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('status', 'approved')
          .eq('featured', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Shuffle reviews randomly for variety
        const shuffled = data ? [...data].sort(() => Math.random() - 0.5) : [];
        setReviews(shuffled);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, [reviews.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: '#C8A97E' }}>Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: '#D9D7D0' }}>No reviews yet</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={styles.reviewCarousel}>
      <div style={{ position: 'relative', width: '100%' }}>
        <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div>
                <h4 className={styles.reviewerName}>{review.name}</h4>
                <p className={styles.reviewDate}>{formatDate(review.created_at)}</p>
              </div>
              <div className={styles.reviewStars}>
                {'★'.repeat(review.rating)}
              </div>
            </div>
            
            <p className={styles.reviewText}>"{review.text}"</p>
            
            <div className={styles.reviewProduct}>
              {review.product && <span>Product: {review.product}</span>}
              {review.verified && (
                <span className={styles.verifiedBadge}>
                  ✓ Verified Purchase
                </span>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>

      <div className={styles.carouselControls}>
        <button 
          className={styles.carouselButton} 
          onClick={goToPrevious}
          aria-label="Previous review"
        >
          ‹
        </button>
        <button 
          className={styles.carouselButton} 
          onClick={goToNext}
          aria-label="Next review"
        >
          ›
        </button>
      </div>

      <div className={styles.carouselDots}>
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
