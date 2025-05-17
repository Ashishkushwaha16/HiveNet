
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import CertificateCard from "./CertificateCard";
import AddCertificateForm from "./AddCertificateForm";

interface CertificatesSectionProps {
  isOwnProfile?: boolean;
}

const CertificatesSection = ({ isOwnProfile = false }: CertificatesSectionProps) => {
  const { user, removeCertificate } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteCertificate = async (certificateId: string) => {
    setIsDeleting(true);
    await removeCertificate(certificateId);
    setIsDeleting(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Certificates</h2>
        {isOwnProfile && <AddCertificateForm />}
      </div>

      {user?.certificates.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-muted-foreground">
            {isOwnProfile 
              ? "You haven't added any certificates yet. Add a certificate to showcase your qualifications."
              : "This user hasn't added any certificates yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {user?.certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              isOwner={isOwnProfile}
              onDelete={isOwnProfile ? handleDeleteCertificate : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesSection;
