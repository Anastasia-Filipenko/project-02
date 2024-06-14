// import { createSelector } from "@reduxjs/toolkit";

export const selectIsLoading = (state) => state.columns.isLoading;

export const selectError = (state) => state.columns.error;

export const selectColumn = (state, columnId) => state.columns.items.find(c => c._id === columnId);

export const selectAllColumns = (state, boardId) => { 
    console.log('borad Ids select column', state.columns.boardId, boardId)
    if (boardId && state.columns.boardId && boardId === state.columns.boardId) {
        return state.columns.items;
    }
}


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