import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  type: "success" | "error";
  message: string;
}

const ResponseDialog: React.FC<Props> = ({ open, onClose, type, message }) => {
  const Icon = type === "success" ? CheckCircle : AlertCircle;
  const iconColor = type === "success" ? "text-green-600" : "text-red-600";
  const title = type === "success" ? "Success" : "Something went wrong";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2">
            <Icon size={40} className={iconColor} />
            {title}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">{message}</p>

        {type === "success" ? (
          <Link to="/schedules">
            <Button variant="outline" onClick={onClose}>
              My Schedules
            </Button>
          </Link>
        ) : null}
        <Button className="mt-4" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialog;
