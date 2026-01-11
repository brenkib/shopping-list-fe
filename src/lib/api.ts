const API_BASE_URL = '/api';

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  bought?: boolean;
}

export interface ApiResponse<T> {
  item?: T;
  items?: T[];
  message?: string;
  error?: string;
}

export async function getAllItems() {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  const data: ApiResponse<Item> = await response.json();
  return data.items || [];
}

export async function getItemById(id: number) {
  const response = await fetch(`${API_BASE_URL}/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch item');
  }
  const data: ApiResponse<Item> = await response.json();
  if (!data.item) {
    throw new Error('Item not found');
  }
  return data.item;
}

export async function createItem(
  name: string,
  price: number,
  description: string = ''
) {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, description }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create item');
  }
  const data: ApiResponse<Item> = await response.json();
  if (!data.item) {
    throw new Error('Failed to create item');
  }
  return data.item;
}

export async function updateItem(
  id: number,
  updates: Partial<Omit<Item, 'id'>>
) {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update item');
  }
  const data: ApiResponse<Item> = await response.json();
  if (!data.item) {
    throw new Error('Failed to update item');
  }
  return data.item;
}

export async function deleteItem(id: number) {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete item');
  }
}
