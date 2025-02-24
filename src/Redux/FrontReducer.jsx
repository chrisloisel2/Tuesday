import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCursus = createAsyncThunk("item/fetchCursus", async () => {
  const response = await axios.get("http://localhost:8080/cursus");
  return response.data;
});

const FrontReducer = createSlice({
  name: "item",
  initialState: {
    status: "idle",
    cursus: [],
    formations: [
      {
        id: "1",
        title: "Développement Web Full Stack",
        description:
          "Apprenez à créer des applications web complètes avec React, Node.js, et MongoDB.",
        duration: "12 semaines",
        price: 1499,
        rating: 4.8,
        level: "Intermédiaire",
        category: "Développement Web",
        language: "Français",
        link: "https://example.com/formation/web-fullstack",
        image: "https://example.com/images/web-fullstack.jpg",
      },
      {
        id: "2",
        title: "Introduction à l'Intelligence Artificielle",
        description:
          "Découvrez les bases de l'IA, le machine learning et l'apprentissage profond.",
        duration: "8 semaines",
        price: 1199,
        rating: 4.7,
        level: "Débutant",
        category: "Intelligence Artificielle",
        language: "Français",
        link: "https://example.com/formation/intro-ia",
        image: "https://example.com/images/intro-ia.jpg",
      },
    ],
    error: null,
    selectedItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCursus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCursus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cursus = action.payload;
      })
      .addCase(fetchCursus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default FrontReducer.reducer;
