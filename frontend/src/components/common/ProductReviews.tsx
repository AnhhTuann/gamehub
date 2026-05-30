import React from 'react';
import { Star, MessageSquare } from 'lucide-react';

export const ProductReviews = () => {
  const reviews = [
    {
      id: 1,
      author: 'Eleanor Vance',
      date: 'May 20, 2026',
      rating: 5,
      content: 'Absolutely exquisite craftsmanship. The drape is perfect and it feels incredibly luxurious against the skin. Exceeded all my expectations.'
    },
    {
      id: 2,
      author: 'Julian Blackwood',
      date: 'April 14, 2026',
      rating: 4,
      content: 'Beautiful piece, the color is even deeper and more resonant in person. Took off one star only because the shipping took an extra day.'
    }
  ];

  return (
    <div className="w-full mt-16 pt-12 border-t border-theme-primary">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-theme-primary mb-3">Customer Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-400/50 fill-amber-400/50'}`} />
              ))}
            </div>
            <span className="text-theme-muted text-sm font-medium">4.8 out of 5 stars</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-theme-primary text-theme-secondary font-semibold text-sm rounded-xl hover:bg-accent hover:text-white hover:border-accent transition-all duration-300">
          <MessageSquare className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="flex flex-col gap-3 p-6 bg-theme-secondary border border-theme-primary rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-theme-primary font-bold text-sm">{review.author}</span>
              <span className="text-theme-muted text-xs">{review.date}</span>
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-theme-muted'}`} />
              ))}
            </div>
            <p className="text-theme-secondary leading-relaxed text-sm">
              "{review.content}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
