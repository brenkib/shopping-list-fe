import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { EditItemDialog } from './EditItemDialog';
import { DeleteItemDialog } from './DeleteItemDialog';
import type { Item } from '@/lib/api';

interface ItemRowProps {
  item: Item;
  index: number;
  isBought: boolean;
  onToggleBought: (id: number) => void;
}

export const ItemRow = memo(function ItemRow({ item, index, isBought, onToggleBought }: ItemRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[8%_1fr_20%_12%] items-center gap-4 py-4 border-b cursor-pointer transition-colors hover:bg-muted/50 hover:scale-[1.01]"
      )}
      onClick={() => onToggleBought(item.id)}
    >
      <span className="text-2xl border-r font-semibold text-primary text-center">
        {index}
      </span>
      
      <div className="min-w-0 px-4">
        <Link
          to={`/item/${item.id}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "text-base hover:underline inline-block",
            isBought && "line-through text-muted-foreground"
          )}
        >
          {item.name}
        </Link>
      </div>
      
      <span
        className={cn(
          "text-base whitespace-nowrap text-right pr-4 border-r",
          isBought && "line-through text-muted-foreground"
        )}
      >
        {item.price} NIS
      </span>
      
      <div className="flex gap-1 justify-center" onClick={(e) => e.stopPropagation()}>
        {isBought && (
          <>
            <EditItemDialog item={item} />
            <span className="w-px border-r" />
            <DeleteItemDialog itemId={item.id} itemName={item.name} />
          </>
        )}
      </div>
    </div>
  );
});
