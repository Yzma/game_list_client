import { describe, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { GET_ALL_GAMES } from '@/services/games/queries';
import { renderWithProviders } from '@/utils/test-utils';
import { store } from '@/app/store';
import Home from '@/pages/Home';

describe('Games List Component', () => {
  beforeEach(() => {
    global.innerWidth = 550;
    global.dispatchEvent(new Event('resize'));
  });

  it('should render the games list when isCardView false', async () => {
    const mocks = {
      request: {
        query: GET_ALL_GAMES,
        variables: {
          genre: [],
          tag: [],
          platform: [],
          year: undefined,
          sortBy: 'name',
          search: '',
        },
      },
      result: {
        data: {
          allGames: [
            {
              __typename: 'Game',
              id: '1',
              name: 'Game 1',
              description: 'Description 1',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              tags: ['3D', 'Fantasy'],
              genres: ['Action', 'Adventure'],
              platforms: ['PC', 'macOS'],
              releaseDate: '2021-01-01 00:00:00',
              avgScore: 5,
              totalRating: 5,
              isGameAdded: false,
            },
            {
              __typename: 'Game',
              id: '2',
              name: 'Game 2',
              description: 'Description 2',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              tags: ['4D', 'Soullike'],
              genres: ['Role Playing', 'Straitagy'],
              platforms: ['Xbox 360', 'Playstation 3'],
              releaseDate: '2021-01-02 00:00:00',
              avgScore: 10,
              totalRating: 5,
              isGameAdded: false,
            },
            {
              __typename: 'Game',
              id: '3',
              name: 'Game 3',
              description: 'Description 3',
              imageURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              bannerURL:
                'https://images.igdb.com/igdb/image/upload/t_cover_big/co4a7a.png',
              tags: ['2D', 'Action'],
              genres: ['JRPG', 'Simulation'],
              platforms: ['Xbox', 'Playstation 2'],
              releaseDate: '2021-01-03 00:00:00',
              avgScore: 8,
              totalRating: 5,
              isGameAdded: false,
            },
          ],
        },
      },
    };

    renderWithProviders(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'rgb(63, 114, 175)',
            },
          }}
        >
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </ConfigProvider>
      </MockedProvider>,

      { store }
    );

    expect(await screen.findByText('Game 1')).toBeInTheDocument();
    expect(await screen.findByText('Game 2')).toBeInTheDocument();
    expect(await screen.findByText('Game 3')).toBeInTheDocument();

    await userEvent.click(await screen.findByLabelText('set-list-view'));
    // screen.debug(undefined, 300000, {
    //   highlight: true,
    //   maxDepth: undefined,
    // });

    expect(await screen.findByLabelText('view-list')).toBeInTheDocument();
  });
});
