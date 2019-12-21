import { useStore } from 'effector-react';

import React, { useEffect } from 'react';
import styled from 'styled-components';

import { postsStore, fetchPosts } from 'src/store/posts';

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
