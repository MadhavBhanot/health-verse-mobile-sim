
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockPharmacyOrders } from '@/utils/mockData';
import { Calendar, Clock, ShoppingBag, CheckCircle2, Truck, PackageCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PharmacyOrders = () => {
  const [orders, setOrders] = useState(mockPharmacyOrders);
  const { toast } = useToast();

  const pendingOrders = orders.filter(order => order.status === 'Pending');
  const completedOrders = orders.filter(order => order.status === 'Completed');

  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
    
    toast({
      title: `Order ${status.toLowerCase()}`,
      description: `Order #${id} has been ${status.toLowerCase()}`,
    });
  };

  return (
    <AuthenticatedLayout requiredRole="pharmacy">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Order Management</h1>
        
        <Tabs defaultValue="pending">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onUpdate={updateOrderStatus}
                  actionLabel="Process Order"
                  actionStatus="Completed"
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ShoppingBag className="mx-auto mb-2" size={24} />
                <p>No pending orders</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onUpdate={updateOrderStatus}
                  completed
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle2 className="mx-auto mb-2" size={24} />
                <p>No completed orders</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  );
};

const OrderCard = ({ order, onUpdate, actionLabel = "View Details", actionStatus = "", completed = false }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Order #{order.id}</h3>
              <p className="text-sm text-gray-600">{order.patientName}</p>
              <div className="flex items-center mt-1 text-xs text-gray-600">
                <Calendar size={14} className="mr-1" />
                <span>{order.date}</span>
                <div className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></div>
                <ShoppingBag size={14} className="mr-1" />
                <span>{order.medications.length} items</span>
              </div>
              <div className="mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  order.status === 'Pending' 
                    ? 'bg-blue-100 text-health-primary' 
                    : 'bg-green-100 text-health-secondary'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">${order.total.toFixed(2)}</p>
              {!completed && (
                <Button 
                  size="sm" 
                  className="mt-2 bg-health-primary text-xs px-3 py-1 h-auto"
                >
                  {actionLabel}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="mt-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Order #{order.id}</h3>
              <p className="text-sm text-gray-600">{order.date}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              order.status === 'Pending' 
                ? 'bg-blue-100 text-health-primary' 
                : 'bg-green-100 text-health-secondary'
            }`}>
              {order.status}
            </span>
          </div>
          
          <Card className="p-3">
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <p className="text-sm">{order.patientName}</p>
            <p className="text-sm text-gray-600">customer@example.com</p>
            <p className="text-sm text-gray-600">123 Main St, City</p>
          </Card>
          
          <div>
            <h3 className="font-semibold mb-2">Order Items</h3>
            <div className="space-y-2">
              {order.medications.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <PackageCheck className="text-health-primary" size={16} />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          
          {!completed && (
            <div className="mt-4 flex space-x-3">
              <Button 
                className="flex-1 bg-health-primary"
                onClick={() => onUpdate(order.id, actionStatus)}
              >
                <Truck size={18} className="mr-2" />
                {actionLabel}
              </Button>
              <Button variant="outline" className="flex-1">
                Print Invoice
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PharmacyOrders;
