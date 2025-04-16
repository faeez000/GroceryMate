// src/components/ui/ClearAllDialog.jsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ClearAllDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="destructive">Clear All</Button>
      </DialogTrigger>

      <DialogContent className="bg-white p-6 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You are about to clear all items from your grocery list. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose} className="text-white bg-green-600 hover:bg-green-700">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} className="text-white bg-red-600 hover:bg-red-700">
            Yes, Clear All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
