import React from 'react';
import { useRecordContext } from 'react-admin';
import { IEvent } from './types';

export const StatusField: React.FC<{ source: string; label?: string }> = () => {
  const record = useRecordContext<IEvent>();
  
  if (!record) return null;

  const statusMap = {
    draft: { text: 'Brouillon', color: 'text.secondary' },
    published: { text: 'Publié', color: 'success.main' },
    cancelled: { text: 'Annulé', color: 'error.main' },
  };

  const status = statusMap[record.status] || statusMap.draft;

  return (
    <span style={{ color: status.color }}>
      {status.text}
    </span>
  );
};