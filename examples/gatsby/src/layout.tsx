/** @jsx jsx */
import { FC } from 'react';
import { jsx, Box, Container } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';


export const Layout: FC = props => {
  const index = useBreakpointIndex({ defaultIndex: 2 });
  console.log(index);
  return (
    <Box sx={{ py: 2, px: 4 }}>
      <Box as="header">
        <h2>Theme UI Gatsby Example</h2>
      </Box>
      <Box as="main">
        <Container>{props.children}</Container>
      </Box>
    </Box>
  );
}  
