// import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.boards.isLoading;

export const selectError = (state) => state.boards.error;

export const selectCurrentBoard = (state) => state.boards.currentBoard;

export const selectAllBoards = (state) => state.boards.boards;

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