import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useItem } from '@/hooks/use-items';

export function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item, isPending } = useItem(Number(id));

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full max-w-md mx-auto px-6 py-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="size-6" />
          </button>
          <p className="text-center text-muted-foreground">Item not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="size-6" />
        </button>

        <h1 className="text-2xl font-bold text-center mb-8">{item.name}</h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          {item.description || 'No description available.'}
        </p>
      </div>
    </div>
  );
}
