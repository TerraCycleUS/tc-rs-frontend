import React from "react";
import { FormattedMessage } from "react-intl";

export default function requiredItemsText(recycledAmount) {
  if (recycledAmount === 0)
    return (
      <FormattedMessage
        id="profile:ItemsRecycledZero"
        defaultMessage="Items recycled"
      />
    );
  if (recycledAmount === 1)
    return (
      <FormattedMessage
        id="profile:ItemsRecycledSingular"
        defaultMessage="Item recycled"
      />
    );
  return (
    <FormattedMessage
      id="profile:ItemsRecycled"
      defaultMessage="Items recycled"
    />
  );
}
