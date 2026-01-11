import { useState, memo } from 'react';
import { Plus } from 'lucide-react';
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
import { ItemForm } from './ItemForm';
import { useCreateItem } from '@/hooks/use-items';

export const AddItemDialog = memo(function AddItemDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const createItem = useCreateItem();

  const handleSubmit = (data: { name: string; price: number; description: string }) => {
    createItem.mutate(data, {
      onSuccess: () => setOpen(false),
    });
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-4 py-4 mt-4 text-primary hover:opacity-80 transition-opacity">
            <Plus className="size-5" />
            <span className="text-base font-medium">Add Product</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add a new item to your shopping list.
            </DialogDescription>
          </DialogHeader>
          <ItemForm
            key="new"
            onSubmit={handleSubmit}
            isLoading={createItem.isPending}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="flex items-center gap-4 py-4 mt-4 text-primary hover:opacity-80 transition-opacity">
          <Plus className="size-5" />
          <span className="text-base font-medium">Add Product</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="px-4 pt-4 pb-8">
          <ItemForm
            key="new"
            onSubmit={handleSubmit}
            isLoading={createItem.isPending}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
});
