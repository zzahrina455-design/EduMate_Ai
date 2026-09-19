import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fungsi simulasi ambil data dari API backend
const fetchDocuments = async () => {
  const response = await fetch('/api/documents');
  if (!response.ok) throw new Error('Gagal memuat data dokumen');
  return response.json();
};

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  });
}

// Contoh Mutasi & Invalidasi otomatis setelah unggah dokumen baru
export function useUploadDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newDoc: FormData) => {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: newDoc,
      });
      if (!res.ok) throw new Error('Gagal mengunggah dokumen');
      return res.json();
    },
    onSuccess: () => {
      // Otomatis memicu refetch dan invalidasi cache dokumen agar data terbaru langsung muncul
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}