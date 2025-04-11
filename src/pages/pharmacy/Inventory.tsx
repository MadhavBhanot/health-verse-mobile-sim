
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { mockPharmacyInventory } from '@/utils/mockData';
import { Search, Plus, Package, ArrowUpDown, Edit, Pill } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PharmacyInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inventory, setInventory] = useState(mockPharmacyInventory);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Prescription',
    stock: '',
    price: '',
    reorderLevel: '',
  });
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const { toast } = useToast();

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  const prescriptionItems = sortedInventory.filter(item => item.category === 'Prescription');
  const otcItems = sortedInventory.filter(item => item.category === 'OTC');
  const lowStockItems = sortedInventory.filter(item => item.stock <= item.reorderLevel);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const addItem = () => {
    const itemToAdd = {
      id: `i${inventory.length + 1}`,
      name: newItem.name,
      category: newItem.category,
      stock: parseInt(newItem.stock),
      price: parseFloat(newItem.price),
      reorderLevel: parseInt(newItem.reorderLevel),
    };

    setInventory([...inventory, itemToAdd]);
    setNewItem({
      name: '',
      category: 'Prescription',
      stock: '',
      price: '',
      reorderLevel: '',
    });

    toast({
      title: "Item added",
      description: `${itemToAdd.name} has been added to your inventory`,
    });
  };

  const updateStock = (id, amount) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock + amount) } : item
    ));
    
    toast({
      title: "Stock updated",
      description: `Inventory has been updated`,
    });
  };

  return (
    <AuthenticatedLayout requiredRole="pharmacy">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-health-primary" size="icon">
                <Plus size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Inventory Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Medication Name</Label>
                  <Input
                    id="item-name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Medication name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border rounded-md"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  >
                    <option value="Prescription">Prescription</option>
                    <option value="OTC">Over-the-counter</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reorder-level">Reorder Level</Label>
                  <Input
                    id="reorder-level"
                    type="number"
                    value={newItem.reorderLevel}
                    onChange={(e) => setNewItem({ ...newItem, reorderLevel: e.target.value })}
                  />
                </div>
                <Button onClick={addItem} className="w-full">Add Item</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search inventory..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <Card className="p-3">
            <div className="flex justify-between text-sm font-medium">
              <button 
                className="flex items-center"
                onClick={() => handleSort('name')}
              >
                Name
                {sortField === 'name' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
              <button 
                className="flex items-center"
                onClick={() => handleSort('category')}
              >
                Category
                {sortField === 'category' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
              <button 
                className="flex items-center"
                onClick={() => handleSort('stock')}
              >
                Stock
                {sortField === 'stock' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
              <button 
                className="flex items-center"
                onClick={() => handleSort('price')}
              >
                Price
                {sortField === 'price' && (
                  <ArrowUpDown size={14} className="ml-1" />
                )}
              </button>
              <span>Actions</span>
            </div>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="prescription" className="flex-1">Prescription</TabsTrigger>
            <TabsTrigger value="otc" className="flex-1">OTC</TabsTrigger>
            <TabsTrigger value="low-stock" className="flex-1">Low Stock</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3">
            {renderInventory(sortedInventory, updateStock)}
          </TabsContent>
          
          <TabsContent value="prescription" className="space-y-3">
            {renderInventory(prescriptionItems, updateStock)}
          </TabsContent>
          
          <TabsContent value="otc" className="space-y-3">
            {renderInventory(otcItems, updateStock)}
          </TabsContent>
          
          <TabsContent value="low-stock" className="space-y-3">
            {renderInventory(lowStockItems, updateStock)}
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  );
};

const renderInventory = (items, updateStock) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Package className="mx-auto mb-2" size={24} />
        <p>No items found</p>
      </div>
    );
  }
  
  return items.map((item) => (
    <Card key={item.id} className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center w-1/4">
          <div className="bg-blue-100 p-2 rounded-lg mr-2">
            <Pill className="text-health-primary" size={16} />
          </div>
          <span className="font-medium truncate">{item.name}</span>
        </div>
        <div className="w-1/5 text-sm text-center">
          <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100">
            {item.category}
          </span>
        </div>
        <div className="w-1/5 text-center">
          <span className={`font-medium ${item.stock <= item.reorderLevel ? 'text-health-accent' : ''}`}>
            {item.stock}
          </span>
        </div>
        <div className="w-1/5 text-center">
          <span>${item.price.toFixed(2)}</span>
        </div>
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 w-7 p-0"
            onClick={() => updateStock(item.id, -1)}
          >
            -
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 w-7 p-0"
            onClick={() => updateStock(item.id, 1)}
          >
            +
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 w-7 p-0"
          >
            <Edit size={12} />
          </Button>
        </div>
      </div>
    </Card>
  ));
};

export default PharmacyInventory;
