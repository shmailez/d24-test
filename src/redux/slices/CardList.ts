import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type Item = {
    id: string
    title: string
    image: string
    isLike: boolean
    description: string
}

type ItemState = {
    list: Item[];
    loading: boolean;
    error: string | undefined;
  }

const initialState: ItemState = {
    list: [],
    loading: false,
    error: undefined,
  }

export const fetchCardList = createAsyncThunk<Item[], undefined, {rejectValue: string}>(
    'list/fetchCardList',
    async function(_, {rejectWithValue}) {

        try {
            const responce = await fetch('https://a912654b4478639c.mokky.dev/anylist')

        if(!responce.ok) {
            throw new Error('responce error')
        }

            const data = await responce.json()

            return data
        }
        catch (error:unknown) {
            console.log(error)
            return rejectWithValue("EROOOR")
        }
        
    }
)

export const deleteCard = createAsyncThunk<Item, string, { rejectValue: string }>(
  'list/deleteCard', 
  async function (id, {rejectWithValue, dispatch}) {
    const response = await fetch(`https://a912654b4478639c.mokky.dev/anylist/${id}`, {
      method: 'DELETE'
    })

    if(!response.ok) {
      return rejectWithValue('EROOOOR');
    }
    dispatch(fetchCardList())
    return (await response.json());
  }
)

export const toggleItem = createAsyncThunk<Item, string,{ rejectValue: string, state: { cardList: ItemState} }>(
    'list/toggleItem', 
    async function (id, { rejectWithValue, getState, dispatch}) {
      const item = getState().cardList.list.find(todo => todo.id === id)
      if(item) {
        const response = await fetch(`https://a912654b4478639c.mokky.dev/anylist/${id}`, {
            method: 'PATCH', 
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              isLike: !item.isLike
            })
        })
  
      if (!response.ok) {
        return rejectWithValue('EROOOR');
      }
  
      dispatch(fetchCardList())
      return (await response.json()) as Item;
      }
      return rejectWithValue('No such item in the list!')
    }
  )

const CardList = createSlice({
    name: 'cardList',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchCardList.pending, (state) => {
          state.loading = true;
          state.error = undefined;
        })
        .addCase(fetchCardList.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchCardList.rejected, (state, action) => {
          state.error = action.error.message;
          state.loading = false;
      });
    }
})

export default CardList.reducer