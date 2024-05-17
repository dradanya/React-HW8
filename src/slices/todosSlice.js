import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://mockapi.io/api/v1/todos');
  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        console.error('There was an error fetching the todos!', action.error);
      });
  },
});

export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;