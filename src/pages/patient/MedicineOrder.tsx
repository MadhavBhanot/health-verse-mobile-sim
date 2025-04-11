
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockPharmacyInventory } from '@/utils/mockData';
import { Search, ShoppingBag, Plus, Minus, PackageCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PatientMedicineOrder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const { toast } = useToast();

  const filteredMedicines = mockPharmacyInventory.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (medicine) => {
    const existing = cart.find(item => item.id === medicine.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${medicine.name} added to your cart`,
    });
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    
    toast({
      title: "Removed from cart",
      description: "Item removed from your cart",
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const placeOrder = () => {
    const newOrder = {
      id: `ord${orders.length + 1}`,
      items: [...cart],
      status: 'Processing',
      date: new Date().toISOString().split('T')[0],
      total: calculateTotal(),
    };
    
    setOrders([...orders, newOrder]);
    setCart([]);
    
    toast({
      title: "Order placed",
      description: "Your order has been placed successfully",
    });
  };

  return (
    <AuthenticatedLayout requiredRole="patient">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Medicine Orders</h1>
        
        <Tabs defaultValue="browse">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="browse" className="flex-1">Browse</TabsTrigger>
            <TabsTrigger value="cart" className="flex-1 relative">
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-health-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search medications..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{medicine.name}</h3>
                      <p className="text-sm text-gray-600">{medicine.category}</p>
                      <p className="font-bold mt-1">${medicine.price.toFixed(2)}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-health-primary h-8 w-8 p-0 rounded-full"
                      onClick={() => addToCart(medicine)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cart">
            {cart.length > 0 ? (
              <>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 w-7 p-0 rounded-full"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="mx-2 w-6 text-center">{item.quantity}</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 w-7 p-0 rounded-full"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="ml-2 text-health-accent h-7 p-0"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Card className="p-4 mb-4">
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    {cart.map((item) => (
                      <div key={`summary-${item.id}`} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full btn-health-primary"
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                </Card>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <ShoppingBag className="mx-auto mb-2" size={32} />
                <p className="mb-4">Your cart is empty</p>
                <Button 
                  variant="outline" 
                  onClick={() => document.querySelector('button[value="browse"]').click()}
                >
                  Browse Medicines
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="orders">
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Dialog key={order.id}>
                    <DialogTrigger asChild>
                      <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.date}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs bg-blue-100 text-health-primary px-2 py-0.5 rounded-full">
                                {order.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${order.total}</p>
                            <p className="text-xs text-gray-600">{order.items.length} items</p>
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                          <span className="text-xs bg-blue-100 text-health-primary px-2 py-0.5 rounded-full">
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={`order-${order.id}-${item.id}`} className="flex justify-between items-center py-2 border-b">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span>${order.total}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm">
                          <PackageCheck size={16} className="mr-2" />
                          <span>Estimated delivery: 1-2 business days</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <PackageCheck className="mx-auto mb-2" size={32} />
                <p className="mb-4">You don't have any orders yet</p>
                <Button 
                  variant="outline" 
                  onClick={() => document.querySelector('button[value="browse"]').click()}
                >
                  Browse Medicines
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  );
};

export default PatientMedicineOrder;
