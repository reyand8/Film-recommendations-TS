export interface IConfirmDeleteProps {
    handleDeleteAccount: () => Promise<void>;
    setOpenConfirm: (open: boolean) => void;
}

export interface IConfirmModalProps {
    open: boolean;
    url: string;
    title: string;
    onClose: () => void;
}