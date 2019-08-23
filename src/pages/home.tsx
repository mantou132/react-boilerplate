import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { postsStore, fetchPosts } from '../store/posts';

const List = styled.ol``;
const ListItem = styled.li``;

export default function Home() {
  const posts = useStore(postsStore);
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <List>
      {posts.list.map(({ id, title }) => (
        <ListItem key={id}>{title}</ListItem>
      ))}
    </List>
  );
}
