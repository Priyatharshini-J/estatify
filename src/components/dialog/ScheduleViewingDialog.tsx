/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ResponseDialog from "./ResponseDialog";

interface Props {
  open: boolean;
  onClose: () => void;
  propertyId: string;
}

const ScheduleViewingDialog: React.FC<Props> = ({
  open,
  onClose,
  propertyId,
}) => {
  const [userId, setUserId] = useState(0);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const currentUserPromise = catalyst.userManagement.getCurrentProjectUser();
    currentUserPromise
      .then((response) => {
        setUserId(response.content.user_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://slate-template-apps-773793963.development.catalystserverless.com/server/estatify_routes_handler/schedule-viewing",
        {
          userId,
          propertyId,
          name,
          phone,
          date,
          message,
        }
      );
      setFeedback({
        open: true,
        type: "success",
        message:
          "Visiting scheduled successfully !!! Kindly check My Schedules tab for more details.",
      });
      onClose();
    } catch (err) {
      console.error("Failed to schedule viewing", err);
      setFeedback({
        open: true,
        type: "error",
        message: "Failed to schedule viewing. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Viewing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
            />
            <Textarea
              placeholder="Additional message or questions..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Scheduling..." : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ResponseDialog
        open={feedback.open}
        onClose={() => setFeedback({ ...feedback, open: false })}
        type={feedback.type}
        message={feedback.message}
      />
    </>
  );
};

export default ScheduleViewingDialog;
