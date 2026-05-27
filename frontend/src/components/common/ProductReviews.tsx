import React from 'react';
import { Star } from 'lucide-react';

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
    <div className="w-full mt-24 pt-16 border-t border-zinc-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
         <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-wide mb-4">Customer Reviews</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-white' : 'fill-white/80'}`} />
                ))}
              </div>
              <span className="text-zinc-400 font-medium tracking-wide">4.8 out of 5 stars</span>
            </div>
         </div>
         <button className="px-6 py-3 border border-zinc-700 text-zinc-300 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black hover:border-white transition-colors duration-300">
            Write a Review
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {reviews.map(review => (
          <div key={review.id} className="flex flex-col gap-4 p-8 bg-zinc-900/50 border border-zinc-800/50">
             <div className="flex items-center justify-between">
               <span className="text-white font-serif font-bold text-lg tracking-wide">{review.author}</span>
               <span className="text-zinc-500 font-sans text-sm tracking-widest">{review.date}</span>
             </div>
             <div className="flex items-center gap-1 text-white">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-white' : 'text-zinc-700'}`} />
                ))}
             </div>
             <p className="text-zinc-400 leading-relaxed text-sm font-sans mt-2">
                "{review.content}"
             </p>
          </div>
        ))}
      </div>
    </div>
  );
};
