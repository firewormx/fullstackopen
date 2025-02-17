import { Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';
import AddEntryForm from './AddNewEntry';
import { EntryWithoutId } from "../../types";

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryWithoutId) => Promise<boolean>;
  onClose: () => void;
  error?: string | null;
}

const AddEntryModal = ({ modalOpen, onSubmit, onClose }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
  <DialogTitle>Add a new Entry</DialogTitle>
  <Divider />
  <DialogContent>
    <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
  </DialogContent>
  </Dialog>
);

export default AddEntryModal;