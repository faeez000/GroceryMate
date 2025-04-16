import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";
import { MotionButton } from "./MotionButton";



export function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="bg-transparent border-none shadow-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-md w-96 shadow-lg"
            >
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  You are about to delete this item from your grocery list. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="mt-4 flex justify-end gap-2">
                  <MotionButton
                    variant="secondary"
                    onClick={onClose}
                    className="text-white bg-green-600 hover:bg-green-700"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    Cancel
                  </MotionButton>

                  <MotionButton
                  variant="destructive"
                  onClick={onConfirm}
                  className="text-white bg-red-600 hover:bg-red-700"
                  whileTap={{ rotate: [0, -5, 5, -3, 3, 0], scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  >
                    Delete
                  </MotionButton>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
