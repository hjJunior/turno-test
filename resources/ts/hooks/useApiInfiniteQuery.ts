import BaseModel from "@/models/baseModel";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { MaybeRef, computed } from "vue";

const INITIAL_PAGE = 1;
const DEFAULT_PER_PAGE = 15;

type UseApiInfiniteQueryOptions<TModel extends BaseModel> = {
  queryKey: MaybeRef<any[]>;
  queryFn: (page: number) => Promise<TModel[]>;
  perPage?: number;
};

const useApiInfiniteQuery = <TModel extends BaseModel = BaseModel>(
  options: UseApiInfiniteQueryOptions<TModel>
) => {
  const { queryKey, queryFn, perPage = DEFAULT_PER_PAGE } = options;

  const getNextPage = (page: TModel[], allPages: TModel[][]) => {
    const hasNextPage = page.length >= perPage;

    return hasNextPage ? allPages.length + 1 : undefined;
  };

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, ...rest } =
    useInfiniteQuery({
      queryKey,
      initialPageParam: INITIAL_PAGE,
      getNextPageParam: getNextPage,
      queryFn: async ({ pageParam }) => queryFn(pageParam),
      retry: false,
      throwOnError: true,
    });

  const all = computed(() =>
    data.value?.pages.reduce<TModel[]>((acc, page) => [...acc, ...page], [])
  );

  const onLoadMore = async () => {
    if (!hasNextPage.value) return;
    if (isFetchingNextPage.value) return;

    await fetchNextPage();
  };

  return {
    all,
    isFetchingNextPage,
    onLoadMore,
    ...rest,
  };
};

export default useApiInfiniteQuery;
