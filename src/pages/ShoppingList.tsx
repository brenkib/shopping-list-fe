import { useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { ItemRow } from '../components/shopping-list/ItemRow';
import { AddItemDialog } from '../components/shopping-list/AddItemDialog';
import { useItems } from '@/hooks/use-items';

export function ShoppingList() {
  const { data: items = [], isPending, error } = useItems();

  const [boughtItems, setBoughtItems] = useState<Set<number>>(new Set());

  const handleToggleBought = useCallback((id: number) => {
    setBoughtItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const total = Math.round(
    items
      .filter((item) => !boughtItems.has(item.id))
      .reduce((sum, item) => sum + item.price, 0) * 100
  ) / 100;

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 w-full max-w-md mx-auto px-6 py-12 md:max-w-2xl lg:max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-center">Shopping List</h1>
        </header>

        {error && (
          <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-lg p-4 mb-6">
            {error.message || 'An error occurred'}
          </div>
        )}

        <div className="flex-1">
          {items.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Your shopping list is empty</p>
              <p className="text-sm mt-1">Click "Add Product" to get started</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-border">
                {items.map((item, idx) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    index={idx + 1}
                    isBought={boughtItems.has(item.id)}
                    onToggleBought={handleToggleBought}
                  />
                ))}
              </div>

              <div className="grid grid-cols-[8%_1fr_20%_12%] gap-4 py-4">
                <div />
                <span className="text-base text-muted-foreground px-4">Total:</span>
                <span className="text-base font-medium text-right pr-4 whitespace-nowrap">{total} NIS</span>
                <div />
              </div>
            </>
          )}
        </div>

        <AddItemDialog />
      </div>
    </div>
  );
}