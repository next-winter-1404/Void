'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Button2 from '../common/buttons/Button2';

export default function SortButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSort = (sort?: string, order?: string, additionalParams?: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.delete('sort');
    params.delete('order');
    params.delete('hasParking');
    params.delete('hasYard');
    params.delete('hasImage');
    
    params.set('page', '1');
    
    if (sort) params.set('sort', sort);
    if (order) params.set('order', order);
    
    if (additionalParams) {
      Object.entries(additionalParams).forEach(([key, value]) => {
        params.set(key, value);
      });
    }
    
    router.push(`?${params.toString()}`, { scroll: true });
  };

  const isActive = (sort?: string, order?: string, additionalParams?: Record<string, string>) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');
    
    if (additionalParams) {
      const allMatch = Object.entries(additionalParams).every(
        ([key, value]) => searchParams.get(key) === value
      );
      if (!allMatch) return false;
    } else {
      if (searchParams.get('hasParking') || searchParams.get('hasYard') || searchParams.get('hasImage')) {
        return false;
      }
    }
    
    if (!sort && !order) {
      return !currentSort && !currentOrder;
    }
    
    return currentSort === sort && currentOrder === order;
  };

  return (
    <div className="flex flex-nowrap gap-2 mb-6">
      <Button2 onClick={() => updateSort()} active={isActive()}>
        همه
      </Button2>
      
      <Button2 onClick={() => updateSort('price', 'ASC')} active={isActive('price', 'ASC')}>
        ارزان‌ترین
      </Button2>
      
      <Button2 onClick={() => updateSort('price', 'DESC')} active={isActive('price', 'DESC')}>
        گران‌ترین
      </Button2>
      
      <Button2 onClick={() => updateSort('last_updated', 'DESC')} active={isActive('last_updated', 'DESC')}>
        محبوب‌ترین
      </Button2>
      
      <Button2 onClick={() => updateSort(undefined, undefined, { hasYard: 'true' })} active={isActive(undefined, undefined, { hasYard: 'true' })}>
        حیاط‌دار
      </Button2>
      
      <Button2 onClick={() => updateSort(undefined, undefined, { hasParking: 'true' })} active={isActive(undefined, undefined, { hasParking: 'true' })}>
        پارکینگ‌دار
      </Button2>
      
      <Button2 onClick={() => updateSort(undefined, undefined, { hasImage: 'true' })} active={isActive(undefined, undefined, { hasImage: 'true' })}>
        عکس‌دار
      </Button2>
    </div>
  );
}
