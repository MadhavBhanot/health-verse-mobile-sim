
import React from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { mockPharmacyOrders, mockPharmacyInventory } from '@/utils/mockData';
import { Package, TrendingUp, AlertCircle, ShoppingCart, PackageCheck, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PharmacyDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Filter low stock items
  const lowStockItems = mockPharmacyInventory.filter(
    item => item.stock <= item.reorderLevel
  );
  
  // Get pending orders
  const pendingOrders = mockPharmacyOrders.filter(
    order => order.status === 'Pending'
  );
  
  // Calculate total revenue
  const totalRevenue = mockPharmacyOrders.reduce(
    (sum, order) => sum + order.total, 0
  );

  const stats = [
    { 
      title: 'Total Revenue', 
      value: `$${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      color: 'text-health-primary',
      bgColor: 'bg-blue-50' 
    },
    { 
      title: 'Pending Orders', 
      value: pendingOrders.length, 
      icon: ShoppingCart, 
      color: 'text-health-accent',
      bgColor: 'bg-red-50' 
    },
    { 
      title: 'Low Stock Items', 
      value: lowStockItems.length, 
      icon: AlertCircle, 
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50' 
    },
    { 
      title: 'Total Products', 
      value: mockPharmacyInventory.length, 
      icon: Package, 
      color: 'text-health-secondary',
      bgColor: 'bg-green-50' 
    },
  ];

  return (
    <AuthenticatedLayout requiredRole="pharmacy">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(' ')[0] || 'User'}</h1>
            <p className="text-gray-600">Pharmacy Dashboard</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {user?.name?.charAt(0) || 'P'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center mb-2">
                <div className={`p-2 rounded-full ${stat.bgColor} mr-2`}>
                  <stat.icon size={16} className={stat.color} />
                </div>
                <span className="text-sm font-medium">{stat.title}</span>
              </div>
              <p className="text-xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-3">Pending Orders</h2>
        {pendingOrders.length > 0 ? (
          <div className="space-y-3 mb-6">
            {pendingOrders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.patientName}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <PackageCheck size={14} className="text-health-primary mr-1" />
                      <span className="text-health-primary">{order.medications.length} items</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${order.total.toFixed(2)}</p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-health-primary text-xs px-3 py-1 h-auto"
                      onClick={() => navigate('/pharmacy/orders')}
                    >
                      Process
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center mb-6">
            <PackageCheck className="mx-auto mb-2" size={24} />
            <p className="text-gray-600">No pending orders</p>
          </Card>
        )}

        <h2 className="text-lg font-semibold mb-3">Low Stock Items</h2>
        {lowStockItems.length > 0 ? (
          <div className="space-y-3 mb-4">
            {lowStockItems.map((item) => (
              <Card key={item.id} className="p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-lg mr-3">
                      <Pill className="text-health-accent" size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-xs text-gray-600">
                        Stock: <span className="text-health-accent font-medium">{item.stock}</span> / Reorder: {item.reorderLevel}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                  >
                    Restock
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center mb-4">
            <Package className="mx-auto mb-2" size={24} />
            <p className="text-gray-600">All items are well-stocked</p>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="flex-col py-6 bg-health-primary"
            onClick={() => navigate('/pharmacy/inventory')}
          >
            <Package size={24} className="mb-2" />
            <span>Inventory</span>
          </Button>
          <Button 
            className="flex-col py-6 bg-health-secondary"
            onClick={() => navigate('/pharmacy/orders')}
          >
            <ShoppingCart size={24} className="mb-2" />
            <span>Orders</span>
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PharmacyDashboard;
