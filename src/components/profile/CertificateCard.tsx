
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Calendar, Building, ExternalLink, Trash2 } from "lucide-react";
import { useState } from "react";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
}

const CertificateCard = ({ certificate, isOwner = false, onDelete }: CertificateCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    await onDelete(certificate.id);
    setIsDeleting(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-hiveprimary-100 to-hiveprimary-50 pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Award className="h-5 w-5 text-hiveprimary-600" />
          {certificate.name}
        </CardTitle>
        <CardDescription>{certificate.issuer}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>{certificate.issuer}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{certificate.date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-muted/20 pt-2">
        <Button variant="ghost" size="sm" className="text-hiveprimary-600" asChild>
          <a href={certificate.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Certificate
          </a>
        </Button>
        
        {isOwner && onDelete && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CertificateCard;
