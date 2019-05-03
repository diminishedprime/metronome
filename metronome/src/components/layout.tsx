/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import * as React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  margin: 0 auto;
  max-width: 20em;
`;

const Layout = ({ children }) => (
  <Content>
    <main>{children}</main>
  </Content>
);

export default Layout;
