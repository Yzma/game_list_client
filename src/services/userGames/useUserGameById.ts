import { OperationVariables, QueryResult, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setUserGameReducer } from '@/features/userGameSlice';
import { GET_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import {
  getTokenFromLocalStorage,
  INITIAL_USER_GAME_BY_ID_STATE,
} from '@/constants';
import type { GetUserGameByGameIdQuery } from '@/graphql/__generated__/graphql';

type UseUserGameByIdType = {
  userGameLoading: boolean;
  errors: string[];
  fetchUserGame: ({
    variables,
  }: {
    variables: {
      gameId: string;
    };
  }) => Promise<QueryResult<GetUserGameByGameIdQuery, OperationVariables>>;
};

const useUserGameById = (): UseUserGameByIdType => {
  const dispatch = useDispatch();
  const errors: string[] = [];
  const [fetchUserGame, { loading: userGameLoading, error }] = useLazyQuery(
    GET_USER_GAME_BY_GAME_ID,
    {
      context: getTokenFromLocalStorage.context,
      onCompleted: (data) => {
        // When user game is not found, clear out redux slice
        if (data.getUserGameByGameId) {
          dispatch(
            setUserGameReducer({
              type: 'userGame',
              payload: data.getUserGameByGameId,
            })
          );
        } else {
          dispatch(
            setUserGameReducer({
              type: 'userGame',
              payload: INITIAL_USER_GAME_BY_ID_STATE,
            })
          );
        }
      },
    }
  );

  if (error) {
    errors.push(error.message);
  }

  return {
    errors,
    userGameLoading,
    fetchUserGame,
  };
};

export default useUserGameById;

// const useUserGameByIdv2 = (): {
//   userGame: UserGameType;
//   userGameLoading: boolean;
//   errors: string[];
//   fetchUserGame: () => void;
// } => {
//   const dispatch = useDispatch();
//   const { data, loading, refetch } = useQuery(
//     GET_USER_GAME_BY_GAME_ID,
//     getTokenFromLocalStorage
//   );

//   const getUserGameById = async (gameId: string, name: string) => {
//     try {
//       const response = await refetch({
//         variables: { gameId, name },
//       });
//       if (
//         !response ||
//         !response.data ||
//         !response.data.addUserGames ||
//         response.data.addUserGames.errors[0]
//       ) {
//         throw new Error(response.data.addUserGames.errors[0]);
//       }
//       return response.data.addUserGames;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return error && { errors: [error.message] };
//       }
//       return { errors: ['Unknown'] };
//     }
//   };
// };

// export default useUserGameByIdv2;
