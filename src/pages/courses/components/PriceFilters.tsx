import { PriceFilter } from '../types';

interface PriceFiltersProps {
  priceRanges: PriceFilter[];
  selectedPrice: string;
  setSelectedPrice: (priceId: string) => void;
}

export const PriceFilters = ({
  priceRanges,
  selectedPrice,
  setSelectedPrice,
}: PriceFiltersProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-3">Price</h4>
      <div className="space-y-2">
        {priceRanges.map((price) => (
          <div key={price.id} className="flex items-center">
            <input
              type="radio"
              id={`price-${price.id}`}
              name="price"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              checked={selectedPrice === price.id}
              onChange={() => setSelectedPrice(price.id)}
            />
            <label htmlFor={`price-${price.id}`} className="ml-2 text-sm text-gray-700">
              {price.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
