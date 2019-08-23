import { createStore, createEvent } from 'effector';

import * as api from '../service/api';

interface PostStore {
  list: api.Post[];
  loading: boolean;
}

const updatePost = createEvent<Partial<PostStore>>();

export const postsStore = createStore<PostStore>({ list: [], loading: false }).on(updatePost, (state, arg) => {
  return { ...state, ...arg };
});

export const fetchPosts = async () => {
  updatePost({ loading: true });
  try {
    const list = await api.getPosts();
    await new Promise(resolve => setTimeout(resolve, 1000));
    updatePost({ list });
  } finally {
    updatePost({ loading: false });
  }
};
