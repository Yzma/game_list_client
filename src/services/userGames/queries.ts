import { gql } from '@apollo/client';

export const DELETE_USER_GAMES = gql`
  mutation DeleteUserGames($gameId: ID!) {
    deleteUserGames(input: { gameId: $gameId }) {
      userGame {
        id
        gameStatus
        gameNote
        startDate
        completedDate
        rating
        private
        game {
          id
          name
          description
          imageURL
          bannerURL
          releaseDate
          avgScore
          genres
          platforms
          tags
          isGameAdded
          isGameLiked
        }
      }
      errors
    }
  }
`;

export const ADD_USER_GAMES = gql`
  mutation AddUserGames($gameId: ID!) {
    addUserGames(input: { gameId: $gameId }) {
      userGame {
        id
        gameStatus
        gameNote
        startDate
        completedDate
        rating
        private
        game {
          id
          name
          description
          imageURL
          bannerURL
          releaseDate
          avgScore
          genres
          platforms
          tags
          isGameAdded
          isGameLiked
        }
      }
      errors
    }
  }
`;

export const GAMES_FOR_A_USER = gql`
  query GamesForAUser {
    gamesForAUser {
      id
      name
      description
      imageURL
      bannerURL
      releaseDate
      avgScore
      genres
      platforms
      tags
      isGameAdded
      isGameLiked
    }
  }
`;

export const GET_USER_GAME_BY_GAME_ID = gql`
  query GetUserGameByGameId($gameId: ID!) {
    getUserGameByGameId(gameId: $gameId) {
      gameNote
      gameStatus
      id
      startDate
      completedDate
      rating
      private
      createdAt
      updatedAt
    }
  }
`;

export const GET_GAMES_BY_STATUS = gql`
  query GamesByTagsForAUser {
    gamesByStatusForAUser {
      playing {
        id
        name
        imageURL
        avgScore
        platforms
        tags
        genres
        releaseDate
        isGameAdded
        isGameLiked
      }
      planning {
        id
        name
        imageURL
        avgScore
        platforms
        tags
        genres
        releaseDate
        isGameAdded
        isGameLiked
      }
      completed {
        id
        name
        imageURL
        avgScore
        platforms
        tags
        genres
        releaseDate
        isGameAdded
        isGameLiked
      }
      paused {
        id
        name
        imageURL
        avgScore
        platforms
        tags
        genres
        releaseDate
        isGameAdded
        isGameLiked
      }
      dropped {
        id
        name
        imageURL
        avgScore
        platforms
        tags
        genres
        releaseDate
        isGameAdded
        isGameLiked
      }
      justAdded {
        id
        name
        imageURL
        avgScore
        platforms
        tags
        genres
        releaseDate
        isGameAdded
        isGameLiked
      }
      playingCount
      planningCount
      completedCount
      pausedCount
      droppedCount
      justAddedCount
      totalCount
      listsOrder
      errors
    }
  }
`;

export const EDIT_USER_GAME_BY_GAME_ID = gql`
  mutation EditUserGameByGameId($input: EditUserGamesInput!) {
    editUserGames(input: $input) {
      userGame {
        id
        gameNote
        gameStatus
        startDate
        completedDate
        rating
        private
        createdAt
        updatedAt
        game {
          id
          name
        }
      }
      errors
    }
  }
`;
