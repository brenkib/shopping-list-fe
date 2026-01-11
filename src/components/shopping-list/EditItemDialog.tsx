import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { ItemForm } from './ItemForm';
import { useUpdateItem } from '@/hooks/use-items';
import type { Item } from '@/lib/api';

interface EditItemDialogProps {
  item: Item;
}

export function EditItemDialog({ item }: EditItemDialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const updateItem = useUpdateItem();

  const handleSubmit = (data: { name: string; price: number; description: string }) => {
    updateItem.mutate(
      { id: item.id, data },
      { onSuccess: () => setOpen(false) }
    );
  };

  const trigger = (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Edit item"
      className="text-muted-foreground hover:text-foreground"
    >
      <Pencil className="size-4" />
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Make changes to your item below.
            </DialogDescription>
          </DialogHeader>
          <ItemForm
            key={item.id}
            item={item}
            onSubmit={handleSubmit}
            isLoading={updateItem.isPending}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <div className="px-4 pt-4 pb-8">
          <ItemForm
            key={item.id}
            item={item}
            onSubmit={handleSubmit}
            isLoading={updateItem.isPending}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
