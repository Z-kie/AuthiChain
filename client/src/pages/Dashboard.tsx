import { useAuth } from "@/hooks/use-auth";
import { useProducts } from "@/hooks/use-products";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  MoreVertical 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const verifiedCount = products?.filter(p => p.isRegistered).length || 0;
  const totalCount = products?.length || 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your product registry and verification status.</p>
        </div>
        <Link href="/products/new">
          <Button className="shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Register Product
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          title="Total Products" 
          value={totalCount} 
          icon={<Search className="w-4 h-4" />} 
        />
        <StatsCard 
          title="Verified on Chain" 
          value={verifiedCount} 
          icon={<CheckCircle2 className="w-4 h-4 text-secondary" />} 
          trend="+12% this month"
        />
        <StatsCard 
          title="Pending Verification" 
          value={totalCount - verifiedCount} 
          icon={<Clock className="w-4 h-4 text-orange-500" />} 
        />
      </div>

      {/* Products Table */}
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Products</CardTitle>
              <CardDescription>Recent items added to the registry.</CardDescription>
            </div>
            <div className="w-full max-w-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!products || products.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mb-6">Get started by registering your first item.</p>
              <Link href="/products/new">
                <Button variant="outline">Create Product</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-transparent hover:border-border transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-background border overflow-hidden">
                      {/* Product thumbnail - using generic tech image if user didn't provide one, otherwise use uploaded */}
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback
                          e.currentTarget.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=100&q=80";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{product.category || "Uncategorized"}</span>
                        <span>•</span>
                        <span>{format(new Date(product.createdAt), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-2">
                      {product.isRegistered ? (
                        <span className="flex items-center text-xs font-medium text-secondary bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center text-xs font-medium text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                          <ShieldAlert className="w-3 h-3 mr-1" />
                          Unregistered
                        </span>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/products/${product.id}`}>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </Link>
                        {!product.isRegistered && (
                          <Link href={`/products/${product.id}`}>
                            <DropdownMenuItem>Verify Now</DropdownMenuItem>
                          </Link>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, icon, trend }: any) {
  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-display">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
      </div>
      <Skeleton className="h-[400px] rounded-xl" />
    </div>
  );
}
