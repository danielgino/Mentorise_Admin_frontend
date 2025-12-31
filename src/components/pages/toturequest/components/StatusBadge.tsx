interface StatusBadgeProps {
    status:'PENDING' | 'APPROVED' | 'REJECTED';
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const styles = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        APPROVED: 'bg-green-100 text-green-800',
        REJECTED: 'bg-red-100 text-red-800'
    };

    const labels = {
        PENDING: 'ממתין',
        APPROVED: 'מאושר',
        REJECTED: 'נדחה'
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
    );
}
