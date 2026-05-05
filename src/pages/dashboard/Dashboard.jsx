import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Icons
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  FileCheck, 
  Shield,
  Calendar,
  BarChart,
  Target,
  Bell,
  Download,
  Eye,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  MoreVertical,
  ArrowRight
} from "lucide-react"
import { DashboardCards } from "./DashboardCards"
import { ModulesOverviewCards } from "./ModulesOverviewCards"
import { HSSEQCharts } from "./HSSEQCharts"
export function Dashboard() {
  
  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6">
      
      {/* Header */}
      <div className="mb-8">
       

        {/* Stats Overview - Clean, borderless design */}
        <DashboardCards />
      </div>
      <HSSEQCharts/>
      <ModulesOverviewCards />


    

    
    </div>
  )
}