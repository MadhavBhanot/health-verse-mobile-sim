
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar } from "@/components/ui/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Upload, ShoppingCart, FileText } from "lucide-react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useToast } from "@/hooks/use-toast";

const MedicineOrder = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [prescription, setPrescription] = useState<File | null>(null);
  const [items, setItems] = useState([
    { id: 1, name: "Paracetamol 500mg", price: 5.99, quantity: 0, selected: false },
    { id: 2, name: "Ibuprofen 400mg", price: 7.49, quantity: 0, selected: false },
    { id: 3, name: "Vitamin D 1000 IU", price: 12.99, quantity: 0, selected: false },
    { id: 4, name: "Multivitamin Complex", price: 15.99, quantity: 0, selected: false },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrescription(e.target.files[0]);
      toast({
        title: "Prescription uploaded",
        description: `File: ${e.target.files[0].name}`,
      });
    }
  };

  const triggerFileInput = () => {
    // First check if the element exists and then use it as an HTMLElement
    const fileInput = document.getElementById('prescription-upload');
    if (fileInput) {
      (fileInput as HTMLElement).click();
    }
  };

  const updateItemQuantity = (id: number, amount: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
    ));
  };

  const toggleItemSelection = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const getTotal = () => {
    return items
      .filter(item => item.selected && item.quantity > 0)
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    if (getTotal() > 0 || prescription) {
      toast({
        title: "Order placed successfully",
        description: "Your medication will be delivered soon.",
      });
    } else {
      toast({
        title: "Unable to place order",
        description: "Please select medications or upload a prescription.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthenticatedLayout requiredRole="patient">
      <div className="p-4 space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/patient/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/patient/medicine-order">Order Medicine</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl font-bold">Order Medicine</h1>

        <Card>
          <CardHeader>
            <CardTitle>Upload Prescription</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <input 
              id="prescription-upload" 
              type="file" 
              className="hidden" 
              accept=".pdf,.jpg,.jpeg,.png" 
              onChange={handlePrescriptionUpload}
            />
            <Button 
              onClick={triggerFileInput} 
              variant="outline" 
              className="w-full h-32 border-dashed flex flex-col items-center justify-center"
            >
              <Upload className="h-8 w-8 mb-2" />
              <span>Upload Prescription</span>
              <span className="text-xs text-muted-foreground">PDF, JPG, JPEG, PNG</span>
            </Button>
            {prescription && (
              <div className="text-sm text-green-600 flex items-center gap-2">
                <FileText className="h-4 w-4" /> {prescription.name}
              </div>
            )}
          </CardContent>
        </Card>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Select Delivery Date</span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <Card>
              <CardContent className="p-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  className="mx-auto"
                />
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <Card>
          <CardHeader>
            <CardTitle>Select Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 border-b pb-3">
                  <Checkbox 
                    id={`item-${item.id}`} 
                    checked={item.selected}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                  />
                  <div className="flex flex-1 justify-between items-center">
                    <label 
                      htmlFor={`item-${item.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.name}
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </label>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateItemQuantity(item.id, -1)}
                        disabled={item.quantity === 0}
                      >-</Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => updateItemQuantity(item.id, 1)}
                      >+</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch space-y-4">
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <Button 
              onClick={handlePlaceOrder}
              className="w-full"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
};

export default MedicineOrder;
