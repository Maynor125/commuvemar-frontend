interface CustomMessageProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    action: string;
    show: boolean;
}