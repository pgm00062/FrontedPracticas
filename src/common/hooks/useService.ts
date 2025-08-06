import { useState } from 'react';
import Service from '@/service/src';
import { getAuthToken } from '@/common/utils/auth';

interface UseServiceOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const executeUseCase = async (
    useCaseName: string,
    data: any = {},
    customToken?: string,
    options?: UseServiceOptions
  ) => {
    setLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const signal = controller.signal;

      const token = customToken || getAuthToken();

      const response = await Service.getCases(useCaseName, {
        signal,
        endPointData: data,
        token,
      });

      if (options?.onSuccess) {
        options.onSuccess(response);
      }

      return response;
    } catch (err) {
      setError(err);
      if (options?.onError) {
        options.onError(err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    executeUseCase,
    loading,
    error,
  };
};
