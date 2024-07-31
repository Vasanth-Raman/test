import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flowitems: [],
  counters: {
    text: 0,
    image: 0,
    video: 0,
    gif: 0,
    inputText: 0,
    inputNumber: 0,
    inputEmail: 0,
    inputPhone: 0,
    inputDate: 0,
    inputRating: 0,
    inputButton: 0,
  },
};

const formFlowSlice = createSlice({
  name: "formFlow",
  initialState,
  reducers: {
    setFlow: (state, action) => {
      const flow = action.payload;
      state.flowitems = flow;

      // making counters to initial values
      state.counters = {
        text: 0,
        image: 0,
        video: 0,
        gif: 0,
        inputText: 0,
        inputNumber: 0,
        inputEmail: 0,
        inputPhone: 0,
        inputDate: 0,
        inputRating: 0,
        inputButton: 0,
      };

      // Re count counters
      flow.forEach((item) => {
        const itemType =
          item.bubbleOrInput === "bubble"
            ? item.content.type
            : `input${
                item.content.type.charAt(0).toUpperCase() +
                item.content.type.slice(1)
              }`;

        if (state.counters[itemType] !== undefined) {
          state.counters[itemType] += 1;
        }
      });

      // Update orders
      state.flowitems.forEach((item, index) => {
        item.order = index + 1;
      });
    },
    addFlowItem: (state, action) => {
      const { bubbleOrInput, type, data } = action.payload;

      const itemCounterTitle =
        bubbleOrInput === "bubble"
          ? type
          : `input${type.charAt(0).toUpperCase() + type.slice(1)}`;

      state.counters[itemCounterTitle] += 1;

      const title =
        bubbleOrInput === "bubble"
          ? `${type.charAt(0).toUpperCase() + type.slice(1)} ${
              state.counters[itemCounterTitle]
            }`
          : `Input ${type.charAt(0).toUpperCase() + type.slice(1)} ${
              state.counters[itemCounterTitle]
            }`;

      const newItem = {
        title,
        bubbleOrInput,
        content: {
          type,
          data,
        },
        order: state.flowitems.length + 1,
      };
      state.flowitems.push(newItem);
    },
    removeFlowItem: (state, action) => {
      const { index } = action.payload;

      // remove item by index and store that item for counter update
      const removedItem = state.flowitems[index];
      state.flowitems.splice(index, 1);

      // Update counters
      const itemType =
        removedItem.bubbleOrInput === "bubble"
          ? removedItem.content.type
          : `input${
              removedItem.content.type.charAt(0).toUpperCase() +
              removedItem.content.type.slice(1)
            }`;

      if (state.counters[itemType] > 0) {
        state.counters[itemType] -= 1;
      }

      // Recalculate titles and update orders
      const typeCounts = {};

      state.flowitems.forEach((item) => {
        const itemType =
          item.bubbleOrInput === "bubble"
            ? item.content.type
            : `input${
                item.content.type.charAt(0).toUpperCase() +
                item.content.type.slice(1)
              }`;

        if (!typeCounts[itemType]) {
          typeCounts[itemType] = 0;
        }

        typeCounts[itemType] += 1;

        const typePrefix = item.bubbleOrInput === "bubble" ? "" : "Input ";
        const typeName =
          item.content.type.charAt(0).toUpperCase() +
          item.content.type.slice(1);

        item.title = `${typePrefix}${typeName} ${typeCounts[itemType]}`;
      });
    },
    updateFlowItemOrder: (state) => {
      state.flowitems.forEach((item, index) => {
        item.order = index + 1;
      });
    },
    updateFlowItemContent: (state, action) => {
      const { index, newData } = action.payload;
      state.flowitems[index].content.data = newData;
    },
    resetFlow: () => initialState,
  },
});

export const {
  setFlow,
  addFlowItem,
  removeFlowItem,
  updateFlowItemOrder,
  updateFlowItemContent,
  resetFlow,
} = formFlowSlice.actions;

export default formFlowSlice.reducer;
