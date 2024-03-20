import {
  useInfiniteQuery
} from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import Loader from '../components/layout/Loader'
import Product from '../components/menu/Product'
import { DEFAULT_LIMIT } from '../constants'
import { useAppStore } from '../store/app-state'
import { useCartStore } from '../store/cart-state'
import { ProductType } from '../types/product'
import { fetchData } from '../utils/fetchData'

const MenuPage = () => {
  const token = useAppStore((state) => state.token)
  const locale = useAppStore((state) => state.locale)

  const [lastKey, setLastKey] = useState()

  const {
    data,
    error,
    isLoading,
    isError,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['items'],
    queryFn: ({ pageParam }) =>
      fetchData(
        `items-${locale}.json`,
        token!,
        `&orderBy="$key"${lastKey ? `&startAfter="${lastKey}"` : ''}&limitToFirst=${pageParam}`,
      ),
    initialPageParam: DEFAULT_LIMIT,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage == null || lastPage.length === 0) {
        return undefined
      }
      return lastPageParam
    },
  })

  const items = useMemo(() => {
    return data !== undefined
      ? data.pages
          .filter((group) => group !== null)
          .map((group) =>
            Object.keys(group).map((id) => ({
              ...group[id],
              id,
            })),
          )
          .flat()
      : undefined
  }, [data])

  const cartItems = useCartStore((state) => state.items)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    refetch()
  }, [locale])

  useEffect(() => {
    const key = items?.at(-1).id
    setLastKey(key)
  }, [])

  useEffect(() => {
    if (bottomRef.current == null) return

    const cachedRef = bottomRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          const key = items?.at(-1).id
          key !== undefined && setLastKey(key)
        }
      },
      { threshold: 1 },
    )
    observer.observe(cachedRef)
    return () => observer.unobserve(cachedRef)
  }, [bottomRef, items])

 
  useEffect(() => {
    if (lastKey !== undefined) {
      fetchNextPage()
    } 
  }, [lastKey])


  const loading = isLoading || isFetching || isFetchingNextPage

  return (
    <>
      <div className='flex flex-row flex-wrap justify-center gap-4 pb-8'>
        {items?.map((i: ProductType) => {
          const quantity = cartItems?.find(
            (ci) => ci.product.id == i.id,
          )?.quantity
          return <Product key={i.id} item={i} quantity={quantity} />
        })}
      </div>
      <div ref={bottomRef}></div>
      {loading && <Loader />}
      {isError && <div className='text-red-500'>{error.message}</div>}
    </>
  )
}

export default MenuPage
