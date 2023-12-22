import React, { FC, forwardRef } from "react";

import styles from "./PaginationListItem.module.scss";

interface PaginationItemProps {
  buttonClassNames: string;
  isButtonDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const PaginationListItem: FC<PaginationItemProps> = forwardRef(
  ({ buttonClassNames, isButtonDisabled, onClick, children }, ref) => {
    return (
      <li className={styles.ListItem} ref={ref}>
        <button
          className={buttonClassNames}
          onClick={onClick}
          disabled={isButtonDisabled}
        >
          {children}
        </button>
      </li>
    );
  }
);
