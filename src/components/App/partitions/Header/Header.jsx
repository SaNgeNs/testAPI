import React, { memo } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

export const Header = ({
  classes,  
}) => {
  return (
    <header className={classes.header}>
      Test
    </header>
  );
};

export default memo(withStyles(styles)(Header));
