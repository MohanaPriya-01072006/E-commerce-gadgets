import React from 'react';

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="aspect-square bg-secondary-200 dark:bg-secondary-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4" />
        <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-secondary-200 dark:bg-secondary-700 rounded-full" />
          ))}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3" />
          <div className="h-10 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

// Product List Item Skeleton
export function ProductListItemSkeleton() {
  return (
    <div className="card flex gap-4 p-4 animate-pulse">
      <div className="w-28 h-28 bg-secondary-200 dark:bg-secondary-700 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3" />
        <div className="h-5 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4" />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-secondary-200 dark:bg-secondary-700 rounded-full" />
          ))}
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4" />
          <div className="h-5 bg-secondary-200 dark:bg-secondary-700 rounded w-1/5" />
        </div>
      </div>
    </div>
  );
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <div className="bg-gradient-brand py-20 px-4 animate-pulse">
      <div className="container-custom max-w-3xl space-y-4">
        <div className="h-8 bg-white/20 rounded w-1/4 mx-auto" />
        <div className="h-16 bg-white/20 rounded w-3/4 mx-auto" />
        <div className="h-6 bg-white/20 rounded w-1/2 mx-auto" />
        <div className="h-12 bg-white/20 rounded w-1/3 mx-auto mt-6" />
      </div>
    </div>
  );
}

// Category Card Skeleton
export function CategoryCardSkeleton() {
  return (
    <div className="card p-6 text-center animate-pulse">
      <div className="w-16 h-16 bg-secondary-200 dark:bg-secondary-700 rounded-2xl mx-auto mb-4" />
      <div className="h-5 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mx-auto" />
      <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2 mx-auto mt-2" />
    </div>
  );
}

// Cart Item Skeleton
export function CartItemSkeleton() {
  return (
    <div className="card p-4 flex gap-4 animate-pulse">
      <div className="w-24 h-24 bg-secondary-200 dark:bg-secondary-700 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4" />
          <div className="w-8 h-8 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
        </div>
        <div className="h-5 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4" />
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-secondary-200 dark:bg-secondary-700 rounded" />
            <div className="w-8 h-8 bg-secondary-200 dark:bg-secondary-700 rounded" />
            <div className="w-8 h-8 bg-secondary-200 dark:bg-secondary-700 rounded" />
          </div>
          <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

// Order Summary Skeleton
export function OrderSummarySkeleton() {
  return (
    <div className="card p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3" />
            <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4" />
          </div>
        ))}
      </div>
      <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4" />
          <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3" />
        </div>
      </div>
      <div className="h-12 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
    </div>
  );
}

// Review Skeleton
export function ReviewSkeleton() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-secondary-200 dark:bg-secondary-700 rounded-full" />
          <div className="space-y-2">
            <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-24" />
            <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-32" />
          </div>
        </div>
        <div className="h-6 bg-secondary-200 dark:bg-secondary-700 rounded w-16" />
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-secondary-200 dark:bg-secondary-700 rounded-full" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-full" />
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-5/6" />
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-4/6" />
      </div>
    </div>
  );
}

// Stats Card Skeleton
export function StatsCardSkeleton() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-12 bg-secondary-200 dark:bg-secondary-700 rounded w-12 mb-4" />
      <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2 mb-2" />
      <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/3" />
    </div>
  );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 4 }) {
  return (
    <div className="flex gap-4 p-4 border-b border-secondary-200 dark:border-secondary-700 animate-pulse">
      {[...Array(columns)].map((_, i) => (
        <div key={i} className="flex-1">
          <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

// Form Skeleton
export function FormSkeleton({ fields = 3 }) {
  return (
    <div className="card p-6 space-y-4 animate-pulse">
      {[...Array(fields)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/4" />
          <div className="h-12 bg-secondary-200 dark:bg-secondary-700 rounded-xl" />
        </div>
      ))}
      <div className="h-12 bg-secondary-200 dark:bg-secondary-700 rounded-xl mt-4" />
    </div>
  );
}

// Empty State Component
export function EmptyState({ icon, title, description, action, actionText }) {
  return (
    <div className="card py-20 px-8 text-center">
      <div className="w-20 h-20 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="font-display font-bold text-xl text-secondary-900 dark:text-white mb-2">{title}</h3>
      <p className="text-secondary-500 dark:text-secondary-400 mb-6 max-w-sm mx-auto">{description}</p>
      {action && <button onClick={action} className="btn btn-primary">{actionText}</button>}
    </div>
  );
}

export default {
  ProductCardSkeleton,
  ProductListItemSkeleton,
  HeroSkeleton,
  CategoryCardSkeleton,
  CartItemSkeleton,
  OrderSummarySkeleton,
  ReviewSkeleton,
  StatsCardSkeleton,
  TableRowSkeleton,
  FormSkeleton,
  EmptyState,
};
