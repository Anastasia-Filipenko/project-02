// import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectError = (state) => state.contacts.error;

export const selectCurrentBoard = (state) => state.currentBoard.board;

// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectNameFilter],
//   (contacts, filter) => {
//     if (filter === "") return contacts;
//     return contacts.filter(
//       (contact) =>
//         contact.name &&
//         contact.name
//           .toLowerCase()
//           .split(" ")
//           .some((c) => c.startsWith(filter.trim().toLowerCase())) ||
//           contact.number && contact.number.includes(filter.trim())
//     );
//   }
// );