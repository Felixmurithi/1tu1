"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dates from "@/app/_components/dates/Dates";
const queryClient = new QueryClient();
function DatesQueryClient(props) {
  // queey client provides the context, hooks include

  return (
    <QueryClientProvider client={queryClient}>
      <Dates {...props} />
    </QueryClientProvider>
  );
}

export default DatesQueryClient;
