
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    parent?: string;
  };
}

const routeConfig: BreadcrumbConfig = {
  "": { label: "Home" },
  "dashboard": { label: "Dashboard", parent: "" },
  "scanner": { label: "Scanner", parent: "dashboard" },
  "product-details": { label: "Product Tracking", parent: "dashboard" },
  "emission-calculator": { label: "Emission Calculator", parent: "dashboard" },
  "supplier-dashboard": { label: "Supplier Dashboard", parent: "dashboard" },
  "consumer-portal": { label: "Consumer Portal", parent: "dashboard" },
  "login": { label: "Login" },
  "signup": { label: "Sign Up" },
};

const PageBreadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  if (pathSegments.length === 0 || ["login", "signup"].includes(pathSegments[0])) {
    return null;
  }

  // Build breadcrumb path
  const breadcrumbs: { path: string; label: string }[] = [];
  let currentPath = "";
  
  // Always add Home
  breadcrumbs.push({ path: "/", label: "Home" });
  
  // Add path segments
  for (const segment of pathSegments) {
    currentPath += `/${segment}`;
    
    if (routeConfig[segment]) {
      breadcrumbs.push({
        path: currentPath,
        label: routeConfig[segment].label,
      });
    } else {
      // Handle dynamic or unknown paths
      breadcrumbs.push({
        path: currentPath,
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      });
    }
  }

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.path}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={breadcrumb.path} className="flex items-center">
                    {index === 0 ? (
                      <Home className="h-3.5 w-3.5 mr-1" />
                    ) : null}
                    {breadcrumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
