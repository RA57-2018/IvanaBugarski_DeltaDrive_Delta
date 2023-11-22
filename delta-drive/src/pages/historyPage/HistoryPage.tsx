import { VehicleComponent } from '@/components';
import { initialAxiosResponse } from '@/helpers';
import { useGetHistoryDataQuery } from '@/services';

export const HistoryPage = () => {

  const { data: historyData = initialAxiosResponse, isLoading } = useGetHistoryDataQuery();

  return (
    <>
      <VehicleComponent isHistory={true} data={[]}/>
    </>
  );
};