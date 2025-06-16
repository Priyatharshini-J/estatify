import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

const agent = {
  name: "John Doe",
  imageUrl:
    "https://demo.solwininfotech.com/wordpress/justica/wp-content/uploads/2016/07/Attorneys-5.png",
  phone: "+1 234 567 890",
  email: "john.doe@example.com",
  address: "123 Sunset Blvd, Beverly Hills, CA",
};

const ContactAgentDialog: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Agent</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src={agent.imageUrl}
            alt={agent.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold">{agent.name}</p>
            <p>{agent.email}</p>
            <p>{agent.phone}</p>
            <p className="text-sm text-muted-foreground">{agent.address}</p>
          </div>
          <Button
            variant="default"
            onClick={() => (window.location.href = `mailto:${agent.email}`)}
          >
            Send Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactAgentDialog;
