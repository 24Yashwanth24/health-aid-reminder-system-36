
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bell, User, Calendar, Clock, CreditCard, LogOut, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('authType');
    localStorage.removeItem('authEmail');
    localStorage.removeItem('userName');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    navigate('/user/login');
  };
  
  const userEmail = localStorage.getItem('authEmail');
  const userName = localStorage.getItem('userName') || userEmail?.split('@')[0] || 'User';

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
        <Link to="/user/dashboard" className="flex items-center">
          <span className="text-2xl font-bold text-health-600">HealthKart Express</span>
          <span className="ml-2 text-sm bg-health-200 text-health-700 px-2 py-1 rounded-md">Patient Portal</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">2</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{userName}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 h-full bg-health-100 border-r border-gray-200">
          <div className="py-6 px-4">
            <div className="space-y-1">
              <Link 
                to="/user/dashboard" 
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  isActive("/user/dashboard") 
                    ? "bg-health-500 text-white" 
                    : "text-gray-700 hover:bg-health-200 hover:text-health-700"
                )}
              >
                <User className={cn("h-5 w-5 mr-3", isActive("/user/dashboard") ? "text-white" : "text-health-500")} />
                My Profile
              </Link>
              
              <Link 
                to="/user/medications" 
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  isActive("/user/medications") 
                    ? "bg-health-500 text-white" 
                    : "text-gray-700 hover:bg-health-200 hover:text-health-700"
                )}
              >
                <Clock className={cn("h-5 w-5 mr-3", isActive("/user/medications") ? "text-white" : "text-health-500")} />
                My Medications
              </Link>
              
              <Link 
                to="/user/reminders" 
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  isActive("/user/reminders") 
                    ? "bg-health-500 text-white" 
                    : "text-gray-700 hover:bg-health-200 hover:text-health-700"
                )}
              >
                <Calendar className={cn("h-5 w-5 mr-3", isActive("/user/reminders") ? "text-white" : "text-health-500")} />
                My Reminders
              </Link>
              
              <Link 
                to="/user/payments" 
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  isActive("/user/payments") 
                    ? "bg-health-500 text-white" 
                    : "text-gray-700 hover:bg-health-200 hover:text-health-700"
                )}
              >
                <CreditCard className={cn("h-5 w-5 mr-3", isActive("/user/payments") ? "text-white" : "text-health-500")} />
                My Payments
              </Link>
            </div>
          </div>
        </div>
        
        {/* Content area */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
