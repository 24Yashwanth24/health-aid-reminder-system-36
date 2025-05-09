
// Fixed Deliveries page to allow paymentStatus 'processing' as well and Indian patient names
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DeliveryStatusCard from '@/components/deliveries/DeliveryStatusCard';

interface Delivery {
  id: string;
  patientName: string;
  medication: string;
  address: string;
  deliveryDate: string;
  status: 'pending' | 'processing' | 'in_transit' | 'delivered';
  paymentStatus: 'paid' | 'unpaid' | 'processing';
  paymentAmount: number;
}

const Deliveries = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      medication: 'Metformin 500mg',
      address: '123 Gandhi Road, Mumbai, MH 400001',
      deliveryDate: 'Apr 10, 2025',
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentAmount: 850,
    },
    {
      id: '2',
      patientName: 'Priya Sharma',
      medication: 'Levothyroxine 88mcg',
      address: '456 Nehru Avenue, Delhi, DL 110001',
      deliveryDate: 'Apr 8, 2025',
      status: 'processing',
      paymentStatus: 'paid',
      paymentAmount: 1200,
    },
    {
      id: '3',
      patientName: 'Vikram Singh',
      medication: 'Lisinopril 10mg',
      address: '789 Patel Street, Ahmedabad, GJ 380001',
      deliveryDate: 'Apr 9, 2025',
      status: 'in_transit',
      paymentStatus: 'paid',
      paymentAmount: 650,
    },
    {
      id: '4',
      patientName: 'Ananya Patel',
      medication: 'Levothyroxine 50mcg',
      address: '101 Tagore Lane, Kolkata, WB 700001',
      deliveryDate: 'Apr 11, 2025',
      status: 'delivered',
      paymentStatus: 'paid',
      paymentAmount: 950,
    },
    {
      id: '5',
      patientName: 'Rohit Verma',
      medication: 'Glipizide 5mg',
      address: '202 Bose Road, Chennai, TN 600001',
      deliveryDate: 'Apr 12, 2025',
      status: 'pending',
      paymentStatus: 'unpaid',
      paymentAmount: 780,
    },
    {
      id: '6',
      patientName: 'Sunita Agarwal',
      medication: 'Levothyroxine 75mcg',
      address: '303 Shastri Nagar, Bangalore, KA 560001',
      deliveryDate: 'Apr 14, 2025',
      status: 'processing',
      paymentStatus: 'processing',
      paymentAmount: 1100,
    },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setDeliveries(
      deliveries.map(delivery =>
        delivery.id === id ? { ...delivery, status: newStatus as Delivery['status'] } : delivery,
      ),
    );

    toast({
      title: 'Delivery Status Updated',
      description: `Delivery status changed to ${newStatus.replace('_', ' ')}.`,
    });
  };

  const handlePaymentStatusChange = (id: string, newStatus: string) => {
    setDeliveries(
      deliveries.map(delivery =>
        delivery.id === id ? { ...delivery, paymentStatus: newStatus as 'paid' | 'unpaid' | 'processing' } : delivery,
      ),
    );

    toast({
      title: 'Payment Status Updated',
      description: `Payment status changed to ${newStatus}.`,
    });
  };

  // Filter deliveries based on search query, status filter, and payment filter
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch =
      delivery.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || delivery.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medication Deliveries</h1>
          <p className="text-muted-foreground">Track and manage medication deliveries to patients</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Delivery
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search deliveries..."
            className="pl-8"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-auto flex-1 sm:max-w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto flex-1 sm:max-w-[200px]">
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="w-full sm:w-auto" onClick={() => {
          setStatusFilter('all');
          setPaymentFilter('all');
        }}>
          <Truck className="mr-2 h-4 w-4" />
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeliveries.map(delivery => (
          <DeliveryStatusCard
            key={delivery.id}
            delivery={delivery}
            onStatusChange={handleStatusChange}
            onPaymentStatusChange={handlePaymentStatusChange}
          />
        ))}

        {filteredDeliveries.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
            <p className="text-lg font-medium">No deliveries found</p>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deliveries;

