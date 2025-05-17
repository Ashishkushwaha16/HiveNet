
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Award, Plus, Loader2 } from "lucide-react";

const AddCertificateForm = () => {
  const { addCertificate } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [certName, setCertName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [certUrl, setCertUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const resetForm = () => {
    setCertName("");
    setIssuer("");
    setIssueDate("");
    setCertUrl("");
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!certName) {
      setFormError("Certificate name is required");
      return;
    }

    if (!issuer) {
      setFormError("Issuing organization is required");
      return;
    }

    if (!issueDate) {
      setFormError("Issue date is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await addCertificate({
        name: certName,
        issuer,
        date: issueDate,
        url: certUrl || "#"
      });

      if (success) {
        resetForm();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to add certificate:", error);
      setFormError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-hiveprimary-600 hover:bg-hiveprimary-700" onClick={() => resetForm()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Certificate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-hiveprimary-600" />
            Add New Certificate
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {formError && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="certName">Certificate Name</Label>
            <Input
              id="certName"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              placeholder="e.g. AWS Certified Developer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input
              id="issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g. Amazon Web Services"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Input
              id="issueDate"
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certUrl">Certificate URL (Optional)</Label>
            <Input
              id="certUrl"
              type="url"
              value={certUrl}
              onChange={(e) => setCertUrl(e.target.value)}
              placeholder="https://example.com/certificate"
            />
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="bg-hiveprimary-600 hover:bg-hiveprimary-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Adding...
                </>
              ) : (
                <>
                  <Award className="mr-2 h-4 w-4" /> 
                  Add Certificate
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCertificateForm;
