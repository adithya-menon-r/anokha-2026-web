import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEventFiltersStore } from '@/stores/useEventFiltersStore';
import { EventFilterOptions, SortOption } from '@/types/eventFilterTypes';
import { Card } from '@/components/ui/card';

interface EventFiltersProps {
  categories: string[];
  dates: string[];
  tags: string[];
  priceRange: [number, number];
}

/**
 * Reusable EventFilters component
 * Renders filter options and manages filter state through Zustand store
 */
export function EventFilters({ categories, dates, tags, priceRange }: EventFiltersProps) {
  // Get filter state from store
  const { filters, setFilters, resetFilters, sortOption, setSortOption } = useEventFiltersStore();

  // Local form state
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(filters.category);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(filters.date);
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);
  const [searchQuery, setSearchQuery] = useState<string>(filters.searchQuery || '');
  const [minPrice, setMinPrice] = useState<string>(filters.price ? String(filters.price[0]) : '');
  const [maxPrice, setMaxPrice] = useState<string>(filters.price ? String(filters.price[1]) : '');
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOption);

  // Update local form state when filters change in store
  useEffect(() => {
    setSelectedCategory(filters.category);
    setSelectedDate(filters.date);
    setSelectedTags(filters.tags || []);
    setSearchQuery(filters.searchQuery || '');
    if (filters.price) {
      setMinPrice(String(filters.price[0]));
      setMaxPrice(String(filters.price[1]));
    }
  }, [filters]);

  // Update local form state when sortOption changes in store
  useEffect(() => {
    setSelectedSort(sortOption);
  }, [sortOption]);

  const handleCategoryClick = (category: string) => {
    const newCategory = selectedCategory === category ? undefined : category;
    setSelectedCategory(newCategory);
    setFilters({ ...filters, category: newCategory });
  };

  const handleDateClick = (date: string) => {
    const newDate = selectedDate === date ? undefined : date;
    setSelectedDate(newDate);
    setFilters({ ...filters, date: newDate });
  };

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    setFilters({ ...filters, tags: newSelectedTags.length > 0 ? newSelectedTags : undefined });
  };

  const handlePriceSubmit = () => {
    const min = minPrice ? parseInt(minPrice, 10) : priceRange[0];
    const max = maxPrice ? parseInt(maxPrice, 10) : priceRange[1];

    if (min >= 0 && max >= min) {
      setFilters({ ...filters, price: [min, max] });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, searchQuery });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption;
    setSelectedSort(newSort);
    setSortOption(newSort);
  };

  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedDate(undefined);
    setSelectedTags([]);
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    resetFilters();
  };

  return (
    <Card className="w-full p-4 bg-gray-50">
      {/* Top row: Search and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>

        <div className="flex-shrink-0 lg:w-48">
          <Label htmlFor="sort-select">Sort By</Label>
          <select
            id="sort-select"
            value={selectedSort}
            onChange={handleSortChange}
            className="w-full p-2 mt-1 border rounded-md bg-white"
          >
            <option value={SortOption.RELEVANCE}>Relevance</option>
            <option value={SortOption.PRICE_LOW_TO_HIGH}>Price: Low to High</option>
            <option value={SortOption.PRICE_HIGH_TO_LOW}>Price: High to Low</option>
            <option value={SortOption.DATE_EARLIEST}>Date: Earliest First</option>
            <option value={SortOption.DATE_LATEST}>Date: Latest First</option>
          </select>
        </div>
      </div>

      {/* Horizontal Filters Row */}
      <div className="space-y-3 mb-4">
        {/* Category filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Label className="text-sm font-medium min-w-fit">Category:</Label>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer text-xs capitalize"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* Date filter */}
        {dates.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Label className="text-sm font-medium min-w-fit">Date:</Label>
            {dates.map((date) => (
              <Badge
                key={date}
                variant={selectedDate === date ? 'default' : 'outline'}
                className="cursor-pointer text-xs"
                onClick={() => handleDateClick(date)}
              >
                {date}
              </Badge>
            ))}
          </div>
        )}

        {/* Tags filter */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <Label className="text-sm font-medium min-w-fit">Tags:</Label>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer text-xs"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Price range filter */}
        <div className="flex flex-wrap items-center gap-2">
          <Label className="text-sm font-medium min-w-fit">Price Range:</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              min={priceRange[0]}
              max={priceRange[1]}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-20 text-xs"
            />
            <span className="text-xs">-</span>
            <Input
              type="number"
              placeholder="Max"
              min={minPrice || String(priceRange[0])}
              max={priceRange[1]}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-20 text-xs"
            />
            <Button
              size="sm"
              onClick={handlePriceSubmit}
              variant="outline"
              className="text-xs px-2"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Reset filters button */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={handleClearFilters}>
          Clear All Filters
        </Button>
      </div>
    </Card>
  );
}
