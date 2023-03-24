import { useState } from "react";

import { PostCategory } from "../../components/socialFeed/NewsFeed/NewsFeed.type";
import { getAvailableFreePost } from "../../components/socialFeed/NewsFeed/NewsFeedQueries";
import { Wallet } from "../../context/WalletsProvider";

export const useUpdateAvailableFreePost = () => {
  const [freePostCount, setFreePostCount] = useState(0);
  const updateAvailableFreePost = async (
    networkId: string,
    postCategory: PostCategory,
    wallet?: Wallet
  ) => {
    const freePost = await getAvailableFreePost({
      networkId,
      wallet,
    });
    setFreePostCount(freePost || 0);
  };
  return { freePostCount, updateAvailableFreePost };
};