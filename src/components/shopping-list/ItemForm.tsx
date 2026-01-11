import { useForm } from '@tanstack/react-form';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Item } from '@/lib/api';

interface ItemFormProps {
  item?: Item | null;
  onSubmit: (data: { name: string; price: number; description: string }) => void;
  isLoading?: boolean;
}

export function ItemForm({ item, onSubmit, isLoading }: ItemFormProps) {
  const form = useForm({
    defaultValues: {
      name: item?.name ?? '',
      price: item?.price ?? 0,
      description: item?.description ?? '',
    },
    onSubmit: async ({ value }) => {
      onSubmit({
        name: value.name.trim(),
        price: value.price,
        description: value.description.trim(),
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col h-full"
    >
      <div className="flex gap-4 border-b border-border pb-4">
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) => (!value.trim() ? 'Name is required' : undefined),
          }}
        >
          {(field) => (
            <Input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="Name"
              className="flex-1 border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
              aria-invalid={!field.state.meta.isValid}
            />
          )}
        </form.Field>
        <form.Field
          name="price"
          validators={{
            onBlur: ({ value }) => {
              if (value === undefined || value === null || isNaN(value)) {
                return 'Valid price is required';
              }
              if (value < 0) {
                return 'Price must be non-negative';
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <Input
              id={field.name}
              type="number"
              step="0.01"
              min="0"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              onBlur={field.handleBlur}
              placeholder="Price"
              className="w-24 border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
              aria-invalid={!field.state.meta.isValid}
            />
          )}
        </form.Field>
      </div>

      <form.Subscribe selector={(state) => state.fieldMeta}>
        {(fieldMeta) => {
          const nameError = fieldMeta.name?.errors?.[0];
          const priceError = fieldMeta.price?.errors?.[0];
          if (!nameError && !priceError) return null;
          return (
            <div className="flex gap-4 pt-1">
              <p className="flex-1 text-destructive text-xs">{nameError}</p>
              <p className="w-24 text-destructive text-xs">{priceError}</p>
            </div>
          );
        }}
      </form.Subscribe>

      <div className="pt-4 flex-1 flex flex-col">
        <form.Field name="description">
          {(field) => (
            <Textarea
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Description"
              className="flex-1 border-0 resize-none px-0 focus-visible:ring-0"
            />
          )}
        </form.Field>
      </div>

      <form.Subscribe selector={(state) => state.canSubmit}>
        {(canSubmit) => (
          <button
            type="submit"
            disabled={isLoading || !canSubmit}
            className="absolute bottom-15 right-5 text-primary hover:opacity-80 disabled:opacity-50"
            aria-label="Submit"
          >
            <Send className="size-6" />
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
