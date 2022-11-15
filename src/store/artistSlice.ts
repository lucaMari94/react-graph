import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ArtistDefinition } from '../utils/definitions'

// Define a type for the slice state
interface ArtistState {
  artistList: Array<ArtistDefinition>,
  total: number,
}

// Define the initial state using that type
const initialState: ArtistState = {
  artistList: [],
  total: 0
}

export const ArtistiSlice = createSlice({
  name: 'artistList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Array<ArtistDefinition>>) => {
      const artistsToAdd = action.payload;
      artistsToAdd.map((artist: ArtistDefinition) => state.artistList.push(artist));
    },
    removeAll: (state) => {
      state.artistList = [];
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    }
   
  }
})

export const { add, removeAll, setTotal } = ArtistiSlice.actions

export default ArtistiSlice.reducer