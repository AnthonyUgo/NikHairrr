// src/components/ReviewCarousel.tsx
import { useState, useEffect } from 'react';
import * as styles from '../styles/review.css';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  product: string;
  verified: boolean;
}

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/reviews.json')
      .then((res) => res.json())
      .then((data) => {
        // Get top 3 reviews (sorted by rating and date)
        const topReviews = data.reviews
          .sort((a: Review, b: Review) => {
            if (b.rating !== a.rating) return b.rating - a.rating;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          })
          .slice(0, 3);
        setReviews(topReviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load reviews:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // Auto-advance every 6 seconds

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
      <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div>
                <h4 className={styles.reviewerName}>{review.name}</h4>
                <p className={styles.reviewDate}>{formatDate(review.date)}</p>
              </div>
              <div className={styles.reviewStars}>
                {'★'.repeat(review.rating)}
              </div>
            </div>
            
            <h3 className={styles.reviewTitle}>"{review.title}"</h3>
            <p className={styles.reviewText}>{review.text}</p>
            
            <div className={styles.reviewProduct}>
              <span>Product: {review.product}</span>
              {review.verified && (
                <span className={styles.verifiedBadge}>
                  ✓ Verified Purchase
                </span>
              )}
            </div>
          </div>
        ))}
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
