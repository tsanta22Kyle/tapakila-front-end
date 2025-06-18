import { useGetList } from 'react-admin';

export const useResourceCount = (resource) => {
    const { total, isLoading } = useGetList(resource, {
        pagination: { page: 1, perPage: 1 }, // Juste 1 item pour choper le total
        sort: { field: 'id', order: 'ASC' },
        filter: {},
    });

    return { count: total, loading: isLoading };
};
