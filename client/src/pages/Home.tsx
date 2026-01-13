import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ShieldCheck, Cpu, Database, ArrowRight, Scan, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const emailFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

export default function Home() {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    console.log("Email signup submission:", data);
    // Reset form after submission
    form.reset();
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="text-center space-y-8 max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
              The Future of Product Authentication
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">
              Verify Authenticity with <span className="text-gradient">Blockchain & AI</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Protect your brand and customers with TrueMark™ microscopic verification technology, backed by immutable blockchain records.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-lg rounded-xl shadow-lg shadow-primary/25">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/verify">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-xl">
                Verify a Product
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Email Signup Form */}
      <section className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Purple gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-purple-600 opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="relative p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                Stay Updated
              </h2>
              <p className="text-white/90 text-lg">
                Get the latest updates on blockchain authentication technology
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-white/90" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-white/90" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 bg-white text-primary hover:bg-white/90 font-semibold text-lg shadow-lg"
                >
                  Subscribe Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Cpu className="w-8 h-8 text-primary" />}
            title="AI Classification"
            description="Advanced computer vision automatically categorizes and analyzes product images for discrepancies."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-secondary" />}
            title="TrueMark™ Tech"
            description="Microscopic surface pattern analysis creates a unique digital fingerprint for every physical item."
          />
          <FeatureCard 
            icon={<Database className="w-8 h-8 text-blue-500" />}
            title="Blockchain Registry"
            description="Immutable ownership history and verification records stored permanently on-chain."
          />
        </div>
      </section>
      
      {/* Demo Section */}
      <section className="relative rounded-3xl overflow-hidden bg-card border border-border/50 shadow-2xl mx-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative p-8 md:p-12 lg:p-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Instant Verification
            </h2>
            <p className="text-lg text-muted-foreground">
              Anyone can verify a product's authenticity in seconds using our public verification portal. No account required.
            </p>
            <ul className="space-y-4">
              {[
                "Scan product QR or enter ID",
                "View blockchain ownership history",
                "Confirm physical authenticity"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <CheckIcon />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/verify">
              <Button className="mt-4" variant="secondary">
                Try Verification Demo
              </Button>
            </Link>
          </div>
          
          {/* Dashboard Preview Image */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border bg-background aspect-video flex items-center justify-center group">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
              <div className="bg-background/90 backdrop-blur rounded-full p-4 shadow-xl">
                 <Scan className="w-10 h-10 text-primary animate-pulse" />
              </div>
            </div>
            {/* Using an Unsplash placeholder for a tech dashboard/interface look */}
            {/* tech abstract digital interface */}
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
              alt="Interface Preview" 
              className="object-cover w-full h-full opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Trusted Across Industries
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From luxury goods to pharmaceuticals, leading brands trust AuthiChain to protect their products and customers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <IndustryCard
            name="Luxury Goods"
            icon="💎"
            description="Fashion, jewelry, watches"
          />
          <IndustryCard
            name="Pharmaceuticals"
            icon="💊"
            description="Medicine, supplements"
          />
          <IndustryCard
            name="Electronics"
            icon="📱"
            description="Devices, components"
          />
          <IndustryCard
            name="Automotive"
            icon="🚗"
            description="Parts, accessories"
          />
          <IndustryCard
            name="Food & Beverage"
            icon="🍷"
            description="Premium products"
          />
          <IndustryCard
            name="Art & Collectibles"
            icon="🎨"
            description="Artwork, memorabilia"
          />
          <IndustryCard
            name="Sports Equipment"
            icon="⚽"
            description="Gear, apparel"
          />
          <IndustryCard
            name="Cosmetics"
            icon="💄"
            description="Beauty products"
          />
        </div>
      </section>

      {/* Trusted By / Social Proof Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-muted-foreground mb-8">
            Trusted By Industry Leaders
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {/* VeChain Logo */}
          <div className="flex items-center justify-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">VeChain</div>
              <div className="text-xs text-muted-foreground">Blockchain Partner</div>
            </div>
          </div>

          {/* DNV Logo */}
          <div className="flex items-center justify-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">DNV</div>
              <div className="text-xs text-muted-foreground">Certification Partner</div>
            </div>
          </div>

          {/* Placeholder Brand 1 */}
          <div className="flex items-center justify-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">TrustMark</div>
              <div className="text-xs text-muted-foreground">Security Partner</div>
            </div>
          </div>

          {/* Placeholder Brand 2 */}
          <div className="flex items-center justify-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500 mb-1">AuthiPro</div>
              <div className="text-xs text-muted-foreground">Technology Partner</div>
            </div>
          </div>

          {/* Placeholder Brand 3 */}
          <div className="flex items-center justify-center p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">VerifyX</div>
              <div className="text-xs text-muted-foreground">Integration Partner</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all"
    >
      <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IndustryCard({ name, icon, description }: { name: string, icon: string, description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all text-center"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-bold font-display mb-1">{name}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
