export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export interface ConfirmModalProps {
  open: boolean;
  description:string;
  onClose: () => void;
  onConfirm: () => void;
}