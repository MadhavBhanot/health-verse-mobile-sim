
import React from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { mockPharmacyOrders, mockPharmacyInventory } from '@/utils/mockData';
import { Package, TrendingUp, AlertCircle, ShoppingCart, PackageCheck, Pill, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
      title: 'Revenue', 
      value: `$${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      color: 'text-health-primary',
      bgColor: 'bg-blue-50' 
    },
    { 
      title: 'Pending', 
      value: pendingOrders.length, 
      icon: ShoppingCart, 
      color: 'text-health-accent',
      bgColor: 'bg-red-50' 
    },
    { 
      title: 'Low Stock', 
      value: lowStockItems.length, 
      icon: AlertCircle, 
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50' 
    },
    { 
      title: 'Products', 
      value: mockPharmacyInventory.length, 
      icon: Package, 
      color: 'text-health-secondary',
      bgColor: 'bg-green-50' 
    },
  ];

  return (
    <AuthenticatedLayout requiredRole="pharmacy">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold mb-0.5">Welcome, {user?.name?.split(' ')[0] || 'User'}</h1>
            <p className="text-sm text-gray-600">Pharmacy Dashboard</p>
          </div>
          <Avatar className="h-10 w-10 bg-health-primary text-white">
            <AvatarFallback>{user?.name?.charAt(0) || 'P'}</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {stats.map((stat, index) => (
            <Card key={index} className="p-3 border border-gray-100 shadow-sm">
              <div className="flex items-center mb-1.5">
                <div className={`p-1.5 rounded-md ${stat.bgColor} mr-2`}>
                  <stat.icon size={14} className={stat.color} />
                </div>
                <span className="text-xs text-gray-500">{stat.title}</span>
              </div>
              <p className="text-base font-semibold">{stat.value}</p>
            </Card>
          ))}
        </div>

        <h2 className="section-title">Pending Orders</h2>
        {pendingOrders.length > 0 ? (
          <div className="space-y-3 mb-5">
            {pendingOrders.slice(0, 2).map((order) => (
              <Card key={order.id} className="p-3 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-sm">Order #{order.id}</h3>
                    <p className="text-xs text-gray-500">{order.patientName}</p>
                    <div className="flex items-center mt-1 text-xs">
                      <PackageCheck size={12} className="text-health-primary mr-1" />
                      <span className="text-health-primary">{order.medications.length} items</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${order.total.toFixed(2)}</p>
                    <Button 
                      size="sm" 
                      className="mt-1 bg-health-primary text-xs px-3 py-1 h-auto"
                      onClick={() => navigate('/pharmacy/orders')}
                    >
                      Process
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {pendingOrders.length > 2 && (
              <button 
                className="text-xs text-health-primary flex items-center justify-center w-full mt-1"
                onClick={() => navigate('/pharmacy/orders')}
              >
                View all {pendingOrders.length} orders <ChevronRight size={12} className="ml-1" />
              </button>
            )}
          </div>
        ) : (
          <Card className="p-4 text-center mb-5 border border-gray-100 shadow-sm">
            <PackageCheck className="mx-auto mb-2 text-gray-400" size={20} />
            <p className="text-sm text-gray-500">No pending orders</p>
          </Card>
        )}

        <h2 className="section-title">Low Stock Items</h2>
        {lowStockItems.length > 0 ? (
          <div className="space-y-3 mb-5">
            {lowStockItems.slice(0, 2).map((item) => (
              <Card key={item.id} className="p-3 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-red-50 p-1.5 rounded-md mr-3">
                      <Pill className="text-health-accent" size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">
                        Stock: <span className="text-health-accent font-medium">{item.stock}</span> / Reorder: {item.reorderLevel}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-7"
                  >
                    Restock
                  </Button>
                </div>
              </Card>
            ))}
            {lowStockItems.length > 2 && (
              <button 
                className="text-xs text-health-primary flex items-center justify-center w-full mt-1"
                onClick={() => navigate('/pharmacy/inventory')}
              >
                View all {lowStockItems.length} low stock items <ChevronRight size={12} className="ml-1" />
              </button>
            )}
          </div>
        ) : (
          <Card className="p-4 text-center mb-5 border border-gray-100 shadow-sm">
            <Package className="mx-auto mb-2 text-gray-400" size={20} />
            <p className="text-sm text-gray-500">All items are well-stocked</p>
          </Card>
        )}
        <div className="flex items-center">
          <Button 
          variant="outline" 
          className="mt-4
          flex self-center"
          onClick={() => navigate('/login')}
        >
          Log Out
        </Button></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button 
            className="flex-col py-4 bg-health-primary hover:bg-health-primary/90"
            onClick={() => navigate('/pharmacy/inventory')}
          >
            <Package size={20} className="mb-1" />
            <span className="text-sm">Inventory</span>
          </Button>
          <Button 
            className="flex-col py-4 bg-health-secondary hover:bg-health-secondary/90"
            onClick={() => navigate('/pharmacy/orders')}
          >
            <ShoppingCart size={20} className="mb-1" />
            <span className="text-sm">Orders</span>
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PharmacyDashboard;
